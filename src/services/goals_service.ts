import QuestionnaireAnswerModel from "../models/questionnaireAnswer_model";
import GoalModel from "../models/Goals_model";
import StrategyModel, { IStrategy } from "../models/strategy_model";
import { geminiModel } from "../utils";
import mongoose from "mongoose";
import { IGoal } from "../models/Goals_model";

interface StrategyInput {
  text: string;
}

export const getGoalsByStudentId = async (studentId: string) => {
  return GoalModel.find({ studentId });
};

export const updateGoal = async (goalId: string, updates: Partial<IGoal>) => {
  return GoalModel.findByIdAndUpdate(goalId, { ...updates, generatedByAI: false }, { new: true });
};

export const deleteGoals = async (goalId: string) => {
  const goal = await GoalModel.findById(goalId);
  if (!goal) throw new Error("Goal not found");

  // Delete linked strategies first
  await StrategyModel.deleteMany({ goalId: goal._id });

  return GoalModel.findByIdAndDelete(goalId);
};

export const createGoal = async ( data: Partial<Omit<IGoal, "strategies">> & { strategies?: StrategyInput[] }, createdBy: string) => {
  const { strategies = [], ...goalData } = data;

  const goal = new GoalModel({
    ...goalData,
    createdBy,
    generatedByAI: false,
  });
  await goal.save();

  await Promise.all(
    strategies.map((strategy: Partial<IStrategy>) => {
      return new StrategyModel({
        goalId: goal._id,
        text: strategy.text,
      }).save();
    })
  );

  return goal;
};

export const generateGoalsFromAnswers = async (studentId: string, createdBy: string, days: number) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const recentQAs = await QuestionnaireAnswerModel.find({
    studentId,
    createdAt: { $gte: fromDate }
  }).sort({ createdAt: -1 }).populate("answerIds");

  if (!recentQAs.length) {
    throw new Error(`No questionnaire answers found in the past ${days} days`);
  }

  const allAnswers = recentQAs.flatMap(qa => (qa.answerIds as any[]));

  const prompt = `
אתה מערכת חכמה שתפקידה ליצור מטרות חינוכיות ואסטרטגיות לתלמידים עם צרכים מיוחדים.

להלן תשובות של מורים על שאלון בנוגע לתלמיד  
הימים האחרונים ${days} התשובות הן מ
---
${allAnswers}
---

צור 3 מטרות חינוכיות ו-3 אסטרטגיות התערבות בקובץ JSON תקני.

שים לב:
- החזר מבנה עם שני שדות: "goals" ו-"strategies"
- מטרות מכילות שדה "text"
- אסטרטגיות מכילות שדה "text" ושדה "relatedGoal" (שמתאים לאחת מהמטרות)

פורמט דוגמה:
{
  "goals": [
    { "text": "שיפור מיומנויות למידה" }
  ],
  "strategies": [
    { "text": "שימוש בכרטיס משימות", "relatedGoal": "שיפור מיומנויות למידה" }
  ]
}
`;

  const response = await geminiModel.generateContent(prompt);
  const rawText = response.response.text().replace(/^```json\n/, "").replace(/\n```$/, "");
  const { goals, strategies } = JSON.parse(rawText);

  const goalTextToIdMap: Record<string, mongoose.Types.ObjectId> = {};
  const createdGoals: IGoal[] = [];

  // Step 1: Create goals
  for (const goalData of goals) {
    const goalDoc = new GoalModel({
      text: goalData.text,
      studentId,
      createdBy,
      generatedByAI: true
    });
    const savedGoal = await goalDoc.save();
    goalTextToIdMap[goalData.text] = savedGoal._id as mongoose.Types.ObjectId;
    createdGoals.push(savedGoal);
  }

  // Step 2: Create strategies and attach to goal
  for (const strategyData of strategies) {
    const relatedGoalId = goalTextToIdMap[strategyData.relatedGoal];
    
    if (!relatedGoalId) {
      throw new Error(`Strategy "${strategyData.text}" refers to unknown goal "${strategyData.relatedGoal}"`);
    }

    const strategyDoc = new StrategyModel({
      text: strategyData.text,
      goalId: relatedGoalId
    });
    const savedStrategy = await strategyDoc.save();

  }

  return await GoalModel.find({ _id: { $in: createdGoals.map(g => g._id) } });
};

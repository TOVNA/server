import QuestionnaireAnswerModel from "../models/questionnaireAnswer_model";
import AnswerModel from "../models/answers_model";
import GoalModel from "../models/Goals_model";
import { geminiModel } from "../utils";
import mongoose from "mongoose";
import { getQuestionnaireAnswersByStudentId } from "./questionnaireAnswer_service";

// Get all goals for a student
export const getGoalsByStudentId = async (studentId: string) => {
  return GoalModel.findOne({ student_id: studentId });
};

// Update goals manually
export const updateGoals = async (goalId: string, updatedGoals: any) => {
  return GoalModel.findByIdAndUpdate(goalId, { goals: updatedGoals }, { new: true });
};

// Delete goals
export const deleteGoals = async (goalId: string) => {
  return GoalModel.findByIdAndDelete(goalId);
};

export const generateGoalsFromAnswers = async (studentId: string, createdBy: string, days: number) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const recentQAs = await QuestionnaireAnswerModel.find({
    studentId,
    createdAt: { $gte: fromDate }
  }).sort({ createdAt: -1 }).populate("answerIds");

if (!recentQAs || recentQAs.length === 0) {
  throw new Error(`No questionnaire answers found in the past ${days} days`);
}

  // Extract answers
  const allAnswers = recentQAs.flatMap(qa => (qa.answerIds as any[]));

  // AI Prompt for goals & strategies
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
- מטרות מכילות שדה "text" ושדה "priority" בלבד
- אסטרטגיות מכילות שדה "text" ושדה "relatedGoal" (שמתאים לאחת מהמטרות)

פורמט דוגמה:
{
  "goals": [
    {
      "text": "שיפור מיומנויות למידה",
      "priority": "high" // can be either "high" or "medium" or "low"
    }
  ],
  "strategies": [
    {
      "text": "שימוש בכרטיס משימות",
      "relatedGoal": "שיפור מיומנויות למידה"
    }
  ]
}
`;

  const response = await geminiModel.generateContent(prompt);
  console.log(response.response.text())
  const goalsAndStrategies = JSON.parse(response.response.text().replace(/^```json\n/, "").replace(/\n```$/, ""));

  const formattedGoals = goalsAndStrategies.goals.map((goal: any) => ({
    text: goal.text,
    priority: goal.priority,
    confidence: Math.random() * 0.5 + 0.5,
    source: "ai",
    isAchieved: false,
  }));

  const formattedStrategies = goalsAndStrategies.strategies.map((strategy: any) => ({
    text: strategy.text,
    relatedGoal: strategy.relatedGoal,
    source: "ai"
  }));

  const saved = await GoalModel.create({
    student_id: studentId,
    createdBy,
    generated_by_ai: true,
    goals: formattedGoals,
    strategies: formattedStrategies
  });

  return saved;
};

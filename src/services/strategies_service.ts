import GoalModel from "../models/Goals_model";
import { geminiModel } from "../utils";
import mongoose from "mongoose";
import StrategyModel, { IStrategy } from "../models/strategy_model";

export const createStrategy = async (data: Partial<IStrategy>) => {
  return await StrategyModel.create(data);
};

export const getStrategiesByGoal = async (goalId: string) => {
  return await StrategyModel.find({ goalId });
};

export const updateStrategy = async (id: string, updates: Partial<IStrategy>) => {
  return await StrategyModel.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteStrategy = async (id: string) => {
  return await StrategyModel.findByIdAndDelete(id);
};

export const generateStrategiesForStudent = async (studentId: string) => {
  const goals = await GoalModel.find({ studentId });

  if (!goals.length) {
    throw new Error("No goals found for this student.");
  }

  const prompt = `
אתה מערכת חכמה שתפקידה לנסח אסטרטגיות התערבות חינוכיות עבור מטרות קיימות של תלמיד עם צרכים מיוחדים.

להלן רשימת מטרות של תלמיד:
---
${goals.map(goal => `- { "goalId": "${(goal._id as mongoose.Types.ObjectId).toString()}", "text": "${goal.text}" }`).join("\n")}
---

צור אסטרטגיה אחת או יותר לכל מטרה. החזר את הפלט רק בפורמט JSON תקין, ללא הסברים, ללא תוספות:
{
  "strategies": [
    { "text": "תכנון לוח משימות יומי", "goalId": "goalObjectIdHere" },
    ...
  ]
}
`;

  const response = await geminiModel.generateContent(prompt);
  const rawText = response.response.text().replace(/^```json\n/, "").replace(/\n```$/, "");
  const { strategies } = JSON.parse(rawText);
  const createdStrategies = [];

  for (const strategy of strategies) {
    if (!strategy.goalId) continue;

    const strategyDoc = await StrategyModel.create({
      text: strategy.text,
      goalId: strategy.goalId,
    });

    await GoalModel.findByIdAndUpdate(strategy.goalId, {
      $push: { strategies: strategyDoc._id }
    });

    createdStrategies.push(strategyDoc);
   }
  return createdStrategies;
};

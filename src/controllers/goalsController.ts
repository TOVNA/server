import { Request, Response } from "express";
import GoalModel from "../models/Goals_model";
import Student from "../models/students_model";
import mongoose from "mongoose";
import { geminiModel } from "../utils";

const SYSTEM_USER_ID = new mongoose.Types.ObjectId(); // Replace with actual system user ID

/**
 * Generate goals for student - Post /goals
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const generateStudentGoals = async (req: Request, res: Response) => {
  const studentId = req.body.id;

  try {
    // Validate student
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    // AI Prompt
    const prompt = `
      אתה מערכת חכמה ליצירת מטרות חינוכיות לתלמידים עם צרכים מיוחדים.
      צור **רשימה של 3-5 מטרות חינוכיות רנדומליות** שמתאימות לתלמידים במערכת החינוך המיוחד.

      **פורמט תשובה נדרש (JSON בלבד):**
      \`\`\`json
      [
        { "text": "לשפר את יכולת הריכוז בשיעור", "priority": "גבוהה" },
        { "text": "לחזק את הכישורים החברתיים עם בני הכיתה", "priority": "בינונית" },
        { "text": "להגביר את הביטחון העצמי בקריאה וכתיבה", "priority": "נמוכה" }
      ]
      \`\`\`
      החזר **אך ורק JSON תקין** ללא טקסט נוסף.
    `;

    // Call Gemini AI
    const goalsResponse = await geminiModel.generateContent(prompt);

    // Parse response JSON
    const goalsJson = JSON.parse(
      goalsResponse.response
        .text()
        .replace(/^```json\n/, "")
        .replace(/\n```$/, "")
    );

    // Convert goals to match schema
    const formattedGoals = goalsJson.map((goal: any) => ({
      text: goal.text,
      priority: goal.priority,
      confidence: Math.random() * 0.5 + 0.5, // Generates confidence between 0.5 - 1.0
      source: "ai",
      isAchieved: false,
    }));

    // Create AI-generated goal document
    const newGoal = new GoalModel({
      student_id: studentId,
      createdBy: SYSTEM_USER_ID, // AI-generated, so system user ID
      generated_by_ai: true,
      goals: formattedGoals,
    });

    // Save to DB
    await newGoal.save();

    // Return response
    res.status(200).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  generateStudentGoals,
};

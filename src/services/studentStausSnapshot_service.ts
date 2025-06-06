import QuestionnaireAnswerModel from "../models/questionnaireAnswer_model";
import StudentStatusSnapshotModel from "../models/studentStatusSnapshot_model";
import { geminiModel } from "../utils";

// Get all snapshots for a student
export const getSnapshotsByStudentId = async (studentId: string) => {
  return StudentStatusSnapshotModel
    .find({ student_id: studentId })
    .sort({ timestamp: -1 }); // Most recent first
};

export const generateStatusSnapshot = async (studentId: string, createdBy: string) => {
  const latestQA = await QuestionnaireAnswerModel
    .findOne({ studentId })
    .sort({ createdAt: -1 })
    .populate("answerIds");

  if (!latestQA) throw new Error("No questionnaire answers found");

  const answers = (latestQA.answerIds as any[]).map(a => a.text).join("\n");

  const prompt = `
אתה מערכת חכמה לניתוח מצבו של תלמיד עם צרכים מיוחדים.
על סמך התשובות למטה, הפק סיכום קצר ודרג את רמתו של התלמיד בקטגוריות הבאות: למידה, חברתי, רגשי (1-5).

---
${answers}
---

פורמט JSON תקני בלבד:
{
  "summary": "התלמיד מראה קושי חברתי אך מתקדם בלמידה.",
  "grades": [
    { "category": "learning", "value": 4 },
    { "category": "social", "value": 2 },
    { "category": "behavioral", "value": 3 }
  ]
}
`;

  const response = await geminiModel.generateContent(prompt);
  const parsed = JSON.parse(response.response.text().replace(/^```json\n/, "").replace(/\n```$/, ""));

  const saved = await StudentStatusSnapshotModel.create({
    student_id: studentId,
    createdBy,
    summary: parsed.summary,
    grades: parsed.grades,
    timestamp: new Date()
  });

  return saved;
};

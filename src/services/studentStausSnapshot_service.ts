import QuestionnaireAnswerModel from "../models/questionnaireAnswer_model";
import StudentStatusSnapshotModel from "../models/studentStatusSnapshot_model";
import { geminiModel } from "../utils";
import { calculateStudentScores } from "../utils/algorithm/scoreStudent";

// Get all snapshots for a student
export const getSnapshotsByStudentId = async (studentId: string) => {
  return StudentStatusSnapshotModel
    .find({ student_id: studentId })
    .sort({ timestamp: -1 }); // Most recent first
};

export const generateStatusSnapshot = async (studentId: string, createdBy: string, days: number) => {
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

  const prompt = `
אתה מערכת חכמה לניתוח מצבו של תלמיד עם צרכים מיוחדים.
על סמך התשובות למטה, הפק סיכום קצר ודרג את רמתו של התלמיד בקטגוריות הבאות: למידה, חברתי, התנהגותי (1-10).
התשובות הן מה ${days} האחרונים
---
${allAnswers}
---

פורמט JSON תקני בלבד: 
הקטגוריות הן: "לימודי", "חברתי", "התנהגותי".

{
  "summary": "התלמיד מראה קושי חברתי אך מתקדם בלמידה.",
  "grades": [
    { "category": "לימודי", "value": 4 },
    { "category": "חברתי", "value": 2 },
    { "category": "התנהגותי", "value": 3 }
  ]
}
`;

  const response = await geminiModel.generateContent(prompt);
  const parsed = JSON.parse(response.response.text().replace(/^```json\n/, "").replace(/\n```$/, ""));

  const algoGrades = await calculateStudentScores(studentId, days);

  // calculate the average of the algoGrades with the AI grades
  
  const avgGrades = parsed.grades.map((grade: { category: string, value: number }) => {
    const algoValue = algoGrades.get(grade.category) || 0;
    const avgValue = (algoValue + grade.value) / 2.0; // Average the AI and algorithm grades
    return { category: grade.category, value: avgValue }; // Round to nearest integer
  });

  const saved = await StudentStatusSnapshotModel.create({
    student_id: studentId,
    createdBy: createdBy,
    summary: parsed.summary,
    grades: avgGrades,
    timestamp: new Date()
  });

  return saved;
};

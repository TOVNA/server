import { Types } from 'mongoose';
import { distance } from 'fastest-levenshtein';
import QuestionnaireAnswerModel from '../../models/questionnaireAnswer_model';
import { CATEGORY_MAP, CATEGORIES, Category } from './categoryMap';
import PERFORMANCE_KEYWORDS from './performanceKeywords';

/** This function Receives an answer text and returns an array of the formatted words */
export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\u0590-\u05FF\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

/** This function Recieves an answer text and returns a score for the answer 
 * The function generates a score using the keywords bank and fuzzy string matching */
export function scorePerformanceFromText(text: string): number {
  const tokens = tokenizeText(text);
  let score = 0;

  for (const token of tokens) {
    for (const [keyword, weight] of Object.entries(PERFORMANCE_KEYWORDS)) {
      const dist = distance(token, keyword);
      if (dist <= 1) {
        score += weight;
        break;
      }
    }
  }
  return score;
}

/** This function receives a score a nomalizes it to be inside the 1-10 range */
export function normalizeScore(total: number, count: number): number {
  const avg = total / (count || 1);
  const scaled = 5 + avg * 2;
  return Math.max(1, Math.min(10, Math.round(scaled)));
}

export async function calculateStudentScores(
  studentId: string,
  days: number = 5
): Promise<Map<String, number>> {
  
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);

  const questionnaireAnswers = await QuestionnaireAnswerModel.find({
    studentId: new Types.ObjectId(studentId),
    createdAt: { $gte: daysAgo },
  }).populate({
    path: 'answerIds',
    populate: { path: 'questionId' },
  });

   if (!questionnaireAnswers.length) {
    throw new Error(`No questionnaire answers found for student in the past ${days} days.`);
  }

  const rawScores = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, [] as number[]])
  ) as Record<Category, number[]>;

  // Iterate over every answer in each QuestionnaireAnswer and generate category scores
  for (const qa of questionnaireAnswers) {
    for (const answer of qa.answerIds as any[]) {
      const questionId = answer.questionId?._id?.toString();
      const category = CATEGORY_MAP[questionId];

      if (!category || !answer.answerText) continue;

      const score = scorePerformanceFromText(answer.answerText);
      rawScores[category].push(score);
    }
  }

  // Summarize and normalize results for each category
  const finalScores = Object.fromEntries(
    Object.entries(rawScores).map(([category, values]) => {
      const total = values.reduce((sum, v) => sum + v, 0);
      return [category, normalizeScore(total, values.length)];
    })
  ) as Record<Category, number>;

  return new Map(Object.entries(finalScores));
}

import { Types } from 'mongoose';
import { distance } from 'fastest-levenshtein';
import QuestionnaireAnswerModel from '../../models/questionnaireAnswer_model';
import CATEGORY_MAP, { Category } from './categoryMap';
import PERFORMANCE_KEYWORDS from './performanceKeywords';

function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\u0590-\u05FF\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function scorePerformanceFromText(text: string): number {
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

// This function receives a score a nomalizes it to be in the 1-10 range
function normalizeScore(total: number, count: number): number {
  const avg = total / (count || 1);
  const scaled = 5 + avg * 2;
  return Math.max(1, Math.min(10, Math.round(scaled)));
}


// This is the algorithm main function
export async function calculateStudentScores(
  studentId: string,
  days: number = 5
): Promise<Record<Category, number>> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const questionnaireAnswers = await QuestionnaireAnswerModel.find({
    studentId: new Types.ObjectId(studentId),
    createdAt: { $gte: since },
  }).populate({
    path: 'answerIds',
    populate: { path: 'questionId' },
  });

   if (!questionnaireAnswers.length) {
    throw new Error(`No questionnaire answers found for student in the past ${days} days.`);
  }

  const rawScores: Record<Category, number[]> = {
    לימודי: [],
    חברתי: [],
    התנהגותי: [],
  };

  for (const qa of questionnaireAnswers) {
    for (const answer of qa.answerIds as any[]) {
      const questionId = answer.questionId?._id?.toString();
      const category = CATEGORY_MAP[questionId];

      if (!category || !answer.answerText) continue;

      const score = scorePerformanceFromText(answer.answerText);
      rawScores[category].push(score);
    }
  }

  const finalScores = Object.fromEntries(
    Object.entries(rawScores).map(([category, values]) => {
      const total = values.reduce((sum, v) => sum + v, 0);
      return [category, normalizeScore(total, values.length)];
    })
  ) as Record<Category, number>;

  return finalScores;
}

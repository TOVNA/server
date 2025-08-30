import { calculateStudentScores } from '../src/utils/algorithm/scoreStudent';
import * as scoringModule from '../src/utils/algorithm/scoreStudent';
import QuestionnaireAnswerModel from '../src/models/questionnaireAnswer_model';
import { Category } from '../src/utils/algorithm/categoryMap';
import { Types } from 'mongoose';

// Mock mongoose model
jest.mock('../src/models/questionnaireAnswer_model');

const mockFind = jest.fn();
(QuestionnaireAnswerModel.find as any) = mockFind;

describe('calculateStudentScores', () => {
  const validStudentId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tokenizeText should split and lowercase Hebrew and English text', () => {
    const tokens = (scoringModule as any).tokenizeText('Hello, שלום! משתפר');
    expect(tokens).toEqual(['hello', 'שלום', 'משתפר']);
  });

  it('scorePerformanceFromText should score known keywords accurately', () => {
    const text = 'מצטיין מתקשה';
    const score = (scoringModule as any).scorePerformanceFromText(text);
    expect(score).toBe(1); // מצטיין = 2, מתקשה = -1 → total = 1
  });

  it('normalizeScore should scale values correctly', () => {
    expect((scoringModule as any).normalizeScore(0, 1)).toBeGreaterThanOrEqual(1);
    expect((scoringModule as any).normalizeScore(10, 2)).toBeLessThanOrEqual(10);
  });

  it('calculateStudentScores returns normalized scores per category', async () => {
    mockFind.mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          answerIds: [
            { answerText: 'מצטיין משתדל', questionId: { _id: '681f7391db710d27f8cd7b62' } }, // לימודי
            { answerText: 'מתקשה', questionId: { _id: '681f7391db710d27f8cd7b64' } }, // חברתי
            { answerText: 'עצמאי מתמיד', questionId: { _id: '681f7391db710d27f8cd7b61' } }, // התנהגותי
          ],
        },
      ]),
    });

    const scores = await calculateStudentScores(validStudentId, 5);

    expect(scores).toHaveProperty('לימודי');
    expect(scores).toHaveProperty('חברתי');
    expect(scores).toHaveProperty('התנהגותי');

    for (const cat of Object.keys(scores)) {
      expect(scores[cat as Category]).toBeGreaterThanOrEqual(1);
      expect(scores[cat as Category]).toBeLessThanOrEqual(10);
    }

    expect(scores['לימודי']).toBeGreaterThan(scores['חברתי']);
  });

  it('throws error if no answers in the past X days', async () => {
    mockFind.mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });

    await expect(calculateStudentScores(validStudentId, 5)).rejects.toThrow(
      /No questionnaire answers found/
    );
  });
});

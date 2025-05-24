import Questionnaire, { IQuestionnaire } from '../models/questionnaire_model';
import Question from '../models/question_model';
import { Types } from 'mongoose';
import { getQuestionnaireAnswerById } from './questionnaireAnswer_service';

interface QuestionInput {
  _id?: string;
  text: string;
  type: 'text' | 'numeric' | 'multiple-choice' | 'scale';
  scale?: { min: number; max: number };
  options?: string[];
}
export const createQuestionnaireWithQuestions = async (
  data: {
    title: string;
    description?: string;
    targetRole: 'teacher' | 'homeroom';
    questions: QuestionInput[];
  }
) => {
  const questionnaire = new Questionnaire({
    title: data.title,
    description: data.description,
    targetRole: data.targetRole,
    questionIds: []
  });

  await questionnaire.save();

  const createdQuestions = await Question.insertMany(
    data.questions.map(q => ({
      ...q,
      questionnaireId: questionnaire._id
    }))
  );

  questionnaire.questionIds = createdQuestions.map(q => q._id);
  await questionnaire.save();

  return await questionnaire.populate('questionIds');
};

export const updateQuestionnaireWithQuestions = async (
  questionnaireId: string,
  data: {
    title?: string;
    description?: string;
    targetRole?: 'teacher' | 'homeroom';
    questions: QuestionInput[];
  }
) => {

  const questionnaire = await Questionnaire.findByIdAndUpdate(
    questionnaireId,
    {
      title: data.title,
      description: data.description,
      targetRole: data.targetRole,
    },
    { new: true }
  );

  if (!questionnaire) {
    return null;
  }

  const existingQuestions = await Question.find({ questionnaireId: questionnaire._id });
  const existingMap = new Map(existingQuestions.map(q => [q._id.toString(), q]));

  const updatedQuestionIds: Types.ObjectId[] = [];

  for (const q of data.questions) {
    if (q._id && existingMap.has(q._id)) {
     
      await Question.findByIdAndUpdate(q._id, q);
      updatedQuestionIds.push(new Types.ObjectId(q._id));
      existingMap.delete(q._id); 
    } else {
   
      const newQuestion = new Question({ ...q, questionnaireId });
      await newQuestion.save();
      updatedQuestionIds.push(newQuestion._id);
    }
  }

  for (const [oldId] of existingMap) {
    await Question.findByIdAndDelete(oldId);
  }

  questionnaire.questionIds = updatedQuestionIds;
  await questionnaire.save();

  return await questionnaire.populate('questionIds');
};

export const getAllQuestionnaires = async (): Promise<IQuestionnaire[]> => {return await Questionnaire.find().populate('questionIds')};
export const getQuestionnaireById = async (id: string): Promise<IQuestionnaire | null> => {
    return await Questionnaire.findById(id).populate('questionIds');
};
export const getQuestionnairesByTargetRole = async (targetRole: string): Promise<IQuestionnaire[]> => {
    return await Questionnaire
        .find({ targetRole })
        .populate('questionIds');
};  
export const createQuestionnaire = async (questionnaireData: IQuestionnaire): Promise<IQuestionnaire> => {
    const questionnaire = new Questionnaire(questionnaireData);
    return await questionnaire.save();
};
export const updateQuestionnaire = async (id: string, questionnaireData: Partial<IQuestionnaire>): Promise<IQuestionnaire | null> => {
    return await Questionnaire.findByIdAndUpdate(id, questionnaireData, { new: true }).populate('questionIds');
};
export const deleteQuestionnaire = async (id: string): Promise<IQuestionnaire | null> => {
    return await Questionnaire.findByIdAndDelete(id);
};
/*
export const addQuestionToQuestionnaire = async (questionnaireId: string, questionId: string): Promise<IQuestionnaire | null> => {
    return await Questionnaire.findByIdAndUpdate(
        questionnaireId,
        { $addToSet: { questionIds: questionId } },
        { new: true }
    ).populate('questionIds');
};

export const removeQuestionFromQuestionnaire = async (questionnaireId: string, questionId: string): Promise<IQuestionnaire | null> => {
    return await Questionnaire.findByIdAndUpdate(
        questionnaireId,
        { $pull: { questionIds: questionId } },
        { new: true }
    ).populate('questionIds');
};
*/


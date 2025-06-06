import QuestionnaireAnswerModel from '../models/questionnaireAnswer_model';
import { QuestionnaireAnswer } from '../models/questionnaireAnswer_model';
import AnswerModel, { IAnswer } from '../models/answers_model';
import QuestionModel, { IQuestion } from '../models/question_model';
import { Types } from 'mongoose';

interface CreateQuestionnaireAnswerInput {
  questionnaireId: string;
  teacherId: string;
  studentId: string;
  answers: Omit<IAnswer, 'questionnaireAnswerId'>[];
}

export const createQuestionnaireAnswer = async (data: Partial<CreateQuestionnaireAnswerInput>) => {
  
  const { questionnaireId, teacherId, studentId, answers } = data;
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error("Answers must be a non-empty array.");
  }
  //Create the QuestionnaireAnswer with empty answerIds
  const questionnaireAnswer = await QuestionnaireAnswerModel.create({
    questionnaireId,
    teacherId,
    studentId,
    answerIds: []
  });

  //Create the related Answer documents and link them
  const createdAnswers = await Promise.all(
    answers.map((answer) =>
      AnswerModel.create({
        ...answer,
        questionnaireAnswerId: questionnaireAnswer._id
      })
    )
  );

  //Update the QuestionnaireAnswer with the new answerIds
  questionnaireAnswer.answerIds = createdAnswers.map((ans) => ans._id);
  await questionnaireAnswer.save();

  return await questionnaireAnswer.populate([
    'questionnaireId',
    'teacherId',
    'studentId',
    'answerIds'
  ]);
};

export const getAllQuestionnaireAnswers = async () => {
  return await QuestionnaireAnswerModel.find()
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const getQuestionnaireAnswerById = async (id: string) => {
  return await QuestionnaireAnswerModel.findById(id)
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const getQuestionnaireAnswersByStudentId = async (studentId: string) => {
  return await QuestionnaireAnswerModel.find({ studentId })
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const updateQuestionnaireAnswer = async (
  id: string,
  data: Partial<CreateQuestionnaireAnswerInput>
) => {
  const questionnaireAnswer = await QuestionnaireAnswerModel.findById(id);
  if (!questionnaireAnswer) return null;
  if (data.questionnaireId) questionnaireAnswer.questionnaireId = new Types.ObjectId(data.questionnaireId);
  if (data.teacherId) questionnaireAnswer.teacherId =  new Types.ObjectId(data.teacherId);
  if (data.studentId) questionnaireAnswer.studentId =  new Types.ObjectId(data.studentId);

  if (data.answers && Array.isArray(data.answers)) {
    // Delete old answers
    await AnswerModel.deleteMany({ questionnaireAnswerId: questionnaireAnswer._id });

    // Create new ones
    const createdAnswers = await Promise.all(
      data.answers.map((ans) =>
        new AnswerModel({
          ...ans,
          questionnaireAnswerId: questionnaireAnswer._id,
        }).save()
      )
    );

    // Replace answer references
    questionnaireAnswer.answerIds = createdAnswers.map((a) => a._id);
  }

  await questionnaireAnswer.save();

  return await questionnaireAnswer.populate([
    'questionnaireId',
    'teacherId',
    'studentId',
    'answerIds',
  ]);
};

export const deleteQuestionnaireAnswer = async (id: string) => {
  return await QuestionnaireAnswerModel.findByIdAndDelete(id);
};

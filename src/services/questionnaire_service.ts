import Questionnaire, { IQuestionnaire } from '../models/questionnaire_model';

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


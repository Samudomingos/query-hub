import { Answer } from "../entitites/answer";

interface AnswerQuestionUseCaseRequest {
    instrcutorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {

    execute({ instrcutorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const anwser = new Answer(content)

        return anwser
    }
}


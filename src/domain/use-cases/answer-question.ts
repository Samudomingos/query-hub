import { Answer } from "../entitites/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswersRepository){

    }

    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const anwser = new Answer({
            authorId: instructorId,
            questionId,
            content
        })

        await this.answersRepository.create(anwser)

        return anwser
    }
}


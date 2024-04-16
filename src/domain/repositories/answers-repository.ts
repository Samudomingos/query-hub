import { Answer } from "../entitites/answer";

export interface AnswersRepository {
    create(answer: Answer): Promise<void>
}
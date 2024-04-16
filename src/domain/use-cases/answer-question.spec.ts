import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer) => {
        return
    }
}

test('create an answer',async ()=>{
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        instructorId: '1',
        questionId: '2',
        content: 'New answer'
    })

    expect(answer.content).toEqual('New answer')

})
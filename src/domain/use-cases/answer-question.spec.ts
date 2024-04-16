import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer',()=>{
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        instrcutorId: '1',
        questionId: '2',
        content: 'New answer'
    })

    expect(answer.content).toEqual('New answer')

})
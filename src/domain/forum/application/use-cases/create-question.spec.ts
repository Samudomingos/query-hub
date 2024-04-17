import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'New question',
    content: 'New content',
  })

  expect(question.id).toBeTruthy()
  expect(question.title).toEqual('New question')
})

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComments = QuestionComment.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.questionCommentsRepository.create(questionComments)

    return right({
      questionComments,
    })
  }
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    return (
      this.items.find((answerComment) => answerComment.id.toString() === id) ||
      null
    )
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComment = this.items
      .filter((answer) => answer.anwserId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComment
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    this.items.splice(answerCommentIndex, 1)
  }
}

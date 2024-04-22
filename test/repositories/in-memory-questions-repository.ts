import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    return this.items.find((question) => question.id.toValue() === id) || null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((question) => question.slug.value === slug) || null
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )
    this.items.splice(questionIndex, 1)
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )
    this.items[questionIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}

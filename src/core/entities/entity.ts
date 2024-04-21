import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public equals(entity?: Entity<any>): boolean {
    if (entity === null || entity === undefined) {
      return false
    }

    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}

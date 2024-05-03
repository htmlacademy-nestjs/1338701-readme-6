import { Entity, ISubscriber, StorableEntity } from '@project/shared/core'

export class EmailSubscriberEntity extends Entity implements StorableEntity<ISubscriber> {
  public email: string
  public firstname: string
  public lastname: string

  constructor(subscriber?: ISubscriber) {
    super()
    this.populate(subscriber)
  }

  public populate(subscriber?: ISubscriber): void {
    if (!subscriber) {
      return
    }

    this.id = subscriber.id ?? ''
    this.email = subscriber.email
    this.firstname = subscriber.firstname
    this.lastname = subscriber.lastname
  }

  public toPOJO(): ISubscriber {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname
    }
  }
}

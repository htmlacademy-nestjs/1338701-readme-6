export abstract class Entity {
  private _id?: string

  public get id(): string | undefined {
    return this._id
  }

  public set id(value: string | undefined) {
    this._id = value
  }
}

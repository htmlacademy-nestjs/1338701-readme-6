export abstract class Entity {
  private _id: string | null = null

  public get id(): string | null {
    return this._id
  }

  public set id(value: string | null) {
    this._id = value
  }
}

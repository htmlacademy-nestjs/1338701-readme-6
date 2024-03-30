import { compare, genSalt, hash } from 'bcrypt'
import { IHasher } from 'libs/shared/helpers/src/hasher/hasher.interface'

export class BcryptHasher implements IHasher {
  constructor(private readonly saltRounds: number) {}
  compareHash(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted)
  }

  async hash(value: string): Promise<string> {
    const salt = await genSalt(this.saltRounds)
    return await hash(value, salt)
  }
}

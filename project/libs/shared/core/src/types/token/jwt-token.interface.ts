export interface IJwtToken {
  id?: string
  tokenId: string
  userId: string
  createdAt: Date
  expiresIn: Date
}

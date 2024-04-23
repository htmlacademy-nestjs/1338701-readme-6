import * as Joi from 'joi'
import { registerAs } from '@nestjs/config'

export interface JwtConfig {
  accessTokenSecret: string
  accessTokenExpiresIn: string
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required()
})

function validateConfig(config: JwtConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true })
  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`)
  }
}

function getConfig(): JwtConfig {
  const config: JwtConfig = {
    accessTokenSecret: process.env['JWT_ACCESS_TOKEN_SECRET'] as string,
    accessTokenExpiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] as string
  }

  validateConfig(config)
  return config
}

export default registerAs('jwt', getConfig)

import * as Joi from 'joi'
import { registerAs } from '@nestjs/config'

export interface IJwtConfig {
  accessTokenSecret: string
  accessTokenExpiresIn: string
  refreshTokenSecret: string
  refreshTokenExpiresIn: string
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
  refreshTokenSecret: Joi.string().required(),
  refreshTokenExpiresIn: Joi.string().required()
})

function validateConfig(config: IJwtConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true })
  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`)
  }
}

function getConfig(): IJwtConfig {
  const config: IJwtConfig = {
    accessTokenSecret: process.env['JWT_ACCESS_TOKEN_SECRET'] as string,
    accessTokenExpiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] as string,
    refreshTokenSecret: process.env['JWT_REFRESH_TOKEN_SECRET'] as string,
    refreshTokenExpiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] as string
  }

  validateConfig(config)
  return config
}

export default registerAs('jwt', getConfig)

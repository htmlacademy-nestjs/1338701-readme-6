import { registerAs } from '@nestjs/config'
import Joi from 'joi'
import { DEFAULT_PORT, ENVIRONMENTS } from 'libs/user/config/src/acctoun-config-module/account-config.constant'
import { ApplicationConfig } from 'libs/user/config/src/acctoun-config-module/configurations/app.interface'

type Environment = (typeof ENVIRONMENTS)[number]

const validationSchema = Joi.object<ApplicationConfig>({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT)
})

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true })
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`)
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['PORT'] || `${DEFAULT_PORT}`, 10)
  }

  validateConfig(config)
  return config
}

export default registerAs('application', getConfig)

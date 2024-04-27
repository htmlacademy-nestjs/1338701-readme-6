import { registerAs } from '@nestjs/config'
import Joi from 'joi'
import { PostConfig } from 'libs/post/post-config/src/post-config-module/configurations/post.interface'
import { DEFAULT_PORT, ENVIRONMENTS } from 'libs/post/post-config/src/post-config-module/post-config.constant'

type Environment = (typeof ENVIRONMENTS)[number]

const validationSchema = Joi.object<PostConfig>({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT)
})

function validateConfig(config: PostConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true })
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`)
  }
}

function getConfig(): PostConfig {
  const config: PostConfig = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['SERVICE_PORT'] || `${DEFAULT_PORT}`, 10)
  }

  validateConfig(config)
  return config
}

export default registerAs('post-service', getConfig)

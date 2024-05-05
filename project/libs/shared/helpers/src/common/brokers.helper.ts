import { ConfigService } from '@nestjs/config'
import { RabbitExchange } from '@project/shared/core'

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port
}: {
  user: string
  password: string
  host: string
  port: string
}): string {
  return `amqp://${user}:${password}@${host}:${port}`
}

export function getRabbitMQOptions(optionSpace: any) {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        exchanges: [
          {
            name: RabbitExchange.Income,
            type: 'direct'
          },
          {
            name: RabbitExchange.SendPosts,
            type: 'direct'
          }
        ],
        uri: getRabbitMQConnectionString({
          host: config.get<string>(`${optionSpace}.host`) as string,
          password: config.get<string>(`${optionSpace}.password`) as string,
          user: config.get<string>(`${optionSpace}.user`) as string,
          port: config.get<string>(`${optionSpace}.port`) as string
        }),
        connectionInitOptions: { wait: false },
        enableControllerDiscovery: true
      }
    },
    inject: [ConfigService]
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { AxiosError } from 'axios'

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error'

interface ICustomAxiosResponseData {
  message?: string
  error?: string
  statusCode?: number
}

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
    let message = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE
    let data: ICustomAxiosResponseData | undefined

    if (error.response?.data && typeof error.response.data === 'object') {
      // Если есть данные в ответе и они являются объектом
      data = error.response.data
      message = data?.message || message // Используем сообщение из data, если оно есть
    }

    response.status(status).json({
      statusCode: status,
      message
    })
  }
}

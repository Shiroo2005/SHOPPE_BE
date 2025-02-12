import { HTTP_STATUS } from '~/constants/http_status'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'

type ErrorsType = Record<
  string,
  {
    msg: string
  }
>

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = VALIDATE_MESSAGES.VALIDATE_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}

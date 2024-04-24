export const SALT_ROUNDS = 10

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid'
} as const

export const ApiResponseDescription = {
  USER_CREATED: 'The new user has been successfully created',
  USER_EXISTS: 'User with this email exists',
  USER_LOGGED: 'User has been successfully logged',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_WRONG: 'User password is wrong'
} as const

export const ApiDescription = {
  ID: 'User mongo ID',
  EMAIL: 'Unique email address',
  PASSWORD: 'Password at account',
  USERNAME: 'User nickname',
  ACCESS_TOKEN: 'Access token for access to protected services of application'
} as const

export const ValidationRule = {
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 12
} as const

export const SALT_ROUNDS = 10

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid'
} as const

export const ApiResponseDescription = {
  UserCreated: 'The new user has been successfully created',
  UserExists: 'User with this email exists',
  UserLogged: 'User has been successfully logged',
  UserNotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
  RefreshTokenReceived: 'Get a new access/refresh tokens'
} as const

export const ApiDescription = {
  Id: 'User mongo ID',
  Email: 'Unique email address',
  Password: 'Password at account',
  Username: 'User nickname',
  AccessToken: 'Access token for access to protected services of application',
  RefreshToken: 'Refresh token'
} as const

export const ValidationRule = {
  MinUsernameLength: 3,
  MaxUsernameLength: 50,
  MinPasswordLength: 6,
  MaxPasswordLength: 12
} as const

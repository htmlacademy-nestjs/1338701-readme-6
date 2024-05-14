export const validationRule = {
  tagName: {
    minLength: 3,
    maxLength: 10,
    format: /^[a-zA-Z]+$/,
    message: 'Name must be between 3 and 10 characters long and contain only letters'
  }
} as const

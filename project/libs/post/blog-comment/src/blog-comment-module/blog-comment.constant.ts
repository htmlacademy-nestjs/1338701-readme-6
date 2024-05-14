export const MAX_COMMENTS_COUNT = 50

export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
  ContentLengthError: 'Comment content length should be between 10 and 300 characters'
} as const

export const MIN_CONTENT_LENGTH = 10
export const MAX_CONTENT_LENGTH = 300

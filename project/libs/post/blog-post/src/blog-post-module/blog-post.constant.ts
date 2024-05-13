import { SortDirection } from '@project/shared/core'
import { SortField } from 'libs/shared/core/src/enums/sort-field.enum'

export const POST_NOT_FOUND = 'Post not found'

export const REPOSITORIES_METADATA_KEY = 'repositories'
export const FACTORIES_METADATA_KEY = 'factories'

export const DEFAULT_POST_COUNT_LIMIT = 25
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc
export const DEFAULT_PAGE_COUNT = 1
export const DEFAULT_SORT_BY_FIELD = SortField.PublishedAt
export const DEFAULT_SEARCH_LIMIT = 20

export const ApiPropertyDescription = {
  Title: 'Post title',
  Type: 'Post type. Available: VIDEO, TEXT, QUOTE, LINK, PHOTO',
  Tag: 'Post tag',
  AuthorId: 'Post author ID',
  PostLink: 'Content of post of type link',
  PostVideo: 'Content of post of type video',
  PostText: 'Content of post of type text',
  PostQuote: 'Content of post of type quote',
  PostPhoto: 'Content of post of type photo'
}

export const validationRule = {
  title: {
    minLength: 20,
    maxLength: 50
  },
  postText: {
    announcement: {
      minLength: 50,
      maxLength: 255
    },
    content: {
      minLength: 100,
      maxLength: 1024
    }
  },
  postQuote: {
    quoteContent: {
      minLength: 20,
      maxLength: 300
    },
    quoteAuthor: {
      minLength: 3,
      maxLength: 50
    }
  },
  postVideo: {
    urlYoutube: {
      formatLink: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      message: 'Invalid YouTube URL format'
    }
  },
  postLink: {
    description: {
      maxLength: 300
    }
  }
} as const

import { SortDirection } from '@project/shared/core'

export const POST_NOT_FOUND = 'Post not found'

export const REPOSITORIES_METADATA_KEY = 'repositories'
export const FACTORIES_METADATA_KEY = 'factories'

export const DEFAULT_POST_COUNT_LIMIT = 25
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc
export const DEFAULT_PAGE_COUNT = 1

export const ApiPropertyDescription = {
  Title: 'Post title',
  Type: 'Post type. Available: VIDEO, TEXT, QUOTE, LINK, PHOTO',
  Tag: 'Post tag',
  PostLink: 'Content of post of type link',
  PostVideo: 'Content of post of type video',
  PostText: 'Content of post of type text',
  PostQuote: 'Content of post of type quote',
  PostPhoto: 'Content of post of type photo'
}

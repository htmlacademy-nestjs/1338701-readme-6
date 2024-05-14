export const MAX_TAG_LIMIT = 10
export const validationRule = {
  tagName: {
    minLength: 3,
    maxLength: 10,
    format: /^[a-zA-Z]+$/,
    message: 'Name must be between 3 and 10 characters long and contain only letters'
  }
} as const

export const TagResponseDescription = {
  TagFound: 'Tag found',
  TagNotFound: 'Tag not found',
  AllTagsRetrieved: 'All tags retrieved successfully',
  TagCreated: 'Tag created successfully',
  TagDeleted: 'Tag deleted successfully',
  TagUpdated: 'Tag updated successfully'
} as const

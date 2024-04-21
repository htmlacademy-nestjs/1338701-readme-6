export interface PaginationResult<T> {
  content: T[]
  totalPages: number
  totalItems: number
  currentPage: number
  itemsPerPage: number
}

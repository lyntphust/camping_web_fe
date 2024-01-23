export type SearchResult<T> = {
  total_count: number
  items: T[]
  page_info: {
    current_page: number
    page_size: number
  }
}

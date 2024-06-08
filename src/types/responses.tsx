export interface BaseResponse<T> {
  data?: T
  meta?: MetaResponse
}

export interface MetaResponse {
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
}

import { type GetCasesResponse, type GetCasesParams } from '@/types/cases'
import { BASE_URL } from './api'
import { type Return } from '@/types/returns'
import { api } from '@/utils/api'
import { type BaseResponse } from '@/types/responses'

export async function getCase (id: string): Promise<Return<BaseResponse<GetCasesResponse>>> {
  try {
    const response = await api<BaseResponse<GetCasesResponse>>(BASE_URL + `/v1/beneficiary-ownership/detail/${id}`)
    return { success: response }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    } else if (typeof error === 'string') {
      return { error }
    }
    return { error: 'Unexpected error' }
  }
}

export async function getCases (params: GetCasesParams): Promise<Return<BaseResponse<GetCasesResponse[]>>> {
  try {
    const queries = new URLSearchParams()
    if (params.page !== undefined && params.page != null && params.page !== 0) {
      queries.append('page', params.page.toString())
    }
    if (params.query !== undefined && params.query != null) {
      queries.append('query', params.query)
    }
    if (params.nations !== undefined && params.nations != null) {
      queries.append('nation', params.nations.join(','))
    }
    if (params.subjects !== undefined && params.subjects != null) {
      queries.append('subject_type', params.subjects.join(','))
    }
    if (params.types !== undefined && params.types != null) {
      queries.append('type', params.types.join(','))
    }
    if (params.year !== undefined && params.year != null && params.year !== '-') {
      queries.append('year', params.year)
    }
    console.log(queries.toString())
    const response = await api<BaseResponse<GetCasesResponse[]>>(BASE_URL + '/v1/beneficiary-ownership/search?' + queries.toString())
    return { success: response }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    } else if (typeof error === 'string') {
      return { error }
    }
    return { error: 'Unexpected error' }
  }
}

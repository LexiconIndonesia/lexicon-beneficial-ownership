import CryptoJS from 'crypto-js'
import { type HttpMethods } from './types'

export async function api<T> (url: string, method: HttpMethods = 'GET'): Promise<T> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? ''
    const salt = process.env.NEXT_PUBLIC_SALT ?? ''
    const accessTime = new Date().getTime() / 1000
    const signature = CryptoJS.SHA256(salt + accessTime + apiKey).toString()
    const user = 'developer'

    const headers = {
      'X-ACCESS-TIME': `${accessTime}`,
      'X-API-KEY': apiKey,
      'X-REQUEST-SIGNATURE': signature,
      'X-API-USER': user,
      'X-REQUEST-IDENTITY': 'localhost'
    }

    const response = await fetch(url, { method, headers })
    const responseJson = await response.json()
    if (!response.ok || response.status === 404 || responseJson.error != null) {
      console.log('go hrer')
      throw new Error(response.statusText)
    }
    return responseJson as T
  } catch (e) {
    console.log(e)
    throw handleError(e)
  }
}

export function handleError (error: any): Error {
  if (typeof error === 'string') {
    return Error(error)
  } else if (error instanceof Error) {
    return error
  }

  return Error('Unexpected error')
}

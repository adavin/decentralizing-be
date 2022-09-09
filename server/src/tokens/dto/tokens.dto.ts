/* eslint-disable prettier/prettier */
import { UserToken } from '../tokens.entity'

export class GetUserTokensDto {
  user_id: number
  api_token: string
}

export class GetUserTokensResponseDto {
  errorCode: number
  response: string
  result: boolean
  data: undefined | UserToken[]
  constructor() {
    this.result = false
    this.response = ''
    this.errorCode = 0
  }
}

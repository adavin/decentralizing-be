/* eslint-disable prettier/prettier */
import { UserToken } from '../tokens.entity'

export class NewUserTokenDto {
  user_id: number;
  api_token: string;
  token_address: string;
  token_name: string;
  token_symbol: string;
  initial_supply: string;
  txid: string;
}

export class NewUserTokenResponseDto {
  result: boolean;
  response: string;
  txid: string;
  errorCode: number;
  constructor() {
    this.txid = ''
    this.errorCode = 0
    this.response = ''
    this.result = false
  }
}

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

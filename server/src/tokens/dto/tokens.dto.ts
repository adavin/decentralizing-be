/* eslint-disable prettier/prettier */
export class CreateUserDto {
    firstName: string;
    lastName: string;
  }
  
  export class LoginRequestDto {
    address: string;
    timestamp: string;
  }

  export class LoginRequestSignature {
    address: string;
    message: string;
    signature: string;
  }

  
  export class FaucetRequestDto {
    user_id: number;
    api_token: string;
  }

  export class FaucetRequestResponseDto {
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

//submit to database
//id
//user_id
//address (contract)
//tokName
//tokSymbol
//tokSupply
//tx.hash
//date created

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


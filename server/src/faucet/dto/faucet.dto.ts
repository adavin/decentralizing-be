/* eslint-disable prettier/prettier */
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



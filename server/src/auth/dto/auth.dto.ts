/* eslint-disable prettier/prettier */
  export class LoginRequestDto {
    address: string;
    timestamp: string;
  }

  export class LoginRequestSignature {
    address: string;
    message: string;
    signature: string;
  }
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
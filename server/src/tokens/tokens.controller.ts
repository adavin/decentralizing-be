/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  NewUserTokenDto, NewUserTokenResponseDto
} from './dto/tokens.dto';
import { TokenService } from './tokens.service';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('newUserToken')
  addUserToken(
    @Body()
    newUserTokenDto: NewUserTokenDto,): Promise<NewUserTokenResponseDto> { return this.tokenService.newUserToken(newUserTokenDto) }
  @Post('getUserTokens')
  getUserTokens(
      @Body()
      req:any): Promise<any> { return this.tokenService.getUserTokens(req) }
}

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import {
  FaucetRequestDto, FaucetRequestResponseDto,
  NewUserTokenDto, NewUserTokenResponseDto
} from './dto/tokens.dto';
import { UserToken } from './tokens.entity';
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

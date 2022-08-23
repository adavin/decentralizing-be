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
} from './dto/faucet.dto';
import { FaucetRequest } from './faucet.entity';
import { FaucetService } from './faucet.service';

@Controller('faucet')
export class FaucetController {
  constructor(private readonly faucetService: FaucetService) {}

  @Post('requestFunds')
  faucetRequestFunds(
    @Body() faucetRequestDto: FaucetRequestDto,
  ): Promise<FaucetRequestResponseDto> {
    return this.faucetService.faucetRequest(faucetRequestDto);
  }

  /*
  @Post('loginRequestSigned')
  loginRequestSigned(
    @Body() loginRequestSignature: LoginRequestSignature,
  ): Promise<FaucetRequest> {
    return this.authService.loginRequestSigned(loginRequestSignature);
  }
  */
  /*
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
      return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.usersService.remove(id);
    }
  */
}

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
  CreateUserDto,
  LoginRequestDto,
  LoginRequestSignature,
} from './dto/auth.dto';
import { LoginRequest, User } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginRequest')
  loginRequest(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginRequest> {
    return this.authService.loginRequest(loginRequestDto);
  }

  @Post('loginRequestSigned')
  loginRequestSigned(
    @Body() loginRequestSignature: LoginRequestSignature,
  ): Promise<User> {
    return this.authService.loginRequestSigned(loginRequestSignature);
  }
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

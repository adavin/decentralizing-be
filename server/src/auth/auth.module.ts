import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginRequest, User } from './auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginRequest, User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

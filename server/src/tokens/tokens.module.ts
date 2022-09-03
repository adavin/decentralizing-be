/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserToken } from './tokens.entity'
import { TokenController } from './tokens.controller'
import { TokenService } from './tokens.service'
//import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/auth/auth.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserToken,User,]), ],
  providers: [TokenService],
  controllers: [TokenController],
})

export class TokensModule {}

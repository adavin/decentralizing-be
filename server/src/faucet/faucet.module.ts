/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FaucetRequest } from './faucet.entity'
import { FaucetController } from './faucet.controller'
import { FaucetService } from './faucet.service'
//import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/auth/auth.entity'
@Module({
  imports: [TypeOrmModule.forFeature([FaucetRequest,User,]), ],
  providers: [FaucetService],
  controllers: [FaucetController],
})
export class FaucetModule {}

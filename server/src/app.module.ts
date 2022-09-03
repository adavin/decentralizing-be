/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FaucetModule } from './faucet/faucet.module'
import { TokensModule } from './tokens/tokens.module'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    //UsersModule,
    AuthModule,
    FaucetModule,
    TokensModule,
  ],
})
export class AppModule {}

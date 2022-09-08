/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { FaucetRequestDto, FaucetRequestResponseDto, NewUserTokenDto, NewUserTokenResponseDto} from './dto/tokens.dto';
import { UserToken } from './tokens.entity';
import { User } from 'src/auth/auth.entity';
import { ethers } from 'ethers';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserToken)    
    private readonly userTokenRepository: Repository<UserToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  

  /**
   * 
   * @param newUserTokenDto 
   */
  async newUserToken (newUserTokenDto: NewUserTokenDto): Promise<NewUserTokenResponseDto> {
    const response = new NewUserTokenResponseDto()
    //Check if the user_id and api_token matches
    if (newUserTokenDto.api_token === '' || newUserTokenDto.user_id <= 0 || newUserTokenDto.api_token === undefined || newUserTokenDto.user_id === undefined) {
      response.errorCode = 1
      response.response = 'Empty API token or invalid user id.'
      return response
    }

    const foundUser: User = await this.userRepository.findOneBy({api_token: newUserTokenDto.api_token, id: newUserTokenDto.user_id})

    //Invalid User and/or api token
    if (foundUser === null) { 
      response.errorCode = 1
      response.response = 'Invalid API token or user id. Try to sign in again.'
      return response
    }

    const foundToken: UserToken = await this.userTokenRepository.findOneBy({id: newUserTokenDto.user_id, tokenAddress: newUserTokenDto.token_address})
    if (foundToken !== null) {
      response.errorCode = 1
      response.response = 'This token already exists in our database.'
      return response
    }

    const userToken: UserToken = new UserToken()
    
    userToken.tokenAddress = newUserTokenDto.token_address
    userToken.tokenName = newUserTokenDto.token_name
    userToken.tokenSymbol = newUserTokenDto.token_symbol
    userToken.initialSupply = newUserTokenDto.initial_supply
    userToken.txid = newUserTokenDto.txid
    userToken.user_id = newUserTokenDto.user_id
    userToken.date_requested = new Date()
    this.userTokenRepository.save(userToken)

    response.result = true
    response.response = 'Success! New token created.'
    return response
  }

  async getUserTokens(req: any): Promise<any> {
    //check valid -> api and user 
    if (req.api_token === '' || req.user_id <= 0) return {errorCode: 1, response: 'Empty API token or invalid user id.', result: false}

    //Check valid user/api token
    const foundUser: User = await this.userRepository.findOneBy({id: req.user_id, api_token: req.api_token})

    //Invalid User and/or api token
    if (foundUser === null) 
      return {errorCode: 1, response: 'User or API token not found.', result: false}
  
    const userTokens = await this.userTokenRepository.findBy({user_id: req.user_id})
    return {errorCode: 0, response: 'Success', result: true, data: userTokens} 
  }
  
}

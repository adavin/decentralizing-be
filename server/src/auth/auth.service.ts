/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginRequestDto, LoginRequestSignature } from './dto/auth.dto';
import { LoginRequest, User } from './auth.entity';
import { verifyMessage } from 'ethers/lib/utils';
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    //@InjectRepository(Auth)
    //private readonly authRepository: Repository<Auth>,
    @InjectRepository(LoginRequest)
    private readonly loginRequestRepository: Repository<LoginRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 
   * @param loginRequestDto LoginRequestDto
   * @returns 
   */
  async loginRequest (loginRequestDto: LoginRequestDto): Promise<LoginRequest> {
    //TODO validate address input
    
    const found: LoginRequest = await this.loginRequestRepository.findOneBy({address: loginRequestDto.address})
      if (found !== null) {
        found.timestamp = loginRequestDto.timestamp
        return this.loginRequestRepository.save(found)
      }
      const loginRequest: LoginRequest = new LoginRequest()
      loginRequest.address = loginRequestDto.address
      loginRequest.timestamp = loginRequestDto.timestamp
      loginRequest.challenge = Math.random().toString(36).substring(2, 15)
      return this.loginRequestRepository.save(loginRequest)
  }

  /**
   * 
   * Required signed message format:
   * `Challenge ${challenge}`
   * 
   * @param loginRequestSignature 
   * @returns 
   */
  async loginRequestSigned(loginRequestSignature: LoginRequestSignature): Promise<any> {
    //make sure there's a login request for the address provided
    const found: LoginRequest = await this.loginRequestRepository.findOneBy({address: loginRequestSignature.address})
    if (found === null) return {result: false, reason: `There is no pending login request for address ${loginRequestSignature.address}`}

    // make sure challenge is located in the message
    let challenge_matched = false; 
    const lines: string[] = loginRequestSignature.message.split("\n")
    for (let i=0; i<lines.length; i++) {
      const kv: string[] = lines[i].split(' ', 2)
      //console.log(kv[0].toLowerCase(), kv[1], found.challenge)
      if (kv.length === 2 && kv[0].toLowerCase() === 'challenge' && kv[1] === found.challenge) {
          challenge_matched = true
          break
      }
    }
    if (!challenge_matched) return {result: false, reason: "The challenge parameter was not located in the signed message"}

    //challenge is in message and login request found, check the signature
    const checkAddress: string = verifyMessage(loginRequestSignature.message, loginRequestSignature.signature);
    if (checkAddress !== loginRequestSignature.address) return {result: false, reason: "Signature could not be verified"}

    //user has successfully signed vs our challenge //log  in, or create a new `user` entry
    await this.loginRequestRepository.delete({id: found.id}) //delete this login request db entry
    const found2: User = await this.userRepository.findOneBy({crypto_address: loginRequestSignature.address})
    if (found2 === null) {
      const user = new User();
      user.crypto_address = loginRequestSignature.address
      user.user_id = ""
      user.first_name = "Anonymous"
      user.last_name = ""
      user.api_token = await hash(loginRequestSignature.signature, 10)
      return { result: true, data: (await this.userRepository.save(user))}
    }
    found2.api_token = await hash(loginRequestSignature.signature, 10)
    return {result: true, data: (await this.userRepository.save(found2))}
  }

}

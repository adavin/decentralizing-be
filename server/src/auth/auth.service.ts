import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginRequestDto, LoginRequestSignature } from './dto/auth.dto';
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
    const found: LoginRequest = await this.loginRequestRepository.findOneBy({address: loginRequestDto.address})
      if (found === null) {
        const loginRequest: LoginRequest = new LoginRequest()
        loginRequest.address = loginRequestDto.address
        loginRequest.timestamp = loginRequestDto.timestamp
        loginRequest.challenge = Math.random().toString(36).substring(2, 15)
        return this.loginRequestRepository.save(loginRequest)
      }
      found.timestamp = loginRequestDto.timestamp
      return this.loginRequestRepository.save(found)
  }

  /**
   * 
   * Signed message format:
   * `Challenge ${challenge}`
   * 
   * @param data 
   * @returns 
   */
  async loginRequestSigned(loginRequestSignature: LoginRequestSignature): Promise<any> {
    const found: LoginRequest = await this.loginRequestRepository.findOneBy({address: loginRequestSignature.address})
    if (found === null) return {result: false, reason: `There is no pending login request for address ${loginRequestSignature.address}`}
    let challenge_matched = false; // make sure challenge is located in the message
    const lines: String[] = loginRequestSignature.message.split("\n")
    for (let i=0; i<lines.length; i++) {
      const kv: String[] = lines[i].split(' ', 2)
      //console.log(kv[0].toLowerCase(), kv[1], found.challenge)
      if (kv.length === 2 && kv[0].toLowerCase() === 'challenge' && kv[1] === found.challenge) {
          challenge_matched = true
          break
      }
    }
    if (!challenge_matched) return {result: false, reason: "The challenge parameter was not located in the signed message"}
    const checkAddress: String = verifyMessage(loginRequestSignature.message, loginRequestSignature.signature);
    if (checkAddress !== loginRequestSignature.address) return {result: false, reason: "Signature could not be verified"}
    //user has successfully signed vs our challenge //log  in, or create a new `user` entry
    await this.loginRequestRepository.delete({id: found.id}) //delete this login request db entry
    const found2: User = await this.userRepository.findOneBy({crypto_address: loginRequestSignature.address})
    if (found2 === null) {
      const user = new User();
      user.crypto_address = loginRequestSignature.address
      user.user_id = ""
      user.first_name = "Anon"
      user.last_name = ""
      user.api_token = await hash(loginRequestSignature.signature, 10)
      return { result: true, data: (await this.userRepository.save(user))}
    }
    found2.api_token = await hash(loginRequestSignature.signature, 10)
    return {result: true, data: (await this.userRepository.save(found2))}
  }


  /*
  create(createUserDto: CreateUserDto): Promise<Auth> {
    const user = new Auth()
    user.first_name = createUserDto.firstName
    user.last_name = createUserDto.lastName

    return this.authRepository.save(user)
  }

  async findAll(): Promise<Auth[]> {
    return this.authRepository.find()
  }

  findOne(id: number): Promise<Auth> {
    return this.authRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.authRepository.delete(id);
  }
  */
}
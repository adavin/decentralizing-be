/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { FaucetRequestDto, FaucetRequestResponseDto} from './dto/faucet.dto';
import { FaucetRequest } from './faucet.entity';
import { User } from 'src/auth/auth.entity';
import { ethers } from 'ethers';

@Injectable()
export class FaucetService {
  constructor(
    @InjectRepository(FaucetRequest)    
    private readonly faucetRequestRepository: Repository<FaucetRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  /**
   * 
   * @param faucetRequestDto 
   * @returns 
   */
  async faucetRequest (faucetRequestDto: FaucetRequestDto): Promise<FaucetRequestResponseDto> {
    //Our response to send back to user
    const response = new FaucetRequestResponseDto() 

    //Check if the user_id and api_token matches
    if (faucetRequestDto.api_token === '' || faucetRequestDto.user_id <= 0 || faucetRequestDto.api_token === undefined || faucetRequestDto.user_id === undefined) {
      response.errorCode = 1
      response.response = 'Empty API token or invalid user id.'
      return response
    }

    const foundUser: User = await this.userRepository.findOneBy({api_token: faucetRequestDto.api_token, id: faucetRequestDto.user_id})

    //Invalid User and/or api token
    if (foundUser === null) { 
      response.errorCode = 1
      response.response = 'Invalid API token or user id. Try to sign in again.'
      return response
    }

    //Check if the user has a faucet request already
    const past24hr = new Date();
    past24hr.setDate(past24hr.getDate()-1);
    const foundRequest: FaucetRequest = await this.faucetRequestRepository.findOneBy({user_id: faucetRequestDto.user_id, date_requested: MoreThan(past24hr) })
    if (foundRequest !== null) {
      response.errorCode = 2
      response.response = `Faucet withdrawals are allowed 24 hours per address. Your last faucet transaction: ${foundRequest.txid}`
      return response
    }

    //Check if the faucet has enough funds to cover


    //Using chainId=5 (Goerli)
    const provider:ethers.providers.InfuraProvider = new ethers.providers.InfuraProvider(5, process.env.INFURA_API_KEY)
    const signer: ethers.Wallet = new ethers.Wallet(process.env.FAUCET_PRIVATE_KEY, provider);
    const tx: ethers.providers.TransactionResponse = await signer.sendTransaction({
      to: foundUser.crypto_address,
      value: ethers.utils.parseEther("0.2")
    });

    //Create a new faucet request database entry and save our txid etc
    const faucetRequest: FaucetRequest = new FaucetRequest()
    faucetRequest.date_requested = new Date()
    faucetRequest.txid = tx.hash
    faucetRequest.user_id = faucetRequestDto.user_id
    this.faucetRequestRepository.save(faucetRequest)

    response.result = true
    response.txid = tx.hash
    response.response = 'Success! 0.2 Goerli ETH were sent to your address. Refresh shortly to see your updated balance. Transaction: ' + tx.hash
    return response
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

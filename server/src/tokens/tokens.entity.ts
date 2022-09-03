/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//submit to database
//id
//user_id
//address (contract)
//tokName
//tokSymbol
//tokSupply
//tx.hash
//date created

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tokenAddress: string;

  @Column()
  tokenName: string;
  
  @Column()
  tokenSymbol: string;

  @Column()
  initialSupply: string;

  @Column()
  txid: string;

  //@Column({type: 'date'})
  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  date_requested: Date;

}


/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  isActive: boolean;
}*/

@Entity()
export class FaucetRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  txid: string;

  //@Column({type: 'date'})
  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  date_requested: Date;

}


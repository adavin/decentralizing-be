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
export class LoginRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  timestamp: string;

  @Column()
  challenge: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crypto_address: string;

  @Column()
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  api_token: string;


}

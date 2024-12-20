import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

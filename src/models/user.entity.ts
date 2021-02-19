import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
// import { ArticleImage } from './image.entity';

export const enum UserRole {
  DEFAULT,
  ADMIN,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: null })
  hashPassword?: string;

  // @Column({ nullable: true })
  // profilePicture?: ArticleImage;

  @Column({ default: UserRole.DEFAULT })
  role!: UserRole;

  constructor(payload: any) {
    super();
    if (!(payload && payload.email && payload.password && payload.role && payload.username)) return;
    this.email = payload.email;
    this.username = payload.username;
    // this.profilePicture = payload.profilePicturePath;
    this.role = payload.role;
    this.hashPassword = bcrypt.hashSync(payload.password, 10);
  }

  comparePassword =
  (password: string, hashPassword: string): boolean => bcrypt.compareSync(password, hashPassword);

  hidePassword = () => {
    this.hashPassword = undefined;
  };

  // eslint-disable-next-line max-len
  static checkPayload = (payload: any): boolean => (payload.email && payload.password && payload.role && payload.username);
}

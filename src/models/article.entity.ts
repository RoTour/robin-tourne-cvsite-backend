import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
// import { ArticleImage } from './image.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 5000 })
  text!: string;

  // @OneToMany(() => ArticleImage, (articleImage) => articleImage.article)
  // images!: ArticleImage[];
}

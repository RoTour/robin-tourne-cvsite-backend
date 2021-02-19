import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
// import { Article } from './article.entity';

@Entity()
export class ArticleImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  // @ManyToOne(() => Article, (article) => article.images)
  // article!: Article;

  constructor(filename: string) {
    this.filename = filename;
  }
}

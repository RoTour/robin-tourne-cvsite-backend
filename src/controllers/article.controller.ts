import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Article } from '../models/article.entity';
// import { ArticleImage } from '../models/image.entity';

function assignValues(article: Article, values: any): Article {
  const newArticle = article;
  newArticle.text = values.text;
  return newArticle;
}

export async function index(req: Request, res: Response) {
  // res.json(await getRepository(Article).find({ relations: ['image'] }));
  res.json(await getRepository(Article).find());
}

export async function show(req: Request, res: Response, id: string) {
  // res.json(await getRepository(Article).findOne(+id, { relations: ['image'] }));
  res.json(await getRepository(Article).findOne(+id));
}

export async function create(req: Request, res: Response) {
  const newArticle = assignValues(new Article(), req.body);
  await getRepository(Article).save(newArticle);
  res.json(newArticle);
}

export async function edit(req: Request, res: Response, id: string) {
  const repo = getRepository(Article);
  const articleToUpdate = await repo.findOne(+id);
  if (articleToUpdate === undefined) throw Error(`User with id "${id}" not found.`);
  res.json(await repo.save(assignValues(articleToUpdate, req.body)));
}

export async function remove(req: Request, res: Response, id: string) {
  res.json(await getRepository(Article).delete(+id));
}

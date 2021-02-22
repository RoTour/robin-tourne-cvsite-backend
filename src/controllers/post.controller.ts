import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Post } from '../models/post.entity';
import { User } from '../models/user.entity';

// import { PostImage } from '../models/image.entity';

async function assignValues(post: Post, values: any): Promise<Post> {
  const newPost = post;
  const owner = await getRepository(User).findOne({ email: values.userEmail });
  if (!owner) throw new Error(`User "${values.userEmail} not found"`);
  newPost.text = values.text;
  newPost.user = owner;
  return newPost;
}

export async function index(req: Request, res: Response) {
  const posts = await getRepository(Post).find({ relations: ['user'] });

  // Remapping the result to avoid sending hash passwords to clients
  res.json(posts.map((post) => ({
    id: post.id,
    text: post.text,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    ownerName: post.user.username,
  })));
}

export async function show(req: Request, res: Response, id: string) {
  res.json(await getRepository(Post).findOne(+id));
}

export async function create(req: any, res: Response) {
  // req.user should be defined thx to login controller used as middleware
  const newPost = await assignValues(new Post(), { ...req.body, email: req.user.email });
  await getRepository(Post).save(newPost);
  res.json(newPost);
}

export async function edit(req: Request, res: Response, id: string) {
  const repo = getRepository(Post);
  const postToUpdate = await repo.findOne(+id);
  if (postToUpdate === undefined) throw Error(`Post with id "${id}" not found.`);
  res.json(await repo.save(await assignValues(postToUpdate, req.body)));
}

export async function remove(req: Request, res: Response, id: string) {
  res.json(await getRepository(Post).delete(+id));
}

import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { LOGGER } from '../util/logger';
import { User } from '../models/user.entity';

/**
 * Requirements:
 * {
 *   email
 *   password
 *   role
 *   username
 * }
 * Optional:
 * {
 *   profilePicturePath
 * }
 */
export const register = (req: Request, res: Response) => {
  const payload = req.body;
  if (!(payload.email && payload.password && payload.username)) {
    LOGGER.error('Missing requirements in body');
    throw new Error('Missing requirements in body');
  }
  const userRepo = getRepository(User);
  const newUser = new User(payload);
  userRepo
    .save(newUser)
    .then((user: User) => {
      user.hidePassword();
      return res.json(user);
    })
    .catch((error) => res.status(400).send({ name: error.name, message: error.message }));
};

/**
 * Requirements:
 * {
 *   email
 *   password
 * }
 */
export const login = async (req: Request, res: Response) => {
  if (!req.body.email) {
    res.status(417).send({ message: 'expected field "email" not found' });
  }
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).json({ message: 'auth failed: no user found' });
  } else if (user.hashPassword && !user.comparePassword(req.body.password, user.hashPassword)) {
    res.status(401).json({ message: 'auth failed: Wrong password' });
  } else {
    res.json({
      token: jwt.sign(
        {
          email: user.email,
          username: user.username,
          role: user.role,
          _id: user.id,
        },
        'RESTFULAPIs',
      ),
      username: user.username,
      role: user.role,
    });
  }
};

export const loginRequired = (req: any, res: Response, next: NextFunction): void => {
  if (req.user) {
    next();
  } else {
    LOGGER.log('Error 401: Unauthorized');
    res.status(401).json({ message: 'Unauthorized user' });
  }
};

export function userInfo(req: any, res: Response) {
  if (req.user) {
    res.json({ ...req.user });
  } else {
    LOGGER.log('Error 401: Unauthorized');
    res.status(401).json({ message: 'Unauthorized user' });
  }
}

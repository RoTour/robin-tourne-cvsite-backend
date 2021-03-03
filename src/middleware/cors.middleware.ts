import { NextFunction, Request, Response } from 'express';

export const accessControlAllowOrigin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

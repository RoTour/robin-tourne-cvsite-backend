import { Router } from 'express';
import * as loginController from '../controllers/login.controller';

export const router = Router();

// router.get('/', (req: Request, res: Response) => res.send("TS+Nodejs"));

router.post(
  '/auth/register',
  loginController.register,
);
router.post(
  '/auth/login',
  loginController.login,
);
router.get(
  '/auth/user-info',
  loginController.userInfo,
);

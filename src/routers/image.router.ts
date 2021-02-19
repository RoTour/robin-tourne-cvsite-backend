import { Router, Request, Response } from 'express';
import * as controller from '../controllers/image.controller';

export const router = Router();

/**
 * Uses form-data
 * Input should be named "myImage"
 */
router.post(
  '/',
  controller.upload,
);

router.get(
  '/:id',
  (req: Request, res: Response) => controller.get(req, res, req.params.id),
);

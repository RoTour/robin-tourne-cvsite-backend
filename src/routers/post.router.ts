import { Router, Request, Response } from 'express';
import * as controller from '../controllers/post.controller';
import { loginRequired } from '../controllers/login.controller';
import { accessControlAllowOrigin } from '../middleware/cors.middleware';

export const router = Router();

// Index
router.get(
  '/',
  controller.index,
);

// Show
router.get(
  '/:id',
  (req: Request, res: Response) => controller.show(req, res, req.params.id),
);

/**
 * Requirements:
 * {
 *   userEmail
 *   text
 * }
 */
// Create
router.post(
  '/',
  loginRequired,
  accessControlAllowOrigin,
  controller.create,
);

/**
 * Requirements:
 * {
 *   userEmail
 *   text
 * }
 */
// Edit
router.patch(
  '/:id',
  loginRequired,
  ((req: Request, res: Response) => controller.edit(req, res, req.params.id)),
);

// Delete
router.delete(
  '/:id',
  loginRequired,
  ((req: Request, res: Response) => controller.remove(req, res, req.params.id)),
);

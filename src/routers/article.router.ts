import { Router, Request, Response } from 'express';
import * as controller from '../controllers/article.controller';

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
 *   text
 * }
 */
// Create
router.post(
  '/',
  controller.create,
);

/**
 * Requirements:
 * {
 *   text
 * }
 */
// Edit
router.patch(
  '/:id',
  ((req: Request, res: Response) => controller.edit(req, res, req.params.id)),
);

// Delete
router.delete(
  '/:id',
  ((req: Request, res: Response) => controller.remove(req, res, req.params.id)),
);

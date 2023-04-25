import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Wrong Email address').isEmail(),
  body('password', 'Minimum length - 6 charakters').isLength({ min: 6 }),
];

export const registerValidation = [
  body('email', 'Wrong Email address').isEmail(),
  body('password', 'Minimum length - 6 charakters').isLength({ min: 6 }),
  body('fullName', 'Minimum 2 charekters').isLength({ min: 2 }),
  body('avatarUrl', 'Wrong avarat URL').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter the title of the article').isLength({ min: 3 }).isString(),
  body('text', 'Enter the text of the article').isLength({ min: 3 }).isString(),
  body('tags', 'Tag format is incorrect (specify an array)').optional().isString(),
  body('imageUrl', 'Wrong image URL').optional().isString(),
];

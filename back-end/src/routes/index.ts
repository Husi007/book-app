import * as express from 'express';
import { usersRouter } from '../routes/users';
import { bookRouter } from './book';

const router = express.Router();

router.use('/api/users', usersRouter);
router.use('/api/books', bookRouter);

export { router };

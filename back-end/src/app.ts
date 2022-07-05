import { json } from 'body-parser';
import cors  from 'cors';
import express from 'express';
import { ErrorConstants } from './centeralizedErrorHandler/constants';
import { NoResourceFoundError404 } from './centeralizedErrorHandler/notFound404';
import { errorHandler } from './middlewares/error';
import { router } from './routes';

const app = express();

app.use(cors());
app.set('trust proxy', true);
// @ts-ignore
app.use(json());
app.use(router);
app.all('*', () => {
  throw new NoResourceFoundError404(ErrorConstants.PATH_NOT_FOUND);
});
app.use(errorHandler);

export { app };

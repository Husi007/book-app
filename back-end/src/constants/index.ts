import * as dotenv from 'dotenv';
dotenv.config();

export const SuccessMessages = {
  DATA_BASE_CONNECTION: 'Sucessfully connected to PostGreSql Database!',
  SERVER_LISTENING: `Listening on Port ${process.env.PORT}!`,
};

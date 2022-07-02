import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { CrossOrginCommunication505 } from '../centeralizedErrorHandler/crossOrginCommunication505';
import { SuccessMessages } from '../constants';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    logging: false,
    minifyAliases: true,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    },
  }
);

sequelize
  .sync()
  .then(() => {
    console.log(SuccessMessages.DATA_BASE_CONNECTION);
  })
  .catch((error) => {
    console.log(error);

    throw new CrossOrginCommunication505(ErrorConstants.POSTGRES_DB_CONNECTION);
  });

export { sequelize };

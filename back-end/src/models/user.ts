import { DataTypes, Model } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from '../interfaces';
import { Password } from '../services/password';
import { sequelize } from './sequelize';

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    email: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    password: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
    username: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await Password.toHash(user.password);
});

export { User };

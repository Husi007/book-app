import { DataTypes, Model } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from '../interfaces';
import { Password } from '../services/password';
import { sequelize } from './sequelize';

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      allowNull: false,
      type: new DataTypes.STRING(255),
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

import { DataTypes, Model } from 'sequelize';
import { IBookAttributes, IBookCreationAttributes } from '../interfaces';
import { sequelize } from './sequelize';

class Book
  extends Model<IBookAttributes, IBookCreationAttributes>
  implements IBookAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public year!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    description: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    title: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    year: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    tableName: 'books',
    timestamps: true,
  }
);

export { Book };

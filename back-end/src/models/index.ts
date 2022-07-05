import { Book } from './book';
import { User } from './user';

User.hasMany(Book, {
  as: 'Books',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Book.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export { Book, User };

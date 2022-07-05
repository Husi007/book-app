import jwt from 'jsonwebtoken';
import { BadRequestError400 } from '../centeralizedErrorHandler/badRequest400';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { UnAuthorizedError401 } from '../centeralizedErrorHandler/unAuthorize401';
import { IUserCreationAttributes } from '../interfaces';
import { User } from '../models';
import { Password } from './password';

class UserService {
  public async signUp(reqBody: IUserCreationAttributes) {
    const { username, password, name } = reqBody;
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestError400(ErrorConstants.USER_ALREADY_EXSISTS);
    }

    const user = await User.create({
      name,
      password,
      username,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_KEY!,
      { expiresIn: 60 * 60 }
    );

    return { token, username };
  }

  public async signIn(reqBody: IUserCreationAttributes) {
    const { username, password } = reqBody;

    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (!existingUser) {
      throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      process.env.JWT_KEY!,
      { expiresIn: 60 * 60 }
    );

    return { token, username };
  }
}

export default new UserService();

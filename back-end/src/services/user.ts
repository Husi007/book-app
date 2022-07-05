import jwt from 'jsonwebtoken';
import { BadRequestError400 } from '../centeralizedErrorHandler/badRequest400';
import { ErrorConstants } from '../centeralizedErrorHandler/constants';
import { UnAuthorizedError401 } from '../centeralizedErrorHandler/unAuthorize401';
import { IUserCreationAttributes } from '../interfaces';
import { User } from '../models';
import { Password } from './password';

class UserService {
  public async signUp(reqBody: IUserCreationAttributes) {
    const { username, password, email } = reqBody;
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestError400(ErrorConstants.USER_ALREADY_EXSISTS);
    }

    const user = await User.create({
      email,
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

    return { token, email };
  }

  public async signIn(reqBody: IUserCreationAttributes) {
    const { password, email } = reqBody;

    const existingUser = await User.findOne({
      where: {
        email,
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
        email: existingUser.email,
        id: existingUser.id,
      },
      process.env.JWT_KEY!,
      { expiresIn: 60 * 60 }
    );

    return { token, email };
  }
}

export default new UserService();

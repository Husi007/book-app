import { Optional } from 'sequelize/types';

export interface IUserPayload {
  username: string;
  id: number;
}

export interface IBookFilter {
  limit?: number;
  page?: number;
  id?: number;
  title?: string;
  year?: string;
  description?: string;
  userId: number;
}

export interface IBookUpdateAttributes {
  title?: string;
  year?: string;
  description?: string;
}

export interface IBookAttributes {
  id: number;
  title: string;
  year: string;
  description: string;
  userId: number;
}

export interface IBookCreationAttributes
  extends Optional<IBookAttributes, 'id'> {}

export interface IUserAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, 'id'> {}

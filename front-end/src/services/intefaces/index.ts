export interface IUserResponse {
  email: string;
  token: string;
}

export interface IBookResponse {
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
  year: string;
}
export interface IUser {
  email: string;
  userAccessToken: string;
}

import { Document } from 'mongoose';
export interface CreateUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly age: number;
  readonly name: string;
}
export interface SignupRsp {
  readonly email: string;
  readonly name: string;
  readonly age: number;
}
export interface LoginRsp {
  readonly token: string;
}
export interface User {
  readonly email: string;
  readonly age: number;
  readonly name: string;
}

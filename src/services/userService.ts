import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SignUpUserData, SignInUserData} from "../types/userTypes";

import * as userRepository from '../repositories/userRepository';
import {
  conflictError,
  notFoundError,
  unauthorizedError
} from '../utils/errorUtils';

async function createUser(user: SignUpUserData) {
  delete user.confirmPassword;

  const existingUser = await userRepository.findUserByEmail(user.email);

  if (existingUser) {
    throw conflictError('There is a conflict');
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  await userRepository.insertUser({ ...user, password: hashedPassword });
}

async function login(login: SignInUserData) {
  const user = await getUserOrFail(login);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function getUserOrFail(login: SignInUserData) {
  const user = await userRepository.findUserByEmail(login.email);
  if (!user) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');

  return user;
}

async function findUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError('User not found');

  return user;
}

const authService = {
  createUser,
  login,
  findUserById
};

export default authService;

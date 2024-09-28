import { userRepository } from "../repos/userRepository";
import { User } from "../entity/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../Utilis/jwt";

import * as bcrypt from "bcrypt";

import { Request, Response } from "express";
import { ApiResponse } from "../Utilis/ApiResponse/apiresponse";
import { apiHandlerWrapper } from "../Utilis/Wrappers/apiWrapper";

export const login = apiHandlerWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  // Generate tokens

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id, user.email);
  const userdetials = user.id;
  return ApiResponse.successResponseWithData(res, "Login Successful", {
    accessToken,
    refreshToken,
    userdetials,
  });
});
// Store refreshToken in the database or in-memory storage (optional)

export const refreshTokenGenerate = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    console.log("refreshToken", refreshToken);
    const payload = verifyRefreshToken(refreshToken);
    console.log("refreshToken1", refreshToken);
    const newAccessToken = generateAccessToken(payload.userId, payload.email);
    console.log("refreshToken2", refreshToken);
    return ApiResponse.successResponseWithData(res, "Token Refreshed", {
      accessToken: newAccessToken,
    });
  }
);

export const signup = apiHandlerWrapper(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, age } = req.body;
  console.log("email", email);

  const existingUser = await userRepository.findOneBy({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User();
  newUser.email = email;
  newUser.password = hashedPassword;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.age = age;
  // Save the user in the database
  await userRepository.save(newUser);

  // Generate access and refresh tokens
  const accessToken = generateAccessToken(newUser.id, newUser.email);
  const refreshToken = generateRefreshToken(newUser.id, newUser.email);
  const userdetials = newUser.id;

  return ApiResponse.successResponseWithData(res, "User created", {
    accessToken,
    refreshToken,
    userdetials,
  });
});

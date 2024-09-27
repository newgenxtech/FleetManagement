import { userRepository} from "../repos/userRepository";
import { User } from "../entity/User"; 
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../Utilis/jwt";

import * as bcrypt from 'bcrypt';
export const login = async (email: string, password: string) => {
    const user = await userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id,user.email);
    const refreshToken = generateRefreshToken(user.id,user.email);
    const userdetials = user.id
    // Store refreshToken in the database or in-memory storage (optional)

    return { accessToken, refreshToken,userdetials };
};

export const refreshToken = async (token: string) => {
    try {
        const payload = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken(payload.userId,payload.email);
        return { accessToken: newAccessToken };
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

export const logout = async (userId: number) => {
    // Optional: Remove the refresh token from the database/in-memory store
};
export const signup = async (email: string, password: string, firstName: string, lastName: string,age:number) => {
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
        throw new Error('Email is already in use');
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
    console.log("entering")
    console.log("newUser.id",newUser.id)
    // Generate access and refresh tokens
    const accessToken = generateAccessToken(newUser.id,newUser.email);
    const refreshToken = generateRefreshToken(newUser.id,newUser.email);
    const userdetials = newUser.id

    return { accessToken, refreshToken,userdetials };
};
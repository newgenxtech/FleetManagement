
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key';

// Generate Access Token
export const generateAccessToken = (userId: number,email: string) => {
    return jwt.sign({ userId, }, JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
export const generateRefreshToken = (userId: number,email: string) => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

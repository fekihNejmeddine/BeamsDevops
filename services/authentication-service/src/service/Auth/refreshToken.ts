import jwt from 'jsonwebtoken';
import { User } from '../../models/User'; // Your Sequelize User model
import { generateToken } from '../../utils/jwtUtils';
import { Request } from 'express';
import dotenv from "dotenv";

dotenv.config();
interface Cookies {
  jwt?: string;
}

interface RefreshTokenResult {
  token: string;
  foundUser: User;
}

export const refreshToken = async (cookies: Cookies): Promise<RefreshTokenResult> => {
  if (!cookies?.jwt) throw new Error('No refresh token provided');

  const refreshToken = cookies.jwt;

  // Find user by refreshToken using Sequelize
  const foundUser = await User.findOne({ 
    where: { refreshToken },
    attributes: { exclude: ['password'] } // Exclude sensitive fields
  });

  if (!foundUser) throw new Error('User not found');

  return new Promise<RefreshTokenResult>((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY as string,
      (err: jwt.VerifyErrors | null) => {
        if (err) {
          return reject(new Error('Forbidden'));
        }
        
        const token = generateToken(foundUser);
        resolve({ token, foundUser });
      }
    );
  });
};
import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    bcryptSaltRounds: 10
};

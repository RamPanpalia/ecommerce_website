import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AppError } from '../utils/error.util.js';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = signupSchema.parse(req.body);
    
    // Here you would typically:
    // 1. Check if user exists
    // 2. Hash password
    // 3. Create user in database
    // 4. Generate JWT
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Mock user creation (replace with database operation)
    const user = {
      id: '1',
      name,
      email,
      password: hashedPassword,
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // Here you would typically:
    // 1. Find user by email
    // 2. Verify password
    // 3. Generate JWT
    
    // Mock user (replace with database query)
    const user = {
      id: '1',
      email,
      password: await bcrypt.hash('password123', 10), // Mock stored password
    };

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
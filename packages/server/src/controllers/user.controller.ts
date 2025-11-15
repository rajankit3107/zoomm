import type { Request, Response } from 'express';
import { User } from '../models/user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const register = async (req: Request, res: Response) => {
   const { name, username, password } = req.body;

   if (!username || !name || !password) {
      return res
         .status(httpStatus.BAD_REQUEST)
         .json({ message: `please provide valid data` });
   }

   try {
      const existingUser = await User.findOne({ username });
      if (existingUser)
         return res
            .status(httpStatus.FOUND)
            .json({ message: `user already exists` });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         name: name,
         username: username,
         password: hashedPassword,
      });

      await user.save();

      res.status(httpStatus.CREATED).json({
         message: `user registered successfully`,
      });
   } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: `something went wrong ${error}`,
      });
   }
};

export const login = async (req: Request, res: Response) => {
   const { username, password } = req.body;

   if (!username || !password)
      return res
         .status(httpStatus.BAD_REQUEST)
         .json({ message: `please provide valid data` });

   try {
      const user = await User.findOne({ username });

      if (!user)
         return res.status(httpStatus.NOT_FOUND).json({
            message: `user not found, please provide a valid username`,
         });

      const isMatched = await bcrypt.compare(password, user.password);

      if (isMatched) {
         let token = crypto.randomBytes(20).toString('hex');

         user.token = token;
         await user.save();
         return res.status(httpStatus.OK).json({ token: token });
      }
   } catch (error) {
      return res
         .status(httpStatus.INTERNAL_SERVER_ERROR)
         .json({ message: `something went wrong` });
   }
};

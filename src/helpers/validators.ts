import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const JwtValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x_token');
    if (!token) {
      return res.status(401).json({
        msg: "ERROR access denied",
      });
    }
  
    try {
      jwt.verify(token, `${process.env.SECRETKEY}`);
      return next();
    } catch (error) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }
  };
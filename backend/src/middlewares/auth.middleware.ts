import jwt, { JwtPayload } from "jsonwebtoken";
import { client } from "../";
import { asyncHandler } from "./asyncHandler";
import { Request, Response, NextFunction } from "express";

export const authMidd = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = (await jwt.verify(
          token,
          process.env.JWT_SECRET as string
        )) as JwtPayload;

        if (!payload) {
          return res.status(400).json({
            error: "Invalid Token!!",
          });
        }

        const user = await client.user.findFirst({
          where: {
            id: payload?.id,
          },
          omit: {
            password: true,
          },
        });

        if (user) {
          req.user = user;
        }
        next();
      } catch (error) {
        return res.status(401).json({
          error: "Not authorized, token failed!!",
        });
      }
    } else {
      return res.status(401).json({
        error: "Not authorized, token failed!!",
      });
    }
  }
);

export const authorizeAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user?.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        error: "Not authorized as an Admin",
      });
    }
  }
);

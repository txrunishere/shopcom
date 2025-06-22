import { Response } from "express";
import jwt from "jsonwebtoken";

export const createToken = async (res: Response, userId: string) => {
  try {
    const token = await jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    return token;
  } catch (error) {
    return res.json({
      error: "Token not generated!!"
    })
  }
};

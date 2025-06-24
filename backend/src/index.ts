import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import {PrismaClient} from '@prisma/client'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
export const client = new PrismaClient();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routers
import userRouter from "./routes/user.routes";
import { coerce } from "zod";

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
});

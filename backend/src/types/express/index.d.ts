import { IUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

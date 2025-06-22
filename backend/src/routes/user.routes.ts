import { Router } from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
  handleGetCurrentUser,
  handleGetAllUsers,
  handleUpdateCurrentUser,
  handleChangePassword,
  handleDeleteUser,
  handleGetUserById,
} from "../controllers/user.controller";
import { authMidd, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);

router.use(authMidd);
router.route("/logout").post(handleLogoutUser);
router
  .route("/")
  .get(handleGetCurrentUser)
  .put(handleUpdateCurrentUser)
  .patch(handleChangePassword);

// Admin user routes
router.use(authorizeAdmin);
router.route("/get-users").get(handleGetAllUsers);
router.route("/:id").delete(handleDeleteUser).get(handleGetUserById);

export default router;

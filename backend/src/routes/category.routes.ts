import { Router } from "express";
import { authMidd, authorizeAdmin } from "../middlewares/auth.middleware";
import {
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleListCategory,
} from "../controllers/category.controller";

const router = Router();

router.route("/").get(handleListCategory);

router.use(authMidd, authorizeAdmin);

router.route("/").post(handleCreateCategory);

router
  .route("/:categoryId")
  .put(handleUpdateCategory)
  .delete(handleDeleteCategory);

export default router;

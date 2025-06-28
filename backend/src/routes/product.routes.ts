import { Router } from "express";
import { authMidd, authorizeAdmin } from "../middlewares/auth.middleware";
import {
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleListProduct,
  handleChangeProductImage,
  handleAddProductReview,
  handleGetProductById,
  handleGetProductReviews,
} from "../controllers/product.controller";
import { upload } from "../utils/multer.util";

const router = Router();

router.use(authMidd);

router.route("/").get(handleListProduct);
router.route("/:productId/review").post(handleAddProductReview);

router.use(authorizeAdmin);

router.route("/").post(upload.single("productImage"), handleCreateProduct);
router
  .route("/:productId")
  .put(handleUpdateProduct)
  .delete(handleDeleteProduct)
  .patch(upload.single("productImage"), handleChangeProductImage)
  .get(handleGetProductById);
router.route("/:productId/reviews").get(handleGetProductReviews);

export default router;

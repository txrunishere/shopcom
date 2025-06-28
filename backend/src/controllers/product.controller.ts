import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { client } from "../";
import {
  addReviewValidationSchema,
  createProductValidationSchema,
} from "../zod/product.zod";
import {
  uploadOnCloudinary,
  removeFromCloudinary,
} from "../utils/cloudinary.util";
import { unlinkSync } from "fs";

/**
 * Admin Route
 * desc -> Create Product
 * route -> POST /product/
 */
const handleCreateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productName, price, brand, description, stock, status, category } =
      req.body;

    let productImage;

    if (req.file?.path) {
      productImage = req.file.path;
    } else {
      return res.status(400).json({
        error: "Product image is required!!",
      });
    }

    const { success, error } = createProductValidationSchema.safeParse({
      productName,
      price: parseInt(price),
      brand,
      description,
      category,
      stock: parseInt(stock),
      status: Boolean(status),
      productImage,
    });

    if (!success) {
      unlinkSync(productImage);
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }

    try {
      const isCategoryExists = await client.category.findFirst({
        where: {
          id: category,
        },
      });

      if (!isCategoryExists) {
        unlinkSync(productImage);
        return res.status(404).json({
          error: "Category not Found!!",
        });
      }

      const uploadProductImage = await uploadOnCloudinary(
        productImage,
        process.env.PRODUCT_FOLDER
      );

      if (!uploadProductImage) {
        return res.status(500).json({
          error: "Failed to upload product image",
        });
      }

      const product = await client.product.create({
        data: {
          productName: productName,
          brand,
          description,
          price: parseInt(price),
          stock: parseInt(stock),
          status: Boolean(status),
          image: uploadProductImage?.url,
          categoryId: category,
        },
        include: {
          category: true,
        },
      });

      if (product) {
        return res.status(201).json({
          success: true,
          message:
            "Product with name " +
            product.productName +
            " and id " +
            product.id +
            " created successfully!!",
          product,
        });
      }
    } catch (error) {
      unlinkSync(productImage);
      return res.status(500).json({ error });
    }
  }
);

/**
 * Admin Route
 * desc -> Update Product
 * route -> PUT /product/:productId
 */
const handleUpdateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productName, price, brand, description, stock, status, category } =
      req.body;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required!!",
      });
    }

    if (
      productName ||
      price ||
      brand ||
      description ||
      stock ||
      status ||
      category
    ) {
      try {
        const product = await client.product.findFirst({
          where: {
            id: productId,
          },
        });

        if (!product) {
          return res.status(404).json({
            error: "Product not found!!",
          });
        } else {
          const updatedProduct = await client.product.update({
            where: {
              id: product.id,
            },
            data: {
              productName: productName || product.productName,
              brand: brand || product.brand,
              price: parseInt(price) || product.price,
              stock: parseInt(stock) || product.stock,
              status: Boolean(status) || product.status,
              description: description || product.description,
              categoryId: category || product.categoryId,
            },
          });

          if (updatedProduct) {
            return res.status(200).json({
              success: true,
              message: `Product with ID ${updatedProduct.id} updated successfully`,
              product: updatedProduct,
            });
          }
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json({
        error: "Enter a field you want to update!!",
      });
    }
  }
);

/**
 * Admin Route
 * desc -> Delete Product
 * route -> DELETE /product/:productId
 */
const handleDeleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required!!",
      });
    }

    try {
      const product = await client.product.delete({
        where: {
          id: productId,
        },
      });

      if (product) {
        return res.status(200).json({
          success: true,
          message: `Product with ID ${product.id} deleted successfully!!`,
        });
      }
    } catch (error: any) {
      if (error.code == "P2025") {
        return res.status(404).json({
          error: "Product not Found",
        });
      }

      return res.status(500).json({
        error: error.meta.cause || "Something went wrong while delete product",
      });
    }
  }
);

/**
 * Admin Route
 * desc -> Change Product Image
 * route -> PATCH /product/:productId
 */
const handleChangeProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required!!",
      });
    }

    let image;

    if (req.file?.path) {
      image = req.file.path;
    } else {
      return res.status(400).json({
        error: "Product image is required!!",
      });
    }

    try {
      const product = await client.product.findFirst({
        where: {
          id: productId,
        },
        select: {
          image: true,
          id: true,
        },
      });

      if (!product) {
        return res.status(400).json({
          error: "Product not Found!!",
        });
      }

      await removeFromCloudinary(product.image);

      const uplaod = await uploadOnCloudinary(
        image,
        process.env.PRODUCT_FOLDER
      );

      if (!uplaod) {
        return res.status(500).json({
          error: "Failed to upload new product image",
        });
      }

      const updatedProduct = await client.product.update({
        where: {
          id: product.id,
        },
        data: {
          image: uplaod.url,
        },
      });

      if (updatedProduct) {
        return res.status(200).json({
          status: true,
          message: `Product's image updated successfully`,
          product,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong while updating product image",
      });
    }
  }
);

/**
 * Admin Route
 * desc -> Get Product by ID
 * route -> GET /product/:productId
 */
const handleGetProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required!!",
      });
    }

    try {
      const product = await client.product.findFirst({
        where: {
          id: productId,
        },
        include: {
          reviews: true,
          category: true,
        },
      });

      if (product) {
        return res.status(200).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

/**
 * Admin Route
 * desc -> Get Product's reviews
 * route -> GET /product/:productId/reviews
 */
const handleGetProductReviews = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.params.productId) {
      return res.status(400).json({
        error: "Product Id is requried!!",
      });
    }

    try {
      const reviews = await client.product.findFirst({
        where: {
          id: req.params.productId,
        },
        select: {
          reviews: true,
        },
      });

      if (reviews && reviews?.reviews.length > 0) {
        return res.status(200).json({
          success: true,
          reviews: reviews.reviews,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No reviews exist for this product yet.",
          reviews: [],
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong while fetching product reviews",
      });
    }
  }
);

/**
 * Public Route
 * desc -> List Products
 * route -> GET /product/
 */
const handleListProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const products = await client.product.findMany({
      include: {
        category: true,
      },
    });

    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        products,
      });
    } else {
      return res.status(200).json({
        message: "No Products available!!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * Public Route
 * desc -> Add Product Review
 * route -> POST /product/:productId/review
 */
const handleAddProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required!!",
      });
    }

    const { success, error } = addReviewValidationSchema.safeParse({
      rating,
      comment,
    });

    if (!success) {
      return res.status(400).json({
        error: error.errors.map((e) => e.message),
      });
    }

    try {
      const product = await client.product.findFirst({
        where: {
          id: productId,
        },
        include: {
          reviews: {
            where: {
              userId: req.user?.id,
            },
            select: {
              userId: true,
            },
          },
        },
      });

      if (product) {
        if (product?.reviews?.length > 0) {
          return res
            .status(400)
            .json({ error: "You have already reviewed this product" });
        }

        if (req.user) {
          const review = await client.review.create({
            data: {
              comment,
              rating: Number(rating),
              productId,
              userId: req.user?.id,
            },
            include: {
              product: true,
              user: {
                omit: {
                  password: true,
                },
              },
            },
          });

          const reviews = await client.review.findMany({
            where: {
              productId: productId,
            },
            select: {
              rating: true,
            },
          });

          const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
          const averageRating = totalRating / reviews.length;

          const updateProduct = await client.product.update({
            where: {
              id: productId,
            },
            data: {
              rating: averageRating,
            },
          });

          if (review && updateProduct) {
            return res.status(201).json({
              success: true,
              message: `Review of Product ${product.productName} by ${req.user.username} added successfully`,
              review,
            });
          } else {
            return res.status(500).json({
              error: "Failed to add review or update product rating",
            });
          }
        } else {
          return res.status(401).json({
            error: "Not authorized, token failed!!",
          });
        }
      } else {
        return res
          .status(404)
          .json({ error: `Product with ID ${productId} does not exist` });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

/**
 * Public Route
 * desc -> Get Top Products
 * route -> GET /products/top
 */
const handleGetTopProducts = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const products = await client.product.findMany({
        where: {
          rating: {
            gte: 4,
          },
        },
      });

      if (products && products.length > 0) {
        return res.status(200).json({
          success: true,
          products,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No top products found",
          products: [],
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong while fetching top products",
      });
    }
  }
);

export {
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleListProduct,
  handleChangeProductImage,
  handleAddProductReview,
  handleGetProductById,
  handleGetProductReviews,
  handleGetTopProducts,
};

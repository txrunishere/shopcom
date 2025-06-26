import { Request, Response } from "express";
import { client } from "../";
import { asyncHandler } from "../middlewares/asyncHandler";
import { createCategoryValidationSchema } from "../zod/category.zod";

/**
 * Admin Route
 * desc -> Create Category
 * route -> POST /category/
 */
const handleCreateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryName } = req.body;

    const { success, error } = createCategoryValidationSchema.safeParse({
      categoryName,
    });

    const name: string = categoryName.toLowerCase().trim();

    if (!success) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }

    if (name.trim()) {
      const isCategoryExists = await client.category.findFirst({
        where: {
          categoryName: name,
        },
      });

      if (isCategoryExists) {
        return res.status(400).json({
          error: "Category already exists!!",
        });
      }

      try {
        const category = await client.category.create({
          data: {
            categoryName: name,
          },
        });

        if (category) {
          return res.status(201).json({
            success: true,
            message:
              "Category with name " +
              category.categoryName +
              " created successfully!!",
            category,
          });
        }
      } catch (error) {
        return res.json({
          error,
        });
      }
    } else {
      return res.status(400).json({
        error: "Category name is required!!",
      });
    }
  }
);

/**
 * Admin Route
 * desc -> Update Category
 * route -> PUT /category/:categoryId
 */
const handleUpdateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const categoryName: string = req.body.categoryName;

    if (!categoryId) {
      return res.status(400).json({
        error: "Category id not Found!!",
      });
    }

    if (!categoryName.trim()) {
      return res.status(400).json({
        error: "Category name is required!!",
      });
    }

    const name = categoryName.trim().toLowerCase();

    try {
      const category = await client.category.findFirst({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        return res.status(404).json({
          error: "Category not found!!",
        });
      }

      if (category?.categoryName == name) {
        return res.status(400).json({
          error: "Enter a unique category name!!",
        });
      }

      const updatedCategory = await client.category.update({
        where: {
          id: categoryId,
        },
        data: {
          categoryName: name,
        },
      });

      if (updatedCategory) {
        return res.status(200).json({
          success: true,
          category: updatedCategory,
          message:
            "Category with id " +
            updatedCategory.id +
            " updated successfully!!",
        });
      }
    } catch (error) {
      return res.json(error);
    }
  }
);

/**
 * Admin Route
 * desc -> Delete Category
 * route -> DELETE /category/:categoryId
 */
const handleDeleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        error: "Category id is required!!",
      });
    }

    try {
      const deletedCategory = await client.category.delete({
        where: {
          id: categoryId,
        },
      });

      return res.status(200).json({
        success: true,
        message: `Category with id ${deletedCategory.id} deleted successfully!!`,
      });
    } catch (error: any) {
      if (error.code == "P2025") {
        return res.status(404).json({
          error: "Category not found!!",
        });
      }
      return res.status(500).json({
        error:
          error.meta.cause || "Something went wrong while deleting category!!",
      });
    }
  }
);

/**
 * Public Route
 * desc -> List all Categories
 * route -> GET /category/
 */
const handleListCategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const categories = await client.category.findMany();

    if (categories.length > 0) {
      return res.status(200).json({
        success: true,
        categories,
      });
    } else {
      return res.status(400).json({
        error: "Categories are not available!!",
      });
    }
  } catch (error) {
    return res.json({ error });
  }
});

export {
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleListCategory,
};

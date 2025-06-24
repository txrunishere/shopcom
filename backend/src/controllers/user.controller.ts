import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  userForgotPasswordValidationSchema,
} from "../zod/user.zod";
import { client } from "..";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken";

/**
 * Public Route
 * desc -> Register User
 * route -> POST /user/register
 */
const handleRegisterUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const { success, error } = userRegisterValidationSchema.safeParse({
    username,
    email,
    password,
  });

  if (!success) {
    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }

  const existedUser = await client.user.findFirst({
    where: {
      email,
    },
  });

  if (existedUser) {
    return res.status(400).json({
      error: "User already exists!!",
    });
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
      omit: {
        password: true,
      },
    });

    if (user) {
      await createToken(res, user.id);
      return res.status(201).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong while register user!!",
    });
  }
});

/**
 * Public Route
 * desc -> Login User
 * route -> POST /user/login
 */
const handleLoginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { success, error } = userLoginValidationSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }

  const user = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not Found!!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      error: "Invalid Password!!",
    });
  }

  try {
    const token = await createToken(res, user.id);
    return res.status(200).json({
      success: true,
      message: `User with email ${user.email} Login Successfully!!`,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while Login User",
      error,
    });
  }
});

/**
 * Public Route
 * desc -> Logout User
 * route -> POST /user/logout
 */
const handleLogoutUser = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .json({
      message: "User Logout Successfully!!",
    });
});

/**
 * Public Route
 * desc -> Get Current User
 * route -> GET /user/
 */
const handleGetCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

/**
 * Public Route
 * desc -> Update User's username or email
 * route -> PUT /user/
 */
const handleUpdateCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, username } = req.body;

    if (email || username) {
      if (email == req.user?.email || username == req.user?.username) {
        return res.status(400).json({
          error: `Enter a unique username or email!!`,
        });
      }
      try {
        const updatedUser = await client.user.update({
          where: {
            id: req.user?.id,
          },
          data: {
            username: username || req.user?.username,
            email: email || req.user?.email,
          },
          omit: {
            password: true,
          },
        });

        if (updatedUser) {
          return res.status(200).json({
            success: true,
            updatedUser,
          });
        }
      } catch (error) {
        return res.status(400).json({
          error: "Something went wrong update user",
        });
      }
    } else {
      return res.status(400).json({
        error: "Enter a field you want to update!!",
      });
    }
  }
);

/**
 * Public Route
 * desc -> Change User's Password
 * route -> PATCH /user/
 */
const handleChangePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const { success, error } = userForgotPasswordValidationSchema.safeParse({
      oldPassword,
      newPassword,
    });

    if (!success) {
      return res.status(400).json({
        error: error.errors.map((e) => e.message),
      });
    }

    if (oldPassword == newPassword) {
      return res.status(400).json({ error: "Enter a different password!!" });
    }

    try {
      const user = await client.user.findFirst({
        where: {
          id: req.user?.id,
        },
      });

      if (user) {
        const isPasswordCorrect = await bcrypt.compare(
          oldPassword,
          user?.password
        );
        if (!isPasswordCorrect) {
          return res.status(400).json({
            error: "Invalid Password!!",
          });
        }

        const salt = await bcrypt.genSalt(12);
        await bcrypt.hash(newPassword, salt, async (err, encryped) => {
          if (err) {
            return res.status(400).json({
              error: err?.message,
            });
          }
          const updatedUser = await client.user.update({
            where: {
              id: user.id,
            },
            data: {
              password: encryped,
            },
            omit: {
              password: true,
            },
          });
          if (updatedUser) {
            return res.status(200).json({
              success: true,
              message: "Password updated successfully!!",
              updatedUser,
            });
          }
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong while updating password",
        error,
      });
    }
  }
);

/**
 * Admin Route
 * desc -> Get All Users
 * route -> GET /user/get-users
 */
const handleGetAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await client.user.findMany({
    where: {
      isAdmin: false,
    },
  });

  if (users) {
    return res.status(200).json({
      users,
    });
  }
});

/**
 * Admin Route
 * desc -> Delete User by ID
 * route -> DELETE /user/:id
 */
const handleDeleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const user = await client.user.findFirst({
      where: {
        id,
      },
    });

    if (user && !user.isAdmin) {
      const deleteUser = await client.user.delete({
        where: {
          id,
        },
      });

      if (deleteUser) {
        return res.status(200).json({
          success: true,
          message: "User with " + user.email + " deleted successfully",
        });
      }
    } else {
      return res.status(400).json({
        error: "Cannot delete Admin",
      });
    }
  } else {
    return res.status(400).json({
      error: "User's id not found!!",
    });
  }
});

/**
 * Admin Route
 * desc -> Get User by ID
 * route -> GET /user/:id
 */
const handleGetUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: "User's id not found!!",
    });
  }

  const user = await client.user.findFirst({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });

  if (user) {
    return res.status(200).json({
      success: true,
      user,
    });
  } else {
    return res.status(400).json({
      error: "User not exists!!",
    });
  }
});

export {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
  handleGetCurrentUser,
  handleGetAllUsers,
  handleUpdateCurrentUser,
  handleChangePassword,
  handleDeleteUser,
  handleGetUserById,
};

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});

export const uploadOnCloudinary = async (
  filePath: string,
  folder: string = process.env.DEFAULT_FOLDER as string
) => {
  try {
    const responseFileOnCloudinary = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "image",
        folder,
      }
    );

    fs.unlinkSync(filePath);
    return responseFileOnCloudinary;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath);
    return null;
  }
};

export const removeFromCloudinary = async (imgUrl: string) => {
  const publicId: string =
    "productImage/" + imgUrl.split("/").pop()?.split(".")[0];

  if (publicId) {
    try {
      const res = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
      if (res) return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

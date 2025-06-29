import type { FC } from "react";
import type { ProductCardModel } from "../types/types";
import { Link } from "react-router";
import { useAppSelector } from "../hooks";
import { useDeleteProductMutation } from "../features/api/productApiSlice";
import { toast } from "react-toastify";

const ProductCard: FC<ProductCardModel> = ({
  productName,
  description,
  image,
  price,
  rating,
  reviews,
  productId,
}) => {
  const modDescription = description.substring(0, 35);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [deleteProductTrigger, { isLoading }] = useDeleteProductMutation();

  const handleProductDelete = async () => {
    try {
      const { data: deleteProductData } = await deleteProductTrigger({
        productId,
      });

      if (deleteProductData.success) {
        toast.success(deleteProductData.message);
      }
    } catch (error: any) {
      toast.error(error.data.error);
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg shadow-lg w-64 bg-gray-900 overflow-hidden font-roboto transition-shadow duration-200 cursor-pointer hover:shadow-2xl min-h-96">
      <div className="bg-gray-800 flex items-center justify-center h-56">
        <img
          src={image}
          alt={productName}
          className="max-h-48 max-w-[90%] object-contain"
        />
      </div>
      <div className="p-4">
        <div className="font-medium text-base mb-2 text-gray-100 truncate">
          {productName}
        </div>
        <div className="text-sm text-gray-400 mb-3 h-12 overflow-hidden">
          {modDescription}...
        </div>
        <div className="flex items-center mb-2">
          <span className="bg-green-700 text-white px-2 py-0.5 rounded text-xs font-medium mr-2 flex items-center">
            {Number(rating).toFixed(1)} <span className="ml-0.5">★</span>
          </span>
          <span className="text-gray-500 text-xs">{reviews} Reviews</span>
        </div>
        <div className="font-bold text-lg text-gray-100">
          ₹{Number(price).toLocaleString()}
        </div>
      </div>
      {userInfo?.isAdmin && (
        <div className="w-full flex gap-1">
          <Link
            className="py-1 px-2 w-full block text-center bg-pink-400 hover:bg-pink-500"
            to={productId}
          >
            Update
          </Link>
          <button
            className={`py-1 px-2 w-full cursor-pointer bg-pink-400 hover:bg-pink-500 ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
            disabled={isLoading}
            onClick={handleProductDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

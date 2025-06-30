import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../features/api/productApiSlice";
import { useListCategoriesQuery } from "../../features/api/categoryApiSlice";
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UpdateProduct = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery({
    productId: params.productId,
  });

  const { data: categoryData } = useListCategoriesQuery();

  const [updateProductTrigger, { isLoading }] = useUpdateProductMutation();

  const [brand, setBrand] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [status, setStatus] = useState<string>("true");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    if (productData?.product) {
      setBrand(productData?.product.brand);
      setProductName(productData.product.productName);
      setPrice(productData.product.price);
      setStatus(productData.product.status);
      setDescription(productData.product.description);
      setStock(productData.product.stock);
      setCategoryId(productData.product.categoryId);
    }
  }, [productData]);

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateProductTrigger({
        productId: params.productId,
        productName,
        brand,
        price,
        status,
        stock,
        description,
        category: categoryId,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.data.error);
    }
  };

  return (
    <div>
      <AdminMenu />
      <form
        className="max-w-3xl w-full mt-[5rem] mx-auto bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleUpdateProduct}
      >
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-200">Brand</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter brand"
            required
          />
        </div>
        {/* Price and Stock in one row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-200">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter price"
              required
              min={0}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-200">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter stock"
              required
              min={0}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter description"
            required
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-200">Status</label>
          <select
            name="status"
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Category
          </label>
          <select
            name="category"
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryData?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`w-full bg-blue-700 text-white py-2.5 rounded hover:bg-blue-800 transition font-semibold ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useCreateProductMutation } from "../../features/api/productApiSlice";
import { useListCategoriesQuery } from "../../features/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [createProductTrigger, { isLoading }] = useCreateProductMutation();
  const [file, setFile] = useState<File | null>(null);
  const productName = useRef<HTMLInputElement>(null);
  const brand = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<number>(0);
  const description = useRef<HTMLTextAreaElement>(null);
  const [stock, setStock] = useState<number>(0);
  const [status, setStatus] = useState<string>("true");
  const [category, setCategory] = useState("");

  const { data } = useListCategoriesQuery();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleCreateProductSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (
      productName.current?.value &&
      brand.current?.value &&
      price &&
      description.current?.value &&
      stock &&
      status &&
      category &&
      file
    ) {
      formData.append("productName", productName.current?.value);
      formData.append("brand", brand.current.value);
      formData.append("price", `${price}`);
      formData.append("description", description.current.value);
      formData.append("stock", `${stock}`);
      formData.append("status", status);
      formData.append("productImage", file);
      formData.append("category", category);
    }

    try {
      const { data } = await createProductTrigger(formData);
      if (data?.success) {
        toast.success(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.error);
    }
  };

  return (
    <div>
      <form
        className="max-w-3xl w-full mt-[5rem] mx-auto bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleCreateProductSubmit}
      >
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            ref={productName}
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
            ref={brand}
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
            ref={description}
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
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-500"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {data?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        {/* Improved file input */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Product Image
          </label>
          <div className="relative flex items-center">
            <input
              type="file"
              name="productImage"
              accept="image/*"
              className="block w-full text-gray-100 border border-gray-700 bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-700 file:text-white"
              onChange={handleFileUpload}
              required
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`w-full bg-blue-700 text-white py-2.5 rounded hover:bg-blue-800 transition font-semibold ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductList;

import type { FC } from "react";
import type { CategoryFormType } from "../types/types";

const CategoryForm: FC<CategoryFormType> = ({
  handleFn,
  setValue,
  value,
  buttonText = "Submit",
  deleteFn,
  width = "",
  isLoading,
}) => {
  return (
    <div className="">
      <form onSubmit={handleFn}>
        <input
          type="text"
          className="w-full outline-none border p-2 rounded-sm"
          placeholder="Enter Category here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            disabled={isLoading}
            className={`bg-pink-500 mt-4 rounded-lg px-4 w-${width} text-white cursor-pointer ${
              isLoading ? "opacity-50" : "opacity-100"
            } hover:bg-pink-600 py-2`}
          >
            {buttonText}
          </button>
        </div>
      </form>
      {deleteFn && (
        <button
          disabled={isLoading}
          className={`bg-pink-500 mt-4 text-white rounded-lg w-${width} px-4 cursor-pointer ${
            isLoading ? "opacity-50" : "opacity-100"
          } hover:bg-pink-600 py-2`}
          onClick={deleteFn}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CategoryForm;

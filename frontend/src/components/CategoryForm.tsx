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
  const buttonClass = `bg-pink-500 mt-4 rounded-lg px-4 w-${width} text-white cursor-pointer ${
    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
  } py-2`;

  return (
    <div className="">
      <form onSubmit={handleFn}>
        <input
          type="text"
          className="w-full outline-none border p-2 rounded-sm"
          placeholder="Enter Category here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-between">
          <button disabled={isLoading} className={buttonClass}>
            {buttonText}
          </button>
        </div>
      </form>
      {deleteFn && (
        <button disabled={isLoading} className={buttonClass} onClick={deleteFn}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CategoryForm;

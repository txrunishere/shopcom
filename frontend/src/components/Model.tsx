import type { FC } from "react";
import type { ModelComponentType } from "../types/types";

const Model: FC<ModelComponentType> = ({ children, handleFn, isOpen, isLoading }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed text-black inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[40%] right-[40%] bg-white p-4 rounded-lg z-10 text-right">
            <button
              disabled={isLoading}
              onClick={handleFn}
              className={`text-black font-semibold cursor-pointer rounded-sm px-2 py-1 bg-blue-400 hover:bg-blue-500 mb-4 hover:text-gray-700 ${isLoading ? "opacity-60" : "opacity-100"} focus:outline-none mr-2`}
            >
              close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;

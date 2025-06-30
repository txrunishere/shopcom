import {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../features/api/categoryApiSlice";
import { toast } from "react-toastify";
import { CategoryForm, Model } from "../../components";
import { useState, type FormEvent } from "react";
import type { ICategory } from "../../types/types";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const [value, setValue] = useState<string>("");
  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const [updatingName, setUpdatingName] = useState<string>("");
  const [selected, setSelected] = useState<ICategory | null>(null);
  const {
    data,
    isLoading,
    error: listCategoryError,
    isError,
  } = useListCategoriesQuery();
  const [handleCreateCategoryTrigger, { isLoading: createLoading }] =
    useCreateCategoryMutation();
  const [handleUpdateCategoryTrigger, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const [handleDeleteCategoryTrigger, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      try {
        const category = await handleCreateCategoryTrigger({
          categoryName: value,
        }).unwrap();
        if (category.success) {
          setValue("");
          toast.success(category.message);
        }
      } catch (error: any) {
        toast.error(error.data?.error);
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (selected) {
      try {
        const res = await handleDeleteCategoryTrigger({
          categoryId: selected.id,
        }).unwrap();

        if (res.success) {
          toast.success(res.message);
          handleOnModelClose();
        }
      } catch (error: any) {
        toast.error(error.data?.error);
      }
    }
  };

  const handleUpdateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updatingName.trim() && selected) {
      try {
        const res = await handleUpdateCategoryTrigger({
          categoryId: selected?.id,
          categoryName: updatingName,
        }).unwrap();
        if (res.success) {
          toast.success(res.message);
          handleOnModelClose();
        }
      } catch (error: any) {
        toast.error(error.data?.error);
      }
    }
  };

  const handleOnModelClose = () => {
    setModelStatus(false);
    setUpdatingName("");
    setSelected(null);
  };

  return (
    <>
      <section className="mx-[10rem] flex flex-col p-4">
        <AdminMenu />
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <div className="my-6">
          <CategoryForm
            value={value}
            setValue={setValue}
            handleFn={handleCreateCategory}
            isLoading={createLoading}
          />
        </div>
        <br />
        <hr />
        <main className="mt-3 flex gap-4">
          {isLoading ? (
            <p>Loading</p>
          ) : data ? (
            data.categories.map((category) => (
              <button
                className="text-pink-400 mt-4 font-medium rounded-lg px-4 border cursor-pointer border-pink-400 hover:text-white hover:bg-pink-500 py-2"
                onClick={() => {
                  setModelStatus(true);
                  setUpdatingName(category.categoryName);
                  setSelected(category);
                }}
                key={category.id}
              >
                {category.categoryName}
              </button>
            ))
          ) : (
            <p>
              {isError &&
                (listCategoryError && "data" in listCategoryError ? (listCategoryError.data as { error?: string })?.error : "An error occurred.")}
            </p>
          )}
        </main>
        <Model
          handleFn={handleOnModelClose}
          isLoading={updateLoading || deleteLoading}
          isOpen={modelStatus}
        >
          <CategoryForm
            handleFn={handleUpdateCategory}
            setValue={setUpdatingName}
            value={updatingName}
            buttonText="Update"
            deleteFn={handleDeleteCategory}
            isLoading={updateLoading || deleteLoading}
            width="full"
          />
        </Model>
      </section>
    </>
  );
};

export default CategoryList;

import { useListCategoriesQuery } from "../../features/api/categoryApiSlice"

const CategoryList = () => {
  const { data, isLoading } = useListCategoriesQuery();

  if (!isLoading) {
    console.log(data?.categories)
  }

  return (
    <div>CategoryList</div>
  )
}

export default CategoryList

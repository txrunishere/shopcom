import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../features/api/productApiSlice";
import { useListCategoriesQuery } from "../../features/api/categoryApiSlice";
import { useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router";

const UpdateProduct = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery({
    productId: params.productId,
  });

  console.log(data);

  const [brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("true");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (productData?.product) {
      setBrand(productData?.product.brand);
      setProductName(productData.product.productName);
      setPrice(productData.product.price),
        setStatus(productData.product.status);
      setDescription(productData.product.description);
      setStock(productData.product.status);
      setCategoryId(productData.product.categoryId);
    }
  }, [productData]);

  return <div>{params.productId}</div>;
};

export default UpdateProduct;

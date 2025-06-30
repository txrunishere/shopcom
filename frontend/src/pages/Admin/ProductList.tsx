import { ProductCard } from "../../components";
import { useListProductQuery } from "../../features/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const { data: productData } = useListProductQuery();

  return (
    <section className="p-8">
      <AdminMenu />
      <main className="flex flex-wrap gap-10">
        {productData?.products.length ? productData?.products.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.productName}
            price={product.price}
            image={product.image}
            description={product.description}
            rating={product.rating}
            reviews={product.reviews?.length || 0}
            productId={product.id}
          />
        )): (
          <div>
            <p>No Products Found</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default ProductList;

import { useProducts } from "../hooks/useProduct";
import type { ProductModel } from "../types/product.types";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.map((product: ProductModel) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

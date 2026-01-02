import { useProducts } from "../hooks/useProduct";
import type { ProductModel } from "../types/product.types";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useProducts();
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {products?.map((product: ProductModel) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

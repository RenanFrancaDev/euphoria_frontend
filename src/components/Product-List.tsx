import ProductItem from "./Product-Item";
import { ProductListProps } from "@/lib/productsProps";

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 mb-8 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {Array.isArray(products) &&
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;

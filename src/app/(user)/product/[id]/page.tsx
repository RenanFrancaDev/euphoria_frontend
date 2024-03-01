import { ProductService } from "@/app/api/product";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import ProductList from "@/components/Product-List";
import SectionTitle from "@/components/Section-Title";

interface ProductDetailsPageProps {
  params: {
    id: number;
  };
}

const ProductDetailPage = async ({
  params: { id },
}: ProductDetailsPageProps) => {
  const product = (await ProductService.getProduct(id)).data.data;
  const productByCategory = (
    await ProductService.getProductsByCategory(product.category)
  ).data.data;

  if (!product) return null;

  return (
    <div>
      <ProductImages product={product} />
      <ProductInfo product={product} />
      <SectionTitle>Outras opções de {product.category}: </SectionTitle>
      <ProductList products={productByCategory} />
    </div>
  );
};

export default ProductDetailPage;

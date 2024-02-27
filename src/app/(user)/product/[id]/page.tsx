import { ProductService } from "@/app/api/product";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import ProductList from "@/components/Product-List";
import SectionTitle from "@/components/Section-Title";

interface ProducDetailsPageProps {
  params: {
    id: number;
  };
}

const ProductDetailPage = async ({
  params: { id },
}: ProducDetailsPageProps) => {
  const product = (await ProductService.getProduct(id)).data.data;

  if (!product) return null;

  return (
    <div>
      <ProductImages product={product} />
      <ProductInfo product={product} />
      <SectionTitle>Outras opções de {product.category}: </SectionTitle>
      {/* <ProductList products={product.category.products} /> */}
    </div>
  );
};

export default ProductDetailPage;

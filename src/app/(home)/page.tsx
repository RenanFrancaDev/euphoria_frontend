import Categories from "./components/Categories";
import Banner from "./components/Banner";
import SectionTitle from "@/components/Section-Title";
import { ProductService } from "@/app/api/product.js";
import ProductList from "@/components/Product-List";

const Home = async () => {
  const discount = await ProductService.getProductsWithDiscount();
  const anel = await ProductService.getProductsByCategory("anel");
  const colar = await ProductService.getProductsByCategory("colar");
  const brincos = await ProductService.getProductsByCategory("brincos");

  return (
    <div className="w-full">
      <Banner src="/fotos/banner_euphoria.jpeg" alt="Banner inicial" />

      <Categories />

      <SectionTitle>Promoções</SectionTitle>
      <ProductList products={discount.data.data} />

      <Banner src="/fotos/banner_brinco.jpeg" alt="Banner inicial" />
      <SectionTitle>Brincos</SectionTitle>
      <ProductList products={brincos.data.data} />

      <Banner src="/fotos/banner_anel.jpeg" alt="Banner inicial" />
      <SectionTitle>Anéis</SectionTitle>
      <ProductList products={anel.data.data} />

      <Banner src="/fotos/banner_colar.jpeg" alt="Banner inicial" />
      <SectionTitle>Colares</SectionTitle>
      <ProductList products={colar.data.data} />
    </div>
  );
};

export default Home;

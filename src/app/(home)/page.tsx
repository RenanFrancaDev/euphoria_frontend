import Categories from "./components/Categories";
import Banner from "./components/Banner";
import SectionTitle from "@/components/Section-Title";

const Home = () => {
  return (
    <div className="w-full">
      <Banner src="/fotos/banner_promo.png" alt="Banner inicial" />

      <Categories />

      <SectionTitle>Promoções</SectionTitle>
      
    </div>
  );
};

export default Home;

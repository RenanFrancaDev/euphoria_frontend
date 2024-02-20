import Image from "next/image";
import Categories from "./components/Categories";
import Banner from "./components/Banner";

const Home = () => {
  return (
    <div className="w-full">
      <Banner
        src="../../../public/fotos/banner_promo.png"
        alt="Banner inicial"
      />

      <Categories />
    </div>
  );
};

export default Home;

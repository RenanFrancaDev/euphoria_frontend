import Image from "next/image";
import Banner from "../../../public/fotos/banner_promo.png";

const Home = () => {
  return (
    <div className="w-full">
      <Image
        height={0}
        width={0}
        className=" my-5 h-auto w-full max-h-[500px] px-10 m-auto"
        sizes="80vw"
        src={Banner}
        alt="promo banner"
      />
    </div>
  );
};

export default Home;

import { Helmet } from "react-helmet";
import Banner from "../components/others/Banner";
import FeaturedProduct from "../components/others/FeaturedProduct";
import TrendingProducts from "../components/others/TrendingProducts";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Nexify</title>
      </Helmet>
      <Banner />
      <FeaturedProduct />
      <TrendingProducts />
    </div>
  );
};

export default Home;

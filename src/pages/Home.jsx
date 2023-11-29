import { Helmet } from "react-helmet";
import Banner from "../components/others/Banner";
import FeaturedProduct from "../components/others/FeaturedProduct";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Nexify</title>
      </Helmet>
      <Banner />
      <FeaturedProduct />
    </div>
  );
};

export default Home;

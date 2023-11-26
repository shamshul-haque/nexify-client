import { Helmet } from "react-helmet";
import Banner from "../components/others/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Nexify</title>
      </Helmet>
      <Banner />
    </div>
  );
};

export default Home;

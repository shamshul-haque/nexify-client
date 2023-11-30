import { Helmet } from "react-helmet";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import not_found from "../assets/not_fount.gif";
import Container from "../components/shared/Container";

const Error = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Error | Nexify</title>
      </Helmet>
      <Container>
        <Link to="/">
          <button className="pt-10 flex items-center gap-2 text-xl text-yellow-500 hover:text-emerald-500 transit duration-500 font-bold">
            <BiArrowBack />
            <span>Back to Home</span>
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-center">Request not found!</h1>
        <img src={not_found} alt="not_found" className="w-2/4 mx-auto" />
      </Container>
    </div>
  );
};

export default Error;

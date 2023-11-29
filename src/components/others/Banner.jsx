import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.webp";
import Container from "../shared/Container";

const Banner = () => {
  return (
    <div className="pt-[75px]">
      <Carousel
        className="w-full text-center mx-auto"
        autoPlay
        showStatus={false}
        interval="3000"
        transitionTime="1500"
        infiniteLoop
      >
        <div className="h-full md:h-[95vh] relative text-white">
          <img src={banner1} alt="banner3" className="h-full object-fill" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
            <Container>
              <h1 className="text-4xl md:text-8xl font-bold uppercase text-center">
                Curvy Bevel <br /> Dual Audio
              </h1>
              <Link to="/products">
                <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer text-center mt-5 md:mt-10">
                  Show All Products
                </button>
              </Link>
            </Container>
          </div>
        </div>
        <div className="h-full md:h-[95vh] relative text-white">
          <img src={banner2} alt="banner3" className="h-full object-fill" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
            <Container>
              <h1 className="text-4xl md:text-8xl font-bold uppercase text-center">
                High Definition <br /> Camera
              </h1>
              <Link to="/products">
                <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer text-center mt-5 md:mt-10">
                  Show All Products
                </button>
              </Link>
            </Container>
          </div>
        </div>
        <div className="h-full md:h-[95vh] relative text-white">
          <img src={banner3} alt="banner3" className="h-full object-fill" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
            <Container>
              <h1 className="text-4xl md:text-8xl font-bold uppercase text-center">
                Full Screen <br /> Display
              </h1>
              <Link to="/products">
                <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer text-center mt-5 md:mt-10">
                  Show All Products
                </button>
              </Link>
            </Container>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

import { useQuery } from "@tanstack/react-query";
import { BiSolidUpvote } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../shared/Container";

const FeaturedProduct = () => {
  const axiosPublic = useAxiosPublic();
  // const axiosPrivate = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/featured");
      return res?.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner w-40 py-52 bg-yellow-500"></span>
      </div>
    );
  }

  const handleVote = async () => {
    if (user) {
      // const productInfo = {
      //   vote_count: product?.vote_count + 1,
      // };
      // const res = await axiosPrivate.patch(`/user/products/${id}`, productInfo);
      // if (res?.data?.modifiedCount > 0) {
      //   refetch();
      // }
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add vote.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location?.pathname } });
        }
      });
    }
  };

  return (
    <div className="pt-10 pb-20">
      <Container>
        <h1 className="text-3xl font-bold uppercase text-center">
          Our Featured Rooms
        </h1>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product?._id}
              className="mx-3 border p-5 rounded relative"
            >
              <img
                src={product?.image}
                alt={product?.product_name}
                className="w-full h-40 rounded mb-3"
              />
              <p className="text-xs">{product?.timestamp}</p>
              <Link to={`/product-details/${product?._id}`}>
                <h2 className="font-bold text-center">
                  {product?.product_name}
                </h2>
              </Link>
              <div className="flex flex-row justify-center gap-2">
                {product?.tags.map((tag, idx) => (
                  <p
                    key={idx}
                    className="border-b-2 border-yellow-500 text-emerald-500"
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <Link to={`/product-details/${product?._id}`}>
                <button
                  // onClick={() => handleVote(product?._id)}
                  onClick={() => handleVote()}
                  className={`${
                    product?.owner == user?.email
                      ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed absolute top-2 left-2"
                      : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center absolute top-2 left-2"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{product?.vote_count}</span>
                    <BiSolidUpvote />
                  </div>
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products">
            <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center top-2 left-2">
              Show All Products
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProduct;

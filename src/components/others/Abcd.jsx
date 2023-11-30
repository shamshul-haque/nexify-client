import { useQuery } from "@tanstack/react-query";
import { BiSolidUpvote } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Abcd = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: rising,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rising"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/rising");
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
  const handleVote = async (product) => {
    if (user) {
      const productInfo = {
        vote_count: product?.vote_count + 1,
        voter: user?.email,
      };
      const res = await axiosPrivate.patch(
        `/user/products/${product?._id}`,
        productInfo
      );
      if (res?.data?.modifiedCount > 0) {
        refetch();
      }
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
    <div>
      <h1 className="text-3xl font-bold uppercase text-center">
        Rising Products
      </h1>
      <div className="mt-5 hidden md:block">
        <Swiper
          spaceBetween={0}
          slidesPerView={4}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 1000, disableOnInteraction: true }}
          loop
        >
          {rising?.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="mx-3 border p-5 rounded relative">
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
                  {product?.tags?.map((tag, idx) => (
                    <p
                      key={idx}
                      className="border-b-2 border-yellow-500 text-emerald-500"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => handleVote(product)}
                  disabled={
                    product?.owner == user?.email ||
                    product?.voter == user?.email
                  }
                  className={`${
                    product?.owner == user?.email ||
                    product?.voter == user?.email
                      ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed absolute top-2 left-2"
                      : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center absolute top-2 left-2"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{product?.vote_count}</span>
                    <BiSolidUpvote />
                  </div>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Abcd;

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { BiSolidUpvote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Container from "../components/shared/Container";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PostReview from "./PostReview";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/user/products/${id}`);
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

  const handleReport = async () => {
    const { value: report } = await Swal.fire({
      input: "textarea",
      inputLabel: "Report",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    const productInfo = {
      report,
    };
    const res = await axiosPrivate.patch(`/user/products/${id}`, productInfo);
    if (res?.data?.modifiedCount > 0) {
      toast?.success(`Your report is collected`, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  const handleVote = async () => {
    const productInfo = {
      vote_count: product?.vote_count + 1,
    };
    const res = await axiosPrivate.patch(`/user/products/${id}`, productInfo);
    if (res?.data?.modifiedCount > 0) {
      refetch();
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Product Details | Nexify</title>
      </Helmet>
      <div className="pt-32">
        <h2 className="font-bold text-center text-4xl pb-5">
          Details of {product?.product_name}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-10 bg-white shadow-xl rounded-lg">
          <div className="flex-1">
            <img
              src={product?.image}
              alt={product?.product_name}
              className="w-full rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-xl font-bold pb-3">
              Name: {product?.product_name}
            </h2>
            <p className="pb-3">
              <span className="font-bold">Description: </span>
              {product?.details}
            </p>
            <div className="flex flex-row gap-2">
              <span className="font-bold">Tags:</span>
              {product?.tags.map((tag, idx) => (
                <p
                  key={idx}
                  className="bg-yellow-500 rounded px-2 cursor-not-allowed"
                >
                  {tag}
                </p>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={handleReport}
                disabled={product?.owner == user?.email}
                className={`${
                  product?.owner == user?.email
                    ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed mr-5"
                    : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center mr-5"
                }`}
              >
                Report
              </button>
              <button
                onClick={handleVote}
                disabled={product?.owner == user?.email}
                className={`${
                  product?.owner == user?.email
                    ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{product?.vote_count}</span>
                  <BiSolidUpvote />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <h2 className="font-bold text-center text-4xl pb-5">Client Reviews</h2>
        <Reviews />
      </div>
      <PostReview />
    </Container>
  );
};

export default ProductDetails;

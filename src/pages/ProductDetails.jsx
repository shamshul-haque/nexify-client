import { useEffect, useState } from "react";
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
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    axiosPrivate.get(`/user/products/${id}`).then((res) => {
      setItem(res.data);
      setLoading(false);
    });
  }, [axiosPrivate, id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-bars w-40 py-40"></span>
      </div>
    );
  }

  const handleReport = async () => {
    const { value: report } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (report) {
      Swal.fire(report);
    }
    const productInfo = {
      productId: id,
      report,
    };
    const res = await axiosPrivate.post("/report", productInfo);
    if (res?.data?.insertedId) {
      toast?.success(`Your report is collected`, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Product Details | Nexify</title>
      </Helmet>
      <div className="pt-32">
        <h2 className="font-bold text-center text-4xl pb-5">
          Details of {item?.product_name}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-10 bg-white shadow-xl rounded-lg">
          <div className="flex-1">
            <img
              src={item?.image}
              alt={item?.product_name}
              className="w-full rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-5">
            <h2 className="text-xl font-bold pb-3">
              Name: {item?.product_name}
            </h2>
            <p className="pb-3">
              <span className="font-bold">Description: </span>
              {item?.details}
            </p>
            <div className="flex flex-row gap-2">
              <span className="font-bold">Tags:</span>
              {item?.tags.map((tag, idx) => (
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
                className={`${
                  item?.owner == user?.email
                    ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed mr-5"
                    : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center mr-5"
                }`}
              >
                Report
              </button>
              <button
                className={`${
                  item?.owner == user?.email
                    ? "bg-yellow-100 text-black  px-3 py-2 rounded uppercase text-center cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 px-3 py-2 rounded uppercase text-center"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item?.vote_count}</span>
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

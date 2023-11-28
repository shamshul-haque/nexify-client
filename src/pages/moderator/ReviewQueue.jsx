import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ReviewQueue = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/moderator/products");
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

  const handleMakeFeatured = async (product, featured) => {
    const res = await axiosPrivate.patch(
      `/moderator/products/${product?._id}`,
      {
        featured,
      }
    );
    if (res?.data?.modifiedCount > 0) {
      refetch();
      toast?.success(`${product?.product_name} is featured now.`, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleStatus = async (product, status) => {
    const res = await axiosPrivate.patch(
      `/moderator/products/${product?._id}`,
      {
        status,
        sort: 0,
      }
    );
    if (res?.data?.modifiedCount > 0) {
      refetch();
      toast?.success(`${product?.product_name} is ${status}`, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-emerald-500 shadow-xl min-h-screen p-5 md:p-10 m-5 md:m-10">
      <Helmet>
        <title>Review Product | Nexify</title>
      </Helmet>
      <div className="uppercase">
        <h2 className="font-bold text-center text-3xl">
          Total Products: {products?.length}
        </h2>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table">
          <thead className="bg-yellow-500">
            <tr className="uppercase text-white">
              <th>Sl</th>
              <th>Name</th>
              <th>View Details</th>
              <th>Featured</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.product_name}</td>
                <td className="">
                  <Link to={`/product-details/${product?._id}`}>
                    <button className="bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded w-full">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeFeatured(product, true)}
                    className={`${
                      product?.featured
                        ? "cursor-not-allowed bg-yellow-100 p-2 rounded w-full"
                        : "bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded w-full"
                    }`}
                  >
                    {product?.featured ? "Featured" : "Make Featured"}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleStatus(product, "accepted")}
                    className={`${
                      product?.status === "accepted"
                        ? "cursor-not-allowed bg-yellow-100 p-2 rounded w-full"
                        : "bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded w-full"
                    }`}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStatus(product, "rejected")}
                    className={`${
                      product?.status === "rejected"
                        ? "cursor-not-allowed bg-yellow-100 p-2 rounded w-full"
                        : "bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded w-full"
                    }`}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  {product?.status === "pending"
                    ? "Pending"
                    : product?.status === "accepted"
                    ? "Accepted"
                    : "Rejected"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewQueue;

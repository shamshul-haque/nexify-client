import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyProducts = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/user/products?owner=${user?.email}`);
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

  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/user/product/${product?._id}`).then((res) => {
          if (res?.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${product?.product_name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-emerald-500 shadow-xl min-h-screen p-5 md:p-10 m-5 md:m-10">
      <Helmet>
        <title>My Product | Nexify</title>
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
              <th>Votes</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.product_name}</td>
                <td>{product?.vote_count}</td>
                <td>{product?.status}</td>
                <td className="flex flex-col md:flex-row justify-center items-center gap-2 md:mt-3 lg:mt-0">
                  <Link to={`/dashboard/update-product/${product?._id}`}>
                    <button className="bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded">
                      <FaRegEdit className="text-xl" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-yellow-500 hover:text-red-500 transition-all duration-1000 p-2 rounded"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;

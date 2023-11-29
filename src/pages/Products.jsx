import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../components/shared/Container";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const { isLoading, refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      setItems(res?.data);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    form.reset();
    const res = await axiosPublic.get(`/products?search=${search}`);
    setItems(res?.data);
  };

  const handleVote = async (product) => {
    if (user) {
      const productInfo = {
        vote_count: product?.vote_count + 1,
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
    <div className="pt-32 pb-16">
      <Container>
        <form onSubmit={handleSearch} className="w-3/4 mx-auto relative">
          <input
            type="text"
            name="search"
            placeholder="Search your desired product"
            className="outline-0 border p-2 rounded text-sm w-full"
          />
          <button type="submit" className="absolute top-3 right-4 ">
            <FaSearch />
          </button>
        </form>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items?.map((product) => (
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
              <button
                onClick={() => handleVote(product)}
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
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;

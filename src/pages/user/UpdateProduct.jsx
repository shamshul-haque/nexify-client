import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const imageHostingKey = import.meta.env.VITE_imageHostingKey;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateProduct = () => {
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = useState({});
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPrivate.get(`/user/products/${id}`).then((res) => {
      setItem(res.data);
      setLoading(false);
    });
  }, [axiosPrivate, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-bars w-40 py-40"></span>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const imageFile = { image: data?.image[0] };
    const imgRes = await axios.post(imageHostingAPI, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (imgRes?.data?.success) {
      const productInfo = {
        product_name: data?.product_name,
        details: data?.details,
        image: imgRes?.data?.data?.display_url,
        tags: selected,
        timestamp: new Date(),
      };
      const res = await axiosPrivate.patch(
        `/owner/products/${id}`,
        productInfo
      );
      console.log(res.data);
      if (res?.data?.modifiedCount > 0) {
        reset();
        toast?.success(`${data?.product_name} is updated!`, {
          position: "top-right",
          theme: "colored",
        });
      }
    }
    navigate("/dashboard/my-products");
  };

  return (
    <div className="bg-emerald-500 shadow-xl min-h-screen p-5 md:p-10 m-5 md:m-10">
      <Helmet>
        <title>Update Product | Nexify</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="form-control w-full md:flex-1">
            <label>Owner Name</label>
            <input
              type="text"
              {...register("owner_name", {
                required: true,
              })}
              defaultValue={item?.owner_name}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.owner_name?.type === "required" && (
              <span className="text-red-500">Owner Name is required</span>
            )}
          </div>
          <div className="form-control w-full flex-1">
            <label>Owner Email</label>
            <input
              type="email"
              {...register("owner", {
                required: true,
              })}
              defaultValue={item?.owner}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="form-control w-full flex-1">
            <label>Owner Image</label>
            <input
              type="text"
              {...register("owner_image", {
                required: true,
              })}
              defaultValue={item?.owner_image}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.owner_image?.type === "required" && (
              <span className="text-red-500">photoUrl is required</span>
            )}
          </div>
          <div className="form-control w-full flex-1">
            <label>Product Name</label>
            <input
              type="text"
              {...register("product_name", {
                required: true,
              })}
              defaultValue={item?.product_name}
              placeholder="Enter Product Name"
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.product_name?.type === "required" && (
              <span className="text-red-500">Product name is required</span>
            )}
          </div>
        </div>
        <div className="form-control flex-1">
          <label>Description</label>
          <textarea
            type="text"
            {...register("details", { required: true })}
            defaultValue={item?.details}
            className="outline-0 border p-2 rounded text-sm"
            placeholder="Enter Description"
            cols="30"
            rows="10"
          />
          {errors?.details?.type === "required" && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="form-control w-full md:flex-1">
          <label>Add Tags</label>
          <TagsInput
            value={selected}
            onChange={setSelected}
            placeHolder="Enter Tag"
          />
        </div>
        <div className="form-control space-y-1">
          <label>Product Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full max-w-xs"
          />
          {errors?.image?.type === "required" && (
            <span className="text-red-500">Product image is required</span>
          )}
        </div>
        <div className="form-control flex items-center">
          <input
            type="submit"
            value="Submit"
            className="bg-yellow-500 hover:bg-transparent hover:border hover:border-yellow-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;

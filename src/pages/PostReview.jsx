import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const PostReview = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // const productInfo = {
    //   owner_name: data?.owner_name,
    // };
    // const res = await axiosPrivate.post("/user/products", productInfo);
    // if (res?.data?.insertedId) {
    //   reset();
    //   toast?.success(`${data?.product_name} is added!`, {
    //     position: "top-right",
    //     theme: "colored",
    //   });
    // }
    // navigate("/dashboard/my-products");
  };

  return (
    <div className="bg-white shadow-xl p-5 md:p-10">
      <h2 className="font-bold text-center text-4xl pb-5">Post Your Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="form-control w-full md:flex-1">
            <label>Your Name</label>
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              defaultValue={user?.displayName}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.name?.type === "required" && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control w-full flex-1">
            <label>Your Image</label>
            <input
              type="text"
              {...register("owner_image", {
                required: true,
              })}
              defaultValue={user?.photoURL}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.owner_image?.type === "required" && (
              <span className="text-red-500">photoUrl is required</span>
            )}
          </div>
        </div>
        <div className="form-control flex-1">
          <label>Description</label>
          <textarea
            type="text"
            {...register("details", { required: true })}
            className="outline-0 border p-2 rounded text-sm"
            placeholder="Enter Description"
            cols="30"
            rows="10"
          />
          {errors?.details?.type === "required" && (
            <span className="text-red-500">Description is required</span>
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

export default PostReview;

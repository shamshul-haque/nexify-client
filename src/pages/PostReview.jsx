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
    // const reviewInfo = {
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
              {...register("image", {
                required: true,
              })}
              defaultValue={user?.photoURL}
              readOnly
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.image?.type === "required" && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>
        </div>
        <div className="form-control flex-1">
          <label>Price</label>
          <input
            type="number"
            {...register("ratting", {
              required: true,
            })}
            placeholder="Give us ratting (Out of 5)"
            className="outline-0 border p-2 rounded text-sm"
          />
          {errors?.price?.type === "required" && (
            <span className="text-red-500">Ratting is required</span>
          )}
        </div>
        <div className="form-control flex-1">
          <label>Description</label>
          <textarea
            type="text"
            {...register("description", { required: true })}
            className="outline-0 border p-2 rounded text-sm"
            placeholder="Enter Description"
            cols="30"
            rows="10"
          />
          {errors?.description?.type === "required" && (
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

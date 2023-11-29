import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PostReview = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reviewInfo = {
      name: data?.name,
      image: data?.image,
      ratting: parseInt(data?.ratting),
      description: data?.description,
      productId: id,
    };
    const res = await axiosPrivate.post("/user/reviews", reviewInfo);
    if (res?.data?.insertedId) {
      reset();
      toast?.success(`Thanks for your valuable review!`, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="pb-14">
      <h2 className="font-bold text-center text-4xl pb-5">Post Your Review</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-emerald-500 rounded shadow-xl p-5 md:p-10"
      >
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
          <label>Ratting</label>
          <input
            type="number"
            {...register("ratting", {
              required: true,
            })}
            placeholder="Give us ratting (Out of 5)"
            className="outline-0 border p-2 rounded text-sm"
          />
          {errors?.ratting?.type === "required" && (
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

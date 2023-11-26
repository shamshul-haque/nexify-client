import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../components/shared/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center py-14">
      <div className="w-full max-w-sm bg-black bg-opacity-20 rounded p-5">
        <h1 className="text-3xl text-center font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control space-y-1 mb-3">
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.name?.type === "required" && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control space-y-1 mb-3">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="form-control space-y-1 mb-3">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
              })}
              placeholder="Type Password"
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors?.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be 8 characters
              </span>
            )}
            {errors?.password?.type === "pattern" && (
              <span className="text-red-500">
                Password should contain at least one uppercase letter, one
                lowercase letter, one number, and one special character..
              </span>
            )}
          </div>
          <div className="form-control space-y-1 mb-5">
            <label>Profile Picture</label>
            <input
              type="url"
              {...register("image", { required: true })}
              placeholder="Picture URL"
              className="outline-0 border p-2 rounded text-sm"
            />
            {errors?.image?.type === "required" && (
              <span className="text-red-500">Product image is required</span>
            )}
          </div>
          <div className="form-control">
            <input
              type="submit"
              value="Sign Up"
              className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer"
            />
          </div>
        </form>
        <SocialLogin />
        <p className="text-sm text-center pt-5">
          <span>{`Don't Have Any Account?`}</span>{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

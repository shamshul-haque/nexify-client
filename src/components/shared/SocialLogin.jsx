import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleLogin, logoutUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      const res = await axiosPrivate.post("/users/access-token", {
        email: user?.user?.email,
      });
      if (res?.data?.success) {
        const userInfo = {
          name: user?.user?.displayName,
          email: user?.user?.email,
        };
        axiosPublic.post("/users", userInfo);
        toast?.success("Login successful!", {
          position: "top-right",
          theme: "colored",
        });
        if (user) {
          navigate(from, {
            replace: true,
          });
        }
      } else {
        logoutUser();
      }
    } catch (err) {
      toast?.error(err?.code, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 max-w-xs mx-auto mb-5">
        <hr className="flex-1 border-emerald-500" />
        <span className="text-center font-bold border border-emerald-500 p-2 rounded-full">
          OR
        </span>
        <hr className="flex-1 border-emerald-500" />
      </div>
      <button
        onClick={handleGoogleLogin}
        className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase flex items-center justify-center gap-1 w-full"
      >
        <FcGoogle className="text-2xl" />
        <span>Continue With Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;

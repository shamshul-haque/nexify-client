import { Link, NavLink } from "react-router-dom";

const LgMenus = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 py-1 " : "py-1"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 py-1 " : "py-1"
        }
      >
        Products
      </NavLink>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle avatar">
          {/* {consition ? <img alt="" src="" className="rounded-full" /> : ""} */}
        </label>
        <div
          tabIndex={0}
          className="w-52 mr-10 -mt-2 z-50 p-5 shadow menu-sm dropdown-content bg-black bg-opacity-20 rounded-md flex flex-col"
        >
          <h1 className="font-bold text-center mb-3">
            Md. Shamshul Haque Molla
          </h1>
          <Link to="/" className="py-1">
            Dashboard
          </Link>
          <Link to="/" className="py-1">
            Logout
          </Link>
        </div>
      </div>
      <Link
        to="/login"
        className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer"
      >
        Login
      </Link>
    </div>
  );
};

export default LgMenus;

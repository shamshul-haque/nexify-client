import { Link, NavLink } from "react-router-dom";

const LgMenus = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 border-b py-1 " : "py-1"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 border-b py-1 " : "py-1"
        }
      >
        Products
      </NavLink>
      {/* <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle avatar">
          <img alt="profile picture" src="check" className="rounded-full" />
        </label>
        <div
          tabIndex={0}
          className="mt-3 z-50 p-5 shadow menu-sm dropdown-content bg-black rounded-box w-52 flex flex-col"
        >
          <h1 className="font-bold text-center mb-3">check</h1>
          <Link to="/">Dashboard</Link>
          <Link to="/">Logout</Link>
        </div>
      </div> */}
      <Link
        to="/login"
        className="bg-yellow-600 hover:bg-transparent hover:border hover:border-yellow-600 transition-all duration-500 p-2 rounded uppercase text-white"
      >
        Login
      </Link>
    </div>
  );
};

export default LgMenus;

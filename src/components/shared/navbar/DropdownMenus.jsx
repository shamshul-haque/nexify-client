import { RiMenu3Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const DropdownMenus = () => {
  return (
    <div className="dropdown dropdown-end z-50">
      <label tabIndex={0} className="btn m-1">
        <RiMenu3Fill className="text-xl" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-5 shadow bg-black rounded-box w-52"
      >
        <div className="flex flex-col">
          {/* <div className="text-center">
            <img
              alt="profile picture"
              src=""
              className="w-10 rounded-full mx-auto"
            />
            <h1 className="font-bold">check</h1>
            <Link to="/">Dashboard</Link>
          </div> */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-600 border-yellow-600 border-b py-1 "
                : "py-1"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-600 border-yellow-600 border-b py-1 "
                : "py-1"
            }
          >
            Products
          </NavLink>
          <Link
            to="/login"
            className="bg-yellow-600 hover:bg-transparent hover:border hover:border-yellow-600 transition-all duration-500 p-2 rounded uppercase text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenus;

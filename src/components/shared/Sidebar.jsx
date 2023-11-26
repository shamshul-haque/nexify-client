import { CgProfile } from "react-icons/cg";
import { FaHome, FaList, FaProductHunt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="w-60 min-h-screen bg-yellow-500 p-7 space-y-4 hidden md:block">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 uppercase ${isActive ? "text-white" : ""}`
          }
        >
          <FaHome className="text-xl" />
          Home
        </NavLink>
        <NavLink
          to="/dashboard/user-profile"
          className={({ isActive }) =>
            `flex items-center gap-2 uppercase ${isActive ? "text-white" : ""}`
          }
        >
          <CgProfile className="text-xl" />
          My Profile
        </NavLink>
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `flex items-center gap-2 uppercase ${isActive ? "text-white" : ""}`
          }
        >
          <FaProductHunt className="text-xl" />
          Add Product
        </NavLink>
        <NavLink
          to="/dashboard/my-products"
          className={({ isActive }) =>
            `flex items-center gap-2 uppercase ${isActive ? "text-white" : ""}`
          }
        >
          <FaList className="text-xl" />
          My Products
        </NavLink>
      </div>
      <div className="flex md:hidden items-center justify-evenly w-full bg-yellow-500 py-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-white" : ""}`}
        >
          <FaHome className="text-xl" />
        </NavLink>
        <NavLink
          to="/dashboard/user-profile"
          className={({ isActive }) => `${isActive ? "text-white" : ""}`}
        >
          <CgProfile className="text-xl" />
        </NavLink>
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) => `${isActive ? "text-white" : ""}`}
        >
          <FaProductHunt className="text-xl" />
        </NavLink>
        <NavLink
          to="/dashboard/my-products"
          className={({ isActive }) => `${isActive ? "text-white" : ""}`}
        >
          <FaList className="text-xl" />
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;

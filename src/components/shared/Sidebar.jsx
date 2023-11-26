import { CgProfile } from "react-icons/cg";
import { FaHome, FaList, FaProductHunt, FaUsers } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdReport, MdReviews } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const isAdmin = true;
  const isModerator = false;
  return (
    <>
      <div className="w-64 h-full bg-yellow-500 p-7 space-y-4 hidden md:block">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 uppercase ${isActive ? "text-white" : ""}`
          }
        >
          <FaHome className="text-xl" />
          Home
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink
              to="/dashboard/statistics"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <IoStatsChart className="text-xl" />
              Statistics
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <FaUsers className="text-xl" />
              Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/manage-coupons"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <RiCouponFill className="text-xl" />
              Manage Coupons
            </NavLink>
          </>
        ) : isModerator ? (
          <>
            <NavLink
              to="/dashboard/review-queue"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <MdReviews className="text-xl" />
              Review Queue
            </NavLink>
            <NavLink
              to="/dashboard/reported-contents"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <MdReport className="text-xl" />
              Reported Contents
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard/user-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <CgProfile className="text-xl" />
              My Profile
            </NavLink>
            <NavLink
              to="/dashboard/add-product"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <FaProductHunt className="text-xl" />
              Add Product
            </NavLink>
            <NavLink
              to="/dashboard/my-products"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : ""
                }`
              }
            >
              <FaList className="text-xl" />
              My Products
            </NavLink>
          </>
        )}
      </div>
      <div className="flex md:hidden items-center justify-evenly w-full bg-yellow-500 py-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-white" : ""}`}
        >
          <FaHome className="text-xl" />
        </NavLink>
        {isAdmin ? (
          <>
            <NavLink
              to="/dashboard/statistics"
              className={({ isActive }) => `${isActive ? "text-white" : ""}`}
            >
              <IoStatsChart className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) => `${isActive ? "text-white" : ""}`}
            >
              <FaUsers className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/manage-coupons"
              className={({ isActive }) => `${isActive ? "text-white" : ""}`}
            >
              <RiCouponFill className="text-xl" />
            </NavLink>
          </>
        ) : isModerator ? (
          <>
            <NavLink
              to="/dashboard/review-queue"
              className={({ isActive }) => `${isActive ? "text-white" : ""}`}
            >
              <MdReviews className="text-xl" />
            </NavLink>
            <NavLink
              to="/dashboard/reported-contents"
              className={({ isActive }) => `${isActive ? "text-white" : ""}`}
            >
              <MdReport className="text-xl" />
            </NavLink>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

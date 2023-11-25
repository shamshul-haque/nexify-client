import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;

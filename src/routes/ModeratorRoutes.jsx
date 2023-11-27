import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";

const ModeratorRoutes = ({ children }) => {
  const { user, loader } = useAuth();
  const { isModerator, isPending } = useModerator();
  const location = useLocation();

  if (loader || isPending) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-bars w-40 py-40"></span>
      </div>
    );
  }

  if (user && isModerator) {
    return children;
  }

  if (user && !isModerator) {
    return <Navigate to="/" />;
  }

  return <Navigate to="/login" state={{ from: location?.pathname }} replace />;
};

ModeratorRoutes.propTypes = {
  children: PropTypes.node,
};

export default ModeratorRoutes;

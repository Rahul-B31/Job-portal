import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const {reqUser} = useSelector((state) => state.auth);

 
  if (!reqUser?.name) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;

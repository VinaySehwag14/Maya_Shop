import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = (WrappedComponent) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  return (props) => {
    if (typeof window !== "undefined") {
      if (!user) {
        navigate("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;

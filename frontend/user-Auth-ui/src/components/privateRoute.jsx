import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const token = localStorage.getItem("token");//also try to check user objecgt is there or not
  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

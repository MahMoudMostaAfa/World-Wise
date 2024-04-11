import { useEffect } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuth) navigate("/");
    },
    [isAuth, navigate]
  );
  // LAZAM 34AN L USEFEFFECT BY4T8L B3D MA Y RENDER
  return isAuth ? children : null;
}

export default ProtectedRoute;

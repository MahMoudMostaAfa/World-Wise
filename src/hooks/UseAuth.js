import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a CitiesProvider");
  return context;
}
export { useAuth };

import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";
function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export { useCities };

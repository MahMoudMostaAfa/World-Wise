import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { useAuth } from "../hooks/UseAuth";
import User from "../components/User";

function AppLayout() {
  const { isAuth } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuth && <User />}
    </div>
  );
}

export default AppLayout;

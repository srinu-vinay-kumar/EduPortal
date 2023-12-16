import styles from "./styles.module.css";
import SideBar from "../Sidebar/SideBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>EduPortal</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.content_wrapper}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;

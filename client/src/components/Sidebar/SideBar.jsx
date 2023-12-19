import React from "react";
import styles from "./styles.module.css";
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>

      <div className={styles.indSB}>
      <NavLink to="/notes" className="d-flex align-items-center px-3 py-2">
        Notes
      </NavLink>
      </div>

      <div>
      <NavLink to="/resource-link" className="d-flex align-items-center px-3 py-2">
        Resources links
      </NavLink>
      </div>
      
      <div>
      <NavLink to="/diary" className="d-flex align-items-center px-3 py-2">
        Diary
      </NavLink>
      </div>
      
    </div>
  );
}

export default SideBar
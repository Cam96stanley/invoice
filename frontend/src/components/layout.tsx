import { Outlet } from "react-router-dom";
import "./layout.css";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";

export default function Layout() {
  return (
    <>
      <div className="nav">
        <div className="img-wrapper">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-actions">
          <img src={moon} alt="moon icon" />

          <p className="login-logout-text">Login</p>
        </div>
      </div>

      <Outlet />
    </>
  );
}

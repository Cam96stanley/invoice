import { Outlet, Link, useLocation } from "react-router-dom";
import "./layout.css";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";

export default function Layout() {
  const location = useLocation();

  const isSignupPage = location.pathname === "/signup";
  const linkText = isSignupPage ? "Login" : "Signup";
  const linkTo = isSignupPage ? "/" : "/signup";
  return (
    <>
      <div className="nav">
        <div className="img-wrapper">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-actions">
          <img src={moon} alt="moon icon" />

          <Link to={linkTo} className="login-logout-text">
            {linkText}
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

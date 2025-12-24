import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./layout.css";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import { useEffect, useState } from "react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axios.post(
          "http://localhost:5000/auth/logout",
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
      }
      console.error("Unknown error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const linkText = location.pathname === "/signup" ? "Login" : "Signup";
  const linkTo = location.pathname === "/signup" ? "/" : "/signup";

  return (
    <>
      <div className="nav">
        <div className="img-wrapper">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-actions">
          <img src={moon} alt="moon icon" />

          {isLoggedIn ? (
            <button
              className="login-logout-text"
              onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Logout
            </button>
          ) : (
            <Link to={linkTo} className="login-logout-text">
              {linkText}
            </Link>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

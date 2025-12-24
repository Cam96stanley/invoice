import type React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );

      const token = response.data.data.cognito.AuthenticationResult.AccessToken;
      const refreshToken =
        response.data.data.cognito.AuthenticationResult.RefreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error);
      } else if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
      }
      console.error("Unknown error:", err);
    }
  };

  return (
    <>
      <div id="login-page">
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

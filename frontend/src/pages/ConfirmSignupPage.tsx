import type React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./formPages.css";
import { useState } from "react";

export default function ConfirmSignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const payload = {
      email: data.email,
      code: data.confirmSignup,
    };

    try {
      await axios.post("http://localhost:5000/auth/confirm", payload);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
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
        <h1>Sign up</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmSignup">Confirmation Code:</label>
            <input
              type="text"
              id="confirmSignup"
              name="confirmSignup"
              placeholder="123456"
              required
            />
          </div>
          <button type="submit">Submit</button>
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

import { useState, useRef } from "react";
import axiosClient from "../axiosClient";
import useStateContext from "../contexts/useStateContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const Submit = (ev) => {
    ev.preventDefault();
    setErrorMessage("");

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        const allowedRoles = ['admin'];
        const hasAccess = data.user.roles.some(role => allowedRoles.includes(role.name));
        if (!hasAccess) {
          setErrorMessage('Access denied. You do not have permission to access this area.');
          return;
        }

        setUser(data.user);
        setToken(data.access_token);
        navigate("/dashboard");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrorMessage(response.data.error);
        }
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/plane-bg.jpg')" }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg animate-fadeInDown">
        <h1 className="text-2xl font-semibold text-center text-purple-700 mb-6">
          Login To Your Account
        </h1>
        <form onSubmit={Submit} className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-purple-300 text-purple-900 placeholder-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-purple-300 text-purple-900 placeholder-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );

}

import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
// Get the API URL from the environment variables
const apiURL = import.meta.env.VITE_API_URL;

export default function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate ();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  //Login user when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Both fields are required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    fetch(`${apiURL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Login successful");
          navigate("/user/test");
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="text-3xl font-bold mb-4">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mb-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {loading ? <Loading /> : "Login"}
        </button>
        <button
          type="button"
          onClick={() => { setEmail("guest@gmail.com");  setPassword("guest123"); }}
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Guest Login
        </button>
        <div className="mt-2">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setLogin(false)}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ type, onSubmit }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-[90%] max-w-lg p-6 bg-white rounded-xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-5xl">
          {type === "login"
            ? "Loin Here to Continue..."
            : "Register Here to Continue..."}
        </h1>
        {/* Email */}
        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
          >
            Email
          </label>
        </div>
        {type === "register" && (
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="username"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
            >
              Username
            </label>
          </div>
        )}

        {/* Password */}
        <div className="relative z-0 w-full group">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
          >
            Password
          </label>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign In
        </button>
        {/* <!-- Login Redirect --> */}
        {type === "register" && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        )}
        {/* <!-- Login Redirect --> */}
        {type === "login" && (
          <div className="text-center text-[#969696]">
            Don&#x27;t have an account?
            <Link
              to="/register"
              className="cursor-pointer text-[#7337FF] hover:underline"
            >
              Sign up
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;

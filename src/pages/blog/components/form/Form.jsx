import React, { useState } from "react";

const Form = ({ type, onSubmit }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    subtitle: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="max-w-2xl mx-auto text-5xl my-5">
        {type} <span>Blog's</span>
      </h1>
      <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />

        {/* Subtitle */}
        <input
          type="text"
          name="subtitle"
          onChange={handleChange}
          placeholder="Subtitle"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
        />

        {/* Category Dropdown */}
        <input
          type="text"
          name="category"
          onChange={handleChange}
          placeholder="category"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          onChange={handleChange}
          rows="4"
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

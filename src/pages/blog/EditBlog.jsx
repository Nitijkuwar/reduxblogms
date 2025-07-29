import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import {
  editBlog,
  fetchSingleBlog,
  setEditStatus,
} from "../../../store/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null, // file input
    category: "",
    subtitle: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, editStatus } = useSelector((state) => state.blog);

  // Fetch single blog when component mounts
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [id, dispatch]);

  // Set form values from fetched blog data
  useEffect(() => {
    if (data && data.length > 0) {
      const blog = data[0]; // because you're storing it as [response.data.data]
      setBlogData({
        title: blog.title || "",
        description: blog.description || "",
        image: null, // don't set as string (e.g., URL) — handled separately
        category: blog.category || "",
        subtitle: blog.subtitle || "",
      });
    }
  }, [data]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editBlog(blogData, id));
  };

  // On edit success, redirect
  useEffect(() => {
    if (editStatus === true) {
      dispatch(setEditStatus(null));
      navigate('/');
    }
  }, [editStatus, dispatch, id]);

  return (
    <Layout>
      <form onSubmit={handleEditSubmit}>
        <div className="max-w-2xl mx-auto p-4 bg-[#f2f2f2]">
          <h2 className="text-center text-4xl mt-5 font-bold">Edit Blog</h2>
          <br />

          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Title
            </label>
            <input
              value={blogData.title}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Subtitle */}
          <div className="mb-6">
            <label
              htmlFor="subtitle"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Subtitle
            </label>
            <input
              value={blogData.subtitle}
              type="text"
              id="subtitle"
              name="subtitle"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              value={blogData.category}
              id="category"
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={blogData.description}
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              rows="6"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Image */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default EditBlog;

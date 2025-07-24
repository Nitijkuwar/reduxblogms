import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  editBlog,
  fetchSingleBlog,
  setEditStatus,
} from "../../../store/blogSlice";

const EditBlog = () => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: blogData, editStatus } = useSelector((store) => store.blog);
  const blog = blogData?.[0]; // Assuming blog is in an array

  // Fetch blog by ID when component mounts
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  // When blog data is available, populate form
  useEffect(() => {
    if (blog) {
      setData({
        title: blog.title || "",
        subtitle: blog.subtitle || "",
        category: blog.category || "",
        description: blog.description || "",
        image: "", // Leave image blank; use file input only when changed
      });
    }
  }, [blog]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };

  // Submit edit
  const handleEditBlog = (e) => {
    e.preventDefault();
    dispatch(editBlog(data, id));
  };

  // Redirect
  useEffect(() => {
    if (editStatus === true) {
      // dispatch(setEditStatus(null));
      navigate("/"); // redirect to homepage
    }
  }, [editStatus, dispatch, navigate]);

  return (
    <Layout>
      <form onSubmit={handleEditBlog}>
        <div className="max-w-2xl mx-auto p-4 bg-[#f2f2f2]">
          <h2 className="text-center text-4xl mt-5 font-bold">Edit Blog</h2>
          <br />
          <div className="mb-6">
            <label htmlFor="title" className="block mb-1 text-lg font-medium">
              Title
            </label>
            <input
              value={data.title}
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="subtitle"
              className="block mb-1 text-lg font-medium"
            >
              Subtitle
            </label>
            <input
              value={data.subtitle}
              type="text"
              id="subtitle"
              name="subtitle"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-1 text-lg font-medium"
            >
              Category
            </label>
            <input
              value={data.category}
              type="text"
              id="category"
              name="category"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-1 text-lg font-medium"
            >
              Description
            </label>
            <textarea
              value={data.description}
              id="description"
              name="description"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block mb-1 text-lg font-medium">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600"
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

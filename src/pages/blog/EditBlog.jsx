import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import {
  editBlog,
  fetchBlog,
  fetchSingleBlog,
  setEditStatus,
} from "../../../store/blogSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    subtitle: "",
  });
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, editStatus } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [id]);
  useEffect(() => {
    if (data) {
      const blogData = data?.[0];
      setBlog({
        title: blogData?.title || "",
        description: blogData?.description || "",
        image: blogData?.image || "",
        category: blogData?.category || "",
        subtitle: blogData?.subtitle || "",
      });
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editBlog(blog, id));
  };
  useEffect(() => {
    if (editStatus === true) {
      dispatch(setEditStatus(null));
      navigate("/");
    }
  }, [editStatus]);

  //fetch blog
  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <form onSubmit={handleEditSubmit}>
          <div className="max-w-2xl mx-auto p-4 bg-[#f2f2f2]">
            <h2 className="text-center text-4xl mt-5 font-bold">Edit Blog</h2>{" "}
            <br />
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-800 mb-1"
              >
                Title
              </label>
              <input
                value={blog?.title}
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subtitle"
                className="block text-lg font-medium text-gray-800 mb-1"
              >
                Subtitle
              </label>
              <input
                value={blog?.subtitle}
                type="text"
                id="subtitle"
                name="subtitle"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-800 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                value={blog?.category}
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-800 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={blog?.description}
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                rows="6"
                onChange={handleChange}
                required
              ></textarea>
            </div>
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
    </>
  );
};

export default EditBlog;

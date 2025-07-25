import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { deleteBlog, fetchSingleBlog } from "../../../store/blogSlice";
import STATUSES from "../../globals/status/statuses";
import Spinner from "../../Spinner";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.blog);
  const blog = data?.[0];

  // Fetch blog on mount
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  // Handle blog deletion
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    dispatch(deleteBlog(id, token)).then(() => navigate("/"));
  };

  if (status === STATUSES.LOADING || !blog) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
          {/* Image + Buttons */}
          <div className="md:w-1/2">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-[460px] object-cover rounded-lg mb-4"
            />
            <div className="flex gap-4">
              <Link
                to={`/blog/edit/${blog._id}`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Blog Details */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {blog.subtitle}
            </p>
            <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Category:</strong> {blog.category}
              </p>
              <p>
                <strong>Author:</strong> {blog.userId?.username || "Unknown"}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                Description:
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {blog.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlog;

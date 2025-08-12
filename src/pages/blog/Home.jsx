import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../../store/blogSlice";
import Card from "./components/card/Card";
import Spinner from "./../../Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blog);
  const searchQuery = useSelector((state) => state.search.query);

  // Fetch blogs
  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  // Local loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter blogs by title or author
  const filteredBlogs = data?.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.userId?.username?.toLowerCase().includes(query)
    );
  });
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : filteredBlogs?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBlogs.map((blog) => (
            <Card blog={blog} key={blog._id || blog.id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-xl text-center mt-10">
          No blogs found.
        </p>
      )}
    </Layout>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../../store/blogSlice";
import Card from "./components/card/Card";
import Spinner from "./../../Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center my-10">
          {data?.length > 0 &&
            data.map((blog, index) => <Card blog={blog} key={index} />)}
        </div>
      )}
    </Layout>
  );
};

export default Home;

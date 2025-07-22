import React, { useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../../store/blogSlice";
import Card from "./components/card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center my-10">
        {data?.length > 0 &&
          data.map((blog, index) => <Card blog={blog} key={index} />)}
      </div>
    </Layout>
  );
};

export default Home;

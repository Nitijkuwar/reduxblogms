import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import STATUSES from "../../globals/status/statuses";
import { setStatus } from "../../../store/authSlice";
import { addBlog } from "../../../store/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const handleCreateBlog = (data) => {
    const result = dispatch(addBlog(data));
    if (result) {
      navigate("/"); // ✅ redirect to homepage
    }
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      dispatch(setStatus(null));
    }
  }, [status]);
  return (
    <Layout>
      <Form type="Create" onSubmit={handleCreateBlog} />
    </Layout>
  );
};

export default AddBlog;

import React, { useEffect, useState } from "react";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { register, setStatus } from "../../../store/authSlice";
import STATUSES from "../../globals/status/statuses";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Spinner";

const Register = () => {
  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleRegister = (data) => {
    dispatch(register(data));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      navigate("/login");
      dispatch(setStatus(null));
    }
  }, [status]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form type="register" onSubmit={handleRegister} />
      )}
    </>
  );
};

export default Register;

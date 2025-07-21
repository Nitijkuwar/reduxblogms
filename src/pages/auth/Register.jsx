import React from "react";
import Form from "./components/form/Form";
import { useDispatch } from "react-redux";
import { register } from "../../../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const handleRegister = (data) => {
    dispatch(register(data));
  };
  return <Form type="register" onSubmit={handleRegister} />;
};

export default Register;

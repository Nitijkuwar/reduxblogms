import React, { useEffect } from "react";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { register, setStatus } from "../../../store/authSlice";
import STATUSES from "../../globals/status/statuses";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  return <Form type="register" onSubmit={handleRegister} />;
};

export default Register;

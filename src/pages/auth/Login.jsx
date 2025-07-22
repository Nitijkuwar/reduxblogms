import React, { useEffect } from "react";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import STATUSES from "../../globals/status/statuses";
import { login, setStatus } from "../../../store/authSlice";

const Login = () => {
  const { user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      navigate("/");
      dispatch(setStatus(null));
    }
  }, [status]);

  return <Form type="login" user={user} onSubmit={handleLogin} />;
};

export default Login;

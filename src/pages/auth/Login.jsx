import React, { useEffect } from "react";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setStatus } from "../../../store/authSlice";
import STATUSES from "../../globals/status/statuses";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, token } = useSelector((state) => state.auth);

  const handleLogin = (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    // check the status value
    // status--> success -> navigate to login else register page
    if (status === STATUSES.SUCCESS) {
      localStorage.setItem("jwt", token);
      navigate("/");
      dispatch(setStatus(null));
    }
  }, [status]);
  return <Form type="login" user={user} onSubmit={handleLogin} />;
};

export default Login;

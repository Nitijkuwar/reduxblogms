import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "../src/globals/status/statuses";
import API from "../src/http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
export const { setStatus, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;

//register
export function register(data) {
  return async function registerThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("register", data);
      if (response.status === 201) {
        dispatch(setUser(data));
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
  v;
}
//login
export function login(data) {
  return async function loginThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      console.log(data);
      const response = await API.post("login", data);
      if (response.status === 200 && response.data.token) {
        dispatch(setToken(response?.data.token));
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

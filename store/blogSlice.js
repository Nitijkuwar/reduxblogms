import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "../src/globals/status/statuses";
import API from "../src/http";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: null,
    status: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setBlog(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setStatus, setBlog } = blogSlice.actions;
export default blogSlice.reducer;

//addblog
export function addBlog(data) {
  return async function addBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 201) {
        dispatch(setStatus(STATUSES.SUCCESS));
        return true;
      } else {
        dispatch(setStatus(STATUSES.ERROR));
        return false;
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//fetch

export function fetchBlog(data) {
  return async function fetchBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get("blog", data);
      if (response.status === 200 && response.data.data?.length > 0) {
        dispatch(setBlog(response.data.data));

        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//getSingleblog

export function getSingleBlog(id) {
  return async function (dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get(`blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        dispatch(setBlog([response.data.data]));
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//delete
export function deleteBlog(id) {
  return async function deleteBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.delete(`blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.error("Delete error:", error?.response || error);
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "../src/globals/status/statuses";
import API from "../src/http";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: null,
    status: null,
    editStatus: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setEditStatus(state, action) {
      state.editStatus = action.payload;
    },
  },
});
export const { setStatus, setData, setEditStatus } = blogSlice.actions;
export default blogSlice.reducer;

//addblog
export function addBlog(data) {
  return async function addBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("jwt"),
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
        dispatch(setData(response?.data?.data));

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

export function fetchSingleBlog(id) {
  return async function fetchSingleBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get(`blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      });
      if (response.status === 200) {
        dispatch(setData([response.data.data]));
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
          Authorization: localStorage.getItem("jwt"),
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//edit
export function editBlog(blogData, id) {
  return async function editBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.patch(`blog/${id}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("jwt"),
        },
      });

      if (response.status === 200) {
        dispatch(setEditStatus(true));
      } else {
        dispatch(setEditStatus(null));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

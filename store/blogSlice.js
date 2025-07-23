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
    setBlog(state, action) {
      state.data = action.payload;
    },
    setEditStatus(state, action) {
      state.editStatus = action.payload;
    },
  },
});
export const { setStatus, setBlog, setEditStatus } = blogSlice.actions;
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

export function fetchSingleBlog(id) {
  return async function fetchSingleBlogThunk(dispatch) {
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

//edit
export function editBlog(blog, id) {
//   return async function editBlogThunk(dispatch) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const response = await API.patch(`blog/${id}`, blog, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Authorization": localStorage.getItem("token"),
//         },
//       });
//       if (response.status === 200) {
//         dispatch(setEditStatus(true));
//       } else {
//         dispatch(setEditStatus(null));
//       }
//     } catch (error) {
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

export function editBlog(blog, id) {
  return async function editBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("subtitle", blog.subtitle);
      formData.append("category", blog.category);

      // If image is a File, append it; otherwise skip
      if (blog.image instanceof File) {
        formData.append("image", blog.image);
      }

      const response = await API.patch(`blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        dispatch(setEditStatus(true));
      } else {
        dispatch(setEditStatus(null));
      }
    } catch (error) {
      console.error("Edit blog failed:", error.response?.data || error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}


import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import Protected from "./Protected";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const SingleBlog = lazy(() => import("./pages/blog/SingleBlog"));
const EditBlog = lazy(() => import("./pages/blog/EditBlog"));
const AddBlog = lazy(() => import("./pages/blog/AddBlog"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/blog/Home"));

function ErrorFallBackBoundary({ error }) {
  return (
    <div>
      <h2>Something went wrong...</h2>
      <p>{error?.message}</p>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallBackBoundary}>
          {/* <Suspense fallback={<h1>Loading...</h1>}> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/blog/add"
              element={
                <Protected>
                  <AddBlog />{" "}
                </Protected>
              }
            />
            <Route
              path="/blog/edit/:id"
              element={
                <Protected>
                  <EditBlog />{" "}
                </Protected>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <Protected>
                  <SingleBlog />
                </Protected>
              }
            />
          </Routes>
          {/* </Suspense> */}
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

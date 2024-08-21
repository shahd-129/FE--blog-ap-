import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Layout , AuthLayout } from "Component";
import {Home , CreatePost , Login, SignUp} from "View"
export default function Route() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/signup" />,
    },
    {
      path: "/",
      element: <Layout/>,

      children: [
        {path:"home", element:<Home/>},
        {path:"create-post", element:<CreatePost/>},
      ],
    },
    {
      path: "/",
      element: <AuthLayout/>,
      children: [
        { path: "signup", element: <SignUp/> },
        { path: "login", element: <Login/> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


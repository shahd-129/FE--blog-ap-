import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Layout , AuthLayout } from "Component";
import {Home , Login, SignUp, Profile, UpdateUserData} from "View"
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
        {path:"profile/:id", element:<Profile/>},
        {path:"update-user/:id", element:<UpdateUserData/>},
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


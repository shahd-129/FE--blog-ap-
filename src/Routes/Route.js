// import React from "react";
// import {
//   Navigate,
//   RouterProvider,
//   createBrowserRouter,
// } from "react-router-dom";
// import Layout from "Component/Layout/Layout";
// import Signup from "View/SignUp/Signup";
// import Login from "View/Login/Login";
// import Home from "View/Home/Home";
// import AuthLayout from "Component/Layout/AuthLayout";
// import Gurd from "Component/Gurd/Gurd";
// import CreatePost from "View/CreatePost/CreatePost";

// export default function Route() {
//   let router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Navigate to="/signup" />,
//     },
//     {
//       path: "/",
//       element: <Layout/>,
//       children: [
//         {path:"home", element:<Gurd><Home/></Gurd>},
//         {path:"create-post", element:<Gurd><CreatePost/></Gurd>},
//       ],
//     },
//     {
//       path: "/",
//       element: <AuthLayout/>,
//       children: [
//         { path: "signup", element: <Signup/> },
//         { path: "login", element: <Login/> },
//       ],
//     },
//   ]);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }


// import React from "react";
// import {
//   // Navigate,
//   RouterProvider,
//   createBrowserRouter,
// } from "react-router-dom";
// import Layout from "Component/Layout/Layout";
// // import Signup from "View/SignUp/Signup";
// // import Login from "View/Login/Login";
// import Home from "View/Home/Home";
// // import AuthLayout from "Component/Layout/AuthLayout";
// import Gurd from "Component/Gurd/Gurd";
// import CreatePost from "View/CreatePost/CreatePost";

// export default function Route() {
//   // let router = createBrowserRouter([
//   //   {
//   //     path: "/signup",
//   //     element: <Signup />,
//   //   },
//   //   {
//   //     path: "/login",
//   //     element: <Login />,
//   //   },
//   //   {
//   //     path: "/",
//   //     element: <Layout />,
//   //     children: [
//   //       { path: "home", element: <Gurd><Home /></Gurd> },
//   //       { path: "create-post", element: <Gurd><CreatePost /></Gurd> },
//   //     ],
//   //   },
//   //   {
//   //     path: "*",
//   //     element: <Navigate to="/signup" />,
//   //   },
//   // ]);


//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }



import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "Component/Layout/Layout";
import Signup from "View/SignUp/Signup";
import Login from "View/Login/Login";
import Home from "View/Home/Home";
import AuthLayout from "Component/Layout/AuthLayout";
import Gurd from "Component/Gurd/Gurd";
import CreatePost from "../View/CreatePost/CreatePost.jsx";

export default function Route() {
  let router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home", element: <Gurd><Home/></Gurd> },
        { path: "create-post", element: <Gurd><CreatePost/></Gurd> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/signup" replace />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

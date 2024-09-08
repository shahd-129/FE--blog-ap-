import React, { useEffect } from "react";
import "./App.css";
import Route from "./Routes/Route";
import { useDispatch } from "react-redux";
// import store from "./Redux/Store/Store";
import { setToken } from "./Redux/Slices/tokenSlice";


export default function App() {

 const dispatch = useDispatch()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
    
 
  return (
      <Route />
  );
}

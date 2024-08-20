import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import HttpService from "util/HttpService";

export default function Gurd() {
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

      
    if (token) {
      try {
        const response = await HttpService.get(
          "http://localhost:3000/user/validate",
          {}
        );

        console.log(response);
        


        if (response.status === 200 && response.data.valid) {
          <Navigate to="/" />;
        } else {
          <Navigate to="/login" />;
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const spinner = <CircularProgress color="secondary" />;

  if (loading) {
    return spinner;
  }
}

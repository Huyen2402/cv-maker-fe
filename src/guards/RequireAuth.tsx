import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt from "jwt-decode";
import AuthAPI from "../apis/auth.api";
export const RequireAuth = ({ children, ...rest }: any) => {
  const [isAdmin, setIsAdmin] = useState(-1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    setIsAdmin(token ? 1 : 0);
    console.log(isAdmin);
    
  }, []);

  
    if (isAdmin === 1) {
      (async function () {
      const refreshToken: any = localStorage.getItem("refreshToken");
      const decode: any = jwt(refreshToken);
      console.log(decode.exp);
      const dateRF = decode.exp*1000;
      const start = Date.now();
      if(dateRF <= start){
        try {
          const result = await AuthAPI.refreshToken(refreshToken);
        } catch (error) {
          alert("Mất nick ròi baaaaa");
          window.location.href = "http://localhost:3000/login";
        }
      }
      return children;
    })()
    } else if (isAdmin === 0) {
      console.log("login");
  
      return <Navigate to="/login" replace={false} />;
    }

  return <></>;
};

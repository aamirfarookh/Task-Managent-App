import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { serverLink } from "../main";
import { toast } from 'react-toastify';
import axios from "axios";
import { useState } from "react";

function Header() {
  const { setIsAuth, isAuth, userName, setUserName,accessToken } =
    useContext(AppContext);

    const [loading,setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${serverLink}/api/auth/logout`,{}, {
        headers:{
          "Content-Type":"application/json",
          authorization:accessToken
        },
      });
      toast.success(data.message);
      setIsAuth(false);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsAuth(true);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <nav className="main-navbar">
      <div>
        <h2>Task Management App</h2>
      </div>

      <div className="right-nav">
        <ul>
          {" "}
          <Link to="/">Home</Link>
        </ul>
        <ul>
          {" "}
          <Link to="/profile">Create Task</Link>
        </ul>

        {isAuth ? (
          <>
            <button disabled={loading} onClick={handleLogout} className="btn">
              Logout
            </button>
          </>
        ) : (
          <ul>
            {" "}
            <Link to="/login">Login</Link>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;

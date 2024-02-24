import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContextProvider";
import axios from "axios";
import { serverLink } from "../main";
import { toast } from 'react-toastify';

import { Navigate,useNavigate } from "react-router-dom";

import { Card, CardBody,Stack,Heading,Text} from "@chakra-ui/react";

function Create() {
  const navigate = useNavigate()
  const { setIsAuth, isAuth,accessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date,setDate] = useState(null);

  if (!isAuth) return <Navigate to="/login" />;

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/api/tasks/create`,
        {
          title,
          description,
          due_date:date
        },
        {
          
          headers: {
            "Content-Type": "application/json",
            authorization:accessToken,
          },
        }
      );
      setLoading(false);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setDate(null);
      navigate("/")
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleForm}>
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <input
      type="date"
      placeholder="Due Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    
    <button disabled={loading || description=="" || title=="" || date==null} type="submit">ADD TASK</button>
  </form>
  );
}

export default Create;

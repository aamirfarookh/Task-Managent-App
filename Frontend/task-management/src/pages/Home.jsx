import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../main";
import { toast } from 'react-toastify';
import TodoLists from "../components/TodoLists";
import { AppContext } from "../components/AppContextProvider";
import { Form, Navigate } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";

function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setIsAuth, isAuth,accessToken } = useContext(AppContext);

  const updateHandler = async (id,iscompleted) => {
    try {
      const { data } = await axios.patch(
        `${serverLink}/api/tasks/${id}`,
        {completed:iscompleted.toString()},
        {
          
            headers: {
              "Content-Type": "application/json",
              authorization:accessToken
            },
            
          
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverLink}/api/tasks/${id}`, {
        headers:{
          authorization:accessToken
        }
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const getAllTask = async () => {
    try {
      let { data } = await axios.get(`${serverLink}/api/tasks/all-tasks`, {
          headers: {
            "Content-Type": "application/json",
             authorization:accessToken
          },
          
      });
      setUserTasks(data.data);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      <div className="sub-Container" style={{ boder: "2px solid red" }}>
        <TableContainer>
          <Table variant="simple" width={"80%"} m={"auto"} mt={"2rem"}>
            <Thead bg="blue.600">
              <Tr>
                <Th color="white">Title</Th>
                <Th color="white">Description</Th>
                <Th color="white">due date</Th>
                <Th color="white">status </Th>
                <Th color="white">delete </Th>
              </Tr>
            </Thead>

            {userTasks?.map((task) => {
              return (
                <TodoLists
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.completed}
                  dueDate={task.due_date}
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                  id={task._id}
                />
              );
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;

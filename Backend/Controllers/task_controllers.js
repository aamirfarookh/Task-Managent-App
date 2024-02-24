const { Task } = require("../Models/task.model");
const { ObjectId } = require('mongoose').Types;

const createTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        const { userId } = req.user;
      
        if (!title || !description || !due_date) {
          return res.status(400).send({
            status_code: 400,
            status: 0,
            message: "Failed to create task",
            error: "Insufficient information!",
            data: {},
          });
        }
      const newTask = new Task({
        user:userId,
        title,
        description,
        due_date,
      });

      await newTask.save();
      return res.status(201).send({
        status_code:201,
        status:1,
        message:"Task created successfully!",
        data:newTask,
        error:null
      })
    } catch (error) {
        console.log("ERROR_CREATING_TASK",error);
        return res.status(500).send({
            status_code:500,
            status:0,
            message:"Internal Server Error!",
            error:error.message,
            data:{}
        })
    }
};

const getTasks = async (req, res) => {
    const {userId} = req.user;
    
    try {
        const tasks = await Task.find({user:userId}).sort({due_date:1});

        return res.status(200).send({
            status_code:200,
            message:"Tasks fetched successfully!",
            data:tasks,
            error:null,
            status:1
        })
    } catch (error) {
        console.log("ERROR_FETCHING_TASKS_FROM_DB",error);
        return res.status(500).send({
            status_code:500,
            status:0,
            message:"Internal Server Error!",
            error:error.message,
            data:{}
        })
    }
};

const updateTask = async (req, res) => {
    const {taskId} = req.params;
     const {title,description,due_date,completed} = req.body;
     
     if(!title && !description && !due_date && !completed){
        return res.status(400).send({
            status_code:400,
            status:0,
            message:"Failed to update task!",
            error:"Please pass at least one feild to be updated!",
            data:{}
        })
     }

    if (!ObjectId.isValid(taskId)) {
        return res.status(400).send({
            status_code: 400,
            status: 0,
            message: "Invalid taskId!",
            error: "TaskId must be a valid ObjectId.",
            data: {}
        });
    }
    try {
        const updatedTask = await Task.findOneAndUpdate({_id:taskId},req.body,{new:true});

        if(!updatedTask){
            return res.status(404).send({
                status_code:404,
                status:0,
                message:"Failed to update task",
                error:"No task found with this task id.",
                data:{}
            })
        }

        return res.status(200).send({
            status_code:200,
            status:1,
            message:"Task updated successfully!",
            data:updatedTask,
            error:null
        })
    
    } catch (error) {
        console.log("ERROR_UPDATING_TASK",error);
        return res.status(500).send({
            status_code:500,
            status:0,
            message:"Internal Server Error!",
            error:error.message,
            data:{}
        })
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    if (!ObjectId.isValid(taskId)) {
        return res.status(400).send({
            status_code: 400,
            status: 0,
            message: "Invalid taskId!",
            error: "TaskId must be a valid ObjectId.",
            data: {}
        });
    }

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });

        if (!deletedTask) {
            return res.status(404).send({
                status_code: 404,
                status: 0,
                message: "Failed to delete task",
                error: "No task found with this task id.",
                data: {}
            });
        }

        return res.status(200).send({
            status_code: 200,
            status: 1,
            message: "Task deleted successfully!",
            data: deletedTask,
            error: null
        });

    } catch (error) {
        console.log("ERROR_DELETING_TASK", error);
        return res.status(500).send({
            status_code: 500,
            status: 0,
            message: "Internal Server Error!",
            error: error.message,
            data: {}
        });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

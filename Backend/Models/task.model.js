const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    due_date: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = { Task };

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addTask,
  toggleCompleted,
  toggleImportant,
  deleteTask,
  updateTask,
} from "../store/taskAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = ({ handleTaskDetailModal }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const error = useSelector((state) => state.tasks.error);
  const loading = useSelector((state) => state.tasks.loading);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks on initial render
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
      toast.success("Task added successfully!");
    }
  };

  // Update task (called from TaskDetail modal)
  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setSelectedTask(null);
    toast.success("Task updated successfully!");
  };

  // Refresh tasks
  const handleRefreshTasks = () => {
    dispatch(fetchTasks());
    toast.info("Tasks refreshed!");
  };

  // Handle Calendar Icon (for example, showing a date picker)
  const handleCalendarClick = () => {
    toast.info("Open Calendar Modal");
    // Your logic for opening a calendar modal or filter tasks by date
  };

  // Handle Notification Icon (for example, showing a notification)
  const handleNotificationClick = () => {
    toast.info("No new notifications");
    // Your logic for showing notifications
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-all duration-300 ${
        isDarkMode ? "bg-[#242424] text-white" : "bg-green-50 text-black"
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">To Do</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notification Icon */}
          <i
            className="ri-notification-line text-lg sm:text-xl cursor-pointer"
            onClick={handleNotificationClick}
          ></i>
          {/* Refresh Icon */}
          <i
            className="ri-refresh-line text-lg sm:text-xl cursor-pointer"
            onClick={handleRefreshTasks}
          ></i>
          {/* Calendar Icon */}
          <i
            className="ri-calendar-line text-lg sm:text-xl cursor-pointer"
            onClick={handleCalendarClick}
          ></i>
        </div>
      </div>

      {/* Add Task Section */}
      <div
        className={`rounded-lg p-4 mb-4 ${
          isDarkMode ? "bg-[#444] text-white focus:ring-green-700" : "bg-green-50 focus:ring-green-200"
        }`}
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
          className={`w-full rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "bg-[#444] text-white focus:ring-green-700"
              : "bg-gray-100 focus:ring-green-200"
          }`}
        />
        <button
          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isDarkMode
              ? "bg-green-700 text-white hover:bg-green-600"
              : "bg-green-300 text-green-900 hover:bg-green-200"
          }`}
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {loading && <div className="text-gray-500 text-sm">Loading tasks...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Task List */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Pending Tasks</h2>
        {tasks.filter((task) => !task.completed).map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between px-4 py-3 rounded-lg hover:cursor-pointer ${
              isDarkMode ? "bg-[#333]" : "bg-white"
            }`}
            onClick={() => handleTaskDetailModal(task)}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleCompleted(task.id))}
                className="w-5 h-5 text-green-600 focus:ring-green-500"
              />
              <span
                className={`ml-3 text-sm sm:text-base ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <i
                className={`ri-star-line ${
                  task.important ? "text-green-600" : "text-gray-400"
                } text-lg sm:text-xl cursor-pointer`}
                onClick={() => {
                  dispatch(toggleImportant(task.id));
                  toast.success(
                    task.important ? "Task marked as important!" : "Task unmarked as important!"
                  );
                }}
              ></i>
              <i
                className="ri-delete-bin-line text-lg sm:text-xl text-red-500 cursor-pointer"
                onClick={() => {
                  dispatch(deleteTask(task.id));
                  toast.error("Task deleted!");
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Task List */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Completed Tasks</h2>
        {tasks.filter((task) => task.completed).map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between px-4 py-3 rounded-lg hover:cursor-pointer ${
              isDarkMode ? "bg-[#333]" : "bg-white"
            }`}
            onClick={() => handleTaskDetailModal(task)}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleCompleted(task.id))}
                className="w-5 h-5 text-green-600 focus:ring-green-500"
              />
              <span
                className={`ml-3 text-sm sm:text-base ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <i
                className={`ri-star-line ${
                  task.important ? "text-green-600" : "text-gray-400"
                } text-lg sm:text-xl cursor-pointer`}
                onClick={() => {
                  dispatch(toggleImportant(task.id));
                  toast.success(
                    task.important ? "Task marked as important!" : "Task unmarked as important!"
                  );
                }}
              ></i>
              <i
                className="ri-delete-bin-line text-lg sm:text-xl text-red-500 cursor-pointer"
                onClick={() => {
                  dispatch(deleteTask(task.id));
                  toast.error("Task deleted!");
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TaskManager;

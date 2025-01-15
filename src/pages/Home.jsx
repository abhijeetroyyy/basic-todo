import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarComponent from "../components/SidebarComponent";
import TaskManager from "../components/TaskManager";
import TaskDetail from "../components/TaskDetail";
import { toggleTheme } from "../store/themeAction";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Set to null initially, not `true`
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleTaskDetailModal = (task) => {
    setSelectedTask(task); // Set the task that was clicked
    setIsTaskDetailModalOpen(true); // Ensure the modal is open
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleUpdateTask = (updatedTask) => {
    // Update task logic here
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-4 min-h-screen gap-4 p-4 ${isDarkMode ? "bg-[#242424] text-white" : "bg-white text-black"}`}
    >
      {/* Sidebar for large screens */}
      <div
        className={`hidden lg:block w-full shadow-lg rounded-lg p-4 mr-2 ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-black"}`}
      >
        <SidebarComponent />
      </div>

      {/* Sidebar and Task Manager for mobile view */}
      <div className="lg:hidden">
        <div className="flex">
          <div
            className={`w-20 rounded-lg p-4 mr-2 ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-black"}`}
          >
            <SidebarComponent />
          </div>
          <div
            className={`flex-1 p-4 ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-black"}`}
          >
            <TaskManager handleTaskDetailModal={handleTaskDetailModal} />
          </div>
        </div>
      </div>

      {/* Task Manager - Hidden on small screens */}
      <main
        className={`col-span-1 lg:col-span-2 shadow-lg rounded-lg p-4 lg:block hidden ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-black"}`}
      >
        <TaskManager handleTaskDetailModal={handleTaskDetailModal} />
      </main>

      {/* Task Detail - Hidden on small screens */}
      <aside
        className={`col-span-1 shadow-lg rounded-lg p-4 hidden lg:block ${isDarkMode ? "bg-[#333] text-white" : "bg-white text-black"}`}
      >
        {selectedTask ? (
          <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleUpdateTask} />
        ) : (
          <p className="text-center text-gray-500">No task selected</p>
        )}
      </aside>
    </div>
  );
};

export default Home;

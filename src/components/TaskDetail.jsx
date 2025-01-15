import React, { useState } from "react";
import { useSelector } from "react-redux";

const TaskDetail = ({ task, onClose, onUpdate }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [taskText, setTaskText] = useState(task.text);
  const [taskImportant, setTaskImportant] = useState(task.important);
  const [taskSteps, setTaskSteps] = useState(task.steps || []);
  const [reminder, setReminder] = useState(task.reminder || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [repeating, setRepeating] = useState(task.repeating || false);

  const [showAddStep, setShowAddStep] = useState(false);
  const [showSetReminder, setShowSetReminder] = useState(false);
  const [showSetDueDate, setShowSetDueDate] = useState(false);
  const [newStepText, setNewStepText] = useState("");
  const [newReminderText, setNewReminderText] = useState("");

  const handleSave = () => {
    onUpdate({
      ...task,
      text: taskText,
      important: taskImportant,
      steps: taskSteps,
      reminder,
      dueDate,
      repeating,
    });
  };

  const handleAddStep = () => {
    if (newStepText.trim()) {
      setTaskSteps([...taskSteps, { text: newStepText, completed: false }]);
      setNewStepText("");
      setShowAddStep(false);
    }
  };

  const handleToggleStepCompletion = (index) => {
    const updatedSteps = [...taskSteps];
    updatedSteps[index].completed = !updatedSteps[index].completed;
    setTaskSteps(updatedSteps);
  };

  const handleSetReminder = () => {
    if (newReminderText.trim()) {
      setReminder(newReminderText);
      setNewReminderText("");
      setShowSetReminder(false);
    }
  };

  const handleSetDueDate = (date) => {
    if (date) {
      setDueDate(date);
      setShowSetDueDate(false);
    }
  };

  const handleToggleRepeat = () => {
    setRepeating(!repeating);
  };

  const handleDeleteTask = () => {
    onUpdate({ ...task, deleted: true });
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 flex flex-col justify-between transition-all duration-300 ${
        isDarkMode ? "bg-[#242424] text-white" : "bg-green-50 text-black"
      }`}
    >
      {/* Task Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              className={`w-5 h-5 rounded focus:ring-2 ${
                isDarkMode
                  ? "text-green-500 border-gray-600 focus:ring-green-700"
                  : "text-green-600 border-gray-300 focus:ring-green-500"
              }`}
              onChange={() => onUpdate({ ...task, completed: !task.completed })}
            />
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className={`ml-3 text-lg font-medium bg-transparent border-b-2 focus:outline-none transition-all duration-300 ${
                isDarkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"
              }`}
            />
          </div>
          <i
            className={`ri-star-line text-xl cursor-pointer ${
              taskImportant
                ? "text-green-600"
                : isDarkMode
                ? "text-gray-400 hover:text-green-500"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setTaskImportant(!taskImportant)}
          ></i>
        </div>

        {/* Task Actions */}
        <div className="space-y-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowAddStep(true)}
          >
            <i className="ri-add-line text-lg"></i>
            <span className="ml-3">Add Step</span>
          </div>
          {showAddStep && (
           <div className={`mt-2 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            isDarkMode ? "bg-[#333]" : "bg-white"
          }`}>  
              <div className={`flex items-center`}>
                <input
                  type="text"
                  value={newStepText}
                  onChange={(e) => setNewStepText(e.target.value)}
                  className={`w-full rounded-lg px-4 py-2 focus:outline-none transition-all duration-300 ${
                    isDarkMode ? "bg-[#333]" : "bg-white"
                  }`}
                  placeholder="Enter step text"
                />
                <button
                  onClick={() => setShowAddStep(false)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <button
                onClick={handleAddStep}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Step
              </button>
            </div>
          )}

          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowSetReminder(true)}
          >
            <i className="ri-notification-line text-lg"></i>
            <span className="ml-3">Set Reminder</span>
          </div>
          {showSetReminder && (
            <div className={`mt-2 p-4 rounded-lg shadow-lg transition-all duration-300 ${
              isDarkMode ? "bg-[#333]" : "bg-white"
            }`}>
              <div className={`flex items-center ${
            isDarkMode ? "bg-[#444] text-white focus:ring-green-700" : "bg-green-50 focus:ring-green-200"
          }`}>
                <input
                  type="text"
                  value={newReminderText}
                  onChange={(e) => setNewReminderText(e.target.value)}
                  className={`w-full rounded-lg px-4 py-2 focus:outline-none transition-all duration-300 ${
                    isDarkMode ? "bg-[#333]" : "bg-white"
                  }`}
                  placeholder="Enter reminder text"
                />
                <button
                  onClick={() => setShowSetReminder(false)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <button
                onClick={handleSetReminder}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Set Reminder
              </button>
            </div>
          )}

          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowSetDueDate(true)}
          >
            <i className="ri-calendar-line text-lg"></i>
            <span className="ml-3">Add Due Date</span>
          </div>
          {showSetDueDate && (
            <div className={`mt-2 p-4 rounded-lg shadow-lg transition-all duration-300 ${
              isDarkMode ? "bg-[#333]" : "bg-white"
            }`}>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => handleSetDueDate(e.target.value)}
                className={`w-full rounded-lg px-4 py-2 focus:outline-none transition-all duration-300 ${
                  isDarkMode ? "bg-[#333]" : "bg-white"
                }`}
              />
              <button
                onClick={() => setShowSetDueDate(false)}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          )}

          <div
            className="flex items-center cursor-pointer"
            onClick={handleToggleRepeat}
          >
            <i className="ri-refresh-line text-lg"></i>
            <span className="ml-3">Repeat</span>
          </div>
        </div>

        {/* Task Steps */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Steps</h3>
          {taskSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleToggleStepCompletion(index)}
            >
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() => handleToggleStepCompletion(index)}
                className="w-5 h-5 rounded focus:ring-2"
              />
              <span className={step.completed ? "line-through" : ""}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Reminder and Due Date */}
        <div className="mt-6">
          <p className="text-sm font-medium">Reminder: {reminder}</p>
          <p className="text-sm font-medium">Due Date: {dueDate}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleDeleteTask}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Task
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;

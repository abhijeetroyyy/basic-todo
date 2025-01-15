import React, { useState } from "react";
import { useSelector } from "react-redux";

const SidebarComponent = ({ profileName = "Hey, Abhijeet" }) => {
  const [activeItem, setActiveItem] = useState("Today");
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const navigationItems = [
    { icon: "task-line", text: "All Tasks" },
    { icon: "calendar-line", text: "Today" },
    { icon: "star-line", text: "Important" },
    { icon: "map-pin-line", text: "Planned" },
    { icon: "user-line", text: "Assigned to me" },
    
  ];

  const handleAddList = () => {
    if (newListName.trim()) {
      setLists([...lists, newListName]);
      setNewListName("");
    }
    setIsModalOpen(false); // Close the modal after adding list
  };

  return (
    <div
      className={`min-h-screen p-4 flex flex-col lg:w-full transition-all duration-300 w-20 ${
        isDarkMode ? "bg-[#242424] text-white" : "bg-green-50 text-black"
      }`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-4">
        <img
          src="https://aroy2o.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddjvqd8o4%2Fimage%2Fupload%2Fv1733674808%2FWhatsApp_Image_2024-12-08_at_9.16.15_PM_lnrmey.jpg&w=256&q=75"
          alt="Profile"
          className="w-12 h-12 md:w-20 md:h-20 rounded-full"
        />
        <p className="mt-2 font-semibold text-sm md:text-base">
          {profileName}
        </p>
      </div>

      {/* Navigation Section */}
      <nav className="mt-6 w-full">
        <ul className="space-y-3">
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                activeItem === item.text
                  ? isDarkMode
                    ? "bg-[#3a3a3a]"
                    : "bg-green-100"
                  : isDarkMode
                  ? "bg-[#242424]"
                  : "bg-white"
              } rounded-lg shadow hover:text-green-600`}
              onClick={() => setActiveItem(item.text)}
              aria-label={item.text}
            >
              <i
                className={`ri-${item.icon} text-lg ${
                  activeItem === item.text
                    ? "text-green-600"
                    : isDarkMode
                    ? "text-white"
                    : "text-black"
                }`}
              ></i>
              <span
                className={`ml-3 text-sm md:text-base hidden lg:inline ${
                  activeItem === item.text
                    ? "text-green-600"
                    : "hover:text-green-600"
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
          {lists.map((list, index) => (
            <li
              key={index}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                activeItem === list
                  ? isDarkMode
                    ? "bg-[#3a3a3a]"
                    : "bg-green-100"
                  : isDarkMode
                  ? "bg-[#242424]"
                  : "bg-white"
              } rounded-lg shadow hover:bg-green-100`}
              onClick={() => setActiveItem(list)}
              aria-label={list}
            >
              <i className="ri-file-list-line text-lg text-green-600"></i>
              <span
                className={`ml-3 text-sm md:text-base hidden lg:inline ${
                  activeItem === list
                    ? "text-green-600"
                    : "hover:text-green-600"
                }`}
              >
                {list}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Add List Button */}
      <button
        className="mt-6 flex items-center w-full px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-100"
        aria-label="Add List"
        onClick={() => setIsModalOpen(true)} // Open modal
      >
        <i className="ri-add-line text-lg"></i>
        <span className="ml-3 text-sm md:text-base hidden lg:inline">
          Add list
        </span>
      </button>

      {/* Modal for New List */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 ${
            isDarkMode ? "bg-black bg-opacity-75" : "bg-gray-500 bg-opacity-50"
          } flex items-center justify-center z-50`}
        >
          <div
            className={`p-6 rounded-lg shadow-md w-11/12 md:w-1/3 ${
              isDarkMode ? "bg-[#3a3a3a] text-white" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Enter List Name</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className={`w-full p-2 border rounded-lg mb-4 ${
                isDarkMode
                  ? "bg-[#2a2a2a] border-[#4a4a4a] text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="List name"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal without saving
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddList} // Add the list and close modal
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarComponent;

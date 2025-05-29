
import React, { useRef } from 'react';

const TodoInput = ({ inputValue, setInputValue, onAddTask }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onAddTask(inputValue.trim());
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow-lg">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
      <button
        type="submit"
        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoInput;

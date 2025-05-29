import React, { useRef, useEffect } from "react";

const TaskItem = ({
  task,
  editingId,
  editValue,
  setEditValue,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) => {
  const isEditing = editingId === task.id;
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border-l-4 transition-all duration-200 ${
        task.completed ? "border-green-400 bg-green-50" : "border-blue-400"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            ref={editInputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit(task.id);
              if (e.key === "Escape") onCancelEdit();
            }}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => onSaveEdit(task.id)}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-lg ${
              task.completed
                ? "text-gray-500 line-through decoration-2"
                : "text-gray-800"
            }`}
          >
            {task.text}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onStartEdit(task.id, task.text)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;

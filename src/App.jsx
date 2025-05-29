// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TaskItem from './components/TaskItem';
import FilterButtons from './components/FilterButtons';
import TaskStats from './components/TaskStats';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const sampleTasks = [
        { id: 1, text: 'Learn React hooks', completed: false },
        { id: 2, text: 'Build a todo app', completed: true },
        { id: 3, text: 'Master Tailwind CSS', completed: false }
      ];
      setTasks(sampleTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === '') return;
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: editValue.trim() } : task
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">React Todo App</h1>
          <p className="text-gray-600">Demonstrating React Frontend Basics with Functional Components</p>
        </div>

        <TodoInput inputValue={inputValue} setInputValue={setInputValue} onAddTask={addTask} />

        <FilterButtons filter={filter} setFilter={setFilter} counts={{ total: tasks.length, pending: pendingCount, completed: completedCount }} />

        <TaskStats total={tasks.length} pending={pendingCount} completed={completedCount} />

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filter} Tasks {filter !== 'All' && `(${filteredTasks.length})`}
          </h2>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">
                {filter === 'All' ? 'No tasks yet. Add one above!' : `No ${filter.toLowerCase()} tasks.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  editingId={editingId}
                  editValue={editValue}
                  setEditValue={setEditValue}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onStartEdit={startEdit}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

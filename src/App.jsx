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
  const [darkMode, setDarkMode] = useState(false);

  // On load
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (text) => {
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
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
    if (!editValue.trim()) return;
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">React Todo App</h1>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <TodoInput inputValue={inputValue} setInputValue={setInputValue} onAddTask={addTask} />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          counts={{ total: tasks.length, pending: pendingCount, completed: completedCount }}
        />

        <TaskStats total={tasks.length} pending={pendingCount} completed={completedCount} />

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow transition">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {filter} Tasks ({filteredTasks.length})
          </h2>

          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300 py-4">No tasks available.</p>
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

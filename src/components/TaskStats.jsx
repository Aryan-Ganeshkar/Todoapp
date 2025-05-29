
import React from 'react';

const StatCard = ({ count, label, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
    <h3 className={`text-2xl font-bold ${color}`}>{count}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

const TaskStats = ({ total, pending, completed }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard count={total} label="Total Tasks" color="text-blue-600" />
      <StatCard count={pending} label="Pending" color="text-orange-600" />
      <StatCard count={completed} label="Completed" color="text-green-600" />
    </div>
  );
};

export default TaskStats;

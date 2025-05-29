import React from "react";

const FilterButton = ({ filterType, currentFilter, onClick, count }) => (
  <button
    onClick={() => onClick(filterType)}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      currentFilter === filterType
        ? "bg-blue-500 text-white shadow-lg transform scale-105"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {filterType} ({count})
  </button>
);

const FilterButtons = ({ filter, setFilter, counts }) => {
  return (
    <div className="flex flex-wrap justify-center lg:mt-8 gap-4 mb-8">
      <FilterButton
        filterType="All"
        currentFilter={filter}
        onClick={setFilter}
        count={counts.total}
      />
      <FilterButton
        filterType="Pending"
        currentFilter={filter}
        onClick={setFilter}
        count={counts.pending}
      />
      <FilterButton
        filterType="Completed"
        currentFilter={filter}
        onClick={setFilter}
        count={counts.completed}
      />
    </div>
  );
};

export default FilterButtons;

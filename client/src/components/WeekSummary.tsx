import React from "react";
import TodoList from "./TodoList";

function WeekSummary() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center border-4 border-pink-600 rounded-lg p-4">
      <TodoList />
    </div>
  );
}

export default WeekSummary;

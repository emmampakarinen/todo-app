import React from "react";
import Todo from "./Todo";

function TodoList() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <h1>List name</h1>
      <div className="flex flex-col gap-2 mt-2"></div>
      <Todo />
    </div>
  );
}

export default TodoList;

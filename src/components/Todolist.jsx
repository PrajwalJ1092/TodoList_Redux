import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "../store/todoSlice";

function Todolist() {
  const [todo, setTodo] = useState("");
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todo.trim() === "") return;
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleToggleComplete = (index) => {
    dispatch(toggleComplete(index));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="text-blue-500 text-4xl font-bold text-center mt-10">
      <h1>Todo List</h1>
      <div className="flex justify-center items-center gap-4 mt-4">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="max-w-sm border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Add a new todo"
          onKeyDown={onEnter}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <div className="mt-4 bg-transparent space-y-4 rounded-md max-w-lg mx-auto p-4">
        {todos.map((todo, index) => (
          <div
            className="flex justify-between bg-blue-100 rounded-md p-4 max-w-lg mx-auto items-center hover:bg-blue-200"
            key={index}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => handleDeleteTodo(index)}
              >
                <i class="fi fi-rs-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todolist;

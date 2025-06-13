import { useEffect, useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setTodos(parsed);
      } else {
        setTodos([]); // fallback
      }
    } catch (e) {
      console.error("Error parsing todos from localStorage:", e);
      setTodos([]); // fallback if JSON.parse fails
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      isEditing: false,
    };
    const updatedTodos = [todo, ...todos];
    console.log("New todos:", updatedTodos);
    setTodos(updatedTodos);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText ?? todo.text,
              isEditing: newText === null ? !todo.isEditing : true,
            }
          : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg p-4 bg-white rounded">
      <Header />
      <div className="flex my-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Add
        </button>
      </div>
      <ToDoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
};

export default App;
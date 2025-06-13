 import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, onToggle, onDelete, onEdit }) => {

  if (!Array.isArray(todos)) {
    return <p className="text-red-500">Invalid ToDo list.</p>;
  }

  if (todos.length === 0) {
    return <p className="text-gray-500">No tasks yet!</p>;
  }

  return (
    <div className="bg-gray-100">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ToDoList;
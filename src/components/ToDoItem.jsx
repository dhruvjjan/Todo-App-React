const ToDoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  console.log("Rendering ToDoItem:", todo);
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2"
        />
        {todo.isEditing ? (
          <input
            value={todo.text}
            onChange={(e) => onEdit(todo.id, e.target.value)}
            className="border rounded px-2"
          />
        ) : (
          <span className={todo.completed ? "line-through" : ""}>
            {todo.text}
          </span>
        )}
      </div>
      <div>
        {todo.isEditing ? (
          <button
            onClick={() => onEdit(todo.id, null)}
            className="text-green-600 px-2"
          >
            OK
          </button>
        ) : (
          <button
            onClick={() => onEdit(todo.id, null)}
            className="text-yellow-600 px-2"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 px-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;

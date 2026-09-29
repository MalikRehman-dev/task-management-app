import "../css/TodoItem.css";

function TodoItem({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
  updatingId,
  deletingId,
}) {
  const isUpdating = updatingId === todo.id;
  const isDeleting = deletingId === todo.id;

  return (
    <div className="todo-item">
      <div className="todo-info">
        <h3>{todo.todo}</h3>

        <div className="todo-details">
          <span className={todo.completed ? "completed" : "pending"}>
            {todo.completed ? "Completed" : "Pending"}
          </span>

          <span>User ID: {todo.userId}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="status-btn"
          onClick={() => onStatusChange(todo)}
          disabled={isUpdating || isDeleting}
        >
          {isUpdating
            ? "Updating..."
            : todo.completed
            ? "Mark Pending"
            : "Complete"}
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(todo)}
          disabled={isUpdating || isDeleting}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          disabled={isUpdating || isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onEdit,
  onDelete,
  onStatusChange,
  updatingId,
  deletingId,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Try another search or add a new task.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          updatingId={updatingId}
          deletingId={deletingId}
        />
      ))}
    </div>
  );
}

export default TodoList;
import { useEffect, useState } from "react";
import "../Css/TodoForm.css";

function TodoForm({ todo, onSubmit, onClose, loading }) {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.todo);
      setUserId(todo.userId);
      setCompleted(todo.completed);
    } else {
      setTitle("");
      setUserId("");
      setCompleted(false);
    }
  }, [todo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }

    onSubmit({
      todo: title,
      userId: Number(userId),
      completed,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="todo-form">
        <div className="form-header">
          <h2>{todo ? "Edit Task" : "Add New Task"}</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label>User ID</label>

          <input
            type="number"
            placeholder="Enter user ID"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={(event) => setCompleted(event.target.checked)}
            />

            Completed
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? todo
                  ? "Updating..."
                  : "Creating..."
                : todo
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
import { useEffect, useState } from "react";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoFilters from "../components/TodoFilters";
import Loader from "../components/Loader";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoApi";

import "../css/Todos.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (todoData) => {
    try {
      setFormLoading(true);
      setError("");

      if (editingTodo) {
        const updatedTodo = await updateTodo(editingTodo.id, todoData);

        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo.id === editingTodo.id
              ? { ...todo, ...updatedTodo }
              : todo
          )
        );
      } else {
        const newTodo = await createTodo(todoData);

        setTodos((currentTodos) => [newTodo, ...currentTodos]);
      }

      setShowForm(false);
      setEditingTodo(null);
    } catch (error) {
      setError("Unable to save the task. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleStatusChange = async (todo) => {
    try {
      setUpdatingId(todo.id);
      setError("");

      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === todo.id ? { ...item, ...updatedTodo } : item
        )
      );
    } catch (error) {
      setError("Unable to update task status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteTodo(id);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      setError("Unable to delete task. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "pending" && !todo.completed);

    return matchesSearch && matchesFilter;
  });

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTasks = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Management</h1>
      </header>

      <main className="container">
        <div className="task-header">
          <button
            className="add-task-btn"
            onClick={() => {
              setEditingTodo(null);
              setShowForm(true);
            }}
          >
            Add Task
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="stats">
          <div className="stat-card">
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>
        </section>

        <section className="task-section">
          <div className="task-toolbar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <TodoFilters
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <TodoList
              todos={filteredTodos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              updatingId={updatingId}
              deletingId={deletingId}
            />
          )}
        </section>
      </main>

      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingTodo(null);
          }}
          loading={formLoading}
        />
      )}
    </div>
  );
}

export default Todos;
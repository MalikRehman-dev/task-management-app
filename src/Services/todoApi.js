const API_URL = import.meta.env.VITE_API_URL;

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos?limit=30`);

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  const data = await response.json();
  return data.todos;
};

export const createTodo = async (todo) => {
  const response = await fetch(`${API_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};
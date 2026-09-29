import"../Css/TodoFilters.css";
function TodoFilters({ filter, setFilter }) {
  return (
    <div className="filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>

      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
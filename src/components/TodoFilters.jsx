import "./TodoFilters.css";

const TodoFilters = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  clearCompleted,
  hasCompleted,
}) => {
  return (
    <div className="todo-filters-container glass-panel" id="filters-container">
      <div className="search-bar-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          id="search-tasks"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search query"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="filter-controls-row">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="filter-actions">
          <div className="sort-wrapper">
            <select
              className="sort-select"
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="priority">🔥 High Priority</option>
              <option value="dueDate">⏳ Due Date</option>
            </select>
          </div>

          {hasCompleted && (
            <button
              className="clear-completed-btn"
              id="clear-completed"
              onClick={clearCompleted}
              title="Remove all completed tasks"
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;

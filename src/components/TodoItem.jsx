import "./TodoItem.css";

const TodoItem = ({ task, toggleComplete, deleteTask }) => {
  const { id, text, completed, priority, dueDate } = task;

  // Format Due Date beautifully
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Determine if task is overdue
  const isOverdue = () => {
    if (!dueDate || completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  return (
    <div
      className={`todo-item glass-panel ${completed ? "completed" : ""} priority-${priority} ${isOverdue() ? "overdue" : ""}`}
      id={`todo-item-${id}`}
    >
      <button
        className="checkbox-btn"
        onClick={() => toggleComplete(id)}
        aria-label={
          completed ? "Mark task as incomplete" : "Mark task as complete"
        }
        title={completed ? "Mark incomplete" : "Mark complete"}
      >
        <div className={`custom-checkbox ${completed ? "checked" : ""}`}>
          {completed && (
            <svg
              className="checkmark-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </button>

      <div className="task-content">
        <span className="task-text" onClick={() => toggleComplete(id)}>
          {text}
        </span>

        <div className="task-meta-row">
          <span className={`priority-badge badge-${priority}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>

          {dueDate && (
            <div
              className={`due-date-wrapper ${isOverdue() ? "text-overdue" : ""}`}
            >
              <svg
                className="calendar-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="due-date-text">{formatDueDate(dueDate)}</span>
              {isOverdue() && <span className="overdue-tag">Overdue</span>}
            </div>
          )}
        </div>
      </div>

      <button
        className="delete-task-btn"
        id={`delete-btn-${id}`}
        onClick={() => deleteTask(id)}
        aria-label="Delete task"
        title="Delete task"
      >
        <svg
          className="delete-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;

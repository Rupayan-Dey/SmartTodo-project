import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ tasks, toggleComplete, deleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="todo-list-empty glass-panel" id="empty-state">
        <div className="empty-icon-wrapper">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <h3 className="empty-title">All Caught Up!</h3>
        <p className="empty-desc">
          No tasks matched your search or filters. Enjoy your free time! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list-container" id="tasks-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;

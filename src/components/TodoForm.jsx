import { useState } from "react";
import "./TodoForm.css";

const TodoForm = ({ addTask }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask({
      text: text.trim(),
      priority,
      dueDate: dueDate || null,
    });

    // Reset Form
    setText("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form
      className="todo-form glass-panel"
      onSubmit={handleSubmit}
      id="todo-form-container"
    >
      <div className="input-row">
        <input
          type="text"
          className="todo-input"
          id="task-input"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={100}
          required
          aria-label="New task content"
        />
        <button
          type="submit"
          className="add-task-btn"
          id="add-btn"
          aria-label="Add task"
        >
          <svg
            className="add-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="btn-text">Add</span>
        </button>
      </div>

      <div className="options-row">
        <div className="option-field">
          <label htmlFor="priority-select" className="option-label">
            Priority
          </label>
          <div className="select-wrapper">
            <select
              id="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`priority-select select-${priority}`}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="option-field">
          <label htmlFor="due-date-input" className="option-label">
            Due Date
          </label>
          <input
            type="date"
            id="due-date-input"
            className="due-date-input"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default TodoForm;

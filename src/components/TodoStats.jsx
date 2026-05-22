import "./TodoStats.css";

const TodoStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get motivational message
  const getMotivationalMessage = () => {
    if (totalTasks === 0) return "Create your first task to get started!";
    if (completionPercentage === 0) return "Let's make some progress today! 💪";
    if (completionPercentage < 50) return "Off to a good start, keep going! 🚀";
    if (completionPercentage < 100)
      return "Over halfway there! You've got this! 🌟";
    return "All tasks completed! Amazing job! 🎉";
  };

  return (
    <section className="stats-section glass-panel" id="todo-stats">
      <div className="stats-content">
        <div className="stats-text-group">
          <h2 className="stats-title">Progress Overview</h2>
          <p className="stats-motivation">{getMotivationalMessage()}</p>
        </div>
        <div className="stats-percentage" id="stats-pct">
          {completionPercentage}%
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${completionPercentage}%` }}
          aria-valuenow={completionPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        ></div>
      </div>

      <div className="stats-badges">
        <div className="stat-badge total">
          <span className="stat-num">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-badge active">
          <span className="stat-num">{totalTasks - completedTasks}</span>
          <span className="stat-label">Remaining</span>
        </div>
        <div className="stat-badge completed">
          <span className="stat-num">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </section>
  );
};

export default TodoStats;

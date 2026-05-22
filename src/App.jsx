import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TodoStats from "./components/TodoStats";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";
import "./App.css";

// Initial pre-populated tasks for first-time launch
const DEFAULT_TASKS = [
  {
    id: 1,
    text: "Complete design plan for SmartTodo 🚀",
    completed: true,
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 2,
    text: "Build interactive statistics dashboard",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    createdAt: Date.now() - 3600000,
  },
  {
    id: 3,
    text: "Add custom CSS micro-animations for interactions ✨",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    createdAt: Date.now(),
  },
];

function App() {
  // Theme state: Load from localStorage or default to light/dark based on system
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark;
  });

  // Task list state: Load from localStorage or use defaults
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS;
  });

  // Filtering & Sorting State
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Sync Theme to HTML data-theme attribute & localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Sync Tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Add a new task
  const addTask = ({ text, priority, dueDate }) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Delete a specific task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Filter Tasks
  const getFilteredTasks = () => {
    let result = [...tasks];

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      result = result.filter((task) =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by Tabs: All, Active, Completed
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Sort Tasks
    if (sortBy === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === "oldest") {
      result.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortBy === "priority") {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => {
        // Uncompleted tasks with higher priority go first
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      });
    } else if (sortBy === "dueDate") {
      result.sort((a, b) => {
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && !b.dueDate) return -1;
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return b.createdAt - a.createdAt;
      });
    }

    return result;
  };

  const filteredTasks = getFilteredTasks();
  const hasCompleted = tasks.some((task) => task.completed);

  return (
    <div className="app-wrapper">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content container">
        <section className="dashboard-intro">
          <h1 className="main-title">Focus on your day.</h1>
          <p className="main-subtitle">
            Manage, categorize, and complete tasks with ease.
          </p>
        </section>

        <TodoStats tasks={tasks} />

        <TodoForm addTask={addTask} />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />

        <TodoList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} SmartTodo — All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

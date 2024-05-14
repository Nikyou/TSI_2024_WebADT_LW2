import './App.css';
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (name) => {
    setTasks((prev) => [...prev, { name, done: false }]);
  };

  const removeTask = (indexToRemove) => {
    setTasks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[taskIndex].done = newDone;
      return updatedTasks;
    });
  };

  const renameTask = (index, newName) => {
    setTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[index].name = newName;
      return updatedTasks;
    });
  };

  const numberComplete = tasks.filter(task => task.done).length;
  const numberTotal = tasks.length;

  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;
    if (numberTotal === 0) {
      return "What are you planning to do? 🤔";
    }
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🛏️';
    }
    return 'Keep it going 💪🏻';
  };

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onRename={(newName) => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;

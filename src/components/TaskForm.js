import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  };

  const handleChange = (ev) => setTaskName(ev.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">+</button>
      <input
        type="text"
        value={taskName}
        onChange={handleChange}
        placeholder="Your next task..."
      />
    </form>
  );
}

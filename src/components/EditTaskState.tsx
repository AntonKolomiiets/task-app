import React from "react";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

interface TaskType {
  id: number;
  text: string;
  date: Date;
  priority: number;
  date_complete: Date;
  complete: boolean;
  isEditing: boolean;
}

interface EditTaskStateProps {
  editTask: (updates: Partial<TaskType>, id: number) => void;
  task: {
    id: number;
    text: string;
    date: Date;
    priority: number;
    date_complete: Date;
    complete: boolean;
    isEditing: boolean;
  };
}

function EditTaskState({ editTask, task }: EditTaskStateProps) {
  const [text, setText] = React.useState(task.text);
  const [priority, setPriority] = React.useState(task.priority);
  const [date, setDate] = React.useState<Date>(new Date(task.date_complete));

  const HandleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    editTask({ text }, task.id);
  };

  const selectPriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const newPriority = Number(event.target.value);
    setPriority(newPriority);
    editTask({ priority: newPriority }, task.id);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setDate(new Date(event.target.value));
    editTask({ date_complete: newDate }, task.id);
  };

  const dateString =
    date instanceof Date ? date.toISOString().split("T")[0] : "";

  return (
    <form onSubmit={HandleSubmit} className="TaskEditState">
      <input
        className="input-form"
        autoFocus
        value={text}
        type="text"
        onChange={(event) => setText(event.target.value)}
      />
      <select
        className="select-priority"
        onChange={(event) => selectPriority(event)}
      >
        <option value="0">Select...</option>
        <option value="3">High</option>
        <option value="2">Mid</option>
        <option value="1">Low</option>
      </select>
      <input
        className="select-priority"
        type="date"
        name="dateComplete"
        value={dateString}
        onChange={handleDateChange}
      />
      <FontAwesomeIcon
        className="submit-icon"
        icon={faSquareCheck}
        onClick={() => HandleSubmit()}
      />
    </form>
  );
}

export default EditTaskState;

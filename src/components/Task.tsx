import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

// struct
interface TaskType {
  id: number;
  text: string;
  date: Date; // Date
  priority: number;
  date_complete: Date; // Date
  complete: boolean;
  isEditing: boolean;
}

// struct
interface TaskProps {
  task: TaskType;
  editTask: (ex_task: TaskType, id: number) => void;
  deleteTask: (id: number) => void;
  setComplete: (id: number) => void;
}

// main
function Task({ task, editTask, deleteTask, setComplete }: TaskProps) {
  function manageChange() {
    setComplete(task.id);
  }

  // "!" output
  const renderPriority = (priority: number) => {
    return [...Array(priority)].map((_, index) => (
      <FontAwesomeIcon className="okluk" key={index} icon={faExclamation} />
    ));
  };

  // Days formatter
  function returnDays() {
    let aA = new Date(task.date_complete)
    let bB = new Date(task.date)
    let days = (aA.getTime() - bB.getTime()) / (1000 * 3600 * 24);
    if (days < 0.5) {
      return "Today";
    } else {
      days = Math.trunc(days);
      return days + " left";
    }
  }

  let days = returnDays(); // days variable

  return (
    <div className="Task">
      <input type="checkbox" checked={task.complete} onChange={manageChange} />
      <p className={`${task.complete ? "completed" : "incompleted"}`}>
        {task.text}
      </p>
      <div className="fask">
        <div className="priority">{renderPriority(task.priority)}</div>
        <p className="days">
          {/* {task.date_complete.toISOString().split("T")[0]} */}
          {days}
        </p>
        <div className="iconsTray">
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => editTask(task, task.id)}
          />
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteTask(task.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default Task;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// struct
interface TaskProps {
  addTask: (value: string) => void;
}
// main
function TaskFrom({ addTask }: TaskProps) {
  return (
    <FontAwesomeIcon
      className="plus-icon"
      icon={faCirclePlus}
      onClick={() => addTask("New Task")}
    />
  );
}

export default TaskFrom;

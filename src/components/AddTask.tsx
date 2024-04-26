import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface TaskProps {
  // struct
  addTask: (value: string) => void;
}

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

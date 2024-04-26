import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";


// struct
interface TaskProps {
  sortPriority: (value: boolean) => void;
  sortDateCreated: (value: boolean) => void;
  sortDateComplete: (value: boolean) => void;
}
// main
function Sort({ sortPriority, sortDateCreated, sortDateComplete }: TaskProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [icon, setIcon] = React.useState(faLayerGroup);
  const [flagPriority, setFlagPriority] = React.useState(false);
  const [flagDateCreated, setFlagDateCreated] = React.useState(false);
  const [flagDateComplete, setFlagDateComplete] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIcon(faLayerGroup);
    } else {
      setIcon(faXmarkCircle);
    }
  };

  const togglePriority = () => {
    setFlagPriority(!flagPriority);
    sortPriority(!flagPriority);
  };

  const toggleDateCreated = () => {
    setFlagDateCreated(!flagDateCreated);
    sortDateCreated(!flagDateCreated);
  };

  const toggleDateComplete = () => {
    setFlagDateComplete(!flagDateComplete);
    sortDateComplete(!flagDateComplete);
  };

  return (
    <a>
      <FontAwesomeIcon
        className="plus-icon"
        icon={icon}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={togglePriority}>Sort: Priority</li>
            <li onClick={toggleDateCreated}>Sort: Date Created</li>
            <li onClick={toggleDateComplete}>Sort: Date Complete</li>
          </ul>
        </div>
      )}
    </a>
  );
}

export default Sort;

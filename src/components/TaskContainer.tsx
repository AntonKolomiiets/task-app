import React from "react";
import Task from "./Task";
import TaskFrom from "./AddTask";
import EditTaskState from "./EditTaskState";
import Sort from "./Sort";

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

// function to create 
function createId() {
  let count = Number(localStorage.getItem("idCounter")) || 0;
  return function () {
    count += 1;
    localStorage.setItem("idCounter", count.toString());
    return count;
  };
}

// id generator
const idGen = createId();

const now = new Date(); // date plug variable

// main()
function TaskContainer() {
  const [tasks, setTasks] = React.useState(() => {
    const savedTasks = localStorage.getItem('task-app'); // retrive data at init 
    return savedTasks ? JSON.parse(savedTasks) : [
    {
      id: 45,
      text: "Learn React",
      date: now,
      priority: 1,
      date_complete: new Date(),
      complete: false,
      isEditing: false,
    },
    {
      id: 22,
      text: "Make todo-list app",
      date: now,
      priority: 2,
      date_complete: now,
      complete: false,
      isEditing: false,
    },
  ];
});

  // React.useEffect(() => {
  //   const savedTaskContainer = window.localStorage.getItem("task-app");
  //   if (savedTaskContainer !== null) setTasks(JSON.parse(savedTaskContainer));
  // }, []);

  //store
  React.useEffect(() => {
    window.localStorage.setItem("task-app", JSON.stringify(tasks));
  }, [tasks]);

  // add task
  function addTask(text: string) {
    setTasks([
      {
        id: idGen(),
        text: text,
        date: new Date(),
        priority: 0,
        date_complete: new Date(),
        complete: false,
        isEditing: false,
      },
      ...tasks,
    ]);
  }

  // delete task
  function deleteTask(id: number) {
    setTasks(tasks.filter((task: TaskType) => task.id !== id));
  }

  // set complete
  function setComplete(id: number) {
    setTasks(
      tasks.map((task: TaskType) => {
        if (task.id === id) {
          return {
            ...task,
            complete: !task.complete,
          };
        } else {
          return task;
        }
      })
    );
  }

  // edit task
  function editTask(updates: Partial<(typeof tasks)[0]>, id: number) {
    setTasks(
      tasks.map((task: TaskType) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              isEditing: !task.isEditing,
            }
          : task
      )
    );
  }

  // sort date created
  function sortDateCreated(value: boolean) {
    setTasks(
      [...tasks].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return value
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      })
    );
  }

  // sort  date complete
  function sortDateComplete(value: boolean) {
    setTasks(
      [...tasks].sort((a, b) => {
        const dateA = new Date(a.date_complete);
        const dateB = new Date(b.date_complete);
        
        return value
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      })
    );
  }

  // sort priority
  function sortPriority(value: boolean) {
    setTasks(
      [...tasks].sort((a, b) => {
        if (value) {
          return b.priority - a.priority;
        } else {
          return a.priority - b.priority;
        }
      })
    );
  }

  // render
  return (
    <div className="TaskContainer">
      <div>
        <TaskFrom addTask={addTask} />
        <Sort
          sortPriority={sortPriority}
          sortDateCreated={sortDateCreated}
          sortDateComplete={sortDateComplete}
        />
      </div>
      {tasks.map((task: TaskType) =>
        task.isEditing ? (
          <EditTaskState editTask={editTask} task={task} key={task.id} />
        ) : (
          <Task
            key={task.id}
            task={task}
            editTask={(updates) => editTask(updates, task.id)}
            deleteTask={deleteTask}
            setComplete={setComplete}
          />
        )
      )}
    </div>
  );
}

export default TaskContainer;

import { FC, useState } from "react";

interface ITaskInputProps {
  handleSubmit: Function;
}

const TaskInput: FC<ITaskInputProps> = ({ handleSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("");

  return (
    <div className="input_task">
      <input
        name="taskTitle"
        value={taskTitle}
        className="task_input"
        placeholder="Add a task..."
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        autoFocus
      />
      <div>
        <button
          className="add_task"
          onClick={() => {
            handleSubmit(taskTitle);
            setTaskTitle("");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TaskInput;

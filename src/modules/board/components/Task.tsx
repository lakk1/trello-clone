import { FC, useState } from "react";

interface ITaskProps {
  title: string;
  deleteTask: Function;
  updateTask: Function;
}

const Task: FC<ITaskProps> = ({ title = "", deleteTask, updateTask }) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="task">
      <div className="task_title">
        {isEdit ? (
          <input
            autoFocus
            name="taskTitle"
            value={taskTitle}
            className="task_title_input"
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
        ) : (
          <span>{taskTitle}</span>
        )}
      </div>
      <div>
        {isEdit ? (
          <button
            className="update_task"
            onClick={() => {
              if (taskTitle.length > 0) {
                updateTask(taskTitle);
                setIsEdit(false);
              }
            }}
          >
            ✔
          </button>
        ) : (
          <button
            className="edit_task"
            onClick={() => {
              if (!isEdit) {
                setIsEdit(true);
              }
            }}
          >
            ✍️
          </button>
        )}
        <button
          className="delete_task"
          onClick={() => {
            deleteTask();
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Task;

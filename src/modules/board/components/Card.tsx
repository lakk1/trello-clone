import Task from "./Task";
import TaskInput from "./TaskInput";
import { useBoard } from "../board.context";
import { ICard } from "../../../common.type";
import { FC } from "react";
import {
  ADD_TASK,
  REMOVE_CARD,
  REMOVE_TASK,
  UPDATE_CARD,
  UPDATE_TASK,
} from "../../../utils/constants";

interface ICardProps {
  card: ICard;
}

const Card: FC<ICardProps> = ({ card }) => {
  const { cardTitle, tasks } = card;
  const { dispatch } = useBoard();

  const addTask = (taskTitle = "") => {
    if (taskTitle.length > 3) {
      dispatch({
        type: ADD_TASK,
        payload: {
          cardID: card.cardID,
          taskTitle,
        },
      });
    }
  };

  const deleteTask = (taskID: string) => {
    dispatch({
      type: REMOVE_TASK,
      payload: {
        cardID: card.cardID,
        taskID,
      },
    });
  };

  const deleteCard = () => {
    dispatch({
      type: REMOVE_CARD,
      payload: {
        cardID: card.cardID,
      },
    });
  };
  const updateTask = (taskTitle: string, taskID: string) => {
    dispatch({
      type: UPDATE_TASK,
      payload: {
        cardID: card.cardID,
        taskID,
        taskTitle,
      },
    });
  };

  const updateCard = (e: { target: { textContent: any } }) => {
    const title = e.target.textContent;
    if (title.length > 3) {
      dispatch({
        type: UPDATE_CARD,
        payload: {
          cardID: card.cardID,
          cardTitle: title,
        },
      });
    }
  };
  return (
    <div className="card">
      <div
        className="card_title"
        contentEditable="true"
        onBlur={updateCard}
        suppressContentEditableWarning={true}
      >
        {cardTitle}
      </div>
      {tasks.map(({ taskID, taskTitle }) => (
        <Task
          key={taskID}
          title={taskTitle}
          deleteTask={() => {
            deleteTask(taskID);
          }}
          updateTask={(title: string) => {
            updateTask(title, taskID);
          }}
        />
      ))}
      <TaskInput handleSubmit={addTask} />
      <button
        className="btn_delete"
        onClick={() => {
          deleteCard();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;

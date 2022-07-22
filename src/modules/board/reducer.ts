import { v4 as uuidv4 } from "uuid";
import { ICard } from "../../common.type";
import {
  ADD_CARD,
  UPDATE_CARD,
  ADD_TASK,
  REMOVE_CARD,
  REMOVE_TASK,
  UPDATE_TASK,
} from "../../utils/constants";

interface IAction {
  type: string;
  payload: {
    cardID?: string;
    taskID?: string;
    taskTitle?: string;
    cardTitle?: string;
  };
}

const reducer = (state: ICard[], { type, payload }: IAction): ICard[] => {
  switch (type) {
    case ADD_CARD:
      return [
        ...state,
        { cardID: uuidv4(), cardTitle: "Card Title", tasks: [] },
      ];
    case UPDATE_CARD:
      const { cardID, cardTitle } = payload as {
        cardID: string;
        cardTitle: string;
      };
      return state.map((card) => {
        if (card.cardID === cardID) {
          return { ...card, cardTitle };
        }
        return card;
      });
    case ADD_TASK:
      return state.map((card) => {
        const { cardID, taskTitle } = payload as {
          cardID: string;
          taskTitle: string;
        };
        if (card.cardID === cardID) {
          return {
            ...card,
            tasks: [...card.tasks, { taskID: uuidv4(), taskTitle }],
          };
        }
        return card;
      });
    case UPDATE_TASK:
      return state.map((card) => {
        const { cardID, taskID, taskTitle } = payload as {
          cardID: string;
          taskID: string;
          taskTitle: string;
        };
        if (card.cardID === cardID) {
          return {
            ...card,
            tasks: card.tasks.map((task) => {
              if (task.taskID === taskID) {
                return { ...task, taskTitle };
              }
              return task;
            }),
          };
        }
        return card;
      });
    case REMOVE_CARD:
      return [...state.filter((card) => card.cardID !== payload.cardID)];
    case REMOVE_TASK:
      return state.map((card) => {
        if (card.cardID === payload.cardID) {
          return {
            ...card,
            tasks: card.tasks.filter((task) => task.taskID !== payload.taskID),
          };
        }
        return card;
      });
    default:
      return state;
  }
};
export default reducer;

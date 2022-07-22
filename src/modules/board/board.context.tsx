import React, { createContext, FC, useContext, useReducer } from "react";
import reducer from "./reducer";
import { ICard } from "../../common.type";

const mockData = [
  {
    cardID: "1",
    cardTitle: "Card 1",
    tasks: [
      {
        taskID: "1",
        taskTitle: "Task 1",
      },
    ],
  },
];

interface BoardContextProps {
  cards: ICard[];
  dispatch: React.Dispatch<any>;
}

export const boardContext = createContext<BoardContextProps | null>(null);

interface IBoardProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export const BoardProvider: FC<IBoardProviderProps> = ({ children }) => {
  const [cards, dispatch] = useReducer(reducer, mockData as unknown as ICard[]);

  return (
    <boardContext.Provider value={{ cards, dispatch }}>
      {children}
    </boardContext.Provider>
  );
};

export const useBoard = () => useContext(boardContext) as BoardContextProps;

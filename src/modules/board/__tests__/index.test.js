/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Board from "../index";
import { BoardProvider } from "../board.context";

const dispatch = jest.fn();
React.useContext = () => dispatch;

describe("Board", () => {
  it("Test for adding cards", () => {
    const { container } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );
    const addButton = container.querySelector(".add_button");
    fireEvent.click(addButton);
    const cards = container.querySelectorAll(".card");
    expect(cards.length).toBe(2);
  });

  it("Update Card Title", () => {
    const { container, getByText } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );

    const card = container.querySelector(".card_title");
    expect(card).toHaveTextContent("Card 1");
    fireEvent.change(card, { target: { textContent: "Card 2" } });
    fireEvent.blur(card);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("Card 2")).toBeInTheDocument();
  });

  it("Delete Card", () => {
    const { container } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );
    const deleteCard = container.querySelector(".btn_delete");
    fireEvent.click(deleteCard);
    const cards = container.querySelectorAll(".card");
    expect(cards.length).toBe(0);
  });
});

describe("Card", () => {
  it("add Tasks", () => {
    const { container } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );
    const taskInput = container.querySelector(".task_input");
    fireEvent.change(taskInput, { target: { value: "Task 2" } });
    const addTask = container.querySelector(".add_task");
    fireEvent.click(addTask);
    const tasks = container.querySelectorAll(".task");
    expect(tasks.length).toBe(2);
  });

  it("Update Task", () => {
    const { container, getByText } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );

    const tasks = container.querySelector(".task_title");
    expect(tasks).toHaveTextContent("Task 1");
    const edit_task = container.querySelector(".edit_task");
    fireEvent.click(edit_task);
    const taskInput = container.querySelector(".task_title_input");
    fireEvent.change(taskInput, { target: { value: "Task 2" } });
    const updateTask = container.querySelector(".update_task");
    fireEvent.click(updateTask);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("Task 2")).toBeInTheDocument();
  });
  it("Delete Task", () => {
    const { container } = render(
      <BoardProvider>
        <Board />
      </BoardProvider>
    );

    const deleteTask = container.querySelector(".delete_task");
    fireEvent.click(deleteTask);
    expect(deleteTask).not.toBeInTheDocument();
  });
});

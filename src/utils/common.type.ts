export interface ITask {
  taskID: string;
  taskTitle: string;
}

export interface ICard {
  cardID: string;
  cardTitle: string;
  tasks: ITask[] | [];
}

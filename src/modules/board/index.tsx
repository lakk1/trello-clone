import Card from "./components/Card";
import { useBoard } from "./board.context";

const Board = () => {
  const { cards, dispatch } = useBoard();

  const addCard = () => {
    dispatch({
      type: "ADD_CARD",
      payload: {},
    });
  };
  return (
    <div className="container">
      <div className="cards">
        {cards.map((card) => (
          <Card key={card.cardID} card={card} />
        ))}
      </div>
      <div className="add">
        <button className="add_button" onClick={addCard}>
          +
        </button>
      </div>
    </div>
  );
};

export default Board;

import "./App.scss";
import Header from "./components/Header";
import { BoardProvider } from "./modules/board/board.context";
import Board from "./modules/board/index";

function App() {
  return (
    <div className="App">
      <Header />
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  );
}

export default App;

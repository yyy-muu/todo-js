import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// 子
function Square(props) {
  return (
    <button
      className={props.highlight ? `square win-line` : `square`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

// 親
class Board extends React.Component {
  renderSquare(i) {
    return (
      // Squareにpropsとして渡す
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} //マス目クリックで、Square側で関数呼び出しさせる
        key={i} // マスをループにし、キーを持たせる
        highlight={this.props.winLine.includes(i)}
      />
    );
  }

  render() {
    const cols = [0, 1, 2];
    const rows = [0, 1, 2];
    return (
      <div>
        {rows.map((row) => {
          return (
            // マスをループにし、キーを持たせる
            <div className="board-row" key={row}>
              {cols.map((col) => this.renderSquare(row * 3 + col))}
            </div>
          );
        })}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true, // 手番を真偽値で反転させ、ゲーム進行状態を保存
      orderIsAsc: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //配列の中身は直接変更せずコピー

    if (calculateWinner(squares) || squares[i]) {
      return; // 勝敗が決まっている or マス目が埋まっている場合リターン
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      // 元の配列を書き換えしない
      history: history.concat([
        {
          squares: squares,
          col: (i % 3) + 1, // 添字の分 +1
          row: Math.trunc(i / 3) + 1,
        },
      ]),
      stepNumber: history.length, // state初期値
      xIsNext: !this.state.xIsNext,
    });
  }

  // 番手の順序を並び替える(orderIsAscを反転させる)
  handleOrder() {
    this.setState({
      orderIsAsc: !this.state.orderIsAsc,
    });
  }

  jumpTo(step) {
    // stateのhistoryプロパティは更新しない
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0, //偶数だった場合はtrueにする
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winInfo = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      // console.log(step);
      // console.log(move);
      const desc = move
        ? `Go to move #${move}（col: ${step.col}, row: ${step.row}）` // 座標位置
        : "GO to Game Start";
      return (
        // 現行番手とリストのステップが同じなら太字
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    let winLine = [];
    if (winInfo) {
      status = "Winner: " + winInfo.player;
      winLine = winInfo.line;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const order = this.state.orderIsAsc ? "降順" : "昇順";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winLine={winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.orderIsAsc ? moves : moves.reverse()}</ol>
          <button onClick={() => this.handleOrder()}>{order}</button>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}

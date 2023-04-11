let gamer = null;
let winner = null;
const gamerSelected = document.getElementById('gamer-selected');
const winnerSelected = document.getElementById('winner-selected');

changePlayer('X');

function chooseSquare(id) {
  if (winner) return;
  const square = document.getElementById(id);
  if (square.innerHTML !== '-') return;
  
  square.innerHTML = gamer;
  square.style.color = '#000';
  gamer = gamer === 'X' ? 'O' : 'X';
  
  changePlayer(gamer);
  checkWinner();
}

function changePlayer(value) {
  gamer = value;
  gamerSelected.innerHTML = gamer;
}

function checkWinner() {
  const squares = Array.from({ length: 9 }, (_, i) => document.getElementById(i + 1));
  const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
  ];

  for (let i = 0; i < possibleWins.length; i++) {
    const [a, b, c] = possibleWins[i];
    if (squares[a].innerHTML !== '-' && squares[a].innerHTML === squares[b].innerHTML && squares[a].innerHTML === squares[c].innerHTML) {
      changeWinner(squares[a]);
      highlightWinnerSquares(squares[a], squares[b], squares[c]);
      return;
    }
  }

  const gameDraw = squares.every(square => square.innerHTML !== '-');
  if (gameDraw) {
    winnerSelected.innerHTML = 'Empate';
  }
}

function changeWinner(square) {
  winner = square.innerHTML;
  winnerSelected.innerHTML = winner;
}

function highlightWinnerSquares(square1, square2, square3) {
  [square1, square2, square3].forEach(square => square.style.background = '#0f0');
}

function restart() {
  winner = null;
  winnerSelected.innerHTML = '';
  const squares = Array.from({ length: 9 }, (_, i) => document.getElementById(i + 1));
  squares.forEach(square => {
    square.style.background = '#eee';
    square.style.color = '#eee';
    square.innerHTML = '-';
  });
  changePlayer('X');
}
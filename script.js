const game = new Chess();
let board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

const italianGameMoves = ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'];
let moveIndex = 0;

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  if (move.san !== italianGameMoves[moveIndex]) {
    document.getElementById('status').innerText = `Wrong move! Try: ${italianGameMoves[moveIndex]}`;
    game.undo();
    return 'snapback';
  }

  moveIndex++;
  if (moveIndex < italianGameMoves.length) {
    const compMove = game.move(italianGameMoves[moveIndex]);
    board.position(game.fen());
    moveIndex++;
  } else {
    document.getElementById('status').innerText = 'Opening complete!';
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  game.reset();
  board.start();
  moveIndex = 0;
  document.getElementById('status').innerText = 'Your move: ' + italianGameMoves[moveIndex];
});

document.getElementById('resetBtn').addEventListener('click', () => {
  game.reset();
  board.start();
  moveIndex = 0;
  document.getElementById('status').innerText = '';
});
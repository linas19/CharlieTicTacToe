/*----- constants -----*/
const winningCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];
/*----- app's state (variables) -----*/
let board;
let turn = 'X';
let win;
let scoreX = 0;
let scoreO = 0;
var img = document.createElement("img");
img.src = "data/p1.png";
var src = document.getElementById("pokemon");
src.appendChild(img);
/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const scores = document.querySelector('h3');
/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);
document.getElementById('reset-score-button').addEventListener('click', resetScore);
/*----- functions -----*/
function init(){
	board = [
	'', '', '',
	'', '', '',
	'', '', ''
	];
	scores.textContent = 'X score=' + scoreX + ' and O score=' + scoreO
	render()
};
function resetScore(){
	console.log('reset')
	scoreX = 0;
	scoreO = 0;
	scores.textContent = 'X score=' + scoreX + ' and O score=' + scoreO
	init()
}
function getWinner() {
	let winner = null;
	winningCombos.forEach((combo, index) => {
	if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
		winner = board[combo[0]];
		if (winner === 'X') {
			scoreX ++
		} else if (winner === 'O') {
			scoreO ++
		}
		alert("Winner is: " + winner + " X score: " + scoreX + " O score: " + scoreO);
		scores.textContent = 'X score=' + scoreX + ' and O score=' + scoreO
		init()
		}
	});
	return winner ? winner : board.includes('') ? null : 'T';
};
function render() {
	board.forEach(function(mark, index){
		squares[index].textContent = mark;
	});
	messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
	console.log(board)
}
function handleTurn() {
	let idx = squares.findIndex(function(square) {
		return square === event.target;
	});
	if (board[idx] === ''){
		board[idx] = turn;
		turn = turn === 'X' ? 'O' : 'X';
		win = getWinner();
		render();
	}
};
function scoring(){

}
init();
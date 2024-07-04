function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0;
}

// Define the increaseScore method on the prototype of Player
Player.prototype.increaseScore = function() {
    this.score++;
};

let player1 = new Player("Kings", "X"),
    player2 = new Player("Divine", "O"),
    cells = document.querySelectorAll(".cell"),
    score_board = document.querySelectorAll(".score"),
    turn = player1;

updateScore()

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        // get the coordinates to the cell that was clicked as an integer
        let row = Number.parseInt(e.target.parentNode.getAttribute("data-row")),
            col = Number.parseInt(e.target.getAttribute("data-col")),
            ui_cell = e.target;

        gameBoard.placeMarker(turn.marker, row, col, ui_cell);        
    })
})

const gameBoard = (function () {
    const GameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function placeMarker(marker, row, col, cell) {
        // check if the cell has already been played
        if (GameBoard[row][col] !== "") return

        // place the players marker in the cell
        GameBoard[row].splice(col, 1, marker);

        cell.textContent = turn.marker;

        // check for winner or tie
        (function () {

            let winner = null,
                winner_display = document.querySelector(".winner");

            // check winning by row
            if (!GameBoard[0].includes("") && GameBoard[0][0] === GameBoard[0][1] && GameBoard[0][1] === GameBoard[0][2]) {
                
                winner = turn;
                console.log("first row win");

            } else if (!GameBoard[1].includes("") && GameBoard[1][1] === GameBoard[1][2] && GameBoard[1][0] === GameBoard[1][1]) {
                
                winner = turn;
                console.log("second row win");

            } else if (!GameBoard[2].includes("") && GameBoard[2][1] === GameBoard[2][2] && GameBoard[2][0] === GameBoard[2][1]) {
                
                winner = turn;
                console.log("third row win");

            } 
            
            // check winning by column
            if (GameBoard[0][0]!=="" && GameBoard[0][0] === GameBoard[1][0] && GameBoard[0][0] === GameBoard[2][0]) {
                
                winner = turn;
                console.log("first col win");

            } else if (GameBoard[0][1]!=="" && GameBoard[0][1] === GameBoard[1][1] && GameBoard[0][1] === GameBoard[2][1]) {
                
                winner = turn;
                console.log("second col win");

            } else if (GameBoard[0][2]!=="" && GameBoard[0][2] === GameBoard[1][2] && GameBoard[0][2] === GameBoard[2][2]) {
                
                winner = turn;
                console.log("third col win");

            }

            // check winning by diagonal
            if (GameBoard[1][1]!=="" && GameBoard[0][0] === GameBoard[1][1] && GameBoard[0][0] === GameBoard[2][2]) {
                
                winner = turn;
                console.log("diagonal win");

            } else if (GameBoard[1][1]!=="" && GameBoard[0][2] === GameBoard[1][1] && GameBoard[1][1] === GameBoard[2][0]) {
                
                winner = turn;
                console.log("diagonal win");

            }

            // check for tie
            if (!GameBoard[0].includes("") && !GameBoard[1].includes("") && !GameBoard[2].includes("")) winner = "Tie"

            if (winner) {
                

                winner_display.style.color = "black";

                winner === "Tie" ? winner_display.textContent = "Tie" : winner_display.textContent = `${turn.name} Wins`;

                document.querySelector(".board").style.pointerEvents = "none";

                turn.increaseScore();
                updateScore();

            };

        })();

        // rotate the turns
        turn === player1 ? turn = player2 : turn = player1;
    }

    return {placeMarker}

})();

function updateScore() {
    score_board[0].textContent = `${player1.name} : ${player1.score}`;
    score_board[1].textContent = `${player2.name} : ${player2.score}`;
}
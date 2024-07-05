function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0;

    this.setName = function (newName) {
        this.name = newName;
    }
}

// Define the increaseScore method on the prototype of Player
Player.prototype.increaseScore = function() {
    this.score++;
};

Player.prototype.resetScore = function() {
    this.score = 0;
};

let player1 = new Player("Player1", "X"),
    player2 = new Player("Player2", "O"),
    turn = player1,
    cells = document.querySelectorAll(".cell"),
    score_board = document.querySelectorAll(".score"),
    reset_btn = document.querySelector(".reset-btn"),
    play_again_btn = document.querySelector(".play-again-btn"),
    form = document.querySelector("form");
    

form.addEventListener("submit", (e) => {
    e.preventDefault();

    player1.setName(form.elements["player-one"].value);
    player2.setName(form.elements["player-two"].value);

    updateScore();

    form.classList.add("hide");
    document.querySelector(".game").style.all = "unset";
})

updateScore()

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        // get the coordinates to the cell that was clicked as an integer
        let row = Number.parseInt(e.target.parentNode.getAttribute("data-row")),
            col = Number.parseInt(e.target.getAttribute("data-col")),
            ui_cell = e.target;

        gameBoard.placeMarker(turn.marker, row, col, ui_cell);        
    })
});

reset_btn.addEventListener("click", () => {
    player1.resetScore();
    player2.resetScore();
    gameBoard.playAgain();
    updateScore();
});

play_again_btn.addEventListener("click", () => {
    gameBoard.playAgain();
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

            } else if (!GameBoard[1].includes("") && GameBoard[1][1] === GameBoard[1][2] && GameBoard[1][0] === GameBoard[1][1]) {
                
                winner = turn;

            } else if (!GameBoard[2].includes("") && GameBoard[2][1] === GameBoard[2][2] && GameBoard[2][0] === GameBoard[2][1]) {
                
                winner = turn;

            } 
            
            // check winning by column
            if (GameBoard[0][0]!=="" && GameBoard[0][0] === GameBoard[1][0] && GameBoard[0][0] === GameBoard[2][0]) {
                
                winner = turn;

            } else if (GameBoard[0][1]!=="" && GameBoard[0][1] === GameBoard[1][1] && GameBoard[0][1] === GameBoard[2][1]) {
                
                winner = turn;

            } else if (GameBoard[0][2]!=="" && GameBoard[0][2] === GameBoard[1][2] && GameBoard[0][2] === GameBoard[2][2]) {
                
                winner = turn;

            }

            // check winning by diagonal
            if (GameBoard[1][1]!=="" && GameBoard[0][0] === GameBoard[1][1] && GameBoard[0][0] === GameBoard[2][2]) {
                
                winner = turn;

            } else if (GameBoard[1][1]!=="" && GameBoard[0][2] === GameBoard[1][1] && GameBoard[1][1] === GameBoard[2][0]) {
                
                winner = turn;

            }

            // check for tie
            if (!GameBoard[0].includes("") && !GameBoard[1].includes("") && !GameBoard[2].includes("") && !winner) winner = "Tie"

            // display winner info of tie
            if (winner) {
                
                winner_display.style.color = "black";

                if (Object.getPrototypeOf(winner) === Player.prototype) {
                    
                    winner_display.textContent = `${turn.name} Wins`;
                    turn.increaseScore();
                    updateScore();

                } else {
                    winner_display.textContent = "Tie";
                }

                document.querySelector(".board").style.pointerEvents = "none";

            } 
        })();

        // rotate the turns
        turn === player1 ? turn = player2 : turn = player1;
    }

    function playAgain() {
        for (let i = 0; i < GameBoard.length; i++) {
            for (let j = 0; j < GameBoard[i].length; j++) {
                GameBoard[i].splice(j, 1, "");
            }
        }

        cells.forEach(cell => {
            cell.textContent = "";
        })

        turn = player1;
        document.querySelector(".board").style.pointerEvents = "all";
        document.querySelector(".winner").style.color = "white";
    }

    return {placeMarker, playAgain}

})();

function updateScore() {
    score_board[0].textContent = `${player1.name} : ${player1.score}`;
    score_board[1].textContent = `${player2.name} : ${player2.score}`;
}
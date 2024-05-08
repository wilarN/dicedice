
// William

const pointsToWin = 50;

holdButton = document.getElementById("main-button-hold");
rollButton = document.getElementById("main-button-roll");
newGameButton = document.getElementById("main-button-new-game");
diceImg = document.getElementsByClassName("dice")[0];
playerWrappers = document.getElementsByClassName("player-wrapper");
playerTempScores = document.getElementsByClassName("current-score");
newGameWinButton = document.getElementById("win-button");
winContainer = document.getElementsByClassName("win-container")[0];

// Gabriel
function fetchRandomNumber(tempPrevNum = 0) {
    num = Math.floor(Math.random() * 6) + 1;
    if (tempPrevNum == 0) {
        return num;
    } else {
        while (num == tempPrevNum) {
            num = Math.floor(Math.random() * 6) + 1;
        }
        return num;
    }
}

class player {
    constructor(playerNum, points = 0) {
        this.playerNum = playerNum;
        this.points = points;
        this.tempPoints = 0;
        this.turn = false;
        this.tempPrevNum = 0;
        this.tempNum = 0;
        this.diceSpeed = 0.5;
    }

    // William & Simon 16/4/2024
    rollDice() {
        console.log("Dice has been rolled!")
        let dice = fetchRandomNumber();

        diceImg.style.animation = `spinDice ${this.diceSpeed}s linear`;
        diceImg.src = `img/00dice.png`;

        setTimeout(() => {
            diceImg.src = `img/0${dice}dice.svg`; 4
            diceImg.style.animation = "none";
        }, this.diceSpeed * 1000);

        //Simon & william
        if (dice == 1) {
            // Lose
            diceImg.src = "img/01dice.svg";
            console.log("Rolled 1")

            this.tempPoints = 0;
            this.turn = false;
            gameManager.alternateTurn()
            console.log(`Player ${this.currentPlayer} rolled a 1 and has lost all temp points.`);

            if (dice == 2) {
                diceImg.src = "img/02dice.svg";
                console.log("Rolled 2")

                this.tempPoints += 2;
                this.turn = false;
            }
            if (dice == 3) {
                diceImg.src = "img/03dice.svg";
                console.log("Rolled 3")

                this.tempPoints += 3;
                this.turn = false;
            }
            if (dice == 4) {
                diceImg.src = "img/04dice.svg";
                console.log("Rolled 4")

                this.tempPoints += 4;
                this.turn = false;
            }
            // Gabriel
            if (dice == 5) {
                diceImg.src = "img/05dice.svg";
                console.log("Rolled 5")

                this.tempPoints += 5;
                this.turn = false;
            }
            if (dice == 6) {
                diceImg.src = "img/06dice.svg";
                console.log("Rolled 6")

                this.tempPoints += 6;
                this.turn = false;
            }

        } else {
            // Continue
            this.tempPoints += dice;
            console.log(`Player ${this.playerNum} rolled a ${dice} and has a total of ${this.tempPoints} points.`);
        }
        const currentScore = document.getElementsByClassName(`current-score0${this.playerNum}`)[0];
        currentScore.innerHTML = "Current Points <br>" + this.tempPoints;


        return dice;
    }

    // William 23/04/2024
    hold() {
        this.points += this.tempPoints;
        console.log(this.playerNum)
        this.tempPoints = 0;
        const totalScore = document.getElementsByClassName(`total0${this.playerNum}`)[0];
        if(this.points >= pointsToWin){
            console.log(`Player ${this.playerNum + 1} has won!`);
            // Display win-container for specific player
            winContainer.getElementsByClassName("win-text")[0].innerHTML = `Player ${this.playerNum + 1} has won!`;
            winContainer.style.display = "flex";
            winContainer.style.animation = "winPopup 1s ease-in-out";
        }

        // Gabriel & Rasmus
        for (let i = 0; i < playerTempScores.length; i++) {
            playerTempScores[i].innerHTML = "Current Points <br> 0";
        }

        totalScore.innerHTML = "Total Points <br>" + this.points;

        this.turn = false;
        gameManager.alternateTurn();
    }
};


// William
class gameManager {
    constructor(players) {
        this.currentPlayer = 0;
        this.players = players;
        playerWrappers[0].style.boxShadow = "0px 0px 20px 5px white";
        playerWrappers[0].style.scale = "1.1";
        playerWrappers[1].style.boxShadow = "none";
    }

    alternateTurn() {
        if (this.currentPlayer == 0) {
            this.currentPlayer = 1;
            console.log("Player 2's turn");
            // Glow on active player
            playerWrappers[1].style.boxShadow = "0px 0px 10px 5px white";
            playerWrappers[1].style.scale = "1.1";
            playerWrappers[0].style.scale = "1.0";
            playerWrappers[0].style.boxShadow = "none";
        } else {
            // Gabriel
            this.currentPlayer = 0;
            console.log("Player 1's turn");
            playerWrappers[0].style.boxShadow = "0px 0px 10px 5px white";
            playerWrappers[1].style.scale = "1.0";
            playerWrappers[0].style.scale = "1.1";
            playerWrappers[1].style.boxShadow = "none";
        }
    }

    //Simon
    newGame() {
        //Start new game
        window.location.reload();

    }
}

//William
player01 = new player(0);
player02 = new player(1);
players = [player01, player02];

gameManager = new gameManager(players);


rollButton.addEventListener("click", function () {
    players[gameManager.currentPlayer].rollDice();
});

holdButton.addEventListener("click", function () {
    players[gameManager.currentPlayer].hold();
});

newGameButton.addEventListener("click", function () {
    gameManager.newGame();
});

newGameWinButton.addEventListener("click", function () {
    gameManager.newGame();
    winContainer.style.display = "none";
});

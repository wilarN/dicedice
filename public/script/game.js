
// William

holdButton = document.getElementById("main-button-hold");
rollButton = document.getElementById("main-button-roll");
newGameButton = document.getElementById("main-button-new-game");
diceImg = document.getElementsByClassName("dice")[0];

function fetchRandomNumber(tempPrevNum = 0){
    num = Math.floor(Math.random() * 6) + 1;
    if(tempPrevNum == 0){
        return num;
    }else{
        while(num == tempPrevNum){
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
            diceImg.src = `img/0${dice}dice.svg`;4
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

        if (dice == 2){
            diceImg.src = "img/02dice.svg";
            console.log("Rolled 2")

            this.tempPoints += 2;
            this.turn = false;
        }
        if (dice == 3){
            diceImg.src = "img/03dice.svg";
            console.log("Rolled 3")

            this.tempPoints += 3;
            this.turn = false;
        }
        if (dice == 4){
            diceImg.src = "img/04dice.svg";
            console.log("Rolled 4")

            this.tempPoints += 4;
            this.turn = false;
        }
        if (dice == 5){
            diceImg.src = "img/05dice.svg";
            console.log("Rolled 5")

            this.tempPoints += 5;
            this.turn = false;
        }
        if (dice == 6){
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

    hold() {

        
        this.points += this.tempPoints;
        console.log(this.playerNum)
        this.tempPoints = 0;
        const totalScore = document.getElementsByClassName(`total0${this.playerNum}`)[0];

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
    }

    // William
    alternateTurn() {
        if (this.currentPlayer == 0) {
            this.currentPlayer = 1;
        } else {
            this.currentPlayer = 0;
        }
    }

    newGame(){ 
        //Start new game
        window.location.reload();
        
    }
}


player01 = new player(0);
player02 = new player(1);
players = [player01, player02];

gameManager = new gameManager(players);


rollButton.addEventListener("click", function() {
    players[gameManager.currentPlayer].rollDice();
});

holdButton.addEventListener("click", function() {
    players[gameManager.currentPlayer].hold();
});

newGameButton.addEventListener("click", function() {
    gameManager.newGame();
});
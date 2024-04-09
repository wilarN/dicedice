
// William
class player {
    constructor(playerNum, points = 0) {
        this.playerNum = playerNum;
        this.points = points;
        this.tempPoints = 0;
        this.turn = false;
    }

    rollDice() {
        let dice = Math.floor(Math.random() * 6) + 1;
        if (dice == 1) {
            this.tempPoints = 0;
            this.turn = false;
            console.log(`Player ${this.playerNum} rolled a 1 and has lost all his or hers temp points.`);
        } else {
            this.tempPoints += dice;
            console.log(`Player ${this.playerNum} rolled a ${dice} and has a total of ${this.tempPoints} points.`);
        }
        return dice;
    }

    hold() {
        this.points += this.tempPoints;
        this.tempPoints = 0;
        this.turn = false;
    }
};


// William
class gameManager {
    constructor(players) {
        this.players = players;
        this.currentPlayer = 1;
    }

    validateButtons() {
        try{
            rollButton = document.getElementById("rollButton");
            holdButton = document.getElementById("holdButton");
            return true;
        }
        catch(err){
            console.log("Buttons not found");
            return false;
        }
    }

    alternateTurn() {
        if (this.currentPlayer == 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }
}

player01 = new player(1);
player02 = new player(2);

gameManager = new gameManager([player01, player02]);

gameManager.validateButtons();

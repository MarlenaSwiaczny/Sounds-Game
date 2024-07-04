import {Dom} from "./dom.js"


class Game extends Dom {

computerSounds = [];
playerSounds = [];
isCorrect = false;
level = null;
gameStarted = false;

buttonSounds = {
    "red": "./drums/red.mp3",
    "blue": "./drums/blue.mp3",
    "yellow": "./drums/yellow.mp3",
    "green": "./drums/green.mp3",
};   


initializeGame() {
    this.gameStarted = false;
    this.computerSounds = [];
    this.playerSounds = [];
    this.level = 1;
    this.isCorrect = true;
    }


playSound(button) {
    var color = button.getAttribute("id");
    var audio = new Audio(this.buttonSounds[color]);
    audio.play();
}


nextSound() {
    var button = this.computerButton();
    this.pressButton(button);
    let levelInfo = this.updateLevelInfo(this.level);
    this.setInfo(levelInfo);
    this.addListeners();
}


computerButton() {
    var colors = Object.keys(this.buttonSounds);
    var newIndex = Math.floor(Math.random()*colors.length);
    var newColor = colors[newIndex];
    var button = document.getElementById(`${newColor}`)
    this.computerSounds.push(newColor);
    return button;
}
    

pressButton(button) {
        button.classList.add("pressed");
        console.log(button);
        setTimeout(function() {
            button.classList.remove("pressed")}, 100);
        this.playSound(button);
}

    
handleClick = (event) => {
        var activeButton = event.target;
        var activeColor = activeButton.getAttribute("id");
        this.playerSounds.push(activeColor);
        this.pressButton(activeButton);
        console.log(this.playerSounds, "PlayerArray");
        console.log(this.computerSounds, "ComputerArray");
        this.isCorrect = this.compareSound(this.playerSounds.length);
        if (this.isCorrect) {
            if (this.playerSounds.length == this.computerSounds.length) {
                this.removeListeners();
                this.level++;
                this.playerSounds = [];
                this.setInfo(this.listenInfo);
                setTimeout(() => {
                    this.nextSound();
                }, 1500);
            }
        }
        else {
            this.setInfo(this.endInfo);
            var audioWrong = new Audio("./drums/wrong.mp3");
            audioWrong.play();
            this.removeListeners();
            setTimeout(() => {
                this.setInfo(this.startInfo);   
                this.initializeGame();
            },1000);
            
        }
    }


addListeners() {
    this.buttons.forEach((button) => {
        button.addEventListener("click", this.handleClick);
    })
}


removeListeners() {
    this.buttons.forEach((button) => button.removeEventListener("click", this.handleClick));
}


addEnterListener() {
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && !this.gameStarted) {
            this.initializeGame()
            this.setInfo(this.listenInfo);
            this.gameStarted = true;
            setTimeout(() => {
                this.nextSound();
            }, 1000);
            } 
        })
    }
    

compareSound(i) {
    this.isCorrect= true;
    let index = i-1
        console.log("Player", this.playerSounds[index], " Computer", this.computerSounds[index], index)
        if (this.playerSounds[index] === this.computerSounds[index]) {
            console.log(`${index} - ${this.isCorrect}`, this.playerSounds);
        }
        else {
            this.isCorrect = false;
            console.log(`${index} - ${this.isCorrect}`, this.playerSounds);
            return this.isCorrect
        }
    return this.isCorrect;
}

}


const game = new Game();
window.onload = function() {
    game.addEnterListener();
    game.setInfo(game.startInfo);
}
   


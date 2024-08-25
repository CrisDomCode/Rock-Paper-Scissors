let computerChoice
let computerScore = 0
let humanChoice
let humanScore = 0

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getComputerChoice() {
    let computerNumber = generateRandomNumber(3)
    switch (computerNumber) {
        case 1:
            computerChoice = "rock"
            break;
        case 2:
            computerChoice = "paper"
            break;
        case 3:
            computerChoice = "scissors"
            break;
        default:
            alert.log("computerChoice is not understood")
            break;
    }
    return computerChoice
}

function getHumanChoice() {
    humanChoice = prompt("What do you want : Rock, Paper, Scissors ?", "Rock");
    return humanChoice
}

function playRound(humanChoice, computerChoice) {
    let message = ""
    humanChoice = humanChoice.toLowerCase();
    switch (humanChoice) {
        case "rock":
            if (computerChoice === "rock") {
                message = "Draw, " + computerChoice + " equals " + humanChoice
            } else if(computerChoice === "paper") {
                message = "You lose, " + computerChoice + " beats " + humanChoice
                computerScore ++
            } else if(computerChoice === "scissors") {
                message = "You win, " + humanChoice + " beats " + computerChoice
                humanScore ++
            }
            break;
        case "paper":
            if (computerChoice === "scissors") {
                message = "You lose, " + computerChoice + " beats " + humanChoice
                computerScore ++
            } else if(computerChoice === "paper") {
                message = "Draw, " + computerChoice + " equals " + humanChoice
            } else if(computerChoice === "rock") {
                message = "You win, " + humanChoice + " beats " + computerChoice
                humanScore ++
            }
            break;
        case "scissors":
            if (computerChoice === "scissors") {
                message = "Draw, " + computerChoice + " equals " + humanChoice
            } else if(computerChoice === "paper") {
                message = "You win, " + humanChoice + " beats " + computerChoice
                humanScore ++
            } else if(computerChoice === "rock") {
                message = "You lose, " + computerChoice + " beats " + humanChoice
                computerScore ++
            }
            break;
        default:
            break;
    }
    console.log(humanChoice, computerChoice)
    console.log(message)
    console.log("Score : " + humanScore + " - " + computerScore)
}




computerChoice = getComputerChoice()
humanChoice = getHumanChoice()

playRound(humanChoice, computerChoice)
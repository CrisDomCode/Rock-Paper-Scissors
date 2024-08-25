let computerChoice

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



console.log(getComputerChoice())
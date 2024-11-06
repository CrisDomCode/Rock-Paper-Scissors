// Define possible choices and game rules in a lookup table
    const choices = ["rock", "paper", "scissors"];
    const rules = {
        rock: { rock: "Draw", paper: "You lose", scissors: "You win" },
        paper: { rock: "You win", paper: "Draw", scissors: "You lose" },
        scissors: { rock: "You lose", paper: "You win", scissors: "Draw" }
    };

// Initialize scores for the computer and the human
    let computerScore = 0;
    let humanScore = 0;

// Set the number of rounds to play
    const rounds = 5; 

// Function to get a random choice for the computer
    function getComputerChoice() {
        // Selects a random index from the choices array
        return choices[Math.floor(Math.random() * choices.length)];
    }

// Function to get the human's choice with validation
    function getHumanChoice() {
        let choice;
        // Prompt the user until a valid choice is given
        do {
            choice = prompt("Choose: Rock, Paper, or Scissors", "Rock").toLowerCase();
        } while (!choices.includes(choice)); // Loop until a valid choice is entered
        return choice;
    }

// Function to update scores and display the result of each round
    function updateScoreAndMessage(humanChoice, computerChoice) {
        const outcome = rules[humanChoice][computerChoice]; // Get the round result from the rules table
    
    // Update scores based on the outcome
        if (outcome === "You win") humanScore++;
        if (outcome === "You lose") computerScore++;
    
    // Display the outcome and current scores
        console.log(`${humanChoice} vs ${computerChoice}: ${outcome}. Score: Human ${humanScore} - Computer ${computerScore}`);
    }

// Function to display the final result of the game
    function displayFinalResult() {
        console.log(`Final Score: Human ${humanScore} - Computer ${computerScore}`);
        
        // Determine and display the overall winner or if it's a draw
        if (humanScore > computerScore) {
            console.log("Congratulations, you won the game!");
        } else if (computerScore > humanScore) {
            console.log("The computer won the game. Better luck next time!");
        } else {
            console.log("It's a draw!");
        }
    }

// Main function to play the game
    function playGame() {
        // Loop through the specified number of rounds
            for (let i = 0; i < rounds; i++) {
                const computerChoice = getComputerChoice(); // Get a choice for the computer
                const humanChoice = getHumanChoice();       // Get a validated choice from the human
                
                // Play a round and update scores
                    updateScoreAndMessage(humanChoice, computerChoice);
            }
        // Display the final game result after all rounds
            displayFinalResult();
    }

// Start the game
    playGame();

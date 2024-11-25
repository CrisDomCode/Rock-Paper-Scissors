// CONSTANTS
        const choices               = ["rock", "paper", "scissors"];
        const rules                 = {
                                        rock: { rock: "Draw", paper: "You lose", scissors: "You win" },
                                        paper: { rock: "You win", paper: "Draw", scissors: "You lose" },
                                        scissors: { rock: "You lose", paper: "You win", scissors: "Draw" }
                                    };
        let computerScore           = 0;
        let humanScore              = 0;

// SELECTIONS
    const rockButton                = document.querySelector('.circle-cta.rock');
    const scissorsButton            = document.querySelector('.circle-cta.scissors');
    const paperButton               = document.querySelector('.circle-cta.paper');
    const humanScoreSpan            = document.querySelector('#humanScore');
    const computerScoreSpan         = document.querySelector('#computerScore');
    const choosingContainer         = document.querySelector('.container-game.choosing');
    const comparisonContainer       = document.querySelector('.container-game.comparison');
    const computerChoiceDisplay     = document.querySelector('.computer-choice-display');
    const loadingDiv                = document.querySelector('.loading-div');


// FUNCTIONS
    // Get a random computer choice
        function getComputerChoice() {
            // Selects a random index from the choices array
            return choices[Math.floor(Math.random() * choices.length)];
        }
    // Update graphics - Step 1, 2, 3
        function updateGraphics(humanSelection, computerSelection) {
            // Step 1 : Hiding ChoosingContainer, Showing ComparisonContainer
                choosingContainer.style.display         = 'none'
                comparisonContainer.style.display       = 'flex'

            // Step 2: Add loading animation for 3 seconds
                loadingDiv.classList.add('pulsing');
                setTimeout(() => {
                    loadingDiv.classList.remove('pulsing'); // Remove animation after 3 seconds
                    
                    loadingDiv.style.display = 'none';
                    computerChoiceDisplay.style.display = 'flex';
                    computerChoiceDisplay.innerHTML = `
                        <div class="circle-cta ${computerSelection} big-circle w-inline-block">
                            <div class="white-circle ${computerSelection} big-circle"></div>
                        </div>
                    `;

                    // Wait 1 second, then highlight the winner
                    setTimeout(() => {
                        const result = rules[humanSelection][computerSelection];
                        if (result === "You win") {
                            document.querySelector('.big-circle').classList.add('win'); // Highlight human choice
                        } else if (result === "You lose") {
                            computerChoiceDisplay.querySelector('.circle-cta').classList.add('win'); // Highlight computer choice
                        }
                    }, 1000); // 1 second delay
                }, 3000); // 3 seconds delay for loading animation
    }
        
    // Update scores and display the result
        function updateScoreAndMessage(humanSelection, computerSelection) {
            
            const outcome = rules[humanSelection][computerSelection];
            console.log(outcome)
            if (outcome === "You win") humanScore++;
            if (outcome === "You lose") computerScore++;
            humanScoreSpan.innerText = humanScore;
            computerScoreSpan.innerText = computerScore;
        }
    // Play the Round
        function playRound(humanSelection) {
            const computerSelection = getComputerChoice();
            updateGraphics(humanSelection, computerSelection)
            updateScoreAndMessage(humanSelection, computerSelection);
        }

// EVENT LISTENERS
rockButton.addEventListener("click", () => playRound("rock"));
scissorsButton.addEventListener("click", () => playRound("scissors"));
paperButton.addEventListener("click", () => playRound("paper"));
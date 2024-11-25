
// CONSTANTS
const choices                                 = ["rock", "paper", "scissors"];
const rules = {
    rock                                      : { rock: "Draw", paper: "You lose", scissors: "You win" },
    paper                                     : { rock: "You win", paper: "Draw", scissors: "You lose" },
    scissors                                  : { rock: "You lose", paper: "You win" }
};
let computerScore                             = 0;
let humanScore                                = 0;

// SELECTIONS
const rockButton                              = document.querySelector('.circle-cta.rock');
const scissorsButton                          = document.querySelector('.circle-cta.scissors');
const paperButton                             = document.querySelector('.circle-cta.paper');
const humanScoreSpan                          = document.querySelector('#humanScore');
const computerScoreSpan                       = document.querySelector('#computerScore');
const choosingContainer                       = document.querySelector('.container-game.choosing');
const comparisonContainer                     = document.querySelector('.container-game.comparison');
const computerChoiceDisplay                   = document.querySelector('.computer-choice-display');
const loadingDiv                              = document.querySelector('.loading-div');
const announceContainer                       = document.querySelector('.container-annouce');
const playAgainButton                         = document.querySelector('.play-again-button');
const resetButton                             = document.querySelector('.small-button[href="#reset"]');

// FUNCTIONS

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('humanScore', humanScore);
    localStorage.setItem('computerScore', computerScore);
}

// Load scores from localStorage
function loadScores() {
    const savedHumanScore       = localStorage.getItem('humanScore');
    const savedComputerScore    = localStorage.getItem('computerScore');

    // If scores exist, update them; otherwise, initialize to 0
    humanScore                  = savedHumanScore ? parseInt(savedHumanScore, 10) : 0;
    computerScore               = savedComputerScore ? parseInt(savedComputerScore, 10) : 0;

    // Update the score display
    humanScoreSpan.innerText    = humanScore;
    computerScoreSpan.innerText = computerScore;
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateGraphics(humanSelection, computerSelection) {
    choosingContainer.style.display   = 'none';
    comparisonContainer.style.display = 'flex';

    // Show the user's choice
    const userChoiceDisplay = document.querySelector('.container-choice .circle-cta.big-circle.w-inline-block');
    if (userChoiceDisplay) {
        userChoiceDisplay.outerHTML = `
            <a href="#" class="circle-cta ${humanSelection} big-circle w-inline-block">
                <div class="white-circle ${humanSelection} big-circle"></div>
            </a>
        `;
    }

    // Start loading animation
    loadingDiv.classList.add('pulsing');
    setTimeout(() => {
        // End loading animation
        loadingDiv.classList.remove('pulsing');
        loadingDiv.style.display              = 'none';
        computerChoiceDisplay.style.display   = 'flex';
        computerChoiceDisplay.innerHTML       = `
            <div class="circle-cta ${computerSelection} big-circle w-inline-block">
                <div class="white-circle ${computerSelection} big-circle"></div>
            </div>
        `;

        // Highlight winner and display result
        const result                          = rules[humanSelection][computerSelection];
        if (result === "You win") {
            document.querySelector('.container-choice .circle-cta').classList.add('win');
            humanScore++;
        } else if (result === "You lose") {
            computerChoiceDisplay.querySelector('.circle-cta').classList.add('win');
            computerScore++;
        }

        // Update scores
        humanScoreSpan.innerText              = humanScore;
        computerScoreSpan.innerText           = computerScore;

        // Display the announce container with smooth animation
        setTimeout(() => {
            announceContainer.classList.add('show'); // Add the class to trigger CSS transition
            announceContainer.style.display   = 'flex';

            // Fix undefined issue for "Draw"
            if (result === "Draw") {
                document.querySelector('.text-announce').innerText = "It's a draw!";
            } else {
                document.querySelector('.text-announce').innerText = result;
            }
        }, 0); // No delay, appears immediately after scores update

    }, 3000); // Delay for loading animation
}


// Reset only the interface (used by Play Again)
function resetInterface() {
    choosingContainer.style.display           = 'flex';
    comparisonContainer.style.display         = 'none';
    announceContainer.style.display           = 'none';
    announceContainer.classList.remove('show'); // Remove animation class
    loadingDiv.style.display                  = 'flex';
    computerChoiceDisplay.style.display       = 'none';
    document.querySelectorAll('.circle-cta.win').forEach(el => el.classList.remove('win'));
}

// Reset scores and the interface (used by Reset Button)
function resetGame() {
    resetInterface();
    humanScore = 0;
    computerScore = 0;
    humanScoreSpan.innerText = humanScore;
    computerScoreSpan.innerText = computerScore;

    // Clear scores from localStorage
    localStorage.removeItem('humanScore');
    localStorage.removeItem('computerScore');
}

function playRound(humanSelection) {
    const computerSelection                   = getComputerChoice();
    updateGraphics(humanSelection, computerSelection);
}

// EVENT LISTENERS
rockButton.addEventListener("click", () => playRound("rock"));
scissorsButton.addEventListener("click", () => playRound("scissors"));
paperButton.addEventListener("click", () => playRound("paper"));
playAgainButton.addEventListener("click", resetInterface); // Resets only the interface
resetButton.addEventListener("click", resetGame); // Resets scores and interface


// Load scores when the page loads
window.addEventListener('DOMContentLoaded', loadScores);

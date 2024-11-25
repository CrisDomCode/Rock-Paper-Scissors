// CONSTANTS
const choices = ["rock", "paper", "scissors"];
const rules = {
    rock: { rock: "Draw", paper: "You lose", scissors: "You win" },
    paper: { rock: "You win", paper: "Draw", scissors: "You lose" },
    scissors: { rock: "You lose", paper: "You win" },
};

let humanScore = 0;
let computerScore = 0;

// SELECTIONS
const elements = {
    rockButton            : document.querySelector('.circle-cta.rock'),
    scissorsButton        : document.querySelector('.circle-cta.scissors'),
    paperButton           : document.querySelector('.circle-cta.paper'),
    humanScoreSpan        : document.querySelector('#humanScore'),
    computerScoreSpan     : document.querySelector('#computerScore'),
    choosingContainer     : document.querySelector('.container-game.choosing'),
    comparisonContainer   : document.querySelector('.container-game.comparison'),
    computerChoiceDisplay : document.querySelector('.computer-choice-display'),
    loadingDiv            : document.querySelector('.loading-div'),
    announceContainer     : document.querySelector('.container-annouce'),
    playAgainButton       : document.querySelector('.play-again-button'),
    resetButton           : document.querySelector('.small-button[href="#reset"]'),
};

// FUNCTIONS

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('humanScore', humanScore);
    localStorage.setItem('computerScore', computerScore);
}

// Load scores from localStorage
function loadScores() {
    humanScore                                      = parseInt(localStorage.getItem('humanScore'), 10) || 0;
    computerScore                                   = parseInt(localStorage.getItem('computerScore'), 10) || 0;
    updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
    elements.humanScoreSpan.innerText               = humanScore;
    elements.computerScoreSpan.innerText            = computerScore;
}

// Get a random computer choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Show result and update interface
function displayResult(result, humanSelection, computerSelection) {
    // Display the computer's choice
    elements.computerChoiceDisplay.style.display    = 'flex';
    elements.computerChoiceDisplay.innerHTML        = `
        <div class="circle-cta ${computerSelection} big-circle w-inline-block">
            <div class="white-circle ${computerSelection} big-circle"></div>
        </div>
    `;

    // Highlight winner
    if (result === "You win") {
        document.querySelector('.container-choice .circle-cta').classList.add('win');
        humanScore++;
    } else if (result === "You lose") {
        elements.computerChoiceDisplay.querySelector('.circle-cta').classList.add('win');
        computerScore++;
    }

    // Update scores and save them
    updateScoreDisplay();
    saveScores();

    // Show announcement
    setTimeout(() => {
        elements.announceContainer.classList.add('show');
        elements.announceContainer.style.display = 'flex';
        document.querySelector('.text-announce').innerText = result === "Draw" ? "It's a draw!" : result;
    }, 0);
}

// Reset the interface
function resetInterface() {
    elements.choosingContainer.style.display        = 'flex';
    elements.comparisonContainer.style.display      = 'none';
    elements.announceContainer.style.display        = 'none';
    elements.announceContainer.classList.remove('show');
    elements.loadingDiv.style.display               = 'flex';
    elements.computerChoiceDisplay.style.display    = 'none';
    document.querySelectorAll('.circle-cta.win').forEach(el => el.classList.remove('win'));
}

// Reset scores and the interface
function resetGame() {
    resetInterface();
    humanScore                                      = 0;
    computerScore                                   = 0;
    updateScoreDisplay();
    localStorage.removeItem('humanScore');
    localStorage.removeItem('computerScore');
}

// Play a single round
function playRound(humanSelection) {
    const computerSelection                         = getComputerChoice();
    const result                                    = rules[humanSelection][computerSelection];

    elements.choosingContainer.style.display        = 'none';
    elements.comparisonContainer.style.display      = 'flex';

    // Show the user's choice
    document.querySelector('.container-choice .circle-cta.big-circle.w-inline-block').outerHTML = `
        <a href="#" class="circle-cta ${humanSelection} big-circle w-inline-block">
            <div class="white-circle ${humanSelection} big-circle"></div>
        </a>
    `;

    // Start loading animation
    elements.loadingDiv.classList.add('pulsing');
    setTimeout(() => {
        elements.loadingDiv.classList.remove('pulsing');
        elements.loadingDiv.style.display   = 'none';
        displayResult(result, humanSelection, computerSelection);
    }, 3000);
}

// EVENT LISTENERS
elements.rockButton.addEventListener("click", () => playRound("rock"));
elements.scissorsButton.addEventListener("click", () => playRound("scissors"));
elements.paperButton.addEventListener("click", () => playRound("paper"));
elements.playAgainButton.addEventListener("click", resetInterface);
elements.resetButton.addEventListener("click", resetGame);

// Load scores when the page loads
window.addEventListener('DOMContentLoaded', loadScores);

# Rock, Paper, Scissors Game

This is a simple implementation of the classic Rock, Paper, Scissors game where the user competes against the computer. The game runs for a set number of rounds, keeping track of the score, and displaying the final result at the end.

## Features
- **Choice Input:** User is prompted to choose between Rock, Paper, or Scissors.
- **Random Computer Choice:** Computer selects randomly from the available choices.
- **Score Tracking:** Both the user and the computer's scores are updated after each round.
- **Game Outcome:** The result is displayed after each round and at the end of the game.

## Game Rules
- **Rock beats Scissors**
- **Scissors beats Paper**
- **Paper beats Rock**
- **Same choices result in a Draw**

## Optimizations
Here are some potential optimizations I can implement for improved performance and user experience:

1. **Reduce Global Variables:**
   - Encapsulate the game logic within an object or class to avoid global state pollution and improve code organization.

2. **Avoid Prompt Loops:**
   - Instead of using a loop to validate user input (e.g., `do...while`), consider a more user-friendly input method like dropdowns or buttons in a GUI for smoother interaction.

3. **Optimize Random Choice Generation:**
   - Use `Math.random()` once and map it to the choices directly, reducing unnecessary complexity in generating the computer’s choice.

4. **UI/UX Enhancements:**
   - Implement a web-based interface (HTML/CSS) instead of using `prompt`/`console.log` for input and output. This will improve accessibility and make the game more interactive.
   - Use animations or visual feedback when a choice is made, showing the results more clearly.

5. **Modularize the Code:**
   - Split the game into different functions or files (e.g., separate scoring, round management, and UI handling) to make it more maintainable.

6. **Enhance Score Persistence:**
   - Use `localStorage` to store scores and allow users to pick up where they left off after refreshing the page.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rock-paper-scissors.git
2. Open the index.html file in your browser to start playing.

## Usage

The game will prompt the user to choose between "rock", "paper", or "scissors".
The computer randomly selects its move.
The winner of each round is displayed, along with the updated scores.
The game proceeds for 5 rounds and announces the overall winner at the end.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

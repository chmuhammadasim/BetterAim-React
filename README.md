# 🎉 Balloon Pop Game

**Balloon Pop** is a delightful web-based game built using React, where players aim to pop as many colorful balloons as possible while managing a timer and lives. The game includes exciting features such as various power-ups, increasing difficulty levels, and engaging sound effects, making it an entertaining experience for users of all ages.

**Live:**
https://better-aim-react.vercel.app/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Customization Options](#customization-options)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Engaging Gameplay**: Players pop balloons that rise from the bottom of the screen while trying to prevent them from escaping.
- **Variety of Balloons**: Different types of balloons, including bonus balloons that provide power-ups.
- **Power-Ups**: Encounter special balloons that grant players various power-ups, enhancing gameplay.
- **Levels and Difficulty**: The game becomes more challenging as players advance through levels, with balloons moving faster and becoming smaller.
- **Sound Effects**: Enjoy realistic sound effects when popping balloons and activating power-ups, creating an immersive experience.
- **Responsive Design**: The game is playable on various devices, including desktops, tablets, and smartphones.
- **High Score Tracking**: The game saves the highest score in the browser's local storage for competitive play.


## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the game components.
- **JavaScript**: For game logic and interactivity.
- **Audio**: Used for sound effects (pop sound).
- **React Icons**: For displaying icons in the user interface.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone [https://github.com/your-username/balloon-pop.git](https://github.com/chmuhammadasim/BetterAim-React.git)
   cd balloon-pop
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to play the game!

## How to Play

1. **Objective**: Pop as many balloons as you can within the time limit while managing your lives.
2. **Controls**:
   - Click on the balloons to pop them.
   - Use the pause button to pause the game.
   - Toggle sound effects with the sound button.
3. **Scoring**: 
   - Each regular balloon gives you 10 points.
   - Bonus balloons provide extra points (20 points).
   - Collect power-ups for additional benefits.
4. **Game Over**: The game ends when you run out of lives. You can then restart the game.

## Game Mechanics

### Balloons

- **Regular Balloons**: These balloons have no special properties and provide standard points.
- **Bonus Balloons**: These balloons have a 10% chance of appearing and can grant additional points or power-ups.

### Power-Ups

When players pop bonus balloons, they can receive various power-ups:

- **Extra Time**: Adds 5 seconds to the remaining time.
- **Slow Motion**: Temporarily slows down the balloon movement for 5 seconds.
- **Freeze**: Freezes balloons in place for 5 seconds, preventing them from escaping.
- **Double Score**: Doubles the player's score for 10 seconds.
- **Extra Life**: Grants an additional life, allowing players to continue playing.

### Lives

- Players start with **3 lives**. If a balloon escapes, a life is lost. The game ends when all lives are depleted.
- Players can collect power-ups that can restore or increase lives.

### Levels

- Players start at level 1. With every 10 combos of balloon pops, they advance to the next level, which increases the difficulty:
  - **Speed**: Balloons rise faster.
  - **Size**: Balloons become smaller and harder to click.

## Customization Options

### Themes and Styles

- You can customize the game's visual appearance by modifying the CSS styles:
  - Change balloon colors, backgrounds, and animations to create a unique visual experience.
  - Update the balloon emojis or images for different themes (e.g., Halloween, Christmas, etc.).

### Sound Effects

- To customize sound effects:
  - Replace the existing pop sound (`pop-sound.mp3`) with your own sound file while maintaining the same file format.

### Difficulty Settings

- You can adjust the game's difficulty settings by modifying the speed, balloon size, and power-up probabilities in the game logic.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, feel free to reach out:

- **Your Name**: [your-email@example.com](mailto:muhammadasimchattha@gmail.com)
- **GitHub**: [your-github-username](https://github.com/chmuhammadasim)

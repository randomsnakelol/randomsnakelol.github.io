const maze = document.getElementById('maze');
const mathProblemContainer = document.getElementById('math-problem-container');
const mathQuestion = document.getElementById('math-question');
const mathAnswer = document.getElementById('math-answer');
const scoreDisplay = document.getElementById('score');

const problems = [
    { question: "What is 5 + 3?", answer: 8 },
    { question: "What is 10 - 2?", answer: 8 },
    { question: "What is 4 * 2?", answer: 8 },
    // Add more problems as needed
];

const levels = [
    [
        ['start', 'wall', 'checkpoint', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
        ['path', 'path', 'path', 'checkpoint', 'path', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['checkpoint', 'path', 'path', 'path', 'checkpoint', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'checkpoint', 'path', 'wall', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['wall', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall'],
        ['path', 'path', 'checkpoint', 'path', 'path', 'path', 'path', 'checkpoint', 'path', 'wall'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'path', 'end'],
        ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ]
    // Add more levels as needed
];

let currentProblemIndex = 0;
let currentLevel = 0;
let currentPosition = { x: 0, y: 0 };
let score = 0;
let timerInterval;
let checkpointsSolved = {};

function showMathProblem(index) {
    mathProblemContainer.classList.remove('hidden');
    mathQuestion.textContent = problems[index].question;
    startTimer(30); // 30-second timer
    disableMaze();
}

function startTimer(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time left: ${timeRemaining} seconds`;

    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time left: ${timeRemaining} seconds`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Try again.");
            mathProblemContainer.classList.add('hidden');
            enableMaze();
        }
    }, 1000);
}

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = score;
}

function checkAnswer() {
    clearInterval(timerInterval); // Stop the timer
    const userAnswer = parseInt(mathAnswer.value);
    if (userAnswer === problems[currentProblemIndex].answer) {
        alert("Correct! You may proceed.");
        updateScore(10); // Add 10 points for each correct answer
        mathProblemContainer.classList.add('hidden');
        enableMaze();
        unlockNextPath();
        checkpointsSolved[`${currentPosition.y}-${currentPosition.x}`] = true;
        currentProblemIndex++;
    } else {
        alert("Incorrect. Try again.");
        //startTimer(30); // Restart the timer for another attempt
    }
}

function unlockNextPath() {
    // Unlock path logic remains the same
    // Check if the level is completed and load the next level
    if (currentPosition.x === 9 && currentPosition.y === 8) { // Updated position check for the end
        currentLevel++;
        if (currentLevel < levels.length) {
            loadLevel(currentLevel);
            currentPosition = { x: 0, y: 0 };
            currentProblemIndex = 0;
        } else {
            alert("Congratulations! You've completed all levels.");
            randomizeMaze();
        }
    }
}

function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    maze.innerHTML = ''; // Clear previous maze

    for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
        for (let colIndex = 0; colIndex < level[rowIndex].length; colIndex++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.classList.add(level[rowIndex][colIndex]);

            if (level[rowIndex][colIndex] === 'checkpoint') {
                cellDiv.onclick = () => reachCheckpoint(rowIndex, colIndex);
            } else if (level[rowIndex][colIndex] === 'path') {
                cellDiv.onclick = () => moveToCell(rowIndex, colIndex);
            } else if (level[rowIndex][colIndex] === 'end') {
                cellDiv.onclick = () => reachEnd(rowIndex, colIndex);
            }

            maze.appendChild(cellDiv);
        }
    }

    // Set the initial current position after loading the level
    updateMaze();
}
function reachCheckpoint(row, col) {
    if (isAdjacent(row, col) && !checkpointsSolved[`${row}-${col}`]) {
        currentPosition = { x: col, y: row };
        updateMaze();
        showMathProblem(currentProblemIndex);
    }
}

function reachEnd(row, col) {
    console.log(`Attempting to reach end at (${row}, ${col})`);
    if (isAdjacent(row, col) || checkpointsSolved[`${row}-${col}`]) {
        currentPosition = { x: col, y: row };
        updateMaze();
        if (currentLevel < levels.length - 1) {
            alert("Level completed! Loading next level.");
            currentLevel++;
            loadLevel(currentLevel);
            currentPosition = { x: 0, y: 0 };
            currentProblemIndex = 0;
        } else {
            alert("Congratulations! You've completed all levels.");
            randomizeMaze();
        }
    } else {
        console.log(`Cannot reach end at (${row}, ${col}) - not adjacent or checkpoints not solved`);
    }
}

function moveToCell(row, col) {
    if (isAdjacent(row, col) || checkpointsSolved[`${row}-${col}`]) {
        currentPosition = { x: col, y: row };
        updateMaze();
    }
}

function isAdjacent(row, col) {
    const dx = Math.abs(currentPosition.x - col);
    const dy = Math.abs(currentPosition.y - row);
    return (dx + dy === 1);
}

function updateMaze() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('current');
    });

    const currentIndex = currentPosition.y * 10 + currentPosition.x;
    cells[currentIndex].classList.add('current');

    enableMaze(); // Ensure maze is enabled for the updated positions
}
function disableMaze() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

function enableMaze() {
    const level = levels[currentLevel];
    for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
        for (let colIndex = 0; colIndex < level[rowIndex].length; colIndex++) {
            const cellDiv = maze.children[rowIndex * 10 + colIndex];
            if (level[rowIndex][colIndex] === 'checkpoint') {
                cellDiv.onclick = () => reachCheckpoint(rowIndex, colIndex);
            } else if (level[rowIndex][colIndex] === 'path') {
                cellDiv.onclick = () => moveToCell(rowIndex, colIndex);
            } else if (level[rowIndex][colIndex] === 'end') {
                cellDiv.onclick = () => reachEnd(rowIndex, colIndex);
            } else {
                cellDiv.onclick = null; // Disable click on wall cells
            }
        }
    }
}
function randomizeMaze() {
    const level = levels[currentLevel];

    // Flatten the level to easily shuffle the cells
    const flattenedLevel = level.flat();

    // Shuffle the flattened level
    for (let i = flattenedLevel.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flattenedLevel[i], flattenedLevel[j]] = [flattenedLevel[j], flattenedLevel[i]];
    }

    // Reconstruct the level with the shuffled cells
    for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
        for (let colIndex = 0; colIndex < level[rowIndex].length; colIndex++) {
            level[rowIndex][colIndex] = flattenedLevel[rowIndex * level[rowIndex].length + colIndex];
        }
    }

    // Ensure start and end positions are not walls
    let startPos = getRandomPosition(level);
    let endPos;
    do {
        endPos = getRandomPosition(level);
    } while (startPos.row === endPos.row && startPos.col === endPos.col); // Ensure start and end positions are different

    // Clear existing start and end positions
    for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
        for (let colIndex = 0; colIndex < level[rowIndex].length; colIndex++) {
            if (level[rowIndex][colIndex] === 'start' || level[rowIndex][colIndex] === 'end') {
                level[rowIndex][colIndex] = 'path';
            }
        }
    }

    // Set new start and end positions
    level[startPos.row][startPos.col] = 'start';
    level[endPos.row][endPos.col] = 'end';

    checkpointsSolved = {}; // Reset solved checkpoints
    currentPosition = { x: startPos.col, y: startPos.row }; // Set current position to start

    loadLevel(currentLevel);
    updateMaze();
}

function getRandomPosition(level) {
    let row, col;
    do {
        row = Math.floor(Math.random() * level.length);
        col = Math.floor(Math.random() * level[row].length);
    } while (level[row][col] === 'wall'); // Ensure the position is not a wall
    return { row, col };
}

// Load the first level
loadLevel(currentLevel);
updateMaze();//14 functions 4 15 2 14 13 23 5 17 4 3 9 4 15 43
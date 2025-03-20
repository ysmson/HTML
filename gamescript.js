let score = 0;
let timeLeft = 30;
let gameInterval;
let moleTimeout;
let isPaused = false;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");

function startGame() {
    score = 0;
    timeLeft = 30;
    isPaused = false;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startButton.disabled = true;
    pauseButton.disabled = false;
    pauseButton.textContent = "暫停遊戲";

    gameInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);

    spawnMole();
}

function spawnMole() {
    if (isPaused) return;

    const holes = document.querySelectorAll(".hole");
    const randomHole = holes[Math.floor(Math.random() * holes.length)];

    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.addEventListener("click", hitMole);

    randomHole.appendChild(mole);

    moleTimeout = setTimeout(() => {
        mole.remove();
        if (timeLeft > 0 && !isPaused) {
            spawnMole();
        }
    }, 800);
}

function hitMole(event) {
    if (isPaused) return;

    score++;
    scoreDisplay.textContent = score;
    event.target.remove();
}

function pauseGame() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "繼續遊戲" : "暫停遊戲";

    if (!isPaused) {
        spawnMole();
    }
}

function resetGame() {
    if (window.confirm("確定要重設遊戲嗎？")) {
        clearInterval(gameInterval);
        clearTimeout(moleTimeout);
        document.querySelectorAll(".mole").forEach(mole => mole.remove());

        score = 0;
        timeLeft = 30;
        isPaused = false;
        
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        
        startButton.disabled = false;
        pauseButton.disabled = true;
        pauseButton.textContent = "暫停遊戲";
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(moleTimeout);
    document.querySelectorAll(".mole").forEach(mole => mole.remove());

    startButton.disabled = false;
    pauseButton.disabled = true;
    alert(`遊戲結束！你的分數是：${score}`);
}

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);
resetButton.addEventListener("click", resetGame);

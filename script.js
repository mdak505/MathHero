let score = 0;
let timeLeft = 30;
let timerInterval;
let correctAnswer;

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("answer").value = "";
  generateQuestion();

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("⏱ Time's up! Final score: " + score);
      saveScore(score);
      showLeaderboard();
    }
  }, 1000);
}

function generateQuestion() {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 + num2;
  document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("correctSound").play();
  } else {
    document.getElementById("wrongSound").play();
  }
  document.getElementById("answer").value = "";
  generateQuestion();
}

function restartGame() {
  clearInterval(timerInterval);
  startGame();
}

function saveScore(newScore) {
  let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.push(newScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(scores));
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1} → ${score} pts`;
    list.appendChild(li);
  });
}

window.onload = () => {
  startGame();
  showLeaderboard();
};

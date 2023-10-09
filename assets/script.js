// DOM elements
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const endQuizPage = document.getElementById("end-quiz-page");
const highscorePage = document.getElementById("highscore-page");
const startButton = document.getElementById("start");
const startTimerElement = document.getElementById("start-timer");
const quizTimerElement = document.getElementById("quiz-timer");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const viewHighscoresButton = document.getElementById("view-highscores");

let currentQuestionIndex;
let timeLeft;
let timerInterval;
let highscores = [];

viewHighscoresButton.addEventListener("click", showHighscorePage);
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitHighscore);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);

//set of questions
const questions = [
    {
        question: "Which is a JS Datatype?",
        choices: ["Array", "Number", "Prompt", "Object"],
        answer: "Number",
    },
    {
        question: "Which is an Object Datatype?",
        choices: ["Date", "String", "Integer", "Boolean"],
        answer: "Date",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<javascript>", "<title>", "<header>"],
        answer: "<script>",
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False"],
        answer: "False",
    },
    {
        question: "JavaScript is the same as Java.",
        choices: ["True", "False"],
        answer: "False",
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["-", "=", "x", "*"],
        answer: "=",
    },
    {
        question: "Is JavaScript case-sensitive?",
        choices: ["yes", "no"],
        answer: "yes",
    },
];

function showHighscorePage() {
    startPage.style.display = "none";
    highscorePage.style.display = "block";
    displayHighscores();
}

function startQuiz() {
    startPage.style.display = "none";
    quizPage.style.display = "block";
    currentQuestionIndex = 0;
    timeLeft = 60;
    startTimerElement.textContent = "Time: " + timeLeft + " seconds";
    initializeTimer();
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
}

function initializeTimer() {
    timeLeft = 60;
    startTimerElement.textContent = "Time: " + timeLeft + " seconds";
}

function updateTimer() {
    timeLeft--;
    if (startPage.style.display === "block") {
        startTimerElement.textContent = "Time: " + timeLeft + " seconds";
    } else if (quizPage.style.display === "block") {
        quizTimerElement.textContent = "Time: " + timeLeft + " seconds";
    }
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    }
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesContainer.innerHTML = "";
    for (const element of question.choices) {
        const choice = element;
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", handleChoiceClick);
        choicesContainer.appendChild(choiceButton);
    }
}

function handleChoiceClick(event) {
    const selectedChoice = event.target;
    const question = questions[currentQuestionIndex];
    if (selectedChoice.textContent === question.answer) {
        feedbackElement.textContent = "Correct!";
    } else {
        feedbackElement.textContent = "Wrong!";
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        displayQuestion();
    }
}

function endQuiz() {
    quizPage.style.display = "none";
    endQuizPage.style.display = "block";
    finalScoreElement.textContent = timeLeft;
}

function submitHighscore(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const highscore = {
            initials: initials,
            score: timeLeft,
        };
        highscores.push(highscore);
        highscores.sort((a, b) => b.score - a.score);
        initialsInput.value = "";
        endQuizPage.style.display = "none";
        highscorePage.style.display = "block";
        displayHighscores();
    }
}

function goBack() {
    highscorePage.style.display = "none";
    startPage.style.display = "block";
}

function clearScores() {
    highscores = [];
    displayHighscores();
}

function displayHighscores() {
    const highscoreList = document.getElementById("highscore-list");
    highscoreList.innerHTML = "";
    for (const element of highscores) {
        const highscore = element;
        const highscoreItem = document.createElement("div");
        highscoreItem.textContent = `${highscore.initials}: ${highscore.score}`;
        highscoreList.appendChild(highscoreItem);
    }
}
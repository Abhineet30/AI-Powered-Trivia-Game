const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Hardcoded AI-generated questions about world history
const questions = [
    {
        question: "Who was the first emperor of the Roman Empire?",
        answers: [
            { text: "Julius Caesar", correct: false },
            { text: "Augustus", correct: true },
            { text: "Nero", correct: false },
            { text: "Caligula", correct: false }
        ]
    },
    {
        question: "In which year did the French Revolution begin?",
        answers: [
            { text: "1789", correct: true },
            { text: "1776", correct: false },
            { text: "1804", correct: false },
            { text: "1812", correct: false }
        ]
    },
    {
        question: "Which civilization built Machu Picchu?",
        answers: [
            { text: "Aztec", correct: false },
            { text: "Maya", correct: false },
            { text: "Inca", correct: true },
            { text: "Olmec", correct: false }
        ]
    },
    {
        question: "Who was the British Prime Minister during most of World War II?",
        answers: [
            { text: "Winston Churchill", correct: true },
            { text: "Neville Chamberlain", correct: false },
            { text: "Clement Attlee", correct: false },
            { text: "Margaret Thatcher", correct: false }
        ]
    },
    {
        question: "The Magna Carta was signed in which year?",
        answers: [
            { text: "1215", correct: true },
            { text: "1066", correct: false },
            { text: "1492", correct: false },
            { text: "1314", correct: false }
        ]
    },
    {
        question: "Who discovered the sea route to India around the Cape of Good Hope?",
        answers: [
            { text: "Christopher Columbus", correct: false },
            { text: "Vasco da Gama", correct: true },
            { text: "Ferdinand Magellan", correct: false },
            { text: "James Cook", correct: false }
        ]
    },
    {
        question: "Which empire was ruled by Genghis Khan?",
        answers: [
            { text: "Ottoman Empire", correct: false },
            { text: "Mongol Empire", correct: true },
            { text: "Roman Empire", correct: false },
            { text: "Persian Empire", correct: false }
        ]
    },
    {
        question: "The Berlin Wall fell in which year?",
        answers: [
            { text: "1989", correct: true },
            { text: "1991", correct: false },
            { text: "1985", correct: false },
            { text: "1995", correct: false }
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Thomas Jefferson", correct: false },
            { text: "George Washington", correct: true },
            { text: "John Adams", correct: false },
            { text: "Benjamin Franklin", correct: false }
        ]
    },
    {
        question: "Which war was fought between the North and South regions in the United States?",
        answers: [
            { text: "World War I", correct: false },
            { text: "American Civil War", correct: true },
            { text: "Revolutionary War", correct: false },
            { text: "War of 1812", correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.parentElement.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function restartGame() {
    scoreContainer.classList.add('hide');
    startButton.parentElement.classList.remove('hide');
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            setStatusClass(button, true);
        }
    });
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            showScore();
        }
    }, 1000);
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

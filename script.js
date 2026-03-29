console.log("Script loaded!");
const bar = document.getElementById('progress-bar');

function updateProgress(percent) {
    const safePercent = Math.min(Math.max(percent, 0), 100);
    bar.style.width = `${safePercent}%`;
}

function updateProgressByStep() {
    const percent = ((currentIdx + 1) / question.length) * 100;
    updateProgress(percent);
}

const question = [

    {question: "1.Which keyword is used to declare a variable that cannot be reassigned?",
    answers:[
        {text: "A.var", correct: false },
        {text: "B.let", correct: false},
        {text: "C.const", correct: true},
        {text: "D.set", correct: false},
        ]
    },

    {question: "2.What is the output of console.log(typeof null)?",
    answers:[
        {text: "A.null", correct: false},
        {text: "B.object", correct: true},
        {text: "C.undefined", correct: false},
        {text: "D.string", correct: false},
        ]
    },

    {question: "3.Which method is used to add an element to the end of an array?",
    answers:[
        {text: "A. .shift()", correct: false},
        {text: "B. .pop()", correct: false},
        {text: "C. .push()", correct: true},
        {text: "D. .unshift()", correct: false},
        ]
    },

    {question: "4.What does the === operator check for?",
    answers:[
        {text: "A. value only", correct: false},
        {text: "B. value and type", correct: true},
        {text: "C. reference only", correct: false},
        {text: "D. assignment", correct: false},
        ]
    },

    {question: "5.Which of these is a 'primitive' data type in JavaScript?",
    answers:[
        {text: "A.array", correct: false},
        {text: "B.string", correct: true},
        {text: "C.object", correct: false},
        {text: "D.date", correct: false},
        ]
    },

    {question: "6.What is the correct syntax for a template literal?",
    answers:[
        {text: "A.'Hello ${name}'", correct: false},
        {text: "B.'(Hello ${name})'", correct: false},
        {text: "C.`Hello ${name}`", correct: true},
        {text: "D.<<Hello ${name}>>", correct: false},
        ]
    },

    {question: "7.Which function is used to execute code after a specific delay?",
    answers:[
        {text: "A.setInterval()", correct: false},
        {text: "B.setTimeout()", correct: true},
        {text: "C.delay()", correct: false},
        {text: "D.wait()", correct: false},
        ]
    },

    {question: "8.How do you write a single-line comment in JS",
    answers:[
        {text: "A. <!-- Comment -->", correct: false},
        {text: "B./* Comment */", correct: false},
        {text: "C.// Comment", correct: true},
        {text: "D.# Comment", correct: false},
        ]
    },

    {question: "9.What is the result of '5' + 2?",
    answers:[
        {text: "A.7", correct: false},
        {text: "B.52", correct: true},
        {text: "C.NaN", correct: false},
        {text: "D.undefined", correct: false},
        ]
    },

    {question: "10.Which keyword is used to handle asynchronous code in a cleaner way alongside await?",
    answers:[
        {text: "A.async", correct: true},
        {text: "B.promise", correct: false},
        {text: "C.then", correct: false},
        {text: "D.callback", correct: false},
        ]
    },
]

const questext = document.getElementById('ques-text');
const ansBtns = document.getElementById('ans-btns');
const nxtBtn = document.getElementById('nxt-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentIdx = 0;
let score = 0;

function startQuiz() {
    currentIdx = 0;
    score = 0;
    resultContainer.classList.add('hide');
    questext.parentElement.classList.remove('hide');
    ansBtns.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    updateProgressByStep();
    let currentQ = question[currentIdx];
    questext.innerText = currentQ.question;

    currentQ.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.className = "bg-white border-2 border-sky-900 rounded-2xl m-2 p-2 hover:bg-slate-50 transition-all";
        button.onclick = () => selectAnswer(answer, button);
        ansBtns.appendChild(button);
    });
}

function resetState() {
    nxtBtn.classList.add('hide');
    submitBtn.classList.add('hide');
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAnswer(answer, button) {
    if (answer.correct) {
        score++;
        button.classList.remove('bg-white');
        button.classList.add('bg-green-400');
    } else {
        button.classList.remove('bg-white');
        button.classList.add('bg-red-400');
    }

    Array.from(ansBtns.children).forEach(btn => {
        btn.disabled = true;
    });

    if (currentIdx < question.length - 1) {
        nxtBtn.classList.remove('hide');
    } else {
        submitBtn.classList.remove('hide');
    }
}

nxtBtn.addEventListener('click', () => {
    currentIdx++;
    showQuestion();
});

submitBtn.addEventListener('click', () => {
    questext.parentElement.classList.add('hide');
    ansBtns.classList.add('hide');
    submitBtn.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreSpan.innerText = `${score} / ${question.length}`;
});

restartBtn.addEventListener('click',startQuiz);

startQuiz();
const questions = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language",
      "High Text Machine Language",
      "Home Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    q: "Which property is used in CSS to change text color?",
    options: ["font-color", "text-color", "color", "fgcolor"],
    answer: "color"
  },
  {
    q: "Which method is used to print output in JavaScript?",
    options: ["print()", "console.log()", "echo()", "write()"],
    answer: "console.log()"
  },
  {
    q: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Display Object Management",
      "Document Orientation Map"
    ],
    answer: "Document Object Model"
  },
  {
    q: "Which symbol is used for single-line comment in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  }
];

let index = 0;
let score = 0;
let time = 10;
let timer;

const progressCircle = document.querySelector(".progress");
const timeText = document.getElementById("time");

const radius = 40;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showInstructions() {
  showScreen("instructions");
}

function startQuiz() {
  index = 0;
  score = 0;
  showScreen("quiz");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);

  time = 10;
  setProgress(10);
  timeText.textContent = time;

  let q = questions[index];
  document.getElementById("question").innerHTML =
  `Question ${index + 1} of ${questions.length}<br><br>${q.q}`;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsDiv.appendChild(btn);
  });

  startTimer();
}

function setProgress(value) {
  const offset = circumference - (value / 10) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    timeText.textContent = time;
    setProgress(time);

    if (time <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(btn, correct) {
  let options = document.querySelectorAll(".option");

  options.forEach(opt => {
    opt.disabled = true;
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    }
  });

  if (btn.textContent !== correct) {
    btn.classList.add("wrong");
  } else {
    score++;
  }

  clearInterval(timer);
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen("result");
  document.getElementById("scoreText").innerHTML =
    `🎉 You scored <b>${score}</b> out of <b>${questions.length}</b> marks`;
}

function restart() {
  index = 0;
  score = 0;
  showScreen("welcome");
}
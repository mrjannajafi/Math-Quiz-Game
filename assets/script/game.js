"use strict";

const countDown = document.querySelector("#countDown");
const gameContainer = document.querySelector("#gameContainer");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector("#progressText");
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const choice = document.querySelectorAll(".choice");
const skip = document.querySelector("#skip");
const questionCounter = document.querySelector("#questionCounter");

// Progress Time bar✅

function runProgressTime() {
  let progress = 0; // progress bar number
  let interval; //ذخیره زمان
  const circumference = 565.48; // 2πr (2*3.14*90) محیط دایره
  const duration = 60; // seconds to complete full circle

  function updateProgress() {
    progress++;

    const progressPercent = Math.min(progress, 60); //در بازه 0 تا 60 عدد باید باشد .
    const offset = circumference - (progressPercent / 60) * circumference;

    progressFill.style.strokeDashoffset = offset;
    progressText.textContent = `${Math.floor(progressPercent)}`;
  }

  if (!interval || progress >= 60) {
    interval = setInterval(updateProgress, (duration * 1000) / 60);
  }
}

let count = 4;
let click = 0;
let num1;
let num2;
let operator;
let correctAnswer;
const operators = ["+", "-", "*", "/"];
const optionBtn = [...choice];

//  Timer befor start game✅

const countDownTime = setInterval(() => {
  countDown.textContent = --count;

  if (count == 0) {
    countDown.textContent = "start";
  }

  if (count < 0) {
    document.body.classList.remove("loading");

    clearInterval(countDownTime);

    runProgressTime();

    generateNewQuestion();
    click = 1;
    questionCounter.textContent = click;
  }
}, 1000);

// generate question✅

function displayQuestion() {
  question.innerHTML = "";
  question.textContent = `${num1} ${operator} ${num2} = ?`;
}

function calculat() {
  switch (operator) {
    case "+":
      return num1 + num2;

    case "-":
      return num1 >= num2 ? num1 - num2 : num2 - num1;

    case "*":
      return num1 * num2;

    case "/":
      return num1 / num2;

    default:
      0;

      break;
  }
}

function generateOptions() {
  const options = [correctAnswer];

  while (options.length < 4) {
    const wrongNumber = correctAnswer + (Math.trunc(Math.random() * 5) + 1);
    if (!options.includes(wrongNumber)) {
      options.push(wrongNumber);
    }
  }

  //  when suffle array if random number is negetive replace number 1 and 2 and if number is positive number in array reverse

  options.sort(() => Math.random() - 0.5);

  optionBtn.forEach((btn, index) => {
    btn.innerHTML = "";
    btn.textContent = options[index];
  });
}

function generateNewQuestion() {
  operator = operators[Math.trunc(Math.random() * operators.length)];

  if (operator === "/") {
    num2 = Math.trunc(Math.random() * 5 + 1);
    const multiplier = Math.trunc(Math.random() * 5 + 1);
    num1 = num2 * multiplier;
  } else if (operator === "-") {
    do {
      num1 = Math.trunc(Math.random() * 20 + 1);
      num2 = Math.trunc(Math.random() * 20 + 1);
    } while (num1 < num2);
  } else {
    num1 = Math.trunc(Math.random() * 20 + 1);
    num2 = Math.trunc(Math.random() * 20 + 1);
  }
  displayQuestion();
  correctAnswer = calculat();
  generateOptions();
}

// click Answer ✅

optionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    optionBtn.forEach((button) => {
      button.disabled = true;

      if (button.textContent == correctAnswer) {
        button.classList.add("correct__btn");
      }
    });

    if (btn.textContent != correctAnswer) {
      btn.classList.add("wrong__btn");
    }
  });
});

// reset Btn Option ✅

function reloadBtn() {
  optionBtn.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("correct__btn");
    btn.classList.remove("wrong__btn");
  });
}

skip.addEventListener("click", (e) => {
  e.preventDefault();
  click++;
  if (click <= 10) {
    generateNewQuestion();
    reloadBtn();
    questionCounter.textContent = click;
  }else{
    gameContainer.style.opacity = '0'
  }
});

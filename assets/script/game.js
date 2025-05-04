"use strict";

const countDown = document.querySelector("#countDown");
const gameContainer = document.querySelector("#gameContainer");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector("#progressText");
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice");

// Progress Time bar

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

//  Timer befor start game

let count = 4;

const countDownTime = setInterval(() => {
  countDown.textContent = --count;

  if (count == 0) {
    countDown.textContent = "start";
  }

  if (count < 0) {
    document.body.classList.remove("loading");

    clearInterval(countDownTime);

    runProgressTime();

    generateQuestion();

    generateAnswer();
  }
}, 1000);

// Make question

let num1;
let num2;
let currectAnswer;

const operators = ["+", "-", "*", "/"];
const operator = operators[Math.trunc(Math.random() * operators.length)];

if (operator == "/") {
  num2 = Math.trunc(Math.random() * 5 + 1);
  const multiplier = Math.trunc(Math.random() * 5 + 1);
  num1 = num2 * multiplier;
} else {
  num1 = Math.trunc(Math.random() * 20 + 1);
  num2 = Math.trunc(Math.random() * 20 + 1);
}

function generateQuestion() {
  question.textContent = `${num1} ${operator} ${num2} = ?`;
}

// calculate question

function calculat(num1, num2, operator) {
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
currectAnswer = calculat(num1, num2, operator);

// generate Answer

function generateAnswer(wrongAnswer) {
  const options = [currectAnswer];
  const numOption = Math.trunc(Math.random() * 5 + 1);
  wrongAnswer = numOption + currectAnswer;
  options.push(wrongAnswer);
}
generateAnswer();

//     const html = `         
//      <button class="choice">${option}</button>
//      <button class="choice">${option}</button>
//      <button class="choice">${option}</button>
//      <button class="choice">${option}</button>
// `;

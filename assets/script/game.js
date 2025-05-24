"use strict";

const countDown = document.querySelector("#countDown");
const gameContainer = document.querySelector("#gameContainer");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector("#progressText");
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const choice = document.querySelectorAll(".choice");
const skip = document.querySelector("#skip");

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

// generate question

let num1;
let num2;
let correctAnswer;

const operators = ["+", "-", "*", "/"];

const operator = operators[Math.trunc(Math.random() * operators.length)];

// generate Number and operator
if (operator == "/") {
  num2 = Math.trunc(Math.random() * 5 + 1);
  const multiplier = Math.trunc(Math.random() * 5 + 1);
  num1 = num2 * multiplier;
} else if (operator == "-" && num1 < num2) {
  num2 = Math.trunc(Math.random() * 20 + 1);
  num1 = num2 * Math.trunc(Math.random() * 20 + 1);
} else {
  num1 = Math.trunc(Math.random() * 20 + 1);
  num2 = Math.trunc(Math.random() * 20 + 1);
}

console.log(operator ,  num1  , num2);

function generateQuestion() {
  question.innerHTML = "";
  question.textContent = `${num1} ${operator} ${num2} = ?`;
}

// calculate question ✅

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
correctAnswer = calculat(num1, num2, operator);

// generate Wrong Answer ✅

const optionBtn = [...choice];

function generateAnswer() {
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
  skip.addEventListener("click", (e) => {
  e.preventDefault();
  
  const operator = operators[Math.trunc(Math.random() * operators.length)];
  
  if (operator === "/") {
    num2 = Math.trunc(Math.random() * 5 + 1);
    const multiplier = Math.trunc(Math.random() * 5 + 1);
    num1 = num2 * multiplier;
  } 
  else if (operator === "-") {
    // مطمئن شو num1 >= num2 تا نتیجه غیرمنفی شود
    do {
      num1 = Math.trunc(Math.random() * 20 + 1);
      num2 = Math.trunc(Math.random() * 20 + 1);
    } while (num1 < num2); // تا وقتی num1 < num2 هست، دوباره اعداد جدید تولید کن
  } 
  else {
    num1 = Math.trunc(Math.random() * 20 + 1);
    num2 = Math.trunc(Math.random() * 20 + 1);
  }

  question.innerHTML = "";
  question.textContent = `${num1} ${operator} ${num2} = ?`;
  correctAnswer = calculat(num1, num2, operator);
  generateAnswer();
  reloadBtn();
  console.log(operator, num1, num2);
});
});

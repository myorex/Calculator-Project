// Basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Nice try. Can't divide by 0 😎";
  return a / b;
}

// Operate function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

// Variables
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

// Display update
function updateDisplay(value) {
  display.textContent = value;
}

// Digit input
function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    updateDisplay(number);
    shouldResetDisplay = false;
  } else {
    updateDisplay(display.textContent + number);
  }
}

// Operator handling
function setOperator(operator) {
  if (currentOperator !== null) evaluate();

  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

// Evaluate
function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "string") {
    updateDisplay(result);
    resetCalculator();
    return;
  }

  result = Math.round(result * 1000000) / 1000000;
  updateDisplay(result);
  firstNumber = result;
  currentOperator = null;
}

// Clear
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  updateDisplay("0");
}

// Reset after error
function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = true;
}

// Backspace
function backspace() {
  if (shouldResetDisplay) return;
  display.textContent = display.textContent.slice(0, -1) || "0";
}

// Decimal
function appendDecimal() {
  if (shouldResetDisplay) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  }
  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
}

// Button Listeners
document.querySelectorAll(".digit").forEach(button =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

document.querySelectorAll(".operator").forEach(button =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

document.querySelector(".equals")
  .addEventListener("click", evaluate);

document.querySelector(".clear")
  .addEventListener("click", clearCalculator);

document.querySelector(".backspace")
  .addEventListener("click", backspace);

document.querySelector(".decimal")
  .addEventListener("click", appendDecimal);

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) appendNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
  if (e.key === "Enter" || e.key === "=") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === ".") appendDecimal();
  if (e.key === "Escape") clearCalculator();
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "No";
    }
    return x / y;
}

let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;


function operate(operator, x, y) {
    let a = Number(x);
    let b = Number(y);

    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else {
        return null;
    }
}


const display = document.getElementById("display");

function updateDisplay(value) {
    display.value = value;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        updateDisplay("");
        shouldResetDisplay = false;
    }

    updateDisplay(display.value + number);
}


function setOperator(op) {
    if (operator !== null) evaluate();

    firstNumber = display.value;
    operator = op;
    shouldResetDisplay = true;
}


function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}


function evaluate() {
    if (operator === null || shouldResetDisplay) {
        return
    }

    secondNumber = display.value;

    let result = operate(operator, firstNumber, secondNumber);

    updateDisplay(roundResult(result));

    operator = null;
    firstNumber = result;
    shouldResetDisplay = true;
}


function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  updateDisplay("0");
}

document.querySelectorAll(".key").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clear();
    } else if (value === "=") {
      evaluate();
    } else {
      appendNumber(value);
    }
  });
});

document.querySelectorAll(".operator").forEach(button => {
  button.addEventListener("click", () => {
    setOperator(button.textContent);
  });
});

document.querySelector("#equal").addEventListener("click", evaluate);
document.querySelector("#clear").addEventListener("click", clear);
let runnuingTotal = 0;
let buffer = "0";
let previousOperator;

const display = document.querySelector(".display");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  display.innerText = buffer;
}
function handleSymbol(symbol) {
  switch (symbol) {
    case "Ac":
      buffer = "0";
      runnuingTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runnuingTotal;
      runnuingTotal = 0;
      break;
    case "Del":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "%":
    case "/":
    case "x":
    case "-":
    case "+":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runnuingTotal === 0) {
    runnuingTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runnuingTotal += intBuffer;
  } else if (previousOperator === "-") {
    runnuingTotal -= intBuffer;
  } else if (previousOperator === "x") {
    runnuingTotal *= intBuffer;
  } else if (previousOperator === "/") {
    runnuingTotal /= intBuffer;
  } else if (previousOperator === "%") {
    runnuingTotal %= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document.querySelector(".button").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

init();

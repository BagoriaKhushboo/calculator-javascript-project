class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  chooseNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOpertion(operation) {
    if (this.currentOperand === " ") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prevValue = parseFloat(this.previousOperand);
    const currentvalue = parseFloat(this.currentOperand);
    if (isNaN(prevValue) || isNaN(currentvalue)) return;
    switch (this.operation) {
      case "+":
        computation = prevValue + currentvalue;
        break;
      case "-":
        computation = prevValue - currentvalue;
        break;
      case "*":
        computation = prevValue * currentvalue;
        break;
      case "÷":
        computation = prevValue / currentvalue;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
    this.previousOperandText.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandText, currentOperandText);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOpertion(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

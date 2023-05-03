(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  const numberButtons = getAll('.cell_button.number');
  const operationButtons = getAll('.cell_button.operation');
  const clearButton = get('.cell_button.clear');
  const allClearButton = get('.cell_button.all_clear');
  const computeButton = get('.cell_button.compute');
  const display = get('.display');

  class Calculator {
    constructor(element) {
      this.element = element;
      this.currentValue = '';
      this.prevValue = '';
    }

    reset() {
      this.currentValue = '';
      this.prevValue = '';
      this.operation = null;
      this.resetOperation();
    }
    clear() {
      //현재 값이 존재하는 경우
      if (this.currentValue) {
        this.currentValue = '';
        return;
      }
      //연산자 버튼을 클릭한 경우
      if (this.operation) {
        this.resetOperation();
        this.currentValue = this.prevValue;
        return;
      }
      //이전값이 존재하는 경우
      if (this.prevValue) {
        this.prevValue = '';
      }
    }

    appendNumber(number) {
      if (number === '.' && this.currentValue.includes('.')) return;
      this.currentValue = this.currentValue += number;
    }
    updateDisplay() {
      if (this.currentValue) {
        this.element.value = this.currentValue;
        return;
      }
      if (this.prevValue) {
        this.element.value = this.prevValue;
        return;
      }
      this.element.value = 0;
    }
    setOperation(operation) {
      this.resetOperation();
      this.operation = operation;
      this.prevValue = this.currentValue;
      this.currentValue = '';

      const elements = Array.from(operationButtons);
      const element = elements.filter((element) =>
        element.innerText.includes(operation)
      )[0];
      element.classList.add('active');
    }

    resetOperation() {
      this.operation = null;
      const elements = Array.from(operationButtons);
      elements.forEach((element) => {
        element.classList.remove('active');
      });
    }

    compute() {
      let computation;
      const prev = parseFloat(this.prevValue);
      const current = parseFloat(this.currentValue);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '÷':
          computation = prev / current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '+':
          computation = prev + current;
          break;
        default:
          return;
      }
      this.currentValue = computation;
      this.prevValue = '';
      this.resetOperation();
    }
  }

  const calculator = new Calculator(display);

  numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
      calculator.appendNumber(numberButton.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach((operationButton) => {
    operationButton.addEventListener('click', () => {
      calculator.setOperation(operationButton.innerText);
      calculator.updateDisplay();
    });
  });

  computeButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  allClearButton.addEventListener('click', () => {
    calculator.reset();
    calculator.updateDisplay();
  });
})();

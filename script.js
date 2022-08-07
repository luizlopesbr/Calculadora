let firstNumber = '', secondNumber = '', operation = '', total = '', currentOperation = '', lastResult = '';
let fullCycle = false;//Cycle is a complete operation, linke 2 + 3 = 5, for examplo.
let flagOperation = 0, flagReset = 0, flagNegativeFirst = 0, flagPositiveFirst = 0;
let flagNegativeSecond = 0, flagPositiveSecond = 0, flagOpenToGetOperation = false;

function getNumber(num) {
    if (fullCycle == false) {
        storeFirstOrSecondNumber(num)
    } else {
        if (flagReset == 0) {
            reset();
        }
        storeFirstOrSecondNumber(num)
    }
}

function storeFirstOrSecondNumber(num) {
    if (flagOperation == 0) {//First time, get first number. Next step, jump to get second number.
        if (flagNegativeFirst == 1) {
            firstNumber += ('-' + num);
            currentOperation += ('-' + num);
            displayResult(currentOperation);
            flagNegativeFirst = 0;
            flagOpenToGetOperation = true;
        } else if (flagPositiveFirst == 1) {
            firstNumber += num;
            currentOperation += num;
            displayResult(currentOperation);
            flagPositiveFirst = 0;
        } else {
            firstNumber += num;
            currentOperation += num;
            displayResult(currentOperation);
            flagOpenToGetOperation = true;
        }
    } else {
        if (flagNegativeSecond == 1) {
            secondNumber += ('-' + num);
            currentOperation += ('-' + num);
            displayResult(currentOperation);
            flagNegativeSecond = 0;
        } else if (flagPositiveSecond == 1) {
            secondNumber += num;
            currentOperation += num;
            displayResult(currentOperation);
            flagPositiveSecond = 0;
        } else {
            secondNumber += num;
            currentOperation += num;
            displayResult(currentOperation);
        }
    }
}

function getOperation(aritmetica) {
    if (fullCycle == false) {
        positiveOrNegativeNumberCheck(aritmetica);
    } else {
        newCalcWithPreviousResults();
        positiveOrNegativeNumberCheck(aritmetica);
    }
}

function positiveOrNegativeNumberCheck(aritmetica) {
    if(flagOpenToGetOperation == true){
        operation = aritmetica;
        currentOperation += operation;
        displayResult(currentOperation);
        flagOperation = 1;
        flagOpenToGetOperation = false;
    }else{
        if (firstNumber == '' && aritmetica == '-') {
            if(fullCycle != false) {
                operation = aritmetica;
            }
            flagNegativeFirst = 1;
        } else if (firstNumber == '' && aritmetica == '+') {
            if(fullCycle != false) {
                operation = aritmetica;
            }
            flagPositiveFirst = 1;
        } else if (secondNumber == '' && aritmetica == '-') {
            if(fullCycle != false) {
                operation = aritmetica;
            }
            flagNegativeSecond = 1;
        } else if (secondNumber == '' && aritmetica == '+') {
            if(fullCycle != false) {
                operation = aritmetica;
            }
            flagPositiveSecond = 1;
        } 
    }
}

function newCalcWithPreviousResults() {
    flagReset = 1;
    firstNumber = lastResult;
    secondNumber = '';
    total = '';
    currentOperation = lastResult;
    flagOpenToGetOperation = true;
}

function getFinalResult() {
    switch (operation) {
        case ('+'):
            total = parseFloat(firstNumber) + parseFloat(secondNumber);
            prepareNextCalculation();
            break;

        case ('-'):
            total = parseFloat(firstNumber) - parseFloat(secondNumber);
            prepareNextCalculation();
            break;

        case ('x'):
            total = parseFloat(firstNumber) * parseFloat(secondNumber);
            prepareNextCalculation();
            break;

        case ('/'):
            total = parseFloat(firstNumber) / parseFloat(secondNumber);
            prepareNextCalculation();
            break;

        default:
            window.alert('Something wrong happened!')
            break;
    }
}

function displayResult(num) {
    document.getElementById('result').textContent = num;
}

function prepareNextCalculation() {
    displayResult(total);
    fullCycle = true;
    lastResult = total;
    flagReset = 0;
}

function reset() {
    firstNumber = '', secondNumber = '', operation = '', total = '', currentOperation = '';
    flagOperation = 0;
    fullCycle = false;
    document.getElementById('result').textContent = '|';
}
function isNumeric(str, ) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function GetStringNumber(equation, positionData) {
    strNumber = "";
    for (; positionData.curPosition < equation.length; positionData.curPosition++) {
        if (isNumeric(equation[positionData.curPosition]) || equation[positionData.curPosition] == 'x') {
            strNumber += equation[positionData.curPosition];
        } else {
            positionData.curPosition--;
            break;
        }
    }

    return strNumber;
}

function ToPostfix(equation, operationPriority) {
    postfixEquation = "";
    var stack = [];
    var i = {
        curPosition : 0,
    }
    for (; i.curPosition < equation.length; i.curPosition++) {
        if (equation[i.curPosition] == 'x' || isNumeric(equation[i.curPosition])) {
            postfixEquation += GetStringNumber(equation, i) + ' ';
        } else if (equation[i.curPosition] == '(') {
            stack.push(equation[i.curPosition]);
        } else if (equation[i.curPosition] == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                postfixEquation += stack.pop();
            }
            stack.pop();
        } else if (operationPriority.get(equation[i.curPosition])) {
            flag = 0;
            if (equation[i.curPosition] == '-' && (i.curPosition == 0 || (i.curPosition > 1 && operationPriority.get(equation[i.curPosition-2])))) {
                flag = 1;
            }
            while (stack.length > 0 && (operationPriority.get(stack[stack.length - 1]) >= (operationPriority.get(equation[i.curPosition]) + flag * 3))) {
                postfixEquation += stack.pop() + ' ';
            }
            if (flag) {
                stack.push('~');
            } else {
                stack.push(equation[i.curPosition]);
            }
        }
    }
    while (stack.length > 0) {
        if (stack.length == 1) {
            postfixEquation += stack.pop();
        } else {
            postfixEquation += stack.pop() + ' ';
        }
    }

    return postfixEquation
}

function Execute(operator, firstValue, secondValue) {
    switch(operator) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '*':
            return firstValue * secondValue;
        case '/':
            return firstValue / secondValue;
        case '^':
            return Math.pow(firstValue, secondValue);
        default:
            return 0;
    }
}

function Calc(postfix, operationPriority, value) {
    stackOfNumbers = []
    var i = {
        curPosition : 0,
    }
    for (; i.curPosition < postfix.length; i.curPosition++) {
        if (isNumeric(postfix[i.curPosition])) {
            number = GetStringNumber(postfix, i);
            stackOfNumbers.push(+number);
            i.curPosition++
        } else if (postfix[i.curPosition] == 'x') {
            stackOfNumbers.push(value);
            i.curPosition++
        } else if (operationPriority.get(postfix[i.curPosition])) {
            if (postfix[i.curPosition] == '~') {
                if (stackOfNumbers.length == 0) {
                    last = 0;
                } else {
                    last = stackOfNumbers.pop();
                }
                stackOfNumbers.push(Execute('-', 0, +last));
            } else {
                if (stackOfNumbers.length == 0) {
                    second = 0;
                } else {
                    second = stackOfNumbers.pop();
                }
                if (stackOfNumbers.length == 0) {
                    first = 0;
                } else {
                    first = stackOfNumbers.pop();
                }
                stackOfNumbers.push(Execute(postfix[i.curPosition], first, second));
            }
        }
        // console.log(stackOfNumbers);
    }
    return stackOfNumbers.pop();
}

equation = "-( x + 8 ) ^ 2 + 31 - x * x";
value = 4;

operationPriority = new Map();
operationPriority.set('(', 0);
operationPriority.set('+', 1);
operationPriority.set('-', 1);
operationPriority.set('*', 2);
operationPriority.set('/', 2);
operationPriority.set('^', 3);
operationPriority.set('~', 4);
var i = {
    curPosition : 0,
}
postfix = ToPostfix(equation, operationPriority);
// console.log(postfix);
answer = Calc(postfix, operationPriority, value);
console.log(answer);
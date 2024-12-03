const fs = require('fs');


function readInput() {
    return fs.readFileSync('input.txt', 'utf8');
}

function trimUnusedInput(input) {
    let trimmedInput = input;

    do {
        if (trimmedInput.includes("don't()")) {
            const startIndex = trimmedInput.indexOf("don't()");
            const endIndex = trimmedInput.indexOf("do()", startIndex);
    
            if (startIndex !== -1 && endIndex !== -1) {
                trimmedInput = trimmedInput.substring(0, startIndex) + trimmedInput.substring(endIndex + "do()".length);
            } else if (startIndex !== -1) {
                trimmedInput = trimmedInput.substring(0, startIndex);
            } else if (startIndex === 0) {
                trimmedInput = trimmedInput.substring("don't()".length);
            }
        }
    } while (trimmedInput.includes("don't()"));
    

    return trimmedInput;
}

function parseMultiplyCommands(inputString) {
    const matches = [...inputString.matchAll(/\bmul\((\d{1,3}),(\d{1,3})\)/g)];
    const multiples = [];

    matches.forEach(match => {
        const matchValue = match[0];
        const digit1 = +matchValue.substring(matchValue.indexOf('(') + 1, matchValue.indexOf(','));
        const digit2 = +matchValue.substring(matchValue.indexOf(',') + 1, matchValue.lastIndexOf(')'));
        multiples.push([digit1, digit2])
    });

    return multiples;
}

function executeMultiplyPairs(pairs) {
    let result = 0;
    pairs.forEach(pair => {
        result += (pair[0] * pair[1]);
    })

    return result;
}

const inputString = readInput();
const trimmedString = trimUnusedInput(inputString)
const multiplyPairs = parseMultiplyCommands(trimmedString);
const result = executeMultiplyPairs(multiplyPairs);
console.log(result);
export function randomBoolean() {
    return Math.floor(Math.random() * 2) + 1 === 1;
}

export function randomMix(maxNum) {
    return Math.floor(Math.random() * maxNum) + 1;
}

export function randomBetween(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// for (let i = 0; i < 100; i++) {
//     console.log(randomBetween(40,41))
// }

export function randomMixExclude1(maxNum) {
    let result;
    do {
        result = Math.floor(Math.random() * maxNum) + 1;
    } while (result === 1);
    return result;
}


export function isSumUnitsDigitZero(num1, num2) {
    const sum = num1 + num2;
    const unitsDigit = sum % 10;
    return unitsDigit === 0;
}

export function isDiffUnitsDigitZero(num1, num2) {
    const sum = num1 - num2;
    const unitsDigit = sum % 10;
    return unitsDigit === 0;
}

/**
 * 生成随机问题数组
 * @param {Function} genAllQuestionsFunc - 生成所有问题的函数
 * @param {number} questionCount - 需要生成的问题数量
 * @return {Array} 返回一个包含随机问题的数组
 */
export function genRandomQuestions(genAllQuestionsFunc, questionCount) {
    // 调用函数生成所有问题
    const allQuestions = genAllQuestionsFunc();
    // 初始化一个空数组用于存放随机问题
    const questions = [];

    if (questionCount > allQuestions.l) {
        questions.push(allQuestions);
    }else {
        while (questions.length < questionCount) {
            const index = Math.floor(Math.random() * allQuestions.length);
            const selectedQuestion = allQuestions[index];
            if (!questions.includes(selectedQuestion)) {
                questions.push(selectedQuestion);
            }
            // If the number of unique questions in allQuestions is less than questionCount,
            // break the loop to avoid an infinite loop.
            if (questions.length === allQuestions.length) {
                break;
            }
        }
    }
    // 打乱结果数组的顺序
    shuffle(questions);
    // 返回最终的问题数组
    return questions;
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function calculate(expression) {
    let [num1, operator, num2] = expression.split(' ');
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '✖️':
            return num1 * num2;
        case '➗️':
            return num1 / num2;
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}
//
// // Test the function
// console.log(calculate('5 ✖️ 6 ='));  // Output: 30
// console.log(calculate('30 ➗️ 5 =')); // Output: 6
// console.log(calculate('5 + 5 ='));   // Output: 10
// console.log(calculate('6 - 6 ='));   // Output: 0

export function findAnyFactor(num) {
    for (let i = 2; i <= Math.floor(num / 2); i++) {
        if (num % i === 0 && num / i <10 && i<10) {
            return i;
        }
    }
    return 1;
}
// console.log(findAnyFactor(18))
//
// module.exports = {
//     randomBoolean,randomMix,isSumUnitsDigitZero,isDiffUnitsDigitZero,genRandomQuestions,shuffle,calculate,randomMixExclude1,randomBetween
// };
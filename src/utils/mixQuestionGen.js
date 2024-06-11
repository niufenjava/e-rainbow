import { randomBoolean, randomMix, isSumUnitsDigitZero, isDiffUnitsDigitZero, genRandomQuestions, shuffle, calculate, randomMixExclude1, randomBetween } from './commonUtils.js';

/**
 * 表以内3个数连乘
 * @example 1 ✖️ 8 ✖️ 2  =
 */
function genTripleMulti(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 54)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9 - num1);
        const num3 = randomMix(9);
        if (num1 * num2 > 9 || num2 === 1 || num1 === 1) {
            continue;
        }
        const question = `${num1} ✖️ ${num2} ✖️ ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}
// console.log(genTripleMulti(60))

/**
 * 表以内3个数连除
 * @example 48 ➗️ 6 ➗️ 4 =
 */
function genTripleDiv(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9);
        const num3 = randomMix(9);
        if (num1 === 1 || num2 === 1 || num3 === 1 || num1 * num2 * num3 > 81 || (num1 * num2 * num3) / num2 >= 10) {
            continue;
        }
        const question = `${num1 * num2 * num3} ➗️ ${num2} ➗️ ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genTripleDiv(10))

/**
 * 表以内3个数连除（带括号）
 * @example ['12 ➗️ (30 ➗️ 5) = ', '18 ➗️ (36 ➗️ 2) = ', ...]
 */
function genTripleDivWithBracket(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9);
        const num3 = randomMix(9);
        const num4 = randomMix(9);
        if (num2 === 1 || num1 === 1 || num3 === 1 || num4 === 1 || (num1 * num2) % (num3) !== 0) {
            continue;
        }
        const question = `${num1 * num2} ➗️ (${num3 * num4} ➗️ ${num4}) = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genTripleDivWithBracket(10))

/**
 * 表以内先乘后除
 * @example ['1 ✖️ 8 ➗️ 2  = ', '3 ✖️ 2 ➗️ 1 = ', ...]
 */
function genMultiDiv(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9 - num1);
        const num3 = randomMix(9);
        if (num2 === 1 || num1 === 1 || num3 === 1 || num3 === num2 || num3 === num1 || num1 * num2 / num3 > 10 || (num1 * num2) % num3 !== 0) {
            continue;
        }
        const question = `${num1} ✖️ ${num2} ➗️ ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}

/**
 * 表以内先乘后除（带括号）
 * @example ['1 ✖️ (8 ➗️ 2)  = ', '3 ✖️ (2 ➗️ 1) = ', ...]
 */
function genMultiDivWithBracket(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9);
        const num3 = randomMix(9);
        if (num2 === 1 || num1 === 1 || num3 === 1) {
            continue;
        }
        const question = `${num1} ✖️ (${num2 * num3} ➗️ ${num3}) = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genMultiDivWithBracket(10))


/**
 * 表以内先除后乘
 * @example [' 8 ➗️ 2 ✖️ 1   = ', '2 ➗️ 1 ✖️ 3 = ', ...]
 */
function genDivMulti(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9);
        const num3 = randomMix(9);
        if (num2 === 1 || num1 === 1 || num3 === 1) {
            continue;
        }
        const question = `${num1 * num2} ➗️ ${num1} ✖️ ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genDivMulti(10))

/**
 * 表以内先除后乘（带括号）
 * @example [' 8 ➗️ (2 ✖️ 1)   = ', '6 ➗️ (1 ✖️ 3) = ', ...]
 */
function genDivMultiWithBracket(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = randomMix(9);
        const num2 = randomMix(9);
        const num3 = randomMix(9);
        const num4 = randomMix(9);
        if (num2 === 1 || num1 === 1 || num3 === 1 || (num1 * num2) % (num3 * num4) !== 0 || num3 * num4 > 9) {
            continue;
        }
        const question = `${num1 * num2} ➗️ (${num3} ✖️ ${num4}) = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genDivMultiWithBracket(10))


/**
 * 表内乘法与加减混合
 * @example
 *  8 ✖️ 5 + 9  =
 *  8 ✖️ 5 - 9  =
 *  41 + 8 ✖️ 5  =
 *  41 - 8 ✖️ 5  =
 */
function genMultiAddSub(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomMixExclude1(9);
        const num2 = randomMixExclude1(9);
        const num3 = randomMix(99);
        let question = '';
        if (randomBoolean()) {
            if (num1 * num2 + num3 > 100) {
                continue;
            }
            if (randomBoolean()) {
                question = `${num1} ✖️ ${num2} + ${num3} = `;
            } else {
                question = `${num3} +  ${num1} ✖️ ${num2}  = `;
            }
        } else {
            if (randomBoolean()) {
                if (num1 * num2 - num3 < 0) {
                    continue;
                }
                question = `${num1} ✖️ ${num2} - ${num3} = `;
            } else {
                if (num3 - num1 * num2 < 0) {
                    continue;
                }
                question = `${num3} -  ${num1} ✖️ ${num2}  = `;
            }
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genMultiAddSub(10))


/**
 * 表内乘法与加减混合（带括号）
 * @example
 *   4 * (3 + 3) =
 *  (3 + 3) * 4 =
 *   4 * (6 - 3) =
 *   (6 - 3) * 4 =

 */
function genMultiAddSubWithBracket(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomMixExclude1(9);

        let question = '';
        if (randomBoolean()) {
            const num2 = randomMix(9);
            const num3 = randomMix(9 - num2);
            if (randomBoolean()) {
                question = `${num1} ✖️ (${num2} + ${num3}) = `;
            } else {
                question = `(${num2} +  ${num3}) ✖️ ${num1}  = `;
            }
        } else {
            const num2 = randomMix(90);
            const num3 = randomBetween(num2, num2 + 9);
            if (randomBoolean()) {
                question = `${num1} ✖️ (${num3} - ${num2}) = `;
            } else {
                question = `(${num3} -  ${num2}) ✖️ ${num1}  = `;
            }
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genMultiAddSubWithBracket(10))

/**
 * 表内除法与加减混合
 * @example
 *  40 ➗ 5 + 9  =
 *  41 + 40 ➗ 5  =
 *  40 ➗ 5 - 9  =
 *  41 - 40 ➗ 5  =
 */
function genDevAddSub(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomMixExclude1(9);
        const num2 = randomMixExclude1(9);
        const num3 = randomMix(99);
        let question = '';
        if (randomBoolean()) {
            if (num1 + num3 > 100) {
                continue;
            }
            if (randomBoolean()) {
                question = `${num1 * num2} ➗ ${num2} + ${num3} = `;
            } else {
                question = `${num3} +  ${num1 * num2} ➗ ${num2}  = `;
            }
        } else {
            if (randomBoolean()) {
                if (num1 - num3 < 0) {
                    continue;
                }
                question = `${num1 * num2} ➗ ${num2} - ${num3} = `;
            } else {
                if (num3 - num1 < 0) {
                    continue;
                }
                question = `${num3} -  ${num1 * num2} ➗ ${num2}  = `;
            }
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genDevAddSub(10))

/**
 * 表内除法与加减混合
 * @example
 * 81 ÷ (6 + 3) =
 * 81 ÷ (9 - 3) =
 * (40 + 41) ÷ 9 =
 * (82 - 1) ÷ 9 =
 */
function genDevAddSubWithBracket(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomMixExclude1(9);
        const num2 = randomMixExclude1(9);

        let question = '';
        if (randomBoolean()) {
            const num3 = randomMix(num2);
            if (randomBoolean()) {
                question = `${num1 * num2} ➗ (${num3} + ${num2 - num3}) = `;
            } else {
                question = `${num1 * num2} ➗ (${num2 + num3} -️ ${num3}) = `;
            }
        } else {
            const num3 = randomMix(num1 * num2);
            if (randomBoolean()) {
                question = `(${num3} + ${num1 * num2 - num3}) ➗ ${num1} = `;
            } else {
                question = `(${num3 + num1 * num2} -️ ${num3}) ➗ ${num1} = `;
            }
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genDevAddSubWithBracket(10))


// 将所有的问题生成函数放入一个数组
const questionGenerators = [
    genTripleMulti,
    genTripleDiv,
    genTripleDivWithBracket,
    genMultiDiv,
    genMultiDivWithBracket,
    genDivMulti,
    genDivMultiWithBracket,
    genMultiAddSub,
    genMultiAddSubWithBracket,
    genDevAddSub,
    genDevAddSubWithBracket
];

/**
 * @category 脱式计算
 * @name 加减乘除混合
 * @example 24 ➗️ 4 ➗️ 2 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genMixQuestions(questionCount) {
    const questions = [];
    for (let i = 0; i < questionCount; i++) {
        // 随机选择一个问题生成函数
        const randomIndex = randomMix(questionGenerators.length - 1);
        const questionGenerator = questionGenerators[randomIndex];

        // 生成问题并添加到问题数组中
        const question = questionGenerator(1); // 假设每个问题生成函数都接受一个参数，表示要生成的问题数量
        questions.push(...question);
    }
    return questions;
}
// console.log(generateRandomQuestions(10))
import {
    randomMix,
    genRandomQuestions,
    randomBetween
} from './commonUtils.js';

/**
 * 连加连减通用方法
 * @param {number} questionCount - 需要生成的题目数量
 * @param limitNum 限制数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genMixed(questionCount, limitNum) {

    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * limitNum);
        const num2 = Math.floor(Math.random() * limitNum);
        const num3 = Math.floor(Math.random() * limitNum);
        const randomNum = randomMix(7);
        if (num1 === 0 || num2 === 0 || num3 === 0) {
            if (randomMix(10) !== 1) {
                continue;
            }
        }
        // 1 + 2 + 3 =
        if (randomNum === 1) {
            if ((num1 + num2) > limitNum || (num1 + num2 + num3) > limitNum) {
                continue;
            }
            const question = `${num1} + ${num2} + ${num3} = `;
            questions.add(question);
            // 1 + 2 - 3 =
        } else if (randomNum === 2) {
            if ((num1 + num2) > limitNum || (num1 + num2 - num3) < 0) {
                continue;
            }
            const question = `${num1} + ${num2} - ${num3} = `;
            questions.add(question);
            // 3 - 2 - 1 =
        } else if (randomNum === 3) {
            if ((num1 - num2) < 0 || (num1 - num2 - num3) < 0) {
                continue;
            }
            const question = `${num1} - ${num2} - ${num3} = `;
            questions.add(question);
            // 3 - 2 + 1 =
        } else if (randomNum === 4) {
            if ((num1 - num2) < 0 || (num1 - num2 + num3) > limitNum) {
                continue;
            }
            const question = `${num1} - ${num2} + ${num3} = `;
            questions.add(question);
            // 3 - (2 - 1) =
        } else if (randomNum === 5) {
            if ((num2 - num3) < 0 || (num1 - (num2 - num3)) < 0) {
                continue;
            }
            const question = `${num1} - (${num2} - ${num3}) = `;
            questions.add(question);
            // 3 - (2 + 1) =
        } else if (randomNum === 6) {
            if ((num2 + num3) > limitNum || (num1 - (num2 + num3)) < 0) {
                continue;
            }
            const question = `${num1} - (${num2} + ${num3}) = `;
            questions.add(question);
            // 1 + (3 - 2)
        } else if (randomNum === 7) {
            if ((num2 - num3) < 0 || (num1 + (num2 - num3)) > limitNum) {
                continue;
            }
            const question = `${num1} + (${num2} - ${num3}) = `;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

/**
 * 10以内加法（全部、按顺序）
 * 例: 5 + 2 = 、6 + 1 =
 *
 * @return {string[]} 返回一个包含所有可能的10以内的加法问题的数组
 */
function genAddIn10All() {
    const questions = [];
    for (let num1 = 1; num1 <= 10; num1++) {
        for (let num2 = 1; num2 <= 10 - num1; num2++) {
            const question = `${num1} + ${num2} =`;
            questions.push(question);
        }
    }
    return questions;
}

// console.log(genAddIn10All())

/**
 * 10以内加法
 * 例: 5 + 2 、 6 + 1 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genAddIn10(questionCount) {
    return genRandomQuestions(genAddIn10All, questionCount);
}

// console.log(genAddIn10(100))

/**
 * 10以内加法（全部、按顺序、带括号）
 * 例: 5 + (　) = 7 、 (　) + 3 = 7
 *
 * @return {string[]} 返回一个包含所有可能的10以内的加法问题的数组
 */
function genAddIn10BlankAll() {
    const questions = [];
    for (let num1 = 1; num1 <= 10; num1++) {
        for (let num2 = 1; num2 <= 10 - num1; num2++) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.push(question1);
            questions.push(question2);
        }
    }
    return questions;
}

// console.info(genAddIn10BlankAll());

/**
 * 10以内加法（带括号）
 * 例: 5 + (　) = 7 、(　) + 3 = 7
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genAddIn10Blank(questionCount) {
    return genRandomQuestions(genAddIn10BlankAll, questionCount);
}

// console.info(genAddIn10Blank(10));

/**
 * 10以内连加
 * 例: '0 + 1 + 9 = 、4 + 1 + 2 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genContAddIn10(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 50)) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = 1;
        const num3 = Math.floor(Math.random() * 10);
        if ((num1 + num2 + num3) > 10) {
            continue;
        }
        if (num1 === 0 && num3 === 0) {
            continue;
        }
        const question = `${num1} + ${num2} + ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genContAddIn10(60))

/**
 * 10以内减法（全部、按顺序）
 * 例: 5 - 2 = 、 6 - 1 =
 *
 * @return {string[]} 返回一个包含所有可能的10以内的减法问题的数组
 */
function genSubIn10All() {
    const questions = [];
    for (let num1 = 1; num1 <= 10; num1++) {
        for (let num2 = 1; num2 < num1; num2++) {
            const question = `${num1} - ${num2} =`;
            questions.push(question);
        }
    }
    return questions;
}

// console.log(genSubIn10All());

/**
 * 10以内减法
 * 例: 5 - 2 = 、 6 - 1 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genSubIn10(questionCount) {
    return genRandomQuestions(genSubIn10All, questionCount);
}

// console.log(genSubIn10(10));

/**
 * 10以内减法（全部、按顺序、带括号）
 * 例: 5 - (　) = 3 、(　) - 2 = 3
 *
 * @return {string[]} 返回一个包含所有可能的10以内的减法问题的数组
 */
function genSubIn10BlankAll() {
    const questions = [];

    for (let num1 = 1; num1 <= 10; num1++) {
        for (let num2 = 1; num2 <= num1; num2++) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.push(question1);
            questions.push(question2);
        }
    }
    return questions;
}

// console.log(genSubIn10BlankAll())

/**
 * 10以内减法（带括号）
 * 例: 5 - (　) = 3 、 (　) - 2 = 3
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genSubIn10Blank(questionCount) {
    return genRandomQuestions(genSubIn10BlankAll, questionCount);
}

// console.log(genSubIn10Blank(10))

/**
 * 10以内连减
 * 例: 3 - 1 - 2 = 、7 - 1 - 4 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genContSubIn10(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        let num1 = Math.floor(Math.random() * 10);
        let num2 = 1;
        let num3 = Math.floor(Math.random() * 10);
        if ((num1 - num2) < 0 || (num1 - num2) > 10 || (num1 - num2 - num3) < 0 || (num1 - num2 - num3) > 10) {
            continue;
        }
        const question = `${num1} - ${num2} - ${num3} = `;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genContSubIn10(10));

/**
 * 10以内连加连减
 * 例: 1 + 2 + 3 = 、1 + 2 - 3 =
 *    3 - 2 - 1 = 、3 - 2 + 1 =
 *    3 - (2 - 1) = 、3 - (2 + 1) = 、1 + (3 - 2) =
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
function genMixedIn10(questionCount) {
    return genMixed(questionCount, 10);
}

// console.log(genMixedIn10(100))

/**
 * @name 20以内加法（全部、按顺序）
 * 例: 5 + 7 = 、 6 + 8 =
 */
function genAddIn20All() {
    const questions = [];
    for (let num1 = 1; num1 < 19; num1++) {
        for (let num2 = 1; num2 <= 19; num2++) {
            if (num1 + num2 >= 11 && num1 + num2 <= 19 && (num1 % 10 + num2 % 10 >= 10)) {
                const question = `${num1} + ${num2} =`;
                questions.push(question);
            }
        }
    }
    return questions;
}

// console.log(genAddIn20All())

/**
 * @name 20以内加法
 * @category 基础加减法
 * @example: 5 + 7 = 、 6 + 8 =
 *
 * @return {string[]} 返回一个包含所有可能的和在11到19之间的加法问题的数组
 */
export function genAddIn20(questionCount) {
    return genRandomQuestions(genAddIn20All, questionCount);
}

// console.log(genAddIn20(100))

/**
 * 20以内加法（全部、按顺序、带括号）
 * 例: 5 + (　) = 12 、(　) + 8 = 14
 *
 * @return {string[]} 返回一个包含所有可能的和在11到19之间的加法问题的数组
 */
function genAddIn20AllBlank() {
    const questions = [];

    for (let num1 = 1; num1 < 19; num1++) {
        for (let num2 = 1; num2 <= 19; num2++) { // 修改这里
            if (num1 + num2 >= 11 && num1 + num2 <= 19 && (num1 % 10 + num2 % 10 >= 10)) {
                const question1 = `${num1} + (　) = ${num1 + num2}`;
                const question2 = `(　) + ${num2} = ${num1 + num2}`;
                questions.push(question1);
                questions.push(question2);
            }
        }
    }
    return questions;
}

// console.log(genAddIn20AllBlank())

/**
 * @category 基础加减法
 * @name 20以内加法（带括号）
 * @example: 5 + (　) = 12 、 (　) + 8 = 14
 *
 * @return {string[]} 返回一个包含所有可能的和在11到19之间的加法问题的数组
 */
export function genAddIn20Blank(questionCount) {
    return genRandomQuestions(genAddIn20AllBlank, questionCount);
}

// console.log(genAddIn20Blank(10))

/**
 * 20以内减法（全部、按顺序）
 * 例: 15 - 7 = 、18 - 9 =
 *
 * @return {string[]} 返回一个包含所有可能的差在11到19之间的减法问题的数组
 */
function genSubIn20All() {
    const questions = [];
    for (let num1 = 11; num1 <= 19; num1++) {
        for (let num2 = 1; num2 < num1; num2++) {
            if (num1 % 10 < num2 % 10) {
                const question = `${num1} - ${num2} =`;
                questions.push(question);
            }
        }
    }
    return questions;
}

// console.log(genSubIn20All())

/**
 * @category 基础加减法
 * @name 20以内减法
 * @example: 15 - 7 = 、18 - 9 =
 *
 * @return {string[]} 数组
 */
export function genSubIn20(questionCount) {
    return genRandomQuestions(genSubIn20All, questionCount);
}

// console.log(genSubIn20(10))

/**
 * 20以内减法（全部、按顺序、带括号）
 * @example (　) - 8 = 4 、 14 - (　) = 7
 *
 * @return {string[]} 数组
 */
function genSubIn20AllBlank() {
    const questions = [];
    for (let num1 = 11; num1 <= 19; num1++) {
        for (let num2 = 1; num2 < num1; num2++) {
            if (num1 % 10 < num2 % 10) {
                const question1 = `${num1} - (　) = ${num1 - num2}`;
                const question2 = `(　) - ${num2} = ${num1 - num2}`;
                questions.push(question1);
                questions.push(question2);
            }
        }
    }
    return questions;
}

// console.log(genSubIn20AllBlank())

/**
 * @category 基础加减法
 * @name 20以内减法（带括号）
 * @example (　) - 8 = 4 、 14 - (　) = 7
 *
 * @return {string[]} 数组
 */
export function genSubIn20Blank(questionCount) {
    return genRandomQuestions(genSubIn20AllBlank, questionCount);
}

// console.log(genSubIn20Blank(10))


/**
 * @category 基础加减法
 * @name 20以内加减混合
 * @example 13 - (10 + 2) = 、6 + 3 + 5 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genMixedIn20(questionCount) {
    return genMixed(questionCount, 20);
}

// console.log(genMixedIn20(100))

/**
 * @category 基础加减法
 * @name 100以内加法（不进位）
 * @example 35 + 41 = 、20 + 70 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100NoCarry(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100NoCarry(100))


/**
 * @category 基础加减法
 * @name 100以内加法（不进位、带括号）
 * @example (　) + 4 = 68、 20 + (　) = 95
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100NoCarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100NoCarryBlank(50));

/**
 * @category 基础加减法
 * @name 100以内加法（进位）
 * @example 35 + 46 = 、21 + 69 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100Carry(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 < 10 && num2 < 10) {
            continue;
        }
        if (num1 % 10 + num2 % 10 >= 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100Carry(100))

/**
 * @category 基础加减法
 * @name 100以内加法
 * @example 35 + 46 = 、21 + 69 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 < 10 && num2 < 10) {
            continue;
        }
        if (num1 % 10 + num2 % 10 >= 8) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100(20))

/**
 * @category 基础加减法
 * @name 100以内加法（进位、带括号）
 * @example (　) + 9 = 68、 26 + (　) = 95
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100CarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 < 10 && num2 < 10) {
            continue;
        }
        if (num1 % 10 + num2 % 10 >= 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100CarryBlank(100))

/**
 * @category 基础加减法
 * @name 100以内加法（带括号）
 * @example (　) + 9 = 68、 26 + (　) = 95
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn100Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * (100 - num1)) + 1; // 生成1到100-num1的随机数
        if (num1 < 10 && num2 < 10) {
            continue;
        }
        if (num1 % 10 + num2 % 10 >= 8) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn100Blank(10))

/**
 * @category 基础加减法
 * @name 100以内减法（不退位）
 * @example 55 - 41 = 、60 - 20 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100NoBorrow(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        // 检查num1和num2是否同时为个位数
        if (num1 < 10 && num2 < 10) {
            continue;
        }
        if (num1 % 10 >= num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100NoBorrow(100))

/**
 * @category 基础加减法
 * @name 100以内减法（不退位、带括号）
 * @example (　) - 47 = 32 、77 - (　) = 64
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100NoBorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 >= num2 % 10) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100NoBorrowBlank(100));

/**
 * @category 基础加减法
 * @name 100以内减法（退位）
 * @example 55 - 46 = 、60 - 12 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100Borrow(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 > 20 && num1 % 10 < num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100Borrow(100))


/**
 * @category 基础加减法
 * @name 100以内减法
 * @example 55 - 46 = 、60 - 12 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 > 20 && num1 % 10 < num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }else {
            if (num1 > 20 && num1 % 9 < num2 % 9) {
                const question = `${num1} - ${num2} =`;
                questions.add(question);
            }
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100(10))

/**
 * @category 基础加减法
 * @name 100以内减法（退位、带括号）
 * @example 94 - (　) = 27' 、(　) - 67 = 27
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100BorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 > 20 && num1 % 10 < num2 % 10 && num1 >= 20) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100BorrowBlank(100))
/**
 * @category 基础加减法
 * @name 100以内减法（带括号）
 * @example 94 - (　) = 27' 、(　) - 67 = 27
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn100Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 90) + 10; // 生成10到100的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 > 20 && num1 % 5 < num2 % 5 && num1 >= 20) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn100Blank(100))

/**
 * @category 基础加减法
 * @name 100以内连加连减
 * @example 68 - 48 + 43 =、10 + 53 - 13 = '
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genMixedIn100(questionCount) {
    return genMixed(questionCount, 100);
}

// console.log(genMixedIn100(10))

/**
 * @category 基础加减法
 * @name 1000以内加法（整10）
 * @example 530 + 60 = 、 630 + 900 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000Ten(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.round(randomBetween(100, 999) / 10) * 10; // 生成100到10000的随机数
        const num2 = Math.round(randomBetween(100, 999 - num1) / 10) * 10; // 生成1到10000-num1的随机数
        const question = `${num1} + ${num2} =`;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genAddIn1000Ten(100))

/**
 * @category 基础加减法
 * @name 1000以内加法（不进位）
 * @example 982 + 6 = 、 712 + 246 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000NoCarry(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * (1000 - num1)) + 1; // 生成1到1000-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn1000NoCarry(100))


/**
 * @category 基础加减法
 * @name 1000以内加法（不进位、带括号）
 * @example 982 + 6 = 、 712 + 246 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000NoCarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * (1000 - num1)) + 1; // 生成1到1000-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn1000NoCarryBlank(100))

/**
 * @category 基础加减法
 * @name 1000以内加法（进位）
 * @example 305 + 405 =、 201 + 709 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000Carry(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * (1000 - num1)) + 1; // 生成1到1000-num1的随机数
        if (num1 % 10 + num2 % 10 >= 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn1000Carry(100))

/**
 * @category 基础加减法
 * @name 1000以内加法（进位、带括号）
 * @example 629 + (　) = 818 、 (　) + 189 = 818
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000CarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 9000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * (1000 - num1)) + 1; // 生成1到1000-num1的随机数
        if (num1 % 10 + num2 % 10 >= 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn1000CarryBlank(100))

/**
 * @category 基础加减法
 * @name 1000以内加法（带括号）
 * @example 629 + (　) = 818 、 (　) + 189 = 818
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn1000Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 9000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * (1000 - num1)) + 1; // 生成1到1000-num1的随机数

            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
    }
    return Array.from(questions);
}

// console.log(genAddIn1000CarryBlank(100))

/**
 * @category 基础加减法
 * @name 1000以内减法（整10）
 * @example 950 - 60 = 、 900 - 300 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000Ten(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.round(randomBetween(100, 999) / 10) * 10; // 生成100到10000的随机数
        const num2 = Math.round(randomBetween(100, 999 - num1) / 10) * 10; // 生成1到10000-num1的随机数
        const question = `${num1 + num2} - ${num2} =`;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genSubIn1000Ten(100));


/**
 * @category 基础加减法
 * @name 1000以内减法（不退位）
 * @example 982 - 111 = 、 712 - 12 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000NoBorrow(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 < 200 && num2 < 100) {
            continue;
        }
        if (num1 % 10 >= num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn1000NoBorrow(100))

/**
 * @category 基础加减法
 * @name 1000以内减法（不退位、带括号）
 * @example 617 - (　) = 450 、 (　) - 463 = 342
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000NoBorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 < 200 && num2 < 100) {
            continue;
        }
        if (num1 % 10 >= num2 % 10) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn1000NoBorrowBlank(100))

/**
 * @category 基础加减法
 * @name 1000以内减法（退位）
 * @example 982 - 111 = 、 712 - 12 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000Borrow(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 9000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 < num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn1000Borrow(10))

/**
 * @category 基础加减法
 * @name 1000以内减法（退位、带括号）
 * @example 305 - (　) = 210、 (　) - 405 = 210
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000BorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 < num2 % 10) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn1000BorrowBlank(10))

/**
 * @category 基础加减法
 * @name 1000以内减法（带括号）
 * @example 305 - (　) = 210、 (　) - 405 = 210
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn1000Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 1000)) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 生成100到1000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        const question1 = `${num1} - (　) = ${num1 - num2}`;
        const question2 = `(　) - ${num2} = ${num1 - num2}`;
        questions.add(question1);
        questions.add(question2);
    }
    return Array.from(questions);
}

// console.log(genSubIn1000BorrowBlank(10))
/**
 * @category 基础加减法
 * @name 10000以内加法（不进位）
 * @example 9530 + 6 = 、 9030 + 901 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000NoCarry(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * (10000 - num1)) + 1; // 生成1到10000-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn10000NoCarry(100));

/**
 * @category 基础加减法
 * @name 10000以内加法（整10）
 * @example 9530 + 60 = 、 9030 + 900 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000Ten(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.round(randomBetween(100, 9999) / 10) * 10; // 生成100到10000的随机数
        const num2 = Math.round(randomBetween(100, 9999 - num1) / 10) * 10; // 生成1到10000-num1的随机数
        const question = `${num1} + ${num2} =`;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genAddIn10000Ten(100));

/**
 * @category 基础加减法
 * @name 10000以内减法（整10）
 * @example 9530 + 60 = 、 9030 + 900 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000Ten(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.round(randomBetween(100, 9999) / 10) * 10; // 生成100到10000的随机数
        const num2 = Math.round(randomBetween(100, 9999 - num1) / 10) * 10; // 生成1到10000-num1的随机数
        const question = `${num1 + num2} - ${num2} =`;
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genSubIn10000Ten(100));

/**
 * @category 基础加减法
 * @name 10000以内加法（不进位、带括号）
 * @example 3060 + (　) = 9346 、 (　) + 2014 = 5698
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000NoCarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * (10000 - num1)) + 1; // 生成1到10000-num1的随机数
        if (num1 % 10 + num2 % 10 < 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn10000NoCarryBlank(100))


/**
 * @category 基础加减法
 * @name 10000以内加法（进位）
 * @example 3589 + 2677 = 、 3198 + 1749 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000Carry(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * (10000 - num1)) + 1; // 生成1到10000-num1的随机数
        if (num1 % 10 + num2 % 10 >= 10) {
            const question = `${num1} + ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.info(genAddIn10000Carry(100))

/**
 * @category 基础加减法
 * @name 10000以内加法（进位、带括号）
 * @example (　) + 718 = 4607 、3889 + (　) = 4607'
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000CarryBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * (10000 - num1)) + 1; // 生成1到10000-num1的随机数
        if (num1 % 10 + num2 % 10 >= 10) {
            const question1 = `${num1} + (　) = ${num1 + num2}`;
            const question2 = `(　) + ${num2} = ${num1 + num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genAddIn10000CarryBlank(100));

/**
 * @category 基础加减法
 * @name 10000以内加法（带括号）
 * @example (　) + 718 = 4607 、3889 + (　) = 4607'
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genAddIn10000Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * (10000 - num1)) + 1; // 生成1到10000-num1的随机数
        const question1 = `${num1} + (　) = ${num1 + num2}`;
        const question2 = `(　) + ${num2} = ${num1 + num2}`;
        questions.add(question1);
        questions.add(question2);
    }
    return Array.from(questions);
}

// console.log(genAddIn10000CarryBlank(100));

/**
 * @category 基础加减法
 * @name 10000以内减法（不退位）
 * @example 1199 - 870 、 7889 - 29 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000NoBorrow(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 >= num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn10000NoBorrow(100))

/**
 * @category 基础加减法
 * @name 10000以内减法（不退位、带括号）
 * @example 1832 - (　) = 116 、(　) - 1716 = 116
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000NoBorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9900) + 100; // 生成100到10000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 >= num2 % 10) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn10000NoBorrowBlank(100));


/**
 * @category 基础加减法
 * @name 10000以内减法（退位）
 * @example 1832 - (　) = 116 、(　) - 1716 = 116
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000Borrow(questionCount) {
    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * 9000) + 1000; // 生成1000到10000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 < num2 % 10) {
            const question = `${num1} - ${num2} =`;
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.info(genSubIn10000Borrow(100))

/**
 * @category 基础加减法
 * @name 10000以内减法（退位、带括号）
 * @example 1832 - (　) = 116 、(　) - 1716 = 116
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000BorrowBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9000) + 1000; // 生成1000到10000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        if (num1 % 10 < num2 % 10) {
            const question1 = `${num1} - (　) = ${num1 - num2}`;
            const question2 = `(　) - ${num2} = ${num1 - num2}`;
            questions.add(question1);
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// console.log(genSubIn10000BorrowBlank(100))



/**
 * @category 基础加减法
 * @name 10000以内减法（带括号）
 * @example 1832 - (　) = 116 、(　) - 1716 = 116
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genSubIn10000Blank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 10000)) {
        const num1 = Math.floor(Math.random() * 9000) + 1000; // 生成1000到10000的随机数
        const num2 = Math.floor(Math.random() * num1) + 1; // 生成1到num1的随机数
        const question1 = `${num1} - (　) = ${num1 - num2}`;
        const question2 = `(　) - ${num2} = ${num1 - num2}`;
        questions.add(question1);
        questions.add(question2);
    }
    return Array.from(questions);
}

// console.log(genSubIn10000BorrowBlank(100))


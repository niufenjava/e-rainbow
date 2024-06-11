import {
    randomBoolean,
    randomMix,
    isSumUnitsDigitZero,
    isDiffUnitsDigitZero,
    genRandomQuestions,
    shuffle,
    calculate,
    randomMixExclude1,
    randomBetween
} from './commonUtils.js';

/**
 * 表内乘法（全部、按顺序）
 * @example  ['1 ✖️ 1 = 1', '2 ✖️ 1 = 2', ..., '9 ✖️ 9 = 81']
 *
 * @returns {string[]} - 生成的乘法运算数组
 */
function genMultiAll() {
    let table = [];
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            table.push(`${i} ✖️ ${j} = `);
        }
    }
    return table;
}

// console.log(genMultiAll());

/**
 * @category 基础乘除法
 * @name 表内乘法
 * @example 1 ✖️ 1 =、3 ✖️ 2 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @returns {string[]} - 生成的乘法运算数组
 */
export function genMulti(questionCount) {
    return genRandomQuestions(genMultiAll, questionCount);
}

// console.log(getMulti(10))

/**
 * 表内除法（全部）
 * @example  ['9 ➗ 1 = 9', '8 ➗ 2 = 4', ..., '9 ➗ 9 = 1']
 *
 * @returns {string[]} - 生成的除法运算数组
 */
function genDivAll() {
    let table = [];
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            table.push(`${i * j} ➗️ ${i} = `);
        }
    }
    return table;

}

// console.log(genDivAll())

/**
 * @category 基础乘除法
 * @name 表内除法
 * @example 9 ➗ 1 = 、 8 ➗ 2 =
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @returns {string[]} - 生成的除法运算数组
 */
export function genDiv(questionCount) {
    return genRandomQuestions(genDivAll, questionCount);
}

// console.log(getDiv(10));


/**
 * 表内乘法（全部、带括号）
 * 5 * (　) = 15 、(　) * 3 = 15
 *
 * @return {string[]} 返回一个包含所有可能的乘法问题的数组
 */
function genMultiAllBlank() {
    const questions = [];
    for (let num1 = 1; num1 <= 9; num1++) {
        for (let num2 = 1; num2 <= 9; num2++) {
            const question1 = `${num1} ✖ (　) = ${num1 * num2}`;
            const question2 = `(　) ✖️ ${num2} = ${num1 * num2}`;
            questions.push(question1);
            questions.push(question2);
        }
    }
    return questions;
}

// console.log(genMultiAllBlank());

/**
 * @category 基础乘除法
 * @name 表内乘法（带括号）
 * @example  5 * (　) = 15 、(　) * 3 = 15
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genMultiBlank(questionCount) {
    return genRandomQuestions(genMultiAllBlank, questionCount);
}

// console.log(getMultiBlank(10));

/**
 * 表内除法（全部、带括号）
 * @example  15 ➗ (　) = 5 、15 ➗ 3 = (　)
 *
 * @return {string[]} 返回一个包含所有可能的除法问题的数组
 */
function genDivAllBlank() {
    const questions = [];
    for (let num1 = 1; num1 <= 9; num1++) {
        for (let num2 = 1; num2 <= 9; num2++) {
            const question1 = `${num1 * num2} ➗ (　) = ${num1}`;
            const question2 = `(　) ➗ ${num2} = ${num1}`;
            questions.push(question1);
            questions.push(question2);
        }
    }
    return questions;
}

// console.log(genDivAllBlank());

/**
 * @category 基础乘除法
 * @name 表内除法（带括号）
 * @example 15 ➗ (　) = 5 、15 ➗ (　) = 3
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @return {string[]} 返回一个包含生成的题目的数组
 */
export function genDivBlank(questionCount) {
    return genRandomQuestions(genDivAllBlank, questionCount);
}

// console.log(getDivBlank(10));

/**
 * @category 基础乘除法
 * @name 表内有余数的除法
 * @example 9 ➗ 2 = 、 7 ➗ 3 =
 * */
export function genDivWithRemainder(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = Math.floor(Math.random() * 8) + 2;
        const num1Remainder = Math.floor(Math.random() * (num1)) + 1;
        if (num1Remainder === num1 && randomMix(10) !== 1) {
            continue;
        }
        const num2 = Math.floor(Math.random() * 8) + 2;
        const num2Remainder = Math.floor(Math.random() * (num2)) + 1;
        if (num2Remainder === num1 && randomMix(10) !== 1) {
            continue;
        }
        const question1 = `${(num1 * num2) + num1Remainder} ➗ ${num1} = `;
        const question2 = `${(num1 * num2) + num2Remainder} ➗ ${num2} = `;
        questions.add(question1);
        questions.add(question2);
    }
    return Array.from(questions);
}

// 测试函数
// console.log(genDivWithRemainder(10));

/**
 * @category 基础乘除法
 * @name 表内有余数的除法（带括号）
 * @example 9 ➗ 2 = 、 7 ➗ 3 =
 * */
export function genDivWithRemainderBlank(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = Math.floor(Math.random() * 8) + 2;
        const num1Remainder = Math.floor(Math.random() * (num1)) + 1;
        if (num1Remainder === num1 && randomMix(10) !== 1) {
            continue;
        }
        const num2 = Math.floor(Math.random() * 8) + 2;
        const num2Remainder = Math.floor(Math.random() * (num2)) + 1;
        if (num2Remainder === num1 && randomMix(10) !== 1) {
            continue;
        }
        const question1 = `(　) ➗ ${num1} = ${num2}......${num2Remainder}`;
        const question2 = `${(num1 * num2) + num2Remainder} ➗ (　) = ${num1}......${num2Remainder}`;
        if (randomBoolean()) {
            questions.add(question1);
        } else {
            questions.add(question2);
        }
    }
    return Array.from(questions);
}

// 测试函数
// console.log(genDivWithRemainderBlank(100));


/**
 * 10以内相同整数连加（全部）
 * @example  ['7 + 7 + 7 + 7  = ', '2 + 2 + 2  = ', ...]
 *
 * @returns {string[]} - 生成的乘法运算数组
 */
function genContSubAll() {
    let table = [];
    for (let i = 2; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            let question = '';
            for (let t = 0; t <= i; t++) {
                question += `${j} + `;
            }
            question = question.slice(0, -2);
            table.push(`${question} = `);
        }
    }
    return table;
}

// console.log(genContSubAll());
/**
 * @category 基础乘除法
 * @name 10以内相同整数连加
 * @example 6＋6＋6＋6＝
 * */
export function genAddSameInt(questionCount) {
    return genRandomQuestions(genContSubAll, questionCount);
}

// console.info(genAddSameInt(10))


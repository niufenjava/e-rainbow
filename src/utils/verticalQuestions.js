import {
    randomBoolean,
    randomBetween
} from './commonUtils.js';
import {genDivWithRemainder} from "./multiAndDivQuestionsGen.js";


/**
 * @category 竖式计算
 * @name 100以内竖式混合
 * @example 51 + (20 - 8) =
 */
export function genVertical100(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomBetween(10, 99);
        const num2 = randomBetween(10, 99);
        const num3 = randomBetween(2, 99);
        let question = '';
        if (randomBoolean()) {
            if (num1 + num2 + num3 > 100) {
                continue;
            }
            question = `${num1} +️ ${num2} + ${num3} = `;
        }
        if (randomBoolean()) {
            if (num1 - num2 - num3 < 0) {
                continue;
            }
            question = `${num1} - ${num2} - ${num3} = `;
        }
        if (randomBoolean()) {
            if (num1 - (num2 - num3) < 0 || (num2 - num3)<0) {
                continue;
            }
            question = `${num1} - (${num2} - ${num3}) = `;
        }
        if (randomBoolean()) {
            if (num1 + num2 > 100 || num1 + num2 - num3 < 0 || num1 + num2 - num3 > 100) {
                continue;
            }
            question = `${num1} + ${num2} - ${num3} = `;
        }
        if (randomBoolean()) {
            if (num2 - num3 < 0 ||  num1 + (num2 - num3) > 100) {
                continue;
            }
            question = `${num1} + (${num2} - ${num3}) = `;
        }
        if (randomBoolean()) {
            if (num1 - num2 < 0 || num1 - num2 + num3 < 0 || num1 - num2 + num3 > 100) {
                continue;
            }
            question = `${num1} - ${num2} + ${num3} = `;
        }
        if (randomBoolean()) {
            if (num2 + num3 > 100 || num1 - (num2 + num3) < 0 ) {
                continue;
            }
            question = `${num1} - (${num2} + ${num3}) = `;
        }
        if (question === '') {
            continue;
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genVertical100(10))



/**
 * @category 竖式计算
 * @name 1000以内竖式计算
 * @example 742 - 387 =
 */
export function genVertical1000(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomBetween(10, 999);
        const num2 = randomBetween(10, 999);
        let question = '';
        if (randomBoolean()) {
            if (num1 + num2 < 100 || num1 + num2 >1000 ) {
                continue;
            }
            question = `${num1} +️ ${num2} = `;
        }
        if (randomBoolean()) {
            if (num1 - num2 < 100  ) {
                continue;
            }
            question = `${num1} - ${num2} = `;
        }
        if (question === '') {
            continue;
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genVertical1000(10))

/**
 * @category 竖式计算
 * @name 10000以内竖式计算
 * @example 7679 - 4965 =
 */
export function genVertical10000(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 100)) {
        const num1 = randomBetween(10, 9999);
        const num2 = randomBetween(10, 9999);
        let question = '';
        if (randomBoolean()) {
            if (num1 + num2 < 1000 || num1 + num2 >10000 ) {
                continue;
            }
            question = `${num1} +️ ${num2} = `;
        }
        if (randomBoolean()) {
            if (num1 - num2 < 1000  ) {
                continue;
            }
            question = `${num1} - ${num2} = `;
        }
        if (question === '') {
            continue;
        }
        questions.add(question);
    }
    return Array.from(questions);
}

// console.log(genVertical10000(10))

/**
 * @category 竖式计算
 * @name 有余数的除法
 * @example 3 ➗ 2 =
 */
export function genVerticalDivWithRemainder(questionCount) {
    return genDivWithRemainder()
}

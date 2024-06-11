import { randomBoolean, randomMix, isSumUnitsDigitZero, isDiffUnitsDigitZero, genRandomQuestions, shuffle, calculate, randomMixExclude1, randomBetween } from './commonUtils.js';

/**
 * 生成货币转换问题
 * 示例： ['2元 ＝ (  )角','3元4角 ＝ (  )角']

 * @param {number} questionCount
 * @returns {string[]} - 生成的问题数组
 */
function genCurrencyConv(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 200)) {
        if (randomBoolean()) {
            const num1 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数
            const num2 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数
            const num3 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数

            const questionTypes = [
                `${num1}元 ＝ (  )角`,
                `${num1}元${num2}角 ＝ (  )角`,
                `${num1}角 ＝ (  )分`,
                `${num1}元 ＝ (  )分`,
                `${num1}角${num3}分 ＝ (  )分`,
            ];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            questions.add(questionType);
        } else {

            const num1 = (Math.floor(Math.random() * 10) + 1) * 10; // 生成1到10的随机数
            const num2 = (Math.floor(Math.random() * 3) + 1) * 100; // 生成1到10的随机数

            const questionTypes = [
                `${num1}角 ＝ (  )元`,
                `${num1}分 ＝ (  )角`,
                `${num2}分 ＝ (  )元`,
            ];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            questions.add(questionType);
        }
    }
    return Array.from(questions);
}

// console.log(genCurrencyConv(10));


/**
 * 生成货币加减问题
 * 示例： ['5分 + 16分 = (　)分', '15分 + 10分 = (　)分', '44角 + 36角 = (　)元', '22角 + 61角 = (　)元(　)角']
 *
 * @param {number} questionCount - 需要生成的题目数量
 * @returns {string[]} - 生成的问题数组
 */
function genCurrencyAddSub(questionCount) {

    const questions = new Set();
    while (questions.size < questionCount) {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const num3 = Math.floor(Math.random() * 10) + 1;
        const randomNum = randomMix(4);
        if (num1 === 0 || num2 === 0 || num3 === 0) {
            if (randomMix10() !== 1) {
                continue;
            }
        }
        // 5分 + 16分 = (　)分
        if (randomNum === 1) {
            if ((num1 + num2) > 100) {
                continue;
            }
            let question = `${num1}分 + ${num2}分 = `;
            if ((num1 + num2) < 10) {
                question += '(　)分';
            } else if (isSumUnitsDigitZero(num1, num2)) {
                question += '(　)角';
            } else {
                question += '(　)角(　)分';
            }
            questions.add(question);
            // 15分 + 10分 = (　)分
        } else if (randomNum === 2) {
            if ((num1 - num2) < 0) {
                continue;
            }
            let question = `${num1}分 - ${num2}分 = `;
            if ((num1 - num2) < 10) {
                question += '(　)分';
            } else if (isDiffUnitsDigitZero(num1, num2)) {
                question += '(　)角';
            } else {
                question += '(　)角(　)分';
            }
            questions.add(question);
            // 44角 + 36角 = (　)元
        } else if (randomNum === 3) {
            if ((num1 + num2) > 100) {
                continue;
            }
            let question = `${num1}角 + ${num2}角 = `;
            if ((num1 + num2) < 10) {
                question += '(　)角';
            } else if (isSumUnitsDigitZero(num1, num2)) {
                question += '(　)元';
            } else {
                question += '(　)元(　)角';
            }
            questions.add(question);
            // 22角 + 61角 = (　)元(　)角
        } else if (randomNum === 4) {
            if ((num1 - num2) < 0) {
                continue;
            }
            let question = `${num1}角 - ${num2}角 = `;
            if ((num1 - num2) < 10) {
                question += '(　)角';
            } else if (isDiffUnitsDigitZero(num1, num2)) {
                question += '(　)元';
            } else {
                question += '(　)元(　)角';
            }
            questions.add(question);
        }
    }
    return Array.from(questions);
}

// console.log(genCurrencyAddSub(100))

/**
 * 生成米和厘米转换问题
 * 示例： ['2米 ＝ (  )厘米','3米4厘米 ＝ (  )厘米']

 * @param {number} questionCount
 * @returns {string[]} - 生成的问题数组
 */
function genLengthConv(questionCount) {
    const questions = new Set();
    while (questions.size < Math.min(questionCount, 200)) {
        if (randomBoolean()) {
            const num1 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数
            const num2 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数
            const num3 = Math.floor(Math.random() * 9) + 1; // 生成1到10的随机数

            const questionTypes = [
                `${num1}米 ＝ (  )厘米`,
            ];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            questions.add(questionType);
        } else {

            const num1 = (Math.floor(Math.random() * 10) + 1) * 10; // 生成1到10的随机数
            const num2 = (Math.floor(Math.random() * 3) + 1) * 100; // 生成1到10的随机数

            const questionTypes = [
                `${num1}厘米 ＝ (  )米`,
                `${num2}厘米 ＝ (  )米`,
            ];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            questions.add(questionType);
        }
    }
    return Array.from(questions);
}
// console.log(genLengthConv(10))
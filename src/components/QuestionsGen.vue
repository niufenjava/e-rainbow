<template>
  <div v-show="showContent">
    <h2 class="centered-text">口算生成器
      <el-button type="primary" @click="showDrawer">预览</el-button>
      <el-button type="danger" @click="resetCnt">重置</el-button>
    </h2>
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="drawerHandleChange">
        <el-collapse-item title="一、基础加减法" name="1">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="20以内加法" example="例: 5 + 7 =、 6 + 8 =" v-model="qusObj.iAddIn20Qus"/>
                <MathCard title="20以内减法" example="例：15 - 7 = 、 16 - 8 =" v-model="qusObj.iSubIn20Qus"/>
                <MathCard title="20以内加法（带括号）" example="例： 5 + ( ) = 13 、 ( ) + 8 = 14"
                          v-model="qusObj.iAddIn20BlankQus"/>
                <MathCard title="20以内减法（带括号）" example="例： ( ) - 8 = 4 、 15 - ( ) = 7"
                          v-model="qusObj.iSubIn20BlankQus"/>
                <MathCard title="100以内加法" example="例: 35 + 41 = 、35 + 46 =" v-model="qusObj.iAddIn100Qus"/>
                <MathCard title="100以内减法" example="例：55 - 41 = 、60 - 19 =" v-model="qusObj.iSubIn100Qus"/>
                <MathCard title="100以内加法（带括号）" example="例： (   ) + 15 = 27 、 26 + (   ) = 95"
                          v-model="qusObj.iAddIn100BlankQus"/>
                <MathCard title="100以内减法（带括号）" example="例： 94 - (   ) = 27 、 (   ) - 15 = 21"
                          v-model="qusObj.iSubIn100BlankQus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="1000以内加法（整10）" example="例: 530 + 60 = 、 630 + 900 ="
                          v-model="qusObj.iAddIn1000TenQus"/>
                <MathCard title="1000以内加法（不进位）" example="例: 982 + 6 = 、 712 + 246 ="
                          v-model="qusObj.iAddIn1000NoCarryQus"/>
                <MathCard title="1000以内加法（进位）" example="例: 305 + 405 =、 201 + 709 ="
                          v-model="qusObj.iAddIn1000CarryQus"/>
                <MathCard title="1000以内加法（带括号）" example="例: 111 + (   ) = 210、629 + (   ) = 818"
                          v-model="qusObj.iAddIn1000BlankQus"/>
                <MathCard title="1000以内减法（整10）" example="例: 950 - 60 = 、 900 - 300 ="
                          v-model="qusObj.iSubIn1000TenQus"/>
                <MathCard title="1000以内减法（不退位）" example="例: 982 - 111 = 、 712 - 12 ="
                          v-model="qusObj.iSubIn1000NoBorrowQus"/>
                <MathCard title="1000以内减法（退位）" example="例: 982 - 111 = 、 712 - 12 ="
                          v-model="qusObj.iSubIn1000BorrowQus"/>
                <MathCard title="1000以内减法（带括号）" example="例: 305 - (   ) = 210、629 - (   ) = 212"
                          v-model="qusObj.iSubIn1000BlankQus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="10000以内加法（整10）" example="例: 9530 + 60 = 、 9030 + 900 ="
                          v-model="qusObj.iAddIn10000TenQus"/>
                <MathCard title="10000以内加法（不进位）" example="例: 9530 + 6 = 、 9030 + 901 ="
                          v-model="qusObj.iAddIn10000NoCarryQus"/>
                <MathCard title="10000以内加法（进位）" example="例: 3589 + 2677 = 、 3198 + 1749 ="
                          v-model="qusObj.iAddIn10000CarryQus"/>
                <MathCard title="10000以内加法（带括号）" example="例: 1101 + (   ) = 210、6029 + (   ) = 818"
                          v-model="qusObj.iAddIn10000BlankQus"/>
                <MathCard title="10000以内减法（整10）" example="例: 9530 + 60 = 、 9030 + 900 ="
                          v-model="qusObj.iSubIn10000TenQus"/>
                <MathCard title="10000以内减法（不退位）" example="例: 1199 - 870 、 7889 - 29 ="
                          v-model="qusObj.iSubIn10000NoBorrowQus"/>
                <MathCard title="10000以内减法（退位）" example="例: 1115 - 870 、 7888 - 29 ="
                          v-model="qusObj.iSubIn10000BorrowQus"/>
                <MathCard title="10000以内减法（带括号）" example="例: 1832 - (   ) = 116 、3060 + (   ) = 9346"
                          v-model="qusObj.iSubIn10000BlankQus"/>
              </div>
            </el-col>
            <!-- ... -->
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="二、基础乘除法" name="2">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="表内乘法" example="例: 3 ✖️ 5 = 、 9 ✖️ 9 =" v-model="qusObj.iMultiQus"/>
                <MathCard title="表内乘法（带括号）" example="例: 15 ➗ (   ) = 5 、15 ➗ 3 = (   )"
                          v-model="qusObj.iMultiBlankQus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="表内除法" example="例: 9 ➗ 1 = 、 8 ➗ 2 =" v-model="qusObj.iDivQus"/>
                <MathCard title="表内除法（带括号）" example="例: 15 ➗ (   ) = 5 、15 ➗ (   ) = 3"
                          v-model="qusObj.iDivBlankQus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="表内有余数的除法" example="例: 9 ➗ 2 = 、 7 ➗ 3 ="
                          v-model="qusObj.iDivWithRemainderQus"/>
                <MathCard title="表内有余数的除法（带括号）" example="例: (   ) ➗ 2 = 3 .......1"
                          v-model="qusObj.iDivWithRemainderBlankQus"/>
              </div>
            </el-col>
            <!-- ... -->
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="三、竖式计算" name="3">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="100以内竖式混合" example="例: 51 + (20 - 8) =" v-model="qusObj.iVertical100Qus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="1000以内竖式计算" example="例: 742 - 387 =" v-model="qusObj.iVertical1000Qus"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="10000以内竖式计算" example="例: 7679 - 4965 =" v-model="qusObj.iVertical10000Qus"/>
              </div>
            </el-col>
            <!-- ... -->
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="四、脱式计算" name="4">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="脱式计算" example="例: 5 ✖️ (21 - 9) =" v-model="qusObj.iMixQus"/>
              </div>
            </el-col>
            <!-- ... -->
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="五、有余数的除法" name="5">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <MathCard title="表内有余数的除法" example="例: 7 ➗ 3 =" v-model="qusObj.iDivRemainderQus"/>
              </div>
            </el-col>
            <!-- ... -->
          </el-row>
        </el-collapse-item>
        <!-- ... -->
      </el-collapse>
    </div>
  </div>
  <div v-show="drawerVisible" class="custom-font">
    <div>
      <el-row>
        <el-col :span="6">

        </el-col>
        <el-col :span="12">
          <el-input size="large" class="no-border-top-left-right" type="text" v-model="dateString"
                    input-style="font-size:24px;color:black;text-align: center;"/>
        </el-col>
        <el-col :span="6" class="button-container">
          <el-button type="danger" @click="toggleDrawer">
            <el-icon class="el-icon--left">
              <CircleCloseFilled/>
            </el-icon>
            关闭
          </el-button>
          <el-button type="success" @click="printContent">
            <el-icon class="el-icon--left">
              <Printer/>
            </el-icon>
            打印
          </el-button>
        </el-col>

      </el-row>
    </div>
    <h4>一、基础加减法</h4>
    <div>
      <el-row :gutter="16" v-for="(row, i) in addSubQuestionsList" :key="i">
        <el-col :span="6" v-for="(item, j) in row" :key="j">
          {{ item }}
        </el-col>
      </el-row>
    </div>
    <h4>二、基础乘除法</h4>
    <div>
      <el-row :gutter="16" v-for="(row, i) in multiAndDivQuestionsList" :key="i">
        <el-col :span="6" v-for="(item, j) in row" :key="j">
          {{ item }}
        </el-col>
      </el-row>
    </div>
    <h4>三、竖式计算</h4>
    <div>
      <el-row :gutter="16" v-for="(row, i) in verticalQuestionsList" :key="i" style="padding-bottom: 70px">
        <el-col :span="8" v-for="(item, j) in row" :key="j">
          {{ item }}
        </el-col>
      </el-row>
    </div>
    <h4>四、脱式计算</h4>
    <div>
      <el-row :gutter="16" v-for="(row, i) in mixQuestionsList" :key="i" style="padding-bottom: 70px">
        <el-col :span="8" v-for="(item, j) in row" :key="j">
          {{ item }}
        </el-col>
      </el-row>
    </div>
    <h4>五、有余数的除法</h4>
    <div>
      <el-row :gutter="16" v-for="(row, i) in divWithRemainderQuestionsList" :key="i" style="padding-bottom: 70px">
        <el-col :span="8" v-for="(item, j) in row" :key="j">
          {{ item }}
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {ref, onMounted, reactive, watch} from 'vue'
import MathCard from './MathCard.vue'
import {
  genAddIn20,
  genSubIn20,
  genAddIn20Blank,
  genSubIn20Blank,
  genAddIn100,
  genSubIn100,
  genAddIn100Blank,
  genSubIn100Blank,
  genAddIn10000Ten,
  genAddIn10000NoCarry,
  genAddIn10000Carry,
  genAddIn10000Blank,
  genSubIn10000Ten,
  genSubIn10000NoBorrow,
  genSubIn10000Borrow,
  genSubIn10000Blank
} from '../utils/addSubQuestionsGen.js';
import {
  genMulti,
  genMultiBlank,
  genDiv,
  genDivBlank,
  genDivWithRemainder,
  genDivWithRemainderBlank
} from '../utils/multiAndDivQuestionsGen.js';
import {genVertical100, genVertical1000, genVertical10000} from '../utils/verticalQuestions.js';
import {genMixQuestions} from '../utils/mixQuestionGen.js';
import {ElButton} from 'element-plus'
import {CircleCloseFilled, Printer} from '@element-plus/icons-vue'

const drawerVisible = ref(false)
const showContent = ref(true)
const dateString = ref(getTodayDateString())
const addSubQuestionsList = ref([[]])
const multiAndDivQuestionsList = ref([[]])
const verticalQuestionsList = ref([[]])
const mixQuestionsList = ref([[]])
const divWithRemainderQuestionsList = ref([[]])
const activeNames = ref(['1', '2', '3', '4', '5'])
const drawerHandleChange = (val: string[]) => {
  console.log(val)
}

// 创建一个函数来切换 drawerVisible 的值
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
  showContent.value = !showContent.value;
};

const defaultJson = {
  iAddIn20Qus: 0,
  iSubIn20Qus: 0,
  iAddIn20BlankQus: 0,
  iSubIn20BlankQus: 0,
  iAddIn100Qus: 0,
  iSubIn100Qus: 0,
  iAddIn100BlankQus: 0,
  iSubIn100BlankQus: 0,
  iAddIn1000TenQus: 0,
  iAddIn1000NoCarryQus: 0,
  iAddIn1000CarryQus: 0,
  iAddIn1000BlankQus: 0,
  iSubIn1000TenQus: 0,
  iSubIn1000NoBorrowQus: 0,
  iSubIn1000BorrowQus: 0,
  iSubIn1000BlankQus: 0,
  iAddIn10000TenQus: 0,
  iAddIn10000NoCarryQus: 0,
  iAddIn10000CarryQus: 0,
  iAddIn10000BlankQus: 0,
  iSubIn10000TenQus: 0,
  iSubIn10000NoBorrowQus: 0,
  iSubIn10000BorrowQus: 0,
  iSubIn10000BlankQus: 0,
  iMultiQus: 0,
  iMultiBlankQus: 0,
  iDivQus: 0,
  iDivBlankQus: 0,
  iDivWithRemainderQus: 0,
  iDivWithRemainderBlankQus: 0,
  iVertical100Qus: 0,
  iVertical1000Qus: 0,
  iVertical10000Qus: 0,
  iMixQus: 0,
  iDivRemainderQus: 0
}

const qusObj = reactive({});

onMounted(() => {
  const storedQusObj = localStorage.getItem('qusObj');
  let storedQusObjJson;
  if (storedQusObj && storedQusObj !== "undefined") {
    storedQusObjJson = JSON.parse(storedQusObj)
  }
  Object.assign(qusObj, storedQusObjJson && storedQusObjJson.iAddIn20Qus ? storedQusObjJson : defaultJson);
  // 如果数据存在且是一个对象，则使用它，否则使用默认值
})


// 监听 qusObj 的变化，每当它变化时，将新的值存储到 localStorage 中
watch(qusObj, (newVal) => {
  localStorage.setItem('qusObj', JSON.stringify(newVal));
});

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
  const day = String(today.getDate()).padStart(2, '0');
  return `每日口算 ${year}-${month}-${day}`;
}

function replaceFullWidthSpaces(arr) {
  return arr.map(item =>
      typeof item === 'string' ? item.replace(/　/g, '&nbsp;') : item
  );
}

/**
 * 打开抽屉事件
 * */
const showDrawer = () => {
  // drawerVisible.value = true;
  getTodayDateString();
  toggleDrawer();
  let addSubQuestions = []
  addSubQuestions = addSubQuestions.concat(genAddIn20(qusObj.iAddIn20Qus));
  addSubQuestions = addSubQuestions.concat(genSubIn20(qusObj.iSubIn20Qus));
  addSubQuestions = addSubQuestions.concat(genAddIn100(qusObj.iAddIn100Qus));
  addSubQuestions = addSubQuestions.concat(genSubIn100(qusObj.iSubIn100Qus));

  addSubQuestions = addSubQuestions.concat(genAddIn10000Ten(qusObj.iSubIn10000TenQus));
  addSubQuestions = addSubQuestions.concat(genAddIn10000NoCarry(qusObj.iAddIn10000NoCarryQus));
  addSubQuestions = addSubQuestions.concat(genAddIn10000Carry(qusObj.iAddIn10000CarryQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000Ten(qusObj.iSubIn10000TenQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000NoBorrow(qusObj.iSubIn10000NoBorrowQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000Borrow(qusObj.iSubIn10000BorrowQus));

  addSubQuestions = addSubQuestions.concat(genAddIn10000Ten(qusObj.iSubIn10000TenQus));
  addSubQuestions = addSubQuestions.concat(genAddIn10000NoCarry(qusObj.iAddIn10000NoCarryQus));
  addSubQuestions = addSubQuestions.concat(genAddIn10000Carry(qusObj.iAddIn10000CarryQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000Ten(qusObj.iSubIn10000TenQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000NoBorrow(qusObj.iSubIn10000NoBorrowQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000Borrow(qusObj.iSubIn10000BorrowQus));

  addSubQuestions = addSubQuestions.concat(genAddIn20Blank(qusObj.iAddIn20BlankQus));
  addSubQuestions = addSubQuestions.concat(genSubIn20Blank(qusObj.iSubIn20BlankQus));
  addSubQuestions = addSubQuestions.concat(genAddIn100Blank(qusObj.iAddIn100BlankQus));
  addSubQuestions = addSubQuestions.concat(genSubIn100Blank(qusObj.iSubIn100BlankQus));
  addSubQuestions = addSubQuestions.concat(genAddIn10000Blank(qusObj.iAddIn10000BlankQus));
  addSubQuestions = addSubQuestions.concat(genSubIn10000Blank(qusObj.iSubIn10000BlankQus));
  addSubQuestionsList.value = splitArray(addSubQuestions, 4);
// console.log(addSubQuestionsList.value)

  let multiAndDivQuestions = []
  multiAndDivQuestions = multiAndDivQuestions.concat(genMulti(qusObj.iMultiQus));
  multiAndDivQuestions = multiAndDivQuestions.concat(genDiv(qusObj.iDivQus));
  multiAndDivQuestions = multiAndDivQuestions.concat(genMultiBlank(qusObj.iMultiBlankQus));
  multiAndDivQuestions = multiAndDivQuestions.concat(genDivBlank(qusObj.iDivBlankQus));
  multiAndDivQuestions = multiAndDivQuestions.concat(genDivWithRemainder(qusObj.iDivWithRemainderQus));
  multiAndDivQuestions = multiAndDivQuestions.concat(genDivWithRemainderBlank(qusObj.iDivWithRemainderBlankQus));

  multiAndDivQuestionsList.value = splitArray(multiAndDivQuestions, 4);

  let verticalQuestions = []
  verticalQuestions = verticalQuestions.concat(genVertical100(qusObj.iVertical100Qus));
  verticalQuestions = verticalQuestions.concat(genVertical1000(qusObj.iVertical1000Qus));
  verticalQuestions = verticalQuestions.concat(genVertical10000(qusObj.iVertical10000Qus));
  verticalQuestionsList.value = splitArray(verticalQuestions, 3);

  let mixQuestions = []
  mixQuestions = mixQuestions.concat(genMixQuestions(qusObj.iMixQus));
  mixQuestionsList.value = splitArray(mixQuestions, 3);

  let divWithRemainderQuestions = []
  divWithRemainderQuestions = divWithRemainderQuestions.concat(genDivWithRemainder(qusObj.iDivRemainderQus));
  divWithRemainderQuestionsList.value = splitArray(divWithRemainderQuestions, 3);


};
const resetCnt = () => {
  // drawerVisible.value = true;
  Object.assign(qusObj, defaultJson)
};

const splitArray = (inputArray, perChunk) => {
  let result = [];
  for (let i = 0; i < inputArray.length; i += perChunk) {
    result.push(inputArray.slice(i, i + perChunk));
  }
  return result;

};

const printContent = () => {
  window.print();
}


// 使用方法
</script>

<style>
body {
  padding-left: 50px;
  padding-right: 50px;
}

.right-align {
  float: right;
}

.el-card-style {
  margin-top: 5px;
}

.bg-purple {
//background: #d3dce6; //border-radius: 4px; //padding: 20px; //text-align: center;
}

.centered-text {
  text-align: center;
}

.el-input-group__append, .el-input-group__prepend {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  min-height: 100%;
  padding: 0 10px;
  position: relative;
  white-space: nowrap;
}

.el-card__body {
  padding: 10px 10px;
}

.no-border-top-left-right /deep/ .el-input__wrapper /deep/ .el-input__inner {
  box-shadow: 0 0 0 0
}

.el-input__wrapper {
  align-items: center;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: text;
  display: inline-flex;
  flex-grow: 1;
  justify-content: center;
  padding: 1px 11px;
  transform: translateZ(0);
  transition: var(--el-transition-box-shadow);
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.custom-font {
  font-family: Courier New, sans-serif;
}
</style>
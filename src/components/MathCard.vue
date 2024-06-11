<template>
  <el-card class="el-card-style">
    <div>
      <el-text class="large" type="primary" size="big">{{ title }}
        <el-input-number v-model="inputValue" size="small" style="width: 100px" class="right-align"
        >
        </el-input-number>
      </el-text>
    </div>
    <el-text class="mx-1" size="small" type="info">{{ example }}</el-text>
  </el-card>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue'

const props = defineProps<{
  modelValue: number;
  title: string;
  example: string;
}>();

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value),
});
</script>

<style scoped>
.el-card-style {
  margin-top: 5px;
}
</style>
<template>
  <div @click.stop>
    <select id="apiProvider" class="b3-select fn__flex-center fn__size200">
      <option value="OpenAI" selected="">中国传统颜色</option>
    </select>
  </div>
  <div>
    <div class="grid__container"
      @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
      @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)" @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
      @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
      <template v-for="(data, i) in chineseColors">
        <button class="color__square ariaLabel" :aria-label="data.name + 提示文本"
          :style="{ backgroundColor: data.hex }"></button>
      </template>
    </div>
  </div>
</template>
<script setup>
import { dict } from '../../../Data/defaultColors/chinese.js'
import { ref, onMounted } from 'vue'
import { 应用颜色到当前块, 计算背景并应用到当前块文字色, 计算前景并应用到当前块背景色, 应用到当前块文字色 } from '../../../utils/DOM/blockStyle.js'
import { 按照相似度排序颜色 } from '../../../utils/color/colorSorter.js'
import { plugin } from "runtime"
const 提示文本 = ref(
  '\n左键背景,右键前景\n按住crtl自动计算'
)

const chineseColors = ref([])

function saveToRecent(css) {
  plugin.reactiveData.recentColors.value.push(css)
}




onMounted(() => {
  const grouped = dict.reduce((acc, color) => {
    const groupKey = color.name[color.name.length - 1]; // 获取name字段的最后一个字符
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(color);
    return acc;
  }, {});

  const sorted = Object.values(grouped).map(group => {
    return 按照相似度排序颜色(group); // 在每个分组内部排序
  });

  chineseColors.value = sorted.flat(); // 将分组后的数组扁平化
})
</script>
<style scoped>
button.color__square {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  min-width: 24px;
  min-height: 24px;
}

.grid__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
  /* Adjust the size as needed */
  gap: 0px 0px;
  /* Adjust the spacing between buttons */
}
</style>
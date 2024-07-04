<template>
    <div @click.stop>
        <select id="apiProvider" class="b3-select fn__flex-center fn__size200">
            <option value="OpenAI" selected="">中国传统颜色</option>
        </select>
    </div>
    <div>
        <div class="grid__container" 
        @click.stop="(event) =>!event.ctrlKey&& 应用颜色到当前块([ 'backgroundColor'],true,saveToRecent)(event)"
        @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"

        @click.right.stop="(event)=>!event.ctrlKey&&应用到当前块文字色(event)"
        @click.right.ctrl.stop="(event)=>计算背景并应用到当前块文字色(event)"
        >
            <template v-for="(data, i) in chineseColors">
                <button class="color__square ariaLabel" :aria-label="data.name+提示文本" :style="{backgroundColor:data.hex}"></button>
            </template>
        </div>
    </div>
</template>
<script setup>
import { dict } from '../../../Data/defaultColors/chinese.js'
import { ref ,onMounted} from 'vue'
import { 应用颜色到当前块,计算背景并应用到当前块文字色,计算前景并应用到当前块背景色,应用到当前块文字色 } from '../../../utils/DOM/blockStyle.js'
import {plugin} from "runtime"
const 提示文本 = ref(
    '\n左键背景,右键前景\n按住crtl自动计算'
)

const chineseColors = ref([])
// 归一化 RGB 值
function normalizeRGB(rgb) {
  return rgb.map(value => value / 255);
}
function saveToRecent(css) {
    plugin.reactiveData.recentColors.value.push(css)
}
// 计算两个颜色之间的余弦相似度
function cosineSimilarity(color1, color2) {
  const rgb1 = normalizeRGB(color1.RGB);
  const rgb2 = normalizeRGB(color2.RGB);
  const dotProduct = rgb1[0] * rgb2[0] + rgb1[1] * rgb2[1] + rgb1[2] * rgb2[2];
  const magnitude1 = Math.sqrt(rgb1[0]**2 + rgb1[1]**2 + rgb1[2]**2);
  const magnitude2 = Math.sqrt(rgb2[0]**2 + rgb2[1]**2 + rgb2[2]**2);
  return dotProduct / (magnitude1 * magnitude2);
}

// 对颜色数组进行排序，使相近的颜色排在一起
function sortColors(colors) {
  return colors.sort((a, b) => cosineSimilarity(b, a) - cosineSimilarity(a, b));
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
    return sortColors(group); // 在每个分组内部排序
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
<template>
    <div style="height:90%; display: flex; align-items: center; justify-content: center;">
        <img :src="imgElement.src"
            style="height:100%; width: auto; object-fit: contain; object-position: center;"></img>
    </div>
    color-thief

    <div class="grid__container cf"
        @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
        @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"
        @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
        @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
        <template v-for="(data, i) in dominantColor">
            <button class="color__square ariaLabel" :aria-label="data + 提示文本"
                :style="{ backgroundColor: `rgb(${data[0]},${data[1]},${data[2]})` }"></button>
        </template>

    </div>
    kMeans-cosineSimilarityWithLightnessFix

    <div class="grid__container km"
        @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
        @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"
        @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
        @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
        <template v-for="(data, i) in dominantColor3">
            <button v-if="data" class="color__square ariaLabel" :aria-label="data + 提示文本"
                :style="{ backgroundColor: `rgb(${data[0]},${data[1]},${data[2]})` }"></button>
        </template>

    </div>
    kMeans-euclideanDistance

    <div class="grid__container km"
        @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
        @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"
        @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
        @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
        <template v-for="(data, i) in dominantColor1">
            <button v-if="data" class="color__square ariaLabel" :aria-label="data + 提示文本"
                :style="{ backgroundColor: `rgb(${data[0]},${data[1]},${data[2]})` }"></button>
        </template>

    </div>
    kMeans-euclideanDistanceHSV

<div class="grid__container km"
    @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
    @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"
    @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
    @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
    <template v-for="(data, i) in dominantColor4">
        <button v-if="data" class="color__square ariaLabel" :aria-label="data + 提示文本"
            :style="{ backgroundColor: `rgb(${data[0]},${data[1]},${data[2]})` }"></button>
    </template>

</div>
    MMCQ

    <div class="grid__container mmcq"
        @click.stop="(event) => !event.ctrlKey && 应用颜色到当前块(['backgroundColor'], true, saveToRecent)(event)"
        @click.ctrl.stop="(event) => 计算前景并应用到当前块背景色(event)"
        @click.right.stop="(event) => !event.ctrlKey && 应用到当前块文字色(event)"
        @click.right.ctrl.stop="(event) => 计算背景并应用到当前块文字色(event)">
        <template v-for="(data, i) in dominantColor2">
            <button v-if="data" class="color__square ariaLabel" :aria-label="data + 提示文本"
                :style="{ backgroundColor: data }"></button>
        </template>

    </div>
 
</template>
<script setup>
import { inject, ref } from 'vue';
import CT from '/plugins/TEColors/static/color-thief.js'
import { mmcq } from '/plugins/TEColors/static/mmcq.js'
import { plugin } from 'runtime'
import { 使用指定算法提取图像颜色 } from '../../utils/image/colorAnalyzer.js'
import { 应用颜色到当前块, 计算背景并应用到当前块文字色, 计算前景并应用到当前块背景色, 应用到当前块文字色 } from '../../utils/DOM/blockStyle.js'
import _chroma from '../../../static/chroma-js.js';
const chroma = _chroma.default
const 提示文本 = ref(
    '\n左键背景,右键前景\n按住crtl自动计算'
)
function saveToRecent(css) {
    plugin.reactiveData.recentColors.value.push(css)
}
const appData = inject('appData')
const { imgElement } = appData
const colorThief = new CT.default()
const dominantColor = ref(colorThief.getPalette(imgElement, 13));
const dominantColor1 = ref([])

const dominantColor2 = ref([]);
const dominantColor3 = ref([])
const dominantColor4 = ref([]);
(()=>{
    processImage(euclideanDistanceHSV, dominantColor4, 13)

})()
function euclideanDistanceHSV(a, b) {
    const colorA = chroma(a).hsv();
    const colorB = chroma(b).hsv();
    return Math.sqrt(colorA.reduce((sum, val, i) => sum + (val - colorB[i]) ** 2, 0));
}
(async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = imgElement.naturalWidth;
    let height = imgElement.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none'
    ctx.drawImage(imgElement, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height)
    const colors = await mmcq(data.data, {
        count: 13,
        algorithm: 8,
        useWebAssembly: false,
    })
    dominantColor2.value = colors.map(item => item.rgb)
})()

processImage(euclideanDistance, dominantColor1, 13)

processImage(cosineDistanceWithLighten, dominantColor3, 13)

/*
这里调用gpt4o实现不稳定
使用指定算法提取图像颜色(imgElement, 'gpt4o', 13, (result) => {
    dominantColor4.value=result
})*/
function processImage(算法, 目标, 颜色数量) {
    使用指定算法提取图像颜色(imgElement, 算法, 颜色数量, (clusters) => { 目标.value = clusters.centers })
}
function euclideanDistance(a, b) {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}
function cosineDistanceWithLighten(a, b) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    // 计算RGB的亮度并将其作为第四维度
    const luminanceA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
    const luminanceB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
    const extendedA = [...a, luminanceA];
    const extendedB = [...b, luminanceB];

    for (let i = 0; i < extendedA.length; i++) {
        dotProduct += extendedA[i] * extendedB[i];
        normA += extendedA[i] * extendedA[i];
        normB += extendedB[i] * extendedB[i];
    }
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    return 1 - dotProduct / (normA * normB);
}
</script>
<style scoped>
.grid__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
    /* Adjust the size as needed */
    gap: 0px 0px;
    /* Adjust the spacing between buttons */
}

button.color__square {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    min-width: 24px;
    min-height: 24px;
}
</style>
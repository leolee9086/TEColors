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
        <template  v-for="(data, i) in dominantColor">
            <button class="color__square ariaLabel" :aria-label="data + 提示文本"
                :style="{ backgroundColor: `rgb(${data[0]},${data[1]},${data[2]})` }"></button>
        </template>

    </div>
    kMeans-cosineSimilarityWithLighten

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
import {mmcq} from '/plugins/TEColors/static/mmcq.js'
import {plugin} from 'runtime'
import { 应用颜色到当前块, 计算背景并应用到当前块文字色, 计算前景并应用到当前块背景色, 应用到当前块文字色 } from '../../utils/DOM/blockStyle.js'
const 提示文本 = ref(
    '\n左键背景,右键前景\n按住crtl自动计算'
)
function saveToRecent(css) {
    plugin.reactiveData.recentColors.value.push(css)
}
const appData = inject('appData')
const { imgElement } = appData
function resizeImage(image, maxSize) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = image.width;
    let height = image.height;

    // 计算缩放比例
    const scale = maxSize / Math.max(width, height);
    if (scale < 1) {
        width = Math.round(width * scale);
        height = Math.round(height * scale);
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    return canvas;
}

const colorThief = new CT.default()
const dominantColor = ref(colorThief.getPalette(imgElement, 13));
const dominantColor2 = ref([]);

(async ()=>{
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = imgElement.naturalWidth ;
    let height = imgElement.naturalHeight ;

    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none'


    ctx.drawImage(imgElement, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height)
    console.log(mmcq)
    const colors = await mmcq(data.data, {
    count: 13,
    algorithm: 8,
    useWebAssembly: false,
  })

  colors.forEach((color) => console.log(color.rgb))
  dominantColor2.value=colors.map(item=> item.rgb)
})()

const dominantColor1 =ref([])
processImage(euclideanDistance,dominantColor1)
const dominantColor3 =ref([])
processImage(cosineDistanceWithLighten,dominantColor3)

function processImage(算法,目标) {
    const canvas = resizeImage(imgElement,128);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const k = 13; // Number of clusters
    const clusters = kMeans(data, k,算法);
    目标.value = clusters.centers
}

function kMeans(data, k,算法=euclideanDistance) {
    // Initialize cluster centers and assignments
    let centers = [];
    for (let i = 0; i < k; i++) {
        const idx = (Math.floor(Math.random() * (data.length / 4))) * 4;
        centers.push([data[idx], data[idx + 1], data[idx + 2]]);
    }
    let assignments = new Array(data.length / 4).fill(-1);
    let _counts =[]
    let changed = true;
    while (changed) {
        changed = false;
        // Assign pixels to the nearest cluster center
        for (let i = 0; i < data.length; i += 4) {
            const pixel = [data[i], data[i + 1], data[i + 2]];
            let minDistance = Infinity;
            let assignedCluster = 0;
            for (let j = 0; j < k; j++) {
              const distance =算法(pixel, centers[j]);

              //    const distance =(euclideanDistance(pixel, centers[j]));
                if (distance < minDistance) {
                    minDistance = distance;
                    assignedCluster = j;
                }
            }
            if (assignments[i / 4] !== assignedCluster) {
                assignments[i / 4] = assignedCluster;
                changed = true;
            }
        }

        // Update cluster centers
        let sums = Array(k).fill(null).map(() => [0, 0, 0]);
        let counts = Array(k).fill(0);
        for (let i = 0; i < assignments.length; i++) {
            const clusterIdx = assignments[i];
            sums[clusterIdx][0] += data[i * 4];
            sums[clusterIdx][1] += data[i * 4 + 1];
            sums[clusterIdx][2] += data[i * 4 + 2];
            counts[clusterIdx]++;
        }
        for (let i = 0; i < k; i++) {
            if (counts[i] > 0) {
                centers[i] = sums[i].map(x => x / counts[i]);
                _counts[i]=counts[i]
            }
        }
    }

    const sortedCenters = centers.map((center, index) => ({
        color: center,
        count: _counts[index]
    })).sort((a, b) => b.count - a.count).map(item => item.color);
    return { centers: sortedCenters, assignments };
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
    return 1- dotProduct / (normA * normB);
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
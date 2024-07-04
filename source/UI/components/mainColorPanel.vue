<template>
    <div class="block__icons">
        TEColor
        <span class="fn__space"></span>
        <div @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'], true,
        )(event)" @wheel="horizontalScroll" class="fn__space fn__flex-1 fn__flex scroll-v">
            <template v-for="(data, i) in recentColors">

                <button class="color__square" :style="data">A</button>
            </template>
        </div>
        <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="最小化 Ctrl+W">
            <svg>
                <use xlink:href="#iconMin"></use>
            </svg>
        </span>
        <span class="fn__space"></span>

    </div>
    <div class="fn__hr"></div>
    <div class="fn__flex-column fn__flex-1">
        <panelFloatAble :component="deleteButtons">
            <template v-slot:title>
                <div class="block__icons">
                    清除颜色
                </div>
            </template>
        </panelFloatAble>
        <panel>
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">
                    </div>
                    主题卡片颜色搭配
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex"
                    @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'], true, saveToRecent)(event)">
                    <button class="color__square" data-type="style1"
                        style="color: var(--b3-card-error-color);background-color: var(--b3-card-error-background);">A</button>
                    <button class="color__square" data-type="style1"
                        style="color: var(--b3-card-warning-color);background-color: var(--b3-card-warning-background);">A</button>
                    <button class="color__square" data-type="style1"
                        style="color: var(--b3-card-info-color);background-color: var(--b3-card-info-background);">A</button>
                    <button class="color__square" data-type="style1"
                        style="color: var(--b3-card-success-color);background-color: var(--b3-card-success-background);">A</button>
                </div>
            </template>
        </panel>
        <panelFloatAble :component="themeFontColorButtons">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题文字色
                </div>
            </template>
        </panelFloatAble>

        <panelFloatAble :component="themeBackGroundColorButtons">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题背景颜色
                </div>
            </template>

        </panelFloatAble>
        <panelFloatAble :component="themeColorCombinationButtons">
            <template v-slot:title >
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题颜色排列组合
                </div>
            </template>
      
        </panelFloatAble>
        <panel @update:panelVisibility="createPanel">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    自定义颜色
                </div>
            </template>
            <template v-slot:content>
                <div class="pickr__fullWidth fn__flex" @click.stop>
                    <div class="fn__space" style="width:5%"></div>
                    <div ref="pickrContainer"></div>
                    <div class="fn__space" style="width:5%"></div>
                </div>
                <div class="fn__flex fn__flex-column">
                    <div class="fn__flex">
                        <div class="fn__space fn__flex-1"> </div>
                        <div class="color-picker-buttons " style="min-height: 48px;margin:8px">
                            <button class="color__square" ref="buttonBackgroundColor" data-type="backgroundColor"
                                :style="{
            backgroundColor: backgroundColor,
            position: 'relative',
            display: 'inline'
        }" @click.stop="(e) => setActiveButton(e.target)"></button>
                            <button class="color__square" ref="buttonColor" data-type="color" :style="{
            color: foregroundColor,
            position: 'relative',
            display: 'inline',
            backgroundColor: 'transparent',

            top: '12px',
            left: '-12px',
            'z-index': '10'
        }" @click.stop="(e) => setActiveButton(e.target)">T</button>
                            <button style="height:32px;width:32px" @click.stop="swapColors"><svg
                                    style="width:100%;height:100%">
                                    <use xlink:href="#iconRefresh"></use>
                                </svg>
                            </button>
                            <button style="height:32px;width:32px" @click.stop="addCustomColors"><svg
                                    style="width:100%;height:100%">
                                    <use xlink:href="#iconAdd"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="fn__space fn__flex-1"> </div>
                    </div>
                    <div>

                        <div @click.stop="(event) => 应用颜色到当前块(['backgroundColor', 'color'], true, saveToRecent)(event)"
                            class="fn__flex" v-for="(chunk, index) in chunkedCustomColors" :key="index">

                            <button v-if="!index" ref="tempButton" class="color__square " :style="{
            backgroundColor: backgroundColor, color: foregroundColor, border: '1px dashed blue'
        }">A</button>
                            <template v-for="(data, i) in chunk">
                                <button v-if="index || i" class="color__square ariaLabel"
                                    :aria-label="`${data.value ? data.block_id + '\n' + data.value : data}`"
                                    :style="`${data.value ? data.value + ';border:1px solid red' : data}`">A</button>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </panel>
        <panel v-if="blockColors[0]">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="TEColorsconfig">
                        
                    </div>
                    笔记中
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex-column"
                    @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'], true, saveToRecent)(event)">
                    <div class="grid__container">
                        <template v-for="(data, i) in blockColors">
                            <button class="color__square ariaLabel"
                                :aria-label="`${data.value ? data.block_id + '\n' + data.value : data}`"
                                :style="`${data.value ? data.value : data}`">A</button>
                        </template>
                    </div>
                </div>
            </template>
        </panel>
        <panelFloatAble :component="recentUsedButtons">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="TEColorsconfig">
                    </div>
                    最近使用
                </div>
            </template>
        </panelFloatAble>
        <panelFloatAble :component="colorSeriaButtons">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="TEColorsconfig">
                      
                    </div>
                    色板
                </div>
            </template>
        </panelFloatAble>
    </div>
</template>
<script setup>
import { 应用颜色到当前块 } from '../../utils/DOM/blockStyle.js'
import { kernelApi, plugin } from 'runtime'
import {verticalScrollFirst,horizontalScroll} from '../utils/scroll.js'
import deleteButtons from "./buttons/deleteButtons.vue";
import themeBackGroundColorButtons from './buttons/themeBackGroundColorButtons.vue';
import themeFontColorButtons from './buttons/themeFontColorButtons.vue';
import recentUsedButtons from './buttons/recentUsedButtons.vue';
import colorSeriaButtons from './buttons/colorSeriaButtons.vue';
import themeColorCombinationButtons from './buttons/themeColorCombinationButtons.vue';
console.log(themeColorCombinationButtons)
import panel from './common/panel.vue'
import panelFloatAble from './common/panelFloatAble.vue'
import { ref, computed, onMounted } from 'vue'
import Pickr from 'pickr'
const { recentColors, customColors, blockColors } = plugin.reactiveData
const foregroundColor = ref('#000000'); // Default black
const backgroundColor = ref('#FFFFFF'); // Default white
const activeButton = ref('null'); // Default active button
const customColor = ref('A'); // Default active button
const pickrContainer = ref('null')
const buttonBackgroundColor = ref('null')
const buttonColor = ref('null')
const tempButton = ref('null')
function addCustomColors() {
    customColors.value.push(`color:${foregroundColor.value};background-color:${backgroundColor.value}`)
}
function saveToRecent(css) {
    recentColors.value.push(css)
}
kernelApi.SQL({ stmt: 'select * from attributes where name ="style"' }).then(
    data => {
        data.forEach(
            attrItem => {
                let cssString = attrItem.value
                const span = document.createElement('span')
                span.setAttribute('style', cssString)
                if (span.style.color || span.style.backgroundColor) {
                    blockColors.value.push(
                        {
                            'block_id': attrItem.block_id,
                            "value": `color:${span.style.color};background-color:${span.style.backgroundColor}`
                        }
                    )
                }
            }
        )
    }
)

const createPanel = () => {
    if (!pickrContainer.value) {
        return
    }
    const pickr = new Pickr({
        container: pickrContainer.value,
        el: pickrContainer.value,
        theme: 'classic', // 可以选择 'classic', 'monolith', 或 'nano'
        inline: true, // 设置为true使调色板直接显示
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],
        components: {
            // 主组件
            preview: true,
            opacity: true,
            hue: true,
            // 输入组件
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                save: true
            }
        },
        showAlways: true
    });
    pickr.on('change', (color, instance) => {
        customColor.value = (color.toRGBA().toString())
        applyCustomColor(false)
    });
    pickr.on('changestop', (eventSource, instance) => {
        customColor.value = (instance.getColor().toRGBA().toString())
        applyCustomColor(true)
    });
    pickr.on('swatchselect', (color, instance) => {
        customColor.value = (color.toRGBA().toString())
        applyCustomColor(true)
    });
    pickr.on('save', (color, instance) => {
        pickr.addSwatch(color.toRGBA().toString())
        customColor.value = (color.toRGBA().toString())
        applyCustomColor(true)
    });
}
onMounted(() => {
    setActiveButton(buttonBackgroundColor.value)
    createPanel(pickrContainer)
})
function setActiveButton(button) {
    activeButton.value && activeButton.value.style && (activeButton.value.style.border = "")
    activeButton.value = button
    activeButton.value.style.border = "1px solid red"
}

function applyCustomColor(applyToDataBase) {
    activeButton.value.style.backgroundColor = customColor.value
    activeButton.value.dataset.type === 'color' ? foregroundColor.value = customColor.value : backgroundColor.value = customColor.value
    应用颜色到当前块(
        ['backgroundColor', 'color'],
        applyToDataBase,
    )({ target: tempButton.value })
}

function swapColors() {
    let temp = foregroundColor.value;
    foregroundColor.value = backgroundColor.value;
    backgroundColor.value = temp;
}



plugin.eventBus.on('custom-colors-add', (e) => {
    const colors = e.detail
    colors.forEach(
        color => customColors.value.push(`color:${color.foregroundColor};background-color:${color.backgroundColor}`)
    )
})
const chunkedCustomColors = computed(() => {
    const chunkSize = 13;
    return customColors.value.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
});
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

.scroll-v {
    display: flex;
    overflow-x: auto;
    /* 允许水平滚动 */
    white-space: nowrap;
    /* 保持内部元素不换行 */
}
</style>
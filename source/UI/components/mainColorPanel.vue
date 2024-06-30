<template>
    <div class="block__icons">
        TEColor
        <span class="fn__space"></span>
        <div @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'],false)(event)" @wheel="horizontalScroll"
            class="fn__space fn__flex-1 fn__flex scroll-v">
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
        <DeleteColorPanel></DeleteColorPanel>
        <panel>
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题卡片颜色搭配
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex" @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'])(event)">
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
        <panel>
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题字体颜色
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex" @click.stop="(event) => 应用颜色到当前块(['color'])(event)">
                    <button class="color__square" data-type="color"
                        style="color:var(--b3-font-color1)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color2)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color3)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color4)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color5)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color6)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color7)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color8)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color9)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color10)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color11)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color12)">A</button><button class="color__square" data-type="color"
                        style="color:var(--b3-font-color13)">A</button>
                </div>
            </template>
        </panel>
        <panel>
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题背景颜色
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex" @click.stop="(event) => 应用颜色到当前块(['backgroundColor'])(event)">
                    <button class="color__square" data-type="backgroundColor"
                        style="background-color:var(--b3-font-background1)"></button><button class="color__square"
                        data-type="backgroundColor" style="background-color:var(--b3-font-background2)"></button><button
                        class="color__square" data-type="backgroundColor"
                        style="background-color:var(--b3-font-background3)"></button><button class="color__square"
                        data-type="backgroundColor" style="background-color:var(--b3-font-background4)"></button><button
                        class="color__square" data-type="backgroundColor"
                        style="background-color:var(--b3-font-background5)"></button><button class="color__square"
                        data-type="backgroundColor" style="background-color:var(--b3-font-background6)"></button><button
                        class="color__square" data-type="backgroundColor"
                        style="background-color:var(--b3-font-background7)"></button><button class="color__square"
                        data-type="backgroundColor" style="background-color:var(--b3-font-background8)"></button><button
                        class="color__square" data-type="backgroundColor"
                        style="background-color:var(--b3-font-background9)"></button><button class="color__square"
                        data-type="backgroundColor"
                        style="background-color:var(--b3-font-background10)"></button><button class="color__square"
                        data-type="backgroundColor"
                        style="background-color:var(--b3-font-background11)"></button><button class="color__square"
                        data-type="backgroundColor"
                        style="background-color:var(--b3-font-background12)"></button><button class="color__square"
                        data-type="backgroundColor" style="background-color:var(--b3-font-background13)"></button>
                </div>
            </template>
        </panel>
        <panel>
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="">

                    </div>
                    主题颜色排列组合
                </div>
            </template>
            <template v-slot:content>
                <template v-for="bgIndex in 13">
                    <div class="fn__flex" @click.stop="(event) => 应用颜色到当前块(['backgroundColor', 'color'])(event)">
                        <button class="color__square" v-for="colorIndex in 13" :key="`bg${bgIndex}-color${colorIndex}`"
                            :style="{
            backgroundColor: `var(--b3-font-background${bgIndex})`,
            color: `var(--b3-font-color${colorIndex})`
        }">A</button>
                    </div>
                </template>
            </template>
        </panel>
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
                <!--
                <input @click.stop type="color" v-model="customColor" @input="applyCustomColor">
-->
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
            backgroundColor:'transparent',
            
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
                     
                        <div 
                        @click.stop="(event) => 应用颜色到当前块(['backgroundColor', 'color'])(event)" 
                        class="fn__flex"
                            v-for="(chunk, index) in chunkedCustomColors" :key="index">

                            <button v-if="!index" ref="tempButton" class="color__square " :style="{
            backgroundColor: backgroundColor, color: foregroundColor, border: '1px dashed blue'
        }">A</button>
                            <template v-for="(data, i) in chunk">
                                <button v-if="index||i" class="color__square ariaLabel" :aria-label="`${data.value?data.block_id+'\n'+data.value:data}`" :style="`${data.value?data.value+';border:1px solid red':data}`">A</button>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </panel>
        <panel v-if="recentColors[0]">
            <template v-slot:title>
                <div class="block__icons">
                    <div class="block__logo" data-type="TEColorsconfig">
                        <svg class="block__logoicon ">
                            <use xlink:href="#iconHistory"></use>
                        </svg>
                    </div>
                    最近使用
                </div>
            </template>
            <template v-slot:content>
                <div class="fn__flex-column"
                    @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'], false)(event)">
                    <div class="fn__flex" v-for="(chunk, index) in chunkedRecentColors" :key="index">
                        <template v-for="(data, i) in chunk">
                            <button class="color__square ariaLabel" :aria-label="data" :style="`${data}`">A</button>
                        </template>
                    </div>
                </div>
            </template>
        </panel>
    </div>
</template>
<script setup>
import { 获取当前选择块元素 } from '../../utils/DOMProcessor.js'
import { kernelApi, plugin } from 'runtime'
import { isPublish } from '../../utils/getFrontEnd.js'
import DeleteColorPanel from './deleteColorPanel.vue'
import {智能防抖} from '../../utils/FunctionTools/debouncer.js'
import panel from './panel.vue'
import { ref, computed, onMounted, nextTick } from 'vue'
import Pickr from 'pickr'
const recentColors = ref([])
const customColors = ref([
    `color:none,backgroundColor:none`
])
const foregroundColor = ref('#000000'); // Default black
const backgroundColor = ref('#FFFFFF'); // Default white
const activeButton = ref('null'); // Default active button
const customColor = ref('A'); // Default active button
const pickrContainer = ref('null')
const buttonBackgroundColor = ref('null')
const buttonColor = ref('null')
const tempButton = ref('null')

function horizontalScroll(event) {
    if (event.deltaY !== 0) {
        event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
        event.preventDefault();
    }
}
function addCustomColors() {
    customColors.value.push(`color:${foregroundColor.value};background-color:${backgroundColor.value}`)
}
const createPanel = () => {
    /* nextTick(()=>{
         if(
         !pickrContainer.value){
             return
         }
     const div = document.createElement('div')
     console.log(pickrContainer.value)
     pickrContainer.value.appendChild(div)*/
     customColors.value=[  `color:none,backgroundColor:none`]
     kernelApi.SQL({stmt:'select * from attributes where name ="style"'}).then(
        data=>{
            data.forEach(
                attrItem=>{
                    let cssString = attrItem.value
                    const span = document.createElement('span')
                    span.setAttribute('style',cssString)
                    if(span.style.color||span.style.backgroundColor){
                        customColors.value.push(
                            {
                                'block_id':attrItem.block_id,
                                "value":`color:${span.style.color};background-color:${span.style.backgroundColor}`
                            }
                        )
                    }
                }
            )
        }
    )

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

    应用颜色到当前块(['backgroundColor', 'color'], false, applyToDataBase)({ target: tempButton.value })
}

function swapColors() {
    let temp = foregroundColor.value;
    foregroundColor.value = backgroundColor.value;
    backgroundColor.value = temp;
}


function 应用颜色到当前块(css属性名数组, save = true, apply = true) {
    const span = document.createElement('span')
    return (event) => {
        css属性名数组.forEach(
            css属性名 => {
                if (event.target.tagName === "BUTTON") {
                    save && event.target.style[css属性名] && (span.style[css属性名] = event.target.style[css属性名])
                    获取当前选择块元素().forEach(
                        element => {
                            element.style[css属性名] = event.target.style[css属性名]
                        }
                    )
                }
                else {
                    save = false
                }
            }
        )
        save && span.getAttribute('style') && recentColors.value.push(span.getAttribute('style')) // Push the CSS string instead of the object
        !isPublish() && 获取当前选择块元素().forEach(
            element => {
                apply && kernelApi.setBlockAttrs(
                    {
                        id: element.dataset.nodeId,
                        attrs: { style: element.getAttribute('style') }
                    }
                )
            }
        )
    }
}
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
const chunkedRecentColors = computed(() => {
    const chunkSize = 13;
    return recentColors.value.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
});
/**
 * 从当前颜色主题的css元素中获取所有颜色变量
 * 主题的css元素有两个,一个是默认主题的#themeDefaultStyle
 * 另一个是自定义主题的#themeStyle
 * 获取其中所有的css变量中类型为颜色的(变量之间可能互相引用)
 * 同名变量定义themeStyle优先级高于themeDefaultStyle
*/

function 获取当前主题颜色变量() {
    const defaultThemeStyles = document.getElementById('themeDefaultStyle');
    const customThemeStyles = document.getElementById('themeStyle');
    const colorVariables = {};
    // Extract variables from default theme
    if (defaultThemeStyles) {
        extractColorVariables(defaultThemeStyles, colorVariables);
    }
    // Extract variables from custom theme, overriding defaults
    if (customThemeStyles) {
        extractColorVariables(customThemeStyles, colorVariables);
    }

    return colorVariables;
}
// Function to extract color variables from a style element
function extractColorVariables(styleElement, colorVariables) {
    if (!styleElement.sheet) return;

    // Helper function to resolve variable references to actual values
    function resolveVariableValue(value, style) {
        let resolvedValue = value.trim();
        while (resolvedValue.startsWith('var(--')) {
            const match = resolvedValue.match(/var\((--[\w-]+)\)/);
            if (match && match[1]) {
                const innerVariable = match[1];
                resolvedValue = style.getPropertyValue(innerVariable).trim() || resolvedValue;
                // Prevent infinite loops if a variable refers to itself or cyclic references
                if (resolvedValue === 'var(' + innerVariable + ')') break;
            } else {
                break;
            }
        }
        return resolvedValue;
    }

    // Iterate over CSS rules
    for (const rule of styleElement.sheet.cssRules) {
        if (rule.style) {
            // Iterate over all CSS properties in the rule
            for (let i = 0; i < rule.style.length; i++) {
                const propertyName = rule.style[i];
                if (propertyName.startsWith('--')) { // Check if the property is a CSS variable
                    let value = rule.style.getPropertyValue(propertyName);
                    value = resolveVariableValue(value, rule.style);
                    if (isColor(value)) {
                        colorVariables[propertyName] = value;
                    }
                }
            }
        }
    }
}

// Check if a value is likely a color
function isColor(value) {
    return value.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgba?\([^)]+\)|hsla?\([^)]+\)/);
}
</script>
<style scoped>
button.color__square {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    min-width: 24px;
    min-height: 24px;
}

.scroll-v {
    display: flex;
    overflow-x: auto;
    /* 允许水平滚动 */
    white-space: nowrap;
    /* 保持内部元素不换行 */
}
</style>
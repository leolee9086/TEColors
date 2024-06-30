<template>
    <div>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除选中块样式))(['color'])" class="b3-button b3-button--cancel"
            data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除选中前景色
        </button>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除选中块样式))(['backgroundColor'])"
            class="b3-button b3-button--cancel" data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除选中背景色
        </button>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除可见块样式))(['color'])" class="b3-button b3-button--cancel"
            data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除所有可见块前景色
        </button>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除可见块样式))(['backgroundColor'])"
            class="b3-button b3-button--cancel" data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除所有可见块背景色
        </button>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除所有已加载块元素样式))(['color'])" class="b3-button b3-button--cancel"
            data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除所有已加载块前景色
        </button>
        <button @click.stop.prevent.capture="(保持选区执行操作(清除所有已加载块元素样式))(['backgroundColor'])"
            class="b3-button b3-button--cancel" data-type="clear">
            <svg>
                <use xlink:href="#iconTrashcan"></use>
            </svg>清除所有已加载块背景色
        </button>
        <div class="fn__hr"></div>

        <div class="fn__flex">
            最近使用的颜色
            <span class="fn__space"></span>
        </div>
        <div class="fn__hr--small"></div>
        <div class="fn__hr"></div>
        <div>主题卡片颜色搭配</div>
        <div class="fn__hr--small"></div>
        <div class="fn__flex" @click="(event) => 应用颜色到当前块(['color', 'backgroundColor'])(event)">
            <button class="color__square" data-type="style1"
                style="color: var(--b3-card-error-color);background-color: var(--b3-card-error-background);">A</button>
            <button class="color__square" data-type="style1"
                style="color: var(--b3-card-warning-color);background-color: var(--b3-card-warning-background);">A</button>
            <button class="color__square" data-type="style1"
                style="color: var(--b3-card-info-color);background-color: var(--b3-card-info-background);">A</button>
            <button class="color__square" data-type="style1"
                style="color: var(--b3-card-success-color);background-color: var(--b3-card-success-background);">A</button>
        </div>
        <div class="fn__hr"></div>
        <div>主题字体颜色</div>
        <div class="fn__hr--small"></div>
        <div class="fn__flex" @click="(event) => 应用颜色到当前块(['color'])(event)">
            <button class="color__square" data-type="color" style="color:var(--b3-font-color1)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color2)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color3)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color4)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color5)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color6)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color7)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color8)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color9)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color10)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color11)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color12)">A</button><button
                class="color__square" data-type="color" style="color:var(--b3-font-color13)">A</button>
        </div>
        <div class="fn__hr"></div>
        <div>主题背景颜色</div>
        <div class="fn__hr--small"></div>
        <div class="fn__flex" @click="(event) => 应用颜色到当前块(['backgroundColor'])(event)">
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
                data-type="backgroundColor" style="background-color:var(--b3-font-background10)"></button><button
                class="color__square" data-type="backgroundColor"
                style="background-color:var(--b3-font-background11)"></button><button class="color__square"
                data-type="backgroundColor" style="background-color:var(--b3-font-background12)"></button><button
                class="color__square" data-type="backgroundColor"
                style="background-color:var(--b3-font-background13)"></button>
        </div>
        <div class="fn__hr"></div>
        <div>主题颜色排列组合</div>
        <div class="fn__hr--small"></div>
        <template v-for="bgIndex in 13">
            <div class="fn__flex" @click="(event) => 应用颜色到当前块(['backgroundColor', 'color'])(event)">
                <button class="color__square" v-for="colorIndex in 13" :key="`bg${bgIndex}-color${colorIndex}`" :style="{
            backgroundColor: `var(--b3-font-background${bgIndex})`,
            color: `var(--b3-font-color${colorIndex})`
        }">A</button>
            </div>
        </template>
        <div class="fn__hr"></div>
    </div>
</template>
<script setup>
import { 获取当前选择块元素 } from '../../utils/DOMProcessor.js'
import { kernelApi } from 'runtime'
import { 保持选区执行操作 } from '../../utils/FunctionTools/tools.js'
import {isPublish} from '../../utils/getFrontEnd.js'
console.log(获取当前主题颜色变量())
function 获取所有可见块元素() {
    // 修改为只返回在屏幕上可见的块元素
    return 获取所有已加载块元素().filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    });
}
function 获取所有已加载块元素() {
    return Array.from(document.querySelectorAll('.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id]'))
}
// 修改清除可见块样式函数
function 清除块样式(css属性名数组, 块元素数组) {
    css属性名数组.forEach(
        css属性名 => {
            块元素数组.forEach(
                element => {
                    if (element.style[css属性名] && element.style[css属性名].trim() !== '') {
                        element.style[css属性名] = ''
                        !isPublish()&&kernelApi.setBlockAttrs(
                            {
                                id: element.dataset.nodeId,
                                attrs: { style: element.getAttribute('style') }
                            }
                        )
                    }
                }
            )
        }
    )
}
function 清除所有已加载块元素样式(css属性名数组) {
    清除块样式(css属性名数组, 获取所有已加载块元素())

}
function 清除可见块样式(css属性名数组) {
    清除块样式(css属性名数组, 获取所有可见块元素())
}
function 清除选中块样式(css属性名数组) {
    清除块样式(css属性名数组, 获取当前选择块元素())

}
function 应用颜色到当前块(css属性名数组) {
    return (event) => {
        css属性名数组.forEach(
            css属性名 => {
                if (event.target.tagName === "BUTTON") {
                    获取当前选择块元素().forEach(
                        element => {
                            element.style[css属性名] = event.target.style[css属性名]
                        }
                    )
                }
            }
        )
        !isPublish()&&获取当前选择块元素().forEach(
            element => {
             kernelApi.setBlockAttrs(
                    {
                        id: element.dataset.nodeId,
                        attrs: { style: element.getAttribute('style') }
                    }
                )
            }
        )
    }
}
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
    margin-right: 4px
}
</style>
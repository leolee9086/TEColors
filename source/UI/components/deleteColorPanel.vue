<template>
    <panel>
        <template v-slot:title>
            <div class="block__icons">
                <div class="block__logo">
                    <svg class="block__logoicon ">
                        <use xlink:href="#iconTrashcan"></use>
                    </svg>
                </div>
                清除颜色
            </div>
        </template>
        <template v-slot:content>
            <div class="fn__flex fn_full_width">
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
                <button @click.stop.prevent.capture="(保持选区执行操作(清除所有已加载块元素样式))(['color'])"
                    class="b3-button b3-button--cancel" data-type="clear">
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
            </div>
        </template>
    </panel>
</template>
<script setup>
import { 保持选区执行操作 } from '../../utils/FunctionTools/tools.js';
import { 获取当前选择块元素 } from '../../utils/DOMProcessor.js';
import { isPublish } from '../../utils/getFrontEnd.js';
import { kernelApi } from 'runtime'
import panel from "./panel.vue"
// 修改清除可见块样式函数
function 清除块样式(css属性名数组, 块元素数组) {
    css属性名数组.forEach(
        css属性名 => {
            块元素数组.forEach(
                element => {
                    if (element.style[css属性名] && element.style[css属性名].trim() !== '') {
                        element.style[css属性名] = ''
                        !isPublish() && kernelApi.setBlockAttrs(
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
function 清除所有已加载块元素样式(css属性名数组) {
    清除块样式(css属性名数组, 获取所有已加载块元素())
}
function 清除可见块样式(css属性名数组) {
    清除块样式(css属性名数组, 获取所有可见块元素())
}
function 清除选中块样式(css属性名数组) {
    清除块样式(css属性名数组, 获取当前选择块元素())
}
</script>
<style scoped>
button {
    padding-left: 4px;
}
</style>
/**
 *如果存在选中的元素数组就用元素数组
 *如果不存在就用光标所在的有[data-node-id]的块元素构建
 *块元素的选择器是.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id]
 *光标有可能在块元素的子元素中
 */
import { 获取光标所在块元素 } from "./rangeProcessor.js";
export function 获取当前选择块元素() {
    // 首先尝试获取选中的块元素
    let selectedBlocks = document.querySelectorAll("[data-node-id].protyle-wysiwyg--select");
    if (selectedBlocks.length > 0) {
        return selectedBlocks;
    }
    // 如果没有选中的块元素，尝试根据光标位置获取块元素
    return 获取光标所在块元素()?[获取光标所在块元素()]:[]
}

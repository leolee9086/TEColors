<template>
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
            <div class="fn__flex-column" @click.stop="(event) => 应用颜色到当前块(['color', 'backgroundColor'], false)(event)">
                <div class="fn__flex" v-for="(chunk, index) in chunkedRecentColors" :key="index">
                    <template v-for="(data, i) in chunk">
                        <button class="color__square" :style="`${data}`">A</button>
                    </template>
                </div>
            </div>
        </template>
    </panel>
</template>
<script setup>

</script>
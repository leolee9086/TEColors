import { plugin } from '../../asyncModules.js';
import { openDialog } from '../dialogs/index.js';
async function openImagePalatte(imgElement){
    const CT = await import('/plugins/TEColors/static/color-thief.js')
    const chroma = await import('/plugins/TEColors/static/chroma-js.js')
    const colorThief = new CT.default()
    const dominantColor = colorThief.getPalette(imgElement, 13, 1);
    console.log(colorThief)
    console.log('Dominant Color:', dominantColor);
    // 创建并添加颜色块
    openDialog(
        '/plugins/TEColors/source/UI/components/imageColorPanel.vue',
        'ImagePalatte',
        {},
        '',
        {imgElement},
        '图片色彩分析'
    )
}
plugin.eventBus.on(
    'open-imageColors-palatte',(e)=>{

        openImagePalatte(e.detail)
    }
)
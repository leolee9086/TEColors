const clientApi = require("siyuan")
const { Plugin } = clientApi
module.exports = class TEColors extends Plugin {
    onload() {
        this.添加颜色选择边栏()
        this.添加图片颜色识别菜单()
        console.log(JSON.parse(localStorage.getItem('customColorPlattes')) )
        this.data = {
            recentColors :[],
            customColors : [`color:none,backgroundColor:none`],    
            blockColors:[],
            customColorPlattes:JSON.parse(localStorage.getItem('customColorPlattes'))?JSON.parse(localStorage.getItem('customColorPlattes'))._value : [],
            lastActivedPlatte:null
        }
        import('/plugins/TEColors/source/UI/utils/openImageColorPlatte.js')

    }
    添加图片颜色识别菜单() {
        this.eventBus.on(
            'open-menu-image', (e) => {
                console.log(e.detail.element)
                e.detail.menu.addItem(
                    {
                        'label': "识别图片配色",
                        'icon': "",
                        'click': async () => {
                            //包含图片元素的span
                            const imgElement = e.detail.element.querySelector('img')
                            this.eventBus.emit('open-imageColors-palatte', imgElement                                )

                        }
                    }
                )
            }
        )
    }
    添加颜色选择边栏() {
        let that = this
        this.addDock({
            config: {
                icon: "iconColorPannel",
                position: "LeftBottom",
                size: { width: 200, height: 0 },
                title: "TEColorsMainPanel",
            },
            data: {
                text: "",
            },
            type: "config",
            init() {
                const UI容器父元素 = this.element
                const UI容器 = 插入UI面板容器(UI容器父元素)
                创建块颜色选择面板(UI容器)
            },
        })
    }
}
function 插入UI面板容器(UI容器父元素) {
    UI容器父元素.innerHTML = `<div class="fn__flex-1 fn__flex-column cc_ui-container"></div>`
    return UI容器父元素.querySelector(".fn__flex-1.fn__flex-column")
}
async function 创建块颜色选择面板(UI容器) {
    (await import('/plugins/TEColors/source/Data/index.js')).createReactiveData()
    const vue组件加载器 = await import('/plugins/TEColors/source/UI/Utils/componentsLoader.js')
    const 颜色管理器主面板 = await vue组件加载器.initVueApp("/plugins/TEColors/source/UI/components/mainColorPanel.vue")
    颜色管理器主面板.mount(UI容器);

}
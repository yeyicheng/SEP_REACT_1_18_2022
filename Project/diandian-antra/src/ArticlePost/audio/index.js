/**
 * @description 视频 菜单
 * @author tonghan
 */

import E from 'wangeditor'
import createPanelConf from './create-panel-conf'
import bindEvent from './bind-event'
const {
    $,
    PanelMenu,
    Panel,
} = E

class Audio extends PanelMenu {
    constructor(editor) {
        const $elem = $(
            `<div class="w-e-menu" data-title="audio">
                <i class="w-e-icon-play"></i>
            </div>`
        )
        super($elem, editor)

        // 绑定事件 tootip
        bindEvent(editor)
    }

    /**
     * 菜单点击事件
     */
     clickHandler() {
        // 弹出 panel
        this.createPanel('')
    }

    /**
     * 创建 panel
     * @param link 链接
     */
    createPanel(iframe) {
        const conf = createPanelConf(this.editor, iframe)
        const panel = new Panel(this, conf)
        panel.create()
    }

    /**
     * 尝试修改菜单 active 状态
     */
    tryChangeActive() {}
}

export default Audio

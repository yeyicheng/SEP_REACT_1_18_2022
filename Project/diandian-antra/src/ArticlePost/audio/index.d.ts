/**
 * @description 视频 菜单
 * @author tonghan
 */
import Editor from 'wangeditor/dist/editor/index';
import PanelMenu from 'wangeditor/dist/menus/menu-constructors/PanelMenu';
import { MenuActive } from 'wangeditor/dist/menus/menu-constructors/Menu';

declare class Audio extends PanelMenu implements MenuActive {
    constructor(editor: Editor);
    /**
     * 菜单点击事件
     */
    clickHandler(): void;
    /**
     * 创建 panel
     * @param link 链接
     */
    private createPanel;
    /**
     * 尝试修改菜单 active 状态
     */
    tryChangeActive(): void;
}
export default Audio;

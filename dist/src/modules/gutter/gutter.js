// GUTTER :
import { Line } from "../line/line.js";
export class Gutter {
    number;
    gutterWidth;
    editor;
    context;
    line;
    offsetY;
    scrollY;
    constructor(option) {
        this.number = option.number;
        this.editor = option.editor;
        this.context = option.context;
        this.line = option.line;
        this.gutterWidth = option.gutterWidth;
        this.scrollY = 0;
        this.offsetY = Line.lineY;
        this.render();
    }
    render = () => {
        this.context.clearRect(0, this.offsetY - this.scrollY, this.gutterWidth, this.line.lineHeight);
        this.context.fillStyle = this.editor.theme.gutterBackground;
        this.context.fillRect(0, this.offsetY - this.scrollY, this.gutterWidth, this.line.lineHeight);
        this.context.fillStyle = this.editor.theme.gutterColor;
        this.context.font = `${this.line.lineHeight - 4}px ${this.editor.font}`;
        const baseline = this.offsetY - this.scrollY + (this.line.lineHeight / 2) + ((this.line.lineHeight - 4) / 2) - 2;
        const paddingX = 4;
        this.context.fillText(this.number.toString(), paddingX, baseline);
    };
    updateScroll = (scrollY) => {
        this.scrollY = scrollY;
        this.render();
    };
}
//# sourceMappingURL=gutter.js.map
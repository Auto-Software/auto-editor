// TOKEN : 
import { Line } from "../line/line.js";
export class Token {
    color;
    content;
    line;
    font;
    context;
    offsetX;
    offsetY;
    scrollX;
    scrollY;
    constructor(option) {
        this.context = option.context;
        this.content = option.content;
        this.line = option.line;
        this.color = option.color || "#fff";
        this.font = option.font;
        this.scrollX = 0;
        this.scrollY = 0;
        this.offsetX = this.line.offsetX + this.line.gutterWidth;
        this.offsetY = Line.lineY;
        const metrics = this.context.measureText(this.content);
        this.line.offsetX += metrics.width;
        this.render();
    }
    render = () => {
        const metrics = this.context.measureText(this.content);
        // 1. Limpa a área (Opcional, mas bom para garantir)
        this.context.clearRect(this.offsetX - this.scrollX, this.offsetY - this.scrollY, metrics.width, this.line.lineHeight);
        this.context.fillStyle = this.line.editor.theme.lineBackgroundColor;
        this.context.fillRect(this.offsetX - this.scrollX, this.offsetY - this.scrollY, metrics.width, this.line.lineHeight);
        this.context.fillStyle = this.color;
        this.context.font = `${this.line.lineHeight - 4}px ${this.font}`;
        this.context.fillText(this.content, this.offsetX - this.scrollX, this.offsetY - this.scrollY + (this.line.lineHeight - 4));
    };
    updateScroll = (scrollX, scrollY) => {
        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.render();
    };
}
//# sourceMappingURL=token.js.map
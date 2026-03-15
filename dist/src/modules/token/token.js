// TOKEN : 
import { Line } from "../line/line.js";
export class Token {
    color;
    content;
    line;
    context;
    scrollX;
    scrollY;
    offsetX;
    offsetY;
    constructor(option) {
        this.context = option.context;
        this.content = option.content;
        this.line = option.line;
        this.color = option.color || "#fff";
        this.scrollX = 0;
        this.scrollY = 0;
        this.offsetX = this.line.offsetX + this.line.gutterWidth;
        this.offsetY = Line.lineY;
        const metrics = this.context.measureText(this.content);
        const spaceCount = (this.content.match(/ /g) || []).length;
        const wordSpacing = this.line.editor.wordSpacing * spaceCount;
        this.line.offsetX += metrics.width + wordSpacing;
        this.render();
    }
    render = () => {
        this.context.fillStyle = this.color;
        this.context.font = `${this.line.editor.fontSize}px ${this.line.editor.font}`;
        const textMetrics = this.context.measureText(this.content);
        const x = Math.floor(this.offsetX - this.scrollX);
        const y = Math.floor(this.offsetY - this.scrollY + (this.line.lineHeight + textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent) / 2);
        this.context.fillText(this.content, x, y);
    };
    updateScroll = (scrollX, scrollY) => {
        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.render();
    };
}
//# sourceMappingURL=token.js.map
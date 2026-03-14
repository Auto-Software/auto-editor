export class Gutter {
    number;
    gutterWidth;
    editor;
    context;
    line;
    backgroundColor;
    fontColor;
    offsetY;
    scrollY = 0;
    constructor(option) {
        this.number = option.number;
        this.editor = option.editor;
        this.context = option.context;
        this.line = option.line;
        this.gutterWidth = option.gutterWidth;
        this.backgroundColor = this.editor.theme.gutterBackgroundColor;
        this.fontColor = this.editor.theme.gutterFontColor;
        this.offsetY = this.line.offsetY;
        this.render();
    }
    selected = () => {
        this.backgroundColor = this.editor.theme.gutterBackgroundColorSelected;
        this.fontColor = this.editor.theme.gutterFontColorSelected;
    };
    unselected = () => {
        this.backgroundColor = this.editor.theme.gutterBackgroundColor;
        this.fontColor = this.editor.theme.gutterFontColor;
    };
    render = () => {
        const visualY = this.offsetY - this.scrollY;
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, visualY, this.gutterWidth, this.line.lineHeight);
        this.context.fillStyle = this.fontColor;
        this.context.font = `${this.line.lineHeight - 4}px ${this.editor.font}`;
        const baseline = visualY + (this.line.lineHeight / 2) + ((this.line.lineHeight - 4) / 2) - 2;
        const paddingX = 4;
        this.context.fillText(this.number.toString(), paddingX, baseline);
    };
    updateScroll = (scrollY) => {
        this.scrollY = scrollY;
        this.render();
    };
}
//# sourceMappingURL=gutter.js.map
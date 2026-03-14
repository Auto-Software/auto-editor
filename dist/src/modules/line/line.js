// LINE : 
import { Editor } from "../editor/editor.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { tokenMatch } from "../token-match/token-match.js";
export class Line {
    self;
    context;
    lineHeight;
    lineWidth;
    editor;
    offsetX;
    font;
    gutterWidth;
    number;
    content;
    static lineY = 0;
    constructor(option) {
        this.self = this;
        this.editor = option.editor;
        this.context = option.context;
        this.lineHeight = this.editor.lineHeight;
        this.lineWidth = this.editor.lineWidth;
        this.offsetX = 0;
        this.font = option.font;
        this.gutterWidth = option.gutterWidth;
        this.number = option.number;
        this.content = option.content;
        this.render(this.editor.context);
        Line.lineY += this.editor.lineHeight;
    }
    render = (context) => {
        this.offsetX = 0;
        context.fillStyle = this.editor.theme.lineBackgroundColor;
        context.fillRect(0, Line.lineY, this.editor.computedWidth, this.lineHeight);
        const gutter = new Gutter({
            context: this.context,
            number: this.number,
            line: this.self,
            editor: this.editor,
            gutterWidth: this.gutterWidth
        });
        Editor.gutterList.push(gutter);
        const tokenParts = tokenMatch(this.editor.tokenTree, this.content);
        tokenParts.forEach((part) => {
            const token = new Token({
                content: part.text,
                context: this.context,
                line: this.self,
                color: part.color || "#fff",
                font: this.font
            });
            Editor.tokenList.push(token);
        });
    };
    contentUpdate = (text) => {
        this.content = text;
        this.render(this.context);
    };
    select = () => {
        // lógica de seleção futura
    };
    unselect = () => {
        // lógica de deseleção futura
    };
}
;
//# sourceMappingURL=line.js.map
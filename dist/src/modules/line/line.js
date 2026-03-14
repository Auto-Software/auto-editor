import { Editor } from "../editor/editor.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { tokenMatch } from "../token-match/token-match.js";
export class Line {
    self;
    color;
    context;
    lineHeight;
    editor;
    offsetX = 0;
    gutterWidth;
    number;
    content;
    offsetY;
    scrollY = 0;
    static lineY = 0;
    constructor(option) {
        this.self = this;
        this.editor = option.editor;
        this.context = option.context;
        this.lineHeight = this.editor.lineHeight;
        this.gutterWidth = option.gutterWidth;
        this.number = option.number;
        this.content = option.content;
        this.color = this.editor.theme.lineBackgroundColor;
        this.offsetY = Line.lineY;
        // CRUCIAL: Gerar os filhos apenas UMA VEZ no constructor
        this.generateChildren();
        Line.lineY += this.editor.lineHeight;
    }
    generateChildren = () => {
        // Cria o Gutter uma única vez
        const gutter = new Gutter({
            context: this.context,
            number: this.number,
            line: this.self,
            editor: this.editor,
            gutterWidth: this.gutterWidth
        });
        Editor.gutterList.push(gutter);
        // Cria os Tokens uma única vez
        const tokenParts = tokenMatch(this.editor.tokenTree, this.content);
        tokenParts.forEach((part) => {
            const token = new Token({
                content: part.text,
                context: this.context,
                line: this.self,
                color: part.color || "#fff",
                font: this.editor.font
            });
            Editor.tokenList.push(token);
        });
    };
    selected = () => {
        this.color = this.editor.theme.lineBackgroundColorSelected;
    };
    unselected = () => {
        this.color = this.editor.theme.lineBackgroundColor;
    };
    render = () => {
        // Limpa o offsetX para que o próximo ciclo de tokens saiba onde começar
        this.offsetX = 0;
        // Pinta apenas o fundo da linha
        this.context.fillStyle = this.color;
        this.context.fillRect(0, this.offsetY - this.scrollY, this.editor.computedWidth, this.lineHeight);
    };
    updateScroll = (scrollY) => {
        this.scrollY = scrollY;
        this.render();
    };
}
;
//# sourceMappingURL=line.js.map
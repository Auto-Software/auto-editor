import { Editor } from "../editor/editor.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { LineOption, TokenPart } from "../typescript/interface/interface.js";
import { tokenMatch } from "../token-match/token-match.js";

export class Line {
    private self : this;
    private color : string;
    public context : CanvasRenderingContext2D;
    public lineHeight : number;
    public editor : Editor;
    public offsetX : number = 0;
    public gutterWidth : number; 
    public number : number;
    public content : string;
    public offsetY : number;
    private scrollY : number = 0;
    public static lineY : number = 0;

    constructor(option : LineOption){
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

    private generateChildren = (): void => {
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
        const tokenParts: TokenPart[] = tokenMatch(this.editor.tokenTree, this.content);
        tokenParts.forEach((part: TokenPart) => {
            const token = new Token({
                content: part.text,
                context: this.context,
                line: this.self,
                color: part.color || "#fff",
                font: this.editor.font
            });
            Editor.tokenList.push(token);
        });
    }

    public selected = (): void => {
        this.color = this.editor.theme.lineBackgroundColorSelected;
    }

    public unselected = (): void => {
        this.color = this.editor.theme.lineBackgroundColor;
    }

    public render = (): void => {
        // Limpa o offsetX para que o próximo ciclo de tokens saiba onde começar
        this.offsetX = 0;

        // Pinta apenas o fundo da linha
        this.context.fillStyle = this.color;
        this.context.fillRect(0, this.offsetY - this.scrollY, this.editor.computedWidth, this.lineHeight);
    };

    public updateScroll = (scrollY: number): void => {
        this.scrollY = scrollY;
        this.render();
    }
};
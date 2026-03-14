// LINE : 

import { Editor } from "../editor/editor.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { LineOption, TokenPart } from "../typescript/interface/interface.js";
import { tokenMatch } from "../token-match/token-match.js";

export class Line {

    private self : this;

    public context : CanvasRenderingContext2D;

    public lineHeight : number;
    public lineWidth : number;

    public editor : Editor;
    public offsetX : number;
    public font : string;
    public gutterWidth : number; 
    public number : number;
    public content : string;

    public static lineY : number = 0;

    constructor(option : LineOption){

        this.self = this;

        this.editor = option.editor;
        this.context = option.context;
        this.lineHeight = this.editor.lineHeight;
        this.lineWidth = this.editor.lineWidth;
        this.offsetX = 0
        this.font = option.font;
        this.gutterWidth = option.gutterWidth;
        this.number = option.number;
        this.content = option.content;
        
        this.render(this.editor.context);
        
        Line.lineY += this.editor.lineHeight;

    }

    private render = (context: CanvasRenderingContext2D): void => {

        this.offsetX = 0;

        context.fillStyle = this.editor.theme.lineBackgroundColor;
        context.fillRect(0, Line.lineY, this.editor.computedWidth, this.lineHeight);

        const gutter : Gutter = new Gutter({
            context : this.context,
            number : this.number,
            line : this.self,
            editor : this.editor,
            gutterWidth : this.gutterWidth
        });

        Editor.gutterList.push(gutter)

        const tokenParts: TokenPart[] = tokenMatch(this.editor.tokenTree, this.content);

        tokenParts.forEach((part: TokenPart) => {

            const token : Token = new Token({
                content: part.text,
                context: this.context,
                line: this.self,
                color: part.color || "#fff",
                font: this.font
            });

            Editor.tokenList.push(token);

        });

    };

    public contentUpdate = (text : string): void =>{
        this.content = text;
        this.render(this.context);
    }

    public select = (): void => {
        // lógica de seleção futura
    }

    public unselect = (): void => {
        // lógica de deseleção futura
    }
};
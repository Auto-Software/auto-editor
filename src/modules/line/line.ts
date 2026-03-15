
// LINE : 

import { Editor } from "../editor/editor.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { LineOption, TokenPart } from "../typescript/interface/interface.js";
import { tokenMatch } from "../token-match/token-match.js";
import { tokenLoader } from "../token-loader/token-loader.js";
import { EventTrigger } from "../event-trigger/event-trigger.js";

export class Line {

    private self : this;
    private color : string;
    private scrollY : number = 0;
    private borderColor : string;

    public context : CanvasRenderingContext2D;
    public lineHeight : number;
    public editor : Editor;
    public offsetX : number = 0;
    public gutterWidth : number; 
    public number : number;
    public content : string;
    public offsetY : number;
    public event : EventTrigger;

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
        this.event = new EventTrigger();
        this.borderColor = this.editor.theme.lineBorderColor;
        
        this.generateChildren();
        
        Line.lineY += this.editor.lineHeight;

    };

    private generateChildren = (): void => {

        const gutter = new Gutter({
            context: this.context,
            number: this.number,
            line: this.self,
            editor: this.editor,
            gutterWidth: this.gutterWidth
        });

        Editor.gutterList.push(gutter);

        const tokenList: TokenPart[] = tokenMatch(tokenLoader(this.editor.lang), this.content);
        
        tokenList.forEach((part: TokenPart) => {
            const token = new Token({
                content: part.text,
                context: this.context,
                line: this.self,
                color: part.color || "#fff"
            });
            Editor.tokenList.push(token);
        });
    }

    public selected = (): void => {
        this.color = this.editor.theme.lineBackgroundColorSelected;
        this.borderColor = this.editor.theme.lineBorderColorSelected;
        this.event.emit("selected");
    }

    public unselected = (): void => {
        this.color = this.editor.theme.lineBackgroundColor;
        this.borderColor = this.editor.theme.lineBorderColor;
        this.event.emit("unselected");
    }

    public render = (): void => {
        
        const y = this.offsetY - this.scrollY;
        const width = this.editor.computedWidth;

        // Fundo da linha
        this.context.fillStyle = this.color;
        this.context.fillRect(0, y, width, this.lineHeight);

        // Bordas superior e inferior
        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = 1;

        this.context.beginPath();
        // Linha superior
        this.context.moveTo(0, y + 0.5); // 0.5 para alinhar com pixel perfeito
        this.context.lineTo(width, y + 0.5);

        // Linha inferior
        this.context.moveTo(0, y + this.lineHeight - 0.5);
        this.context.lineTo(width, y + this.lineHeight - 0.5);

        this.context.stroke();
    };

    public updateScroll = (scrollY: number): void => {
        this.scrollY = scrollY;
        this.render();
    }

};
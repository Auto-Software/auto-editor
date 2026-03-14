
// TOKEN : 

import { Line } from "../line/line.js";
import { TokenOption } from "../typescript/interface/interface.js";

export class Token {

    private color: string;
    private content: string;
    private line: Line;
    private font: string;
    private context: CanvasRenderingContext2D;

    private offsetX: number; 
    private offsetY: number; 
    private scrollX: number;  
    private scrollY: number;  

    constructor(option: TokenOption) {
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

    public render = (): void => {
        const metrics = this.context.measureText(this.content);

        // 1. Limpa a área (Opcional, mas bom para garantir)
        this.context.clearRect(
            this.offsetX - this.scrollX,
            this.offsetY - this.scrollY,
            metrics.width,
            this.line.lineHeight
        );

        this.context.fillStyle = this.line.editor.theme.lineBackgroundColor;
        this.context.fillRect(
            this.offsetX - this.scrollX,
            this.offsetY - this.scrollY,
            metrics.width,
            this.line.lineHeight
        );

        this.context.fillStyle = this.color;
        this.context.font = `${this.line.lineHeight - 4}px ${this.font}`;
        this.context.fillText(
            this.content,
            this.offsetX - this.scrollX,
            this.offsetY - this.scrollY + (this.line.lineHeight - 4)
        );
    }

    public updateScroll = (scrollX: number, scrollY: number): void => {
        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.render();
    }
}
// TOKEN : 

import { Line } from "../line/line.js";
import { TokenOption } from "../typescript/interface/interface.js";

export class Token {

    private color: string;
    private content: string;
    private line: Line;
    private context: CanvasRenderingContext2D;
    private scrollX: number;  
    private scrollY: number;  

    public offsetX: number; 
    public offsetY: number; 

    constructor(option: TokenOption) {

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

    public render = (): void => {

        this.context.fillStyle = this.color;
        this.context.font = `${this.line.editor.fontSize}px ${this.line.editor.font}`;

        const textMetrics = this.context.measureText(this.content);

        const x = Math.floor(this.offsetX - this.scrollX);

        const y = Math.floor(
            this.offsetY - this.scrollY + (this.line.lineHeight + textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent) / 2
        );

        this.context.fillText(this.content, x, y);
    }

    public updateScroll = (scrollX: number, scrollY: number): void => {
        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.render();
    }
}
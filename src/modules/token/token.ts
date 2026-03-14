
// TOKEN : 

import { Line } from "../line/line.js";
import { TokenOption } from "../typescript/interface/interface.js";

export class Token {

    private color: string;
    private content: string;
    private line: Line;
    private font: string;
    private context: CanvasRenderingContext2D;

    public offsetX: number; 
    public offsetY: number; 
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
        // Não precisa de clearRect nem fillRect aqui, o Editor já limpou o fundo!
        
        this.context.fillStyle = this.color;
        this.context.font = `${this.line.lineHeight - 4}px ${this.font}`;
        
        // Math.floor evita o borrão do sub-pixel
        this.context.fillText(
            this.content,
            Math.floor(this.offsetX - this.scrollX),
            Math.floor(this.offsetY - this.scrollY + (this.line.lineHeight - 4))
        );
    }

    public updateScroll = (scrollX: number, scrollY: number): void => {
        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.render();
    }
}
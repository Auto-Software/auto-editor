// GUTTER :

import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";
import { GutterOption } from "../typescript/interface/interface.js";

export class Gutter { 

    public number: number;
    public gutterWidth: number;

    private editor: Editor;
    private context: CanvasRenderingContext2D;
    private line: Line;

    private offsetY: number;
    private scrollY: number;

    constructor(option: GutterOption) {

        this.number = option.number;
        this.editor = option.editor;
        this.context = option.context;
        this.line = option.line;
        this.gutterWidth = option.gutterWidth;

        this.scrollY = 0;
        this.offsetY = Line.lineY; 

        this.render();
    }

    public render = (): void => {

        this.context.clearRect(
            0,
            this.offsetY - this.scrollY,
            this.gutterWidth,
            this.line.lineHeight
        );

        this.context.fillStyle = this.editor.theme.gutterBackground;
        this.context.fillRect(
            0,
            this.offsetY - this.scrollY,
            this.gutterWidth,
            this.line.lineHeight
        );

        this.context.fillStyle = this.editor.theme.gutterColor;
        this.context.font = `${this.line.lineHeight - 4}px ${this.editor.font}`;

        const baseline = this.offsetY - this.scrollY + (this.line.lineHeight / 2) + ((this.line.lineHeight - 4) / 2) - 2;
        const paddingX = 4;

        this.context.fillText(this.number.toString(), paddingX, baseline);
    }

    public updateScroll = (scrollY: number): void => {
        this.scrollY = scrollY;
        this.render();
    }
}
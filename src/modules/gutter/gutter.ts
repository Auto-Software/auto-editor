import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";
import { GutterOption } from "../typescript/interface/interface.js";

export class Gutter { 

    public number: number;
    public gutterWidth: number;

    private editor: Editor;
    private context: CanvasRenderingContext2D;
    private line: Line;

    private backgroundColor: string;
    private fontColor: string;

    public offsetY: number;
    private scrollY: number = 0;

    constructor(option: GutterOption) {
        
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

    public selected = (): void => {
        this.backgroundColor = this.editor.theme.gutterBackgroundColorSelected;
        this.fontColor = this.editor.theme.gutterFontColorSelected;
    }

    public unselected = (): void => {
        this.backgroundColor = this.editor.theme.gutterBackgroundColor;
        this.fontColor = this.editor.theme.gutterFontColor;
    }

    public render = (): void => {
        const visualY = this.offsetY - this.scrollY;

        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(
            0,
            visualY,
            this.gutterWidth,
            this.line.lineHeight
        );

        this.context.fillStyle = this.fontColor;
        this.context.font = `${this.line.lineHeight - 4}px ${this.editor.font}`;

        const baseline = visualY + (this.line.lineHeight / 2) + ((this.line.lineHeight - 4) / 2) - 2;
        const paddingX = 4;

        this.context.fillText(this.number.toString(), paddingX, baseline);
    }

    public updateScroll = (scrollY: number): void => {
        this.scrollY = scrollY;
        this.render();
    }
}
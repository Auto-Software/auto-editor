import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { Line } from "../line/line.js";
export declare class Editor {
    private self;
    private canvas;
    private container;
    static tokenList: Token[];
    static gutterList: Gutter[];
    static lineList: Line[];
    tabSize: number;
    tokenTree: tokenTreeOption[];
    width: string | number;
    height: string | number;
    theme: any;
    context: CanvasRenderingContext2D;
    editorContainer: HTMLDivElement;
    computedWidth: number;
    computedHeight: number;
    lineWidth: number;
    lineHeight: number;
    textarea: HTMLTextAreaElement;
    font: string;
    constructor(option: EditorOption);
    private clearCanvas;
    private rendder;
    private loadEditor;
}
//# sourceMappingURL=editor.d.ts.map
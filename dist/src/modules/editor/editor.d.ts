import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { Line } from "../line/line.js";
import { PieceTable } from "../piece-table/piece-table.js";
export declare class Editor {
    private self;
    private canvas;
    private container;
    private pre;
    static tokenList: Token[];
    static gutterList: Gutter[];
    static lineList: Line[];
    lineCache: string[];
    pieceTable: PieceTable;
    tabSize: number;
    lang: tokenTreeOption[];
    width: string | number;
    height: string | number;
    theme: any;
    context: CanvasRenderingContext2D;
    editorContainer: HTMLDivElement;
    computedWidth: number;
    computedHeight: number;
    wordSpacing: number;
    lineHeight: number;
    textarea: HTMLTextAreaElement;
    font: string;
    fontSize: number;
    scrollBarScale: number;
    scrollBarRadius: number;
    nativeScrollBar: boolean;
    constructor(option: EditorOption);
    private clearCanvas;
    private render;
    private loadEditor;
}
//# sourceMappingURL=editor.d.ts.map
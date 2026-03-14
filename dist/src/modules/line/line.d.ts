import { Editor } from "../editor/editor.js";
import { LineOption } from "../typescript/interface/interface.js";
export declare class Line {
    private self;
    context: CanvasRenderingContext2D;
    lineHeight: number;
    lineWidth: number;
    editor: Editor;
    offsetX: number;
    font: string;
    gutterWidth: number;
    number: number;
    content: string;
    static lineY: number;
    constructor(option: LineOption);
    private render;
    contentUpdate: (text: string) => void;
    select: () => void;
    unselect: () => void;
}
//# sourceMappingURL=line.d.ts.map
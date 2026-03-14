import { Editor } from "../editor/editor.js";
import { LineOption } from "../typescript/interface/interface.js";
export declare class Line {
    private self;
    private color;
    context: CanvasRenderingContext2D;
    lineHeight: number;
    editor: Editor;
    offsetX: number;
    gutterWidth: number;
    number: number;
    content: string;
    offsetY: number;
    private scrollY;
    static lineY: number;
    constructor(option: LineOption);
    private generateChildren;
    selected: () => void;
    unselected: () => void;
    render: () => void;
    updateScroll: (scrollY: number) => void;
}
//# sourceMappingURL=line.d.ts.map
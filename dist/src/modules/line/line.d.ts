import { Editor } from "../editor/editor.js";
import { LineOption } from "../typescript/interface/interface.js";
import { EventTrigger } from "../event-trigger/event-trigger.js";
export declare class Line {
    private self;
    private color;
    private scrollY;
    private borderColor;
    context: CanvasRenderingContext2D;
    lineHeight: number;
    editor: Editor;
    offsetX: number;
    gutterWidth: number;
    number: number;
    content: string;
    offsetY: number;
    event: EventTrigger;
    static lineY: number;
    constructor(option: LineOption);
    private generateChildren;
    selected: () => void;
    unselected: () => void;
    render: () => void;
    updateScroll: (scrollY: number) => void;
}
//# sourceMappingURL=line.d.ts.map
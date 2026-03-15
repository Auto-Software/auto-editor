import { GutterOption } from "../typescript/interface/interface.js";
export declare class Gutter {
    number: number;
    gutterWidth: number;
    private editor;
    private context;
    private line;
    private backgroundColor;
    private fontColor;
    offsetY: number;
    private scrollY;
    constructor(option: GutterOption);
    private selected;
    private unselected;
    private render;
    updateScroll: (scrollY: number) => void;
}
//# sourceMappingURL=gutter.d.ts.map
import { GutterOption } from "../typescript/interface/interface.js";
export declare class Gutter {
    number: number;
    gutterWidth: number;
    private editor;
    private context;
    private line;
    private offsetY;
    private scrollY;
    constructor(option: GutterOption);
    render: () => void;
    updateScroll: (scrollY: number) => void;
}
//# sourceMappingURL=gutter.d.ts.map
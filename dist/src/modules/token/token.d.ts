import { TokenOption } from "../typescript/interface/interface.js";
export declare class Token {
    private color;
    private content;
    private line;
    private font;
    private context;
    private offsetX;
    private offsetY;
    private scrollX;
    private scrollY;
    constructor(option: TokenOption);
    render: () => void;
    updateScroll: (scrollX: number, scrollY: number) => void;
}
//# sourceMappingURL=token.d.ts.map
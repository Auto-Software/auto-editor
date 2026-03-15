import { TokenOption } from "../typescript/interface/interface.js";
export declare class Token {
    private color;
    private content;
    private line;
    private context;
    private scrollX;
    private scrollY;
    offsetX: number;
    offsetY: number;
    constructor(option: TokenOption);
    render: () => void;
    updateScroll: (scrollX: number, scrollY: number) => void;
}
//# sourceMappingURL=token.d.ts.map
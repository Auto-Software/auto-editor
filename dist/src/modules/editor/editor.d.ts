import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
export declare class Editor {
    private self;
    private canvas;
    private container;
    static tokenList: Token[];
    static gutterList: Gutter[];
    tabSize: number;
    tokenTree: tokenTreeOption[];
    lang: LangPresetOption;
    width: string | number;
    height: string | number;
    theme: themeType;
    context: CanvasRenderingContext2D;
    editorContainer: HTMLDivElement;
    computedWidth: number;
    computedHeight: number;
    lineWidth: number;
    lineHeight: number;
    textarea: HTMLTextAreaElement;
    font: string;
    constructor(option: EditorOption);
    private loadEditor;
}
//# sourceMappingURL=editor.d.ts.map
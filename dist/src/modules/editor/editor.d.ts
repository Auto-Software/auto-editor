import { LangPresetOption } from "../token-loader/token-loader.js";
import { tokenTreeOption } from "../token-match/token-match.js";
interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize?: number;
    tokenTree?: tokenTreeOption[];
    langPreset?: LangPresetOption;
    width?: string;
    height?: string;
    themePreset?: themeType;
}
export declare class Editor {
    private self;
    editorOverlay: HTMLDivElement;
    editorBody: HTMLDivElement;
    editorAutoHeightContainer: HTMLDivElement;
    editorTrueTextarea: HTMLTextAreaElement;
    container: HTMLDivElement | HTMLBodyElement;
    tabSize: number;
    tokenTree: tokenTreeOption[];
    langPreset: LangPresetOption;
    width: string;
    height: string;
    themePreset: themeType;
    elements: any;
    constructor(option: EditorOption);
    private loadTheme;
    private loadEditor;
}
export {};
//# sourceMappingURL=editor.d.ts.map
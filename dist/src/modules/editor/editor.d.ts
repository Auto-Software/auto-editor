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
    private editorBody;
    private editorWritableContainer;
    private editorViewport;
    editorRowContainer: HTMLDivElement;
    editorTrueTextarea: HTMLTextAreaElement;
    editorGutterContainer: HTMLDivElement;
    container: HTMLDivElement | HTMLBodyElement;
    tabSize: number;
    tokenTree: tokenTreeOption[];
    langPreset: LangPresetOption;
    width: string;
    height: string;
    themePreset: themeType;
    private editorRow;
    constructor(option: EditorOption);
    private loadTheme;
    private loadEditor;
}
export {};
//# sourceMappingURL=editor.d.ts.map
import { LangPresetOption } from "../lang-preset/lang-preset.js";
import { tokenTreeOption } from "../token-match/token-match.js";
interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize?: number;
    tokenTree?: tokenTreeOption[];
    langPreset?: LangPresetOption;
    width?: string;
    height?: string;
}
export declare class Editor {
    private editorBody;
    private editorWritableContainer;
    editorGutterContainer: HTMLDivElement;
    private editorViewport;
    editorTrueTextarea: HTMLTextAreaElement;
    editorRowContainer: HTMLDivElement;
    container: HTMLDivElement | HTMLBodyElement;
    tabSize: number;
    tokenTree: tokenTreeOption[];
    langPreset: LangPresetOption;
    width: string;
    height: string;
    constructor(option: EditorOption);
    private loadEditor;
}
export {};
//# sourceMappingURL=editor.d.ts.map
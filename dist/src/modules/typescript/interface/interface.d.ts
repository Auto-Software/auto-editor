import { Editor } from "../../editor/editor.js";
import { Line } from "../../line/line.js";
export interface GutterOption {
    number: number;
    editor: Editor;
    line: Line;
    context: CanvasRenderingContext2D;
    gutterWidth: number;
}
export interface LineOption {
    context: CanvasRenderingContext2D;
    editor: Editor;
    gutterWidth: number;
    number: number;
    content: string;
    color?: string;
}
export interface TokenOption {
    context: CanvasRenderingContext2D;
    content: string;
    line: Line;
    color?: string;
}
export interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize?: number;
    tokenTree?: tokenTreeOption[];
    lang?: LangPresetOption | tokenTreeOption[];
    width?: string | number;
    height?: string | number;
    theme?: ThemeOption | themePresetName;
    lineHeight?: number;
    lineWidth?: number;
    font?: string;
    fontSize?: number;
    wordSpacing?: number;
    pre?: string;
}
export interface tokenTreeOption {
    token: (string[] | string | RegExp);
    color: string;
    replace?: string;
    role?: TokenRole;
}
export interface TokenPart {
    text: string;
    isToken: boolean;
    color?: string;
}
export interface ThemeOption {
    background: string;
    cursorColor: string;
    gutterFontColor: string;
    gutterFontColorSelected: string;
    gutterBackgroundColor: string;
    gutterBackgroundColorSelected: string;
    lineFontColor: string;
    lineBorderColor: string;
    lineBorderColorSelected: string;
    lineBackgroundColor: string;
    lineBackgroundColorSelected: string;
    comment: string;
    string: string;
    keyword: string;
    control: string;
    number: string;
    boolean: string;
    method: string;
    property: string;
    operator: string;
    bracket: string;
    delimiter: string;
}
//# sourceMappingURL=interface.d.ts.map
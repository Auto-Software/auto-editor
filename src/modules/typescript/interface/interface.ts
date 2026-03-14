
import { Editor } from "../../editor/editor.js";
import { Line } from "../../line/line.js";

export interface GutterOption {
    number : number,
    editor : Editor,
    line : Line,
    context : CanvasRenderingContext2D,
    gutterWidth : number
};

export interface LineOption { 
    context : CanvasRenderingContext2D,
    editor : Editor,
    font : string,
    gutterWidth : number,
    number : number,
    content : string
}

export interface TokenOption {
    context : CanvasRenderingContext2D;
    content : string,
    line : Line
    color? : string
    font : string
}

export interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize?: number;
    tokenTree?: tokenTreeOption[];
    lang?: LangPresetOption;
    width?: string | number;
    height?: string | number;
    theme?: themeType;
    lineHeight? : number;
    lineWidth? : number,
    font? : string
};

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
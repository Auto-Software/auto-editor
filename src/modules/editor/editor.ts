
// EDITOR : 

import { tokenLoader } from "../token-loader/token-loader.js";
import { themeLoader } from "../theme/theme-loader.js";
import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { lineGen } from "../line-gen/line-gen.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";

export class Editor {
    
    private self : this;
    private canvas : HTMLCanvasElement;
    private container: HTMLDivElement | HTMLBodyElement;
    
    public static tokenList : Token[] = [];
    public static gutterList : Gutter[] = [];

    public tabSize: number;
    public tokenTree: tokenTreeOption[];
    public lang: LangPresetOption;
    public width: string | number;
    public height: string | number;
    public theme: themeType;
    public context : CanvasRenderingContext2D;
    public editorContainer : HTMLDivElement;
    public computedWidth : number;
    public computedHeight : number;
    public lineWidth : number;
    public lineHeight : number;
    public textarea : HTMLTextAreaElement;
    public font : string;

    constructor(option: EditorOption) {

        this.self = this;

        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";
        this.lang = option?.lang || "javascript";
        this.computedWidth = 0;
        this.computedHeight = 0;
        this.lineHeight = option?.lineHeight || 20;
        this.font = option?.font || "monospace";
        this.lineWidth = option?.lineWidth || 10;

        this.editorContainer = document.createElement("div");
        this.editorContainer.classList.add("editor-container");

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;

        this.tokenTree = option?.tokenTree || tokenLoader("javascript");
        this.theme = option?.theme || themeLoader("monaco");

        this.textarea = document.createElement("textarea");
        this.textarea.classList.add("editor-textarea");

        this.editorContainer.appendChild(this.canvas);
        this.editorContainer.appendChild(this.textarea);
        this.container.appendChild(this.editorContainer);

        this.editorContainer.style.width = this.width + "px";
        this.editorContainer.style.height = this.height + "px";
        this.editorContainer.style.background = this.theme.background;

        this.textarea.style.fontFamily = this.font;
        this.textarea.value = " ";
        
        this.computedWidth = this.editorContainer.clientWidth
        this.computedHeight = this.editorContainer.clientHeight

        this.canvas.width = this.computedWidth;
        this.canvas.height = this.computedHeight;

        this.loadEditor();

    };

    private loadEditor = (): void => {

        lineGen(this.self);

        this.textarea.oninput = ()=> lineGen(this.self);

        this.textarea.onscroll = (e: any) => {

            const scrollX = e.target.scrollLeft;
            const scrollY = e.target.scrollTop;

            Editor.tokenList.forEach(token => token.updateScroll(scrollX, scrollY));
            Editor.gutterList.forEach(gutter => gutter.updateScroll(scrollY));
        };
        
    }
};
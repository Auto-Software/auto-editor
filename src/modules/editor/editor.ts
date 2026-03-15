
// EDITOR : 

import { tokenLoader } from "../token-loader/token-loader.js";
import { themeLoader } from "../theme/theme-loader.js";
import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { lineGen } from "../line-gen/line-gen.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { Line } from "../line/line.js";
import { settings } from "../settings/settings.js";

export class Editor {

    private self: this;
    private canvas: HTMLCanvasElement;
    private container: HTMLDivElement | HTMLBodyElement;
    private pre : string;
    
    public static tokenList: Token[] = [];
    public static gutterList: Gutter[] = [];
    public static lineList: Line[] = [];

    public lineCache: string[] = [];
    public tabSize: number;
    public lang: tokenTreeOption[];
    public width: string | number;
    public height: string | number;
    public theme: any;
    public context: CanvasRenderingContext2D;
    public editorContainer: HTMLDivElement;
    public computedWidth: number;
    public computedHeight: number;
    public wordSpacing: number;
    public lineHeight: number;
    public textarea: HTMLTextAreaElement;
    public font: string;
    public fontSize : number;

    constructor(option: EditorOption) {

        this.self = this;
        this.container = option?.container;
        this.tabSize = option?.tabSize || settings.defaultEditorTabSize ;
        this.width = option?.width || settings.defaultEditorWidth;
        this.height = option?.height || settings.defaultEditorHeight;
        this.lineHeight = option?.lineHeight || settings.defaultEditorLineHeight;
        this.font = option?.font || settings.defaultEditorFont;
        this.wordSpacing = option?.wordSpacing || settings.defaultEditorWordSpacing;
        this.fontSize = option?.fontSize || settings.defaultEditorFontSize;
        this.pre = option?.pre || " ";

        this.editorContainer = document.createElement("div");
        this.editorContainer.classList.add("editor-container");

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;

        console.log("current lang : " + option?.lang);

        this.lang = tokenLoader(option?.lang ?? settings.defaultEditorLang);
        this.theme = themeLoader(option?.theme ?? settings.defaultEditorTheme);

        this.textarea = document.createElement("textarea");
        this.textarea.classList.add("editor-textarea");
        
        this.editorContainer.appendChild(this.canvas);
        this.editorContainer.appendChild(this.textarea);
        this.container.appendChild(this.editorContainer);

        this.editorContainer.style.width = this.width + "px";
        this.editorContainer.style.height = this.height + "px";
        this.editorContainer.style.background = this.theme.background;
        
        this.textarea.style.fontFamily = this.font;
        this.textarea.style.fontSize = this.fontSize + "px";
        this.textarea.style.wordSpacing = this.wordSpacing + "px";
        this.textarea.value = this.pre;

        this.lineCache = this.textarea.value.split('\n');
        
        this.computedWidth = this.editorContainer.clientWidth;
        this.computedHeight = this.editorContainer.clientHeight;

        this.canvas.width = this.computedWidth;
        this.canvas.height = this.computedHeight;

        this.loadEditor();
    }

    private clearCanvas = (): void => {
        this.context.fillStyle = this.theme.background;
        this.context.fillRect(0, 0, this.computedWidth, this.computedHeight);
    }

    private rendder = (): void => {

        const scrollX = this.textarea.scrollLeft;
        const scrollY = this.textarea.scrollTop;

        this.clearCanvas();

        Editor.lineList.forEach(line => {
            line.updateScroll(scrollY); 
        });

        Editor.tokenList.forEach(token => {
            token.updateScroll(scrollX, scrollY);
        });

        Editor.gutterList.forEach(gutter => {
            gutter.updateScroll(scrollY);
        });
    }

    private loadEditor = (): void => {

        lineGen(this.self);

        this.rendder();

        this.textarea.oninput = () => {
            this.lineCache = this.textarea.value.split('\n');
            lineGen(this.self);
            this.rendder();
        };
        
        this.lineCache = this.textarea.value.split('\n'); // Split só aqui!
        // No editor.ts
        this.textarea.onscroll = () => {
            lineGen(this.self); // Atualiza quais linhas devem existir
            requestAnimationFrame(this.rendder); // Desenha
        };

        this.textarea.onclick = () => {
            setTimeout(() => {
                lineGen(this.self);
                this.rendder();
            }, 0);
        };

        this.textarea.onkeydown = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                setTimeout(() => {
                    lineGen(this.self);
                    this.rendder();
                }, 0);
            }
        };
    }
}
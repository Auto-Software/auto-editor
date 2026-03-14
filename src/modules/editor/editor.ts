
// EDITOR : 

import { tokenLoader } from "../token-loader/token-loader.js";
import { themeLoader } from "../theme/theme-loader.js";
import { EditorOption, tokenTreeOption } from "../typescript/interface/interface.js";
import { lineGen } from "../line-gen/line-gen.js";
import { Token } from "../token/token.js";
import { Gutter } from "../gutter/gutter.js";
import { Line } from "../line/line.js";

export class Editor {

    private self: this;
    private canvas: HTMLCanvasElement;
    private container: HTMLDivElement | HTMLBodyElement;
    
    public static tokenList: Token[] = [];
    public static gutterList: Gutter[] = [];
    public static lineList: Line[] = [];

    public tabSize: number;
    public tokenTree: tokenTreeOption[];
    public width: string | number;
    public height: string | number;
    public theme: any;
    public context: CanvasRenderingContext2D;
    public editorContainer: HTMLDivElement;
    public computedWidth: number;
    public computedHeight: number;
    public lineWidth: number;
    public lineHeight: number;
    public textarea: HTMLTextAreaElement;
    public font: string;

    constructor(option: EditorOption) {

        this.self = this;
        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";
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
        this.textarea.value = "";
        
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

    this.clearCanvas(); // Limpa o fundo com a cor do tema

    // CAMADA 1: Background das Linhas (Destaque)
    Editor.lineList.forEach(line => {
        line.updateScroll(scrollY); // Isso deve apenas atualizar o offsetY e rodar o fillRect
    });

    // CAMADA 2: Texto (Tokens)
    Editor.tokenList.forEach(token => {
        token.updateScroll(scrollX, scrollY);
    });

    // CAMADA 3: Interface (Gutter) - Por último para ficar por cima de tudo
    Editor.gutterList.forEach(gutter => {
        gutter.updateScroll(scrollY);
    });
}

    private loadEditor = (): void => {

        lineGen(this.self);

        this.rendder();

        this.textarea.oninput = () => {
            lineGen(this.self);
            this.rendder();
        };

        this.textarea.onscroll = () => {
            requestAnimationFrame(this.rendder);
        };

        this.textarea.onclick = () => {
            lineGen(this.self);
            this.rendder();
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
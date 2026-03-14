// EDITOR : 
import { tokenLoader } from "../token-loader/token-loader.js";
import { themeLoader } from "../theme/theme-loader.js";
import { lineGen } from "../line-gen/line-gen.js";
export class Editor {
    self;
    canvas;
    container;
    static tokenList = [];
    static gutterList = [];
    static lineList = [];
    tabSize;
    tokenTree;
    width;
    height;
    theme;
    context;
    editorContainer;
    computedWidth;
    computedHeight;
    lineWidth;
    lineHeight;
    textarea;
    font;
    constructor(option) {
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
        this.context = this.canvas.getContext("2d");
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
    clearCanvas = () => {
        this.context.fillStyle = this.theme.background;
        this.context.fillRect(0, 0, this.computedWidth, this.computedHeight);
    };
    rendder = () => {
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
    };
    loadEditor = () => {
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
    };
}
//# sourceMappingURL=editor.js.map
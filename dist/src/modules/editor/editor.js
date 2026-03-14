// EDITOR : 
import { tokenLoader } from "../token-loader/token-loader.js";
import { themeLoader } from "../theme/theme-loader.js";
import { lineGen } from "../line-gen/line-gen.js";
export class Editor {
    self;
    canvas;
    container;
    isScrolling = false;
    static tokenList = [];
    static gutterList = [];
    tabSize;
    tokenTree;
    lang;
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
        this.lang = option?.lang || "javascript";
        this.computedWidth = 0;
        this.computedHeight = 0;
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
        this.textarea.value = " ";
        this.computedWidth = this.editorContainer.clientWidth;
        this.computedHeight = this.editorContainer.clientHeight;
        this.canvas.width = this.computedWidth;
        this.canvas.height = this.computedHeight;
        this.loadEditor();
    }
    ;
    render = (context) => {
        context.fillStyle = this.theme.background;
        context.fillRect(0, 0, this.computedWidth, this.computedHeight);
    };
    loadEditor = () => {
        lineGen(this.self);
        this.render(this.context);
        this.textarea.oninput = () => {
            lineGen(this.self);
            const scrollX = this.textarea.scrollLeft;
            const scrollY = this.textarea.scrollTop;
            this.render(this.context);
            Editor.tokenList.forEach(token => {
                const visualY = token.offsetY - scrollY;
                if (visualY > -20 && visualY < this.computedHeight + 20) {
                    token.updateScroll(scrollX, scrollY);
                }
            });
            Editor.gutterList.forEach(gutter => {
                const visualY = gutter.offsetY - scrollY;
                if (visualY > -20 && visualY < this.computedHeight + 20) {
                    gutter.updateScroll(scrollY);
                }
            });
        };
        this.textarea.onscroll = (e) => {
            const scrollX = e.target.scrollLeft;
            const scrollY = e.target.scrollTop;
            requestAnimationFrame(() => {
                this.render(this.context);
                Editor.tokenList.forEach(token => {
                    const visualY = token.offsetY - scrollY;
                    if (visualY > -20 && visualY < this.computedHeight + 20) {
                        token.updateScroll(scrollX, scrollY);
                    }
                });
                Editor.gutterList.forEach(gutter => {
                    const visualY = gutter.offsetY - scrollY;
                    if (visualY > -20 && visualY < this.computedHeight + 20) {
                        gutter.updateScroll(scrollY);
                    }
                });
            });
        };
    };
}
;
//# sourceMappingURL=editor.js.map
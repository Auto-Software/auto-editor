// CONSTRUCTOR : 
import { tokenLoader } from "../token-loader/token-loader.js";
import { closeOpen } from "../open-close/open-close.js";
import { rowEngine } from "../row-engine/row-engine.js";
import { themeLoader } from "../theme/theme-loader.js";
export class Editor {
    editorBody;
    editorWritableContainer;
    editorViewport;
    editorRowContainer;
    editorTrueTextarea;
    editorGutterContainer;
    container;
    tabSize;
    tokenTree;
    langPreset;
    width;
    height;
    themePreset;
    editorRow;
    constructor(option) {
        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";
        this.editorRow = [];
        this.tokenTree = option?.tokenTree || tokenLoader("javascript");
        this.themePreset = option?.themePreset || themeLoader("monaco");
        this.editorBody = document.createElement("div");
        this.editorBody.classList.add("editor-container");
        this.editorWritableContainer = document.createElement("div");
        this.editorWritableContainer.classList.add("writable-container");
        this.editorGutterContainer = document.createElement("div");
        this.editorGutterContainer.classList.add("editor-gutter");
        this.editorViewport = document.createElement("div");
        this.editorViewport.classList.add("editor-viewport");
        this.editorTrueTextarea = document.createElement("textarea");
        this.editorTrueTextarea.classList.add("editor-true-writable-area");
        this.editorTrueTextarea.spellcheck = false;
        this.editorRowContainer = document.createElement("div");
        this.editorRowContainer.classList.add("editor-row-container");
        this.editorViewport.appendChild(this.editorTrueTextarea);
        this.editorViewport.appendChild(this.editorRowContainer);
        this.editorWritableContainer.appendChild(this.editorGutterContainer);
        this.editorWritableContainer.appendChild(this.editorViewport);
        this.editorBody.appendChild(this.editorWritableContainer);
        if (this.container instanceof HTMLElement)
            this.container.appendChild(this.editorBody);
        let treeToLoad;
        if (option.tokenTree) {
            treeToLoad = option.tokenTree;
            this.langPreset = option.langPreset || "javascript";
        }
        else {
            const selectedPreset = option.langPreset || "javascript";
            this.langPreset = selectedPreset;
            treeToLoad = tokenLoader(selectedPreset);
        }
        ;
        this.editorBody.style.width = "100%";
        this.editorBody.style.height = "100%";
        if (this.width && this.width != "full")
            this.editorBody.style.width = this.width;
        if (this.height && this.width != "full")
            this.editorBody.style.height = this.height;
        if (this.width === "full")
            this.editorBody.style.width = "100%";
        if (this.height === "full")
            this.editorBody.style.height = "100%";
        this.loadEditor(treeToLoad);
        this.loadTheme(this.themePreset);
    }
    ;
    loadTheme = (theme) => {
        this.editorViewport.style.background = theme.background;
        this.editorGutterContainer.style.background = theme.background;
        this.editorBody.style.background = theme.background;
    };
    loadEditor = (tTree) => {
        // TOKEN SET : 
        this.tokenTree = tTree;
        rowEngine(this, " ", this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this, this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
        });
        // TAB SIZE SET : 
        let calculatedTabSize = "";
        for (let i = 0; i < this.tabSize; i++)
            calculatedTabSize += " ";
        this.editorTrueTextarea.style.tabSize = this.tabSize.toString();
        // AUTO CLOSE CHAR : 
        this.editorTrueTextarea.addEventListener('keydown', (e) => {
            if (closeOpen(e, this))
                return;
            if (e.key === 'Tab') {
                e.preventDefault();
                document.execCommand('insertText', false, calculatedTabSize);
            }
            if (e.key === 'Enter') {
                const cursor = this.editorTrueTextarea.selectionStart;
                const text = this.editorTrueTextarea.value;
                const charBefore = text[cursor - 1];
                const charAfter = text[cursor];
                if (charBefore === '{' && charAfter === '}') {
                    e.preventDefault();
                    const middleContent = `\n${calculatedTabSize}\n`;
                    document.execCommand('insertText', false, middleContent);
                    const newPos = this.editorTrueTextarea.selectionStart - 2;
                    this.editorTrueTextarea.setSelectionRange(newPos, newPos);
                    rowEngine(this, this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
                    return;
                }
            }
        });
    };
}
//# sourceMappingURL=editor.js.map
// CONSTRUCTOR : 
import { closeOpen } from "../open-close/open-close.js";
import { rowEngine } from "../row-engine/row-engine.js";
import { javascriptTokenTree } from "../token-lang/js-token.js";
export class Constructor {
    editorBody;
    editorWritableContainer;
    editorGutterContainer;
    editorViewport;
    editorTrueTextarea;
    editorRowContainer;
    container;
    tabSize;
    tokenTree;
    constructor(option) {
        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.tokenTree = option?.tokenTree || javascriptTokenTree;
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
        if (this.container instanceof HTMLElement) {
            this.container.appendChild(this.editorBody);
        }
        this.loadEditor();
    }
    loadEditor = () => {
        rowEngine(" ", this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
        });
        let calculatedTabSize = "";
        for (let i = 0; i < this.tabSize; i++)
            calculatedTabSize += " "; // Respeita o tab size 4
        this.editorTrueTextarea.style.tabSize = this.tabSize.toString();
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
                    rowEngine(this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
                    return;
                }
            }
        });
    };
}
//# sourceMappingURL=constructor.js.map

// CONSTRUCTOR : 

import { langPreset, LangPresetOption } from "../lang-preset/lang-preset.js";
import { closeOpen } from "../open-close/open-close.js";
import { rowEngine } from "../row-engine/row-engine.js";
import { javascriptTokenTree } from "../token-lang/js-token.js";
import { tokenTreeOption } from "../token-match/token-match.js";

interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize? : number,
    tokenTree? : tokenTreeOption[],
    langPreset? : LangPresetOption,
    width? : string ,
    height? : string 
}

export class Editor {

    private editorBody: HTMLDivElement;
    private editorWritableContainer: HTMLDivElement;
    public editorGutterContainer: HTMLDivElement;
    private editorViewport: HTMLDivElement;
    public editorTrueTextarea: HTMLTextAreaElement;
    public editorRowContainer: HTMLDivElement;

    public container: HTMLDivElement | HTMLBodyElement;
    public tabSize: number;
    public tokenTree : tokenTreeOption[];
    public langPreset : LangPresetOption;
    public width : string;
    public height : string;

    constructor(option: EditorOption) {

        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.tokenTree = option?.tokenTree || javascriptTokenTree;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";

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

        if (this.container instanceof HTMLElement) this.container.appendChild(this.editorBody);
        
        let treeToLoad: tokenTreeOption[];

        if (option.tokenTree) {
            treeToLoad = option.tokenTree;
            this.langPreset = option.langPreset || "javascript";
        } else {
            const selectedPreset = option.langPreset || "javascript";
            this.langPreset = selectedPreset;
            treeToLoad = langPreset(selectedPreset);
        };

        this.editorBody.style.width = "100%";
        this.editorBody.style.height = "100%";

        if(this.width && this.width != "full") this.editorBody.style.width = this.width;
        if(this.height && this.width != "full") this.editorBody.style.height = this.height;
        if(this.width === "full") this.editorBody.style.width = "100%";
        if(this.height === "full") this.editorBody.style.height = "100%";

        this.loadEditor(treeToLoad);

    };

    private loadEditor = (tTree : tokenTreeOption[]): void => {

        this.tokenTree = tTree;

        rowEngine(" ", this.tokenTree, this.editorGutterContainer, this.editorRowContainer);

        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
        });

        let calculatedTabSize = "";

        for (let i = 0; i < this.tabSize; i++) calculatedTabSize += " ";
        
        this.editorTrueTextarea.style.tabSize = this.tabSize.toString();

        this.editorTrueTextarea.addEventListener('keydown', (e: KeyboardEvent) => {
            
            if (closeOpen(e, this)) return;

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
    }
}
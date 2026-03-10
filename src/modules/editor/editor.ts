
// EDITOR : 

import { tokenLoader, LangPresetOption } from "../token-loader/token-loader.js";
import { closeOpen } from "../open-close/open-close.js";
import { rowEngine } from "../row-engine/row-engine.js";
import { themeLoader } from "../theme/theme-loader.js";
import { tokenTreeOption } from "../token-match/token-match.js";

interface EditorOption {
    container: HTMLDivElement | HTMLBodyElement;
    tabSize?: number;
    tokenTree?: tokenTreeOption[];
    langPreset?: LangPresetOption;
    width?: string;
    height?: string;
    themePreset?: themeType;
}

export class Editor {

    private editorBody: HTMLDivElement;
    public editorAutoHeightContainer: HTMLDivElement;

    private editorOverlay : HTMLDivElement;

    public editorTrueTextarea: HTMLTextAreaElement;
    public container: HTMLDivElement | HTMLBodyElement;
    public tabSize: number;
    public tokenTree: tokenTreeOption[];
    public langPreset: LangPresetOption;
    public width: string;
    public height: string;
    public themePreset: themeType;

    constructor(option: EditorOption) {

        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";

        this.tokenTree = option?.tokenTree || tokenLoader("javascript");
        this.themePreset = option?.themePreset || themeLoader("monaco");

        this.editorBody = document.createElement("div");
        this.editorBody.classList.add("editor-container");

        this.editorOverlay = document.createElement("div");
        this.editorOverlay.classList.add("editor-overlay")

        this.editorTrueTextarea = document.createElement("textarea");
        this.editorTrueTextarea.classList.add("editor-true-writable-area");
        this.editorTrueTextarea.spellcheck = false;
        this.editorTrueTextarea.value = "  ";

        this.editorAutoHeightContainer = document.createElement("div");
        this.editorAutoHeightContainer.classList.add("editor-auto-height-container");

        this.editorOverlay.appendChild(this.editorTrueTextarea);

        this.editorBody.appendChild(this.editorAutoHeightContainer);
        this.editorBody.appendChild(this.editorOverlay);

        if (this.container instanceof HTMLElement) this.container.appendChild(this.editorBody);

        let treeToLoad: tokenTreeOption[];

        if (option.tokenTree) {
            treeToLoad = option.tokenTree;
            this.langPreset = option.langPreset || "javascript";
        } else {
            const selectedPreset = option.langPreset || "javascript";
            this.langPreset = selectedPreset;
            treeToLoad = tokenLoader(selectedPreset);
        };

        this.editorBody.style.width = "100%";
        this.editorBody.style.height = "100%";

        if (this.width && this.width != "full") this.editorBody.style.width = this.width;
        if (this.height && this.width != "full") this.editorBody.style.height = this.height;

        if (this.width === "full") this.editorBody.style.width = "100%";
        if (this.height === "full") this.editorBody.style.height = "100%";

        this.loadEditor(treeToLoad);
        this.loadTheme(this.themePreset);
        // this.initScrollBar(); // Ativa a sincronização
    };

    private loadTheme = (theme: themeType): void => {
        this.editorBody.style.background = theme.background;
    };

    // private initScrollBar = (): void => {

    //     const viewport = this.editorViewport;
    //     const gutter = this.editorGutterContainer;
    //     const textarea = this.editorTrueTextarea;

    //     const syncLayout = () => {

    //         const scrollTop = viewport.scrollTop;
    //         const scrollLeft = viewport.scrollLeft;

    //         // move o gutter junto
    //         gutter.style.marginTop = `-${scrollTop}px`;

    //         // sincroniza textarea
    //         textarea.scrollTop = scrollTop;
    //         textarea.scrollLeft = scrollLeft;
    //     };

    //     viewport.addEventListener("scroll", syncLayout, { passive: true });

    // };

    private loadEditor = (tTree: tokenTreeOption[]): void => {
        this.tokenTree = tTree;

        rowEngine(this);

        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this);
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
                    rowEngine(this);
                    return;
                }
            }
        });
    }
}
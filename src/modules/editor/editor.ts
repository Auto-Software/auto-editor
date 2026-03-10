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
    private editorWritableContainer: HTMLDivElement;
    private editorViewport: HTMLDivElement;
    private editorAutoHeightContainer: HTMLDivElement;

    public editorRowContainer: HTMLDivElement;
    public editorTrueTextarea: HTMLTextAreaElement;
    public editorGutterContainer: HTMLDivElement;
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

        this.editorAutoHeightContainer = document.createElement("div");
        this.editorAutoHeightContainer.classList.add("editor-auto-height-container");

        this.editorViewport.appendChild(this.editorAutoHeightContainer);

        this.editorAutoHeightContainer.appendChild(this.editorTrueTextarea);
        this.editorAutoHeightContainer.appendChild(this.editorRowContainer);

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
        this.initScrollBar(); // Ativa a sincronização
    };

    private loadTheme = (theme: themeType): void => {
        this.editorViewport.style.background = theme.background;
        this.editorGutterContainer.style.background = theme.background;
        this.editorBody.style.background = theme.background;
    };

    // SINCRONIZAÇÃO DE SCROLL
    private initScrollBar = (): void => {
    const viewport = this.editorViewport;
    const gutter = this.editorGutterContainer;
    const textarea = this.editorTrueTextarea;

    const syncLayout = () => {
        const { scrollTop, scrollLeft } = viewport;

        // O Gutter acompanha o vertical
        gutter.style.transform = `translateY(${-scrollTop}px)`;

        // Sincroniza a posição do texto invisível no textarea para o cursor bater
        textarea.scrollLeft = scrollLeft;
        textarea.scrollTop = scrollTop;
    };

    viewport.addEventListener('scroll', syncLayout, { passive: true });
    
    // Opcional: Se houver mudança dinâmica, apenas chame o sync
    new ResizeObserver(syncLayout).observe(this.editorRowContainer);
};
    private loadEditor = (tTree: tokenTreeOption[]): void => {
        this.tokenTree = tTree;

        rowEngine(this, " ", this.tokenTree, this.editorGutterContainer, this.editorRowContainer);

        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this, this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
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
                    rowEngine(this, this.editorTrueTextarea.value, this.tokenTree, this.editorGutterContainer, this.editorRowContainer);
                    return;
                }
            }
        });
    }
}
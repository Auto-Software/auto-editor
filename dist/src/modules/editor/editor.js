// EDITOR : 
import { tokenLoader } from "../token-loader/token-loader.js";
import { closeOpen } from "../open-close/open-close.js";
import { rowEngine } from "../row-engine/row-engine.js";
import { themeLoader } from "../theme/theme-loader.js";
export class Editor {
    self;
    editorOverlay;
    editorBody;
    editorAutoHeightContainer;
    editorTrueTextarea;
    container;
    tabSize;
    tokenTree;
    langPreset;
    width;
    height;
    themePreset;
    elements;
    constructor(option) {
        this.container = option?.container;
        this.tabSize = option?.tabSize || 4;
        this.width = option?.width || "100%";
        this.height = option?.height || "100%";
        this.self = this;
        this.elements = [];
        this.tokenTree = option?.tokenTree || tokenLoader("javascript");
        this.themePreset = option?.themePreset || themeLoader("monaco");
        this.editorBody = document.createElement("div");
        this.editorBody.classList.add("editor-container");
        this.editorOverlay = document.createElement("div");
        this.editorOverlay.classList.add("editor-overlay");
        this.editorTrueTextarea = document.createElement("textarea");
        this.editorTrueTextarea.classList.add("editor-true-writable-area");
        this.editorTrueTextarea.spellcheck = false;
        this.editorTrueTextarea.value = "  ";
        this.editorAutoHeightContainer = document.createElement("div");
        this.editorAutoHeightContainer.classList.add("editor-auto-height-container");
        this.editorOverlay.appendChild(this.editorTrueTextarea);
        this.editorBody.appendChild(this.editorAutoHeightContainer);
        this.editorBody.appendChild(this.editorOverlay);
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
        // this.initScrollBar(); // Ativa a sincronização
    }
    ;
    loadTheme = (theme) => {
        this.editorBody.style.background = theme.background;
    };
    loadEditor = (tTree) => {
        this.tokenTree = tTree;
        // 1. Configuração de Scroll: Textarea manda, Container obedece
        this.editorTrueTextarea.style.overflow = "auto";
        this.editorAutoHeightContainer.style.overflow = "hidden";
        // 2. Renderização Inicial
        rowEngine(this.self);
        // 3. SINCRONIZAÇÃO DE SCROLL (Vertical e Horizontal)
        // Direto e instantâneo, sem processamento extra
        this.editorTrueTextarea.onscroll = () => {
            this.editorAutoHeightContainer.scrollTop = this.editorTrueTextarea.scrollTop;
            this.editorAutoHeightContainer.scrollLeft = this.editorTrueTextarea.scrollLeft;
        };
        // 4. Lógica de Input e Tabulação
        const calculatedTabSize = " ".repeat(this.tabSize);
        this.editorTrueTextarea.style.tabSize = this.tabSize.toString();
        this.editorTrueTextarea.addEventListener('input', () => {
            rowEngine(this.self);
        });
        // 5. Atalhos de Teclado (Tab e Enter)
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
                    const newPos = this.editorTrueTextarea.selectionStart - (this.tabSize + 1);
                    this.editorTrueTextarea.setSelectionRange(newPos, newPos);
                    rowEngine(this.self);
                    return;
                }
                ;
            }
            ;
        });
        // 6. Sincronização de Seleção (Destaque de linha ao clicar/mover cursor)
        const updateSelection = () => rowEngine(this.self);
        this.editorTrueTextarea.addEventListener('mousedown', () => {
            window.addEventListener('mousemove', updateSelection);
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', updateSelection);
                updateSelection();
            }, { once: true });
        });
        this.editorTrueTextarea.addEventListener('keyup', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                updateSelection();
            }
        });
    };
}
;
//# sourceMappingURL=editor.js.map
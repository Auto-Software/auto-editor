import { Container } from '../../../node_modules/pixi.js/dist/pixi.js';
import { Editor } from '../editor/editor';
interface EditorRowOption {
    rowNumber: number;
    content: string;
    rowContainer: Container;
    gutterContainer: Container;
    editor: Editor;
    rowHeight: number;
}
export declare class EditorRow {
    rowNumber: number;
    content: string;
    rowHeight: number;
    private editor;
    private rowGroup;
    private gutterGroup;
    private rowBg;
    private gutterBg;
    private gutterLabel;
    private tokensContainer;
    constructor(option: EditorRowOption);
    private updatePosition;
    private drawRow;
    private renderTokens;
    updateContent(newContent: string, newRowNumber?: number): void;
    setHighlight(selected: boolean): void;
    remove(): void;
}
export {};
//# sourceMappingURL=editor-row.d.ts.map
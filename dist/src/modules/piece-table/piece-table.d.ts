export declare class PieceTable {
    private original;
    private add;
    private pieces;
    private lineOffsets;
    constructor(text: string);
    private getBuffer;
    getLineFromIndex(position: number): number;
    private buildLineIndex;
    getText(): string;
    getLineCount(): number;
    getLine(n: number): string;
    getLines(start: number, end: number): string[];
    insert(pos: number, text: string): void;
    delete(pos: number, length: number): void;
}
//# sourceMappingURL=piece-table.d.ts.map
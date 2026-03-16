// PIECE TABLE ( ALGORITHM ) : 
export class PieceTable {
    original;
    add = "";
    pieces = [];
    lineOffsets = [];
    constructor(text) {
        this.original = text;
        this.pieces.push({
            buffer: "original",
            start: 0,
            length: text.length
        });
        this.buildLineIndex();
    }
    getBuffer(buffer) {
        return buffer === "original" ? this.original : this.add;
    }
    getLineFromIndex(position) {
        let low = 0;
        let high = this.lineOffsets.length - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            if (this.lineOffsets[mid] <= position) {
                if (mid === this.lineOffsets.length - 1 || this.lineOffsets[mid + 1] > position) {
                    return mid;
                }
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return 0;
    }
    buildLineIndex() {
        const text = this.getText();
        this.lineOffsets = [0];
        for (let i = 0; i < text.length; i++) {
            if (text[i] === "\n") {
                this.lineOffsets.push(i + 1);
            }
        }
    }
    getText() {
        let result = "";
        for (const p of this.pieces) {
            const buffer = this.getBuffer(p.buffer);
            result += buffer.substr(p.start, p.length);
        }
        return result;
    }
    getLineCount() {
        return this.lineOffsets.length;
    }
    getLine(n) {
        const text = this.getText();
        const start = this.lineOffsets[n];
        const end = this.lineOffsets[n + 1] ?? text.length;
        return text.substring(start, end).replace(/\n$/, "");
    }
    getLines(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(this.getLine(i));
        }
        return result;
    }
    insert(pos, text) {
        const addStart = this.add.length;
        this.add += text;
        this.pieces.push({
            buffer: "add",
            start: addStart,
            length: text.length
        });
        this.buildLineIndex();
    }
    delete(pos, length) {
        const text = this.getText();
        const start = Math.max(0, pos);
        const end = Math.min(text.length, pos + length);
        const newText = text.slice(0, start) + text.slice(end);
        this.original = newText;
        this.add = "";
        this.pieces = [{
                buffer: "original",
                start: 0,
                length: newText.length
            }];
        this.buildLineIndex();
    }
}
//# sourceMappingURL=piece-table.js.map
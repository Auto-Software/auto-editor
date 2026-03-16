
// PIECE TABLE ( ALGORITHM ) : 

type BufferType = "original" | "add";

interface Piece {
	buffer: BufferType;
	start: number;
	length: number;
}

export class PieceTable {

	private original: string;
	private add: string = "";
	private pieces: Piece[] = [];

	private lineOffsets: number[] = [];

	constructor(text: string) {

		this.original = text;

		this.pieces.push({
			buffer: "original",
			start: 0,
			length: text.length
		});

		this.buildLineIndex();
	}

	private getBuffer(buffer: BufferType): string {
		return buffer === "original" ? this.original : this.add;
	}

    public getLineFromIndex(position: number): number {

        let low = 0;
        let high = this.lineOffsets.length - 1;

        while (low <= high) {

            const mid = (low + high) >> 1;

            if (this.lineOffsets[mid] <= position) {

                if (mid === this.lineOffsets.length - 1 || this.lineOffsets[mid + 1] > position) {
                    return mid;
                }

                low = mid + 1;

            } else {
                high = mid - 1;
            }
        }

        return 0;
    }

	private buildLineIndex(): void {

		const text = this.getText();

		this.lineOffsets = [0];

		for (let i = 0; i < text.length; i++) {
			if (text[i] === "\n") {
				this.lineOffsets.push(i + 1);
			}
		}
	}

	public getText(): string {

		let result = "";

		for (const p of this.pieces) {

			const buffer = this.getBuffer(p.buffer);

			result += buffer.substr(p.start, p.length);
		}

		return result;
	}

	public getLineCount(): number {
		return this.lineOffsets.length;
	}

	public getLine(n: number): string {

		const text = this.getText();

		const start = this.lineOffsets[n];
		const end = this.lineOffsets[n + 1] ?? text.length;

		return text.substring(start, end).replace(/\n$/, "");
	}

	public getLines(start: number, end: number): string[] {

		const result: string[] = [];

		for (let i = start; i <= end; i++) {
			result.push(this.getLine(i));
		}

		return result;
	}

	public insert(pos: number, text: string): void {

		const addStart = this.add.length;

		this.add += text;

		this.pieces.push({
			buffer: "add",
			start: addStart,
			length: text.length
		});

		this.buildLineIndex();
	}

	delete(pos: number, length: number): void {

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
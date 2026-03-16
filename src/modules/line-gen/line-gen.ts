// LINE GEN :

import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";
import { PieceTable } from "../piece-table/piece-table.js";

export const lineGen = (editor: Editor): number => {

    const textarea = editor.textarea;
    const pieceTable: PieceTable = editor.pieceTable;

    const lineCount = pieceTable.getLineCount();

    const currentDigits = lineCount.toString().length;
    const charWidth = 9;
    const gutterWidth = Math.max(2, currentDigits) * charWidth + 25;

    textarea.style.width = editor.computedWidth - gutterWidth + "px";

    Editor.tokenList = [];
    Editor.gutterList = [];
    Editor.lineList = [];

    const cursorPosition = textarea.selectionStart;

    let currentLineIndex = pieceTable.getLineFromIndex(cursorPosition);

    const scrollY = textarea.scrollTop;
    const viewHeight = editor.computedHeight;
    const lineHeight = editor.lineHeight;

    const startLine = Math.max(0, Math.floor(scrollY / lineHeight) - 2);
    const endLine = Math.min(lineCount - 1, Math.ceil((scrollY + viewHeight) / lineHeight) + 2);

    const lines = pieceTable.getLines(startLine, endLine);

    let lineIndex = startLine;

    for (const lineText of lines) {

        Line.lineY = lineIndex * lineHeight;

        const line = new Line({
            context: editor.context,
            editor: editor,
            gutterWidth: gutterWidth,
            number: lineIndex,
            content: lineText
        });

        if (lineIndex === currentLineIndex) {
            line.selected();
        } else {
            line.unselected();
        }

        line.updateScroll(scrollY);
        Editor.lineList.push(line);

        lineIndex++;
    }

    return lineCount;
};
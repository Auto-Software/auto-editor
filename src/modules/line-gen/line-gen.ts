
// LINE GEN : 

import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";

export const lineGen = (editor: Editor): number => {

    const textarea = editor.textarea;
    const lines = editor.lineCache;

    const currentDigits = lines.length.toString().length;
    const charWidth = 9; 
    const gutterWidth = Math.max(2, currentDigits) * charWidth + 25;

    textarea.style.paddingLeft = gutterWidth + 2 + "px";

    Editor.tokenList = [];
    Editor.gutterList = [];
    Editor.lineList = [];

    const cursorPosition = textarea.selectionStart;
    let currentLineIndex = 0;
    
    for (let i = 0; i < cursorPosition; i++) {
        if (textarea.value[i] === '\n')  currentLineIndex++;
    };

    const scrollY = textarea.scrollTop;
    const viewHeight = editor.computedHeight;
    const lineHeight = editor.lineHeight;

    const startLine = Math.max(0, Math.floor(scrollY / lineHeight) - 2);
    const endLine = Math.min(lines.length - 1, Math.ceil((scrollY + viewHeight) / lineHeight) + 2);

    for (let i = startLine; i <= endLine; i++) {

        const lineText = lines[i];
        
        Line.lineY = i * lineHeight;

        const line = new Line({
            context : editor.context,
            editor : editor,
            gutterWidth : gutterWidth,
            number : i,
            content : lineText
        });

        if (i === currentLineIndex) {
            line.selected(); 
        } else {
            line.unselected();
        }

        line.updateScroll(scrollY);
        Editor.lineList.push(line);
    }

    return lines.length;
};
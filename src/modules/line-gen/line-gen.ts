
// LINE GEN : 

import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";

export const lineGen = (editor: Editor): number => {
    const textarea = editor.textarea;
    
    // USAMOS O CACHE EM VEZ DE DAR SPLIT
    const lines = editor.lineCache; 

    const currentDigits = lines.length.toString().length;
    const charWidth = 9; 
    const gutterWidth = Math.max(2, currentDigits) * charWidth + 25;
    textarea.style.paddingLeft = gutterWidth + 2 + "px";

    Editor.tokenList = [];
    Editor.gutterList = [];
    Editor.lineList = [];

    // Otimização: Não dê split no texto todo para achar o cursor
    // Vamos usar uma lógica mais leve depois, mas por hora o foco é o split principal
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const currentLineIndex = textBeforeCursor.split('\n').length - 1;

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
            font : editor.font,
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

// LINE GEN : 

import { Editor } from "../editor/editor.js";
import { Line } from "../line/line.js";

export const lineGen = (editor: Editor): number => {

    const textarea = editor.textarea;
    
    const lines = textarea.value.split('\n');

    const currentDigits = lines.length.toString().length;
    const charWidth = 9;
    const gutterWidth = Math.max(2, currentDigits) * charWidth + 25;

    textarea.style.paddingLeft = gutterWidth + 2 + "px";

    Line.lineY = 0;

    Editor.tokenList = [];
    Editor.gutterList = [];

    lines.forEach((lineText, index) => { 
        
        const line : Line = new Line({
            context : editor.context,
            editor : editor,
            font : editor.font,
            gutterWidth : gutterWidth,
            number : index,
            content : lineText
        });

    });

    return lines.length;
};

// auto software - auto editor - (c) 2026 
// under MIT lincese 

// ROW ENGINE : 

import { tokenMatch, tokenTreeOption } from "../token-match/token-match.js";

const escapeHTML = (text: string): string => {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

export const rowEngine = (text: string,tokenTree: tokenTreeOption[],  gutterCon : HTMLDivElement, rowCon : HTMLDivElement ): number => {
    
    const lines = text.split('\n');

    gutterCon.innerHTML = "";
    rowCon.innerHTML = "";

    lines.forEach((lineText, index) => {

        const gutterContainer = document.createElement('div');
        gutterContainer.className = 'gutter';
        const gutterLabel = document.createElement('span');

        gutterLabel.className = 'gutter-label';
        gutterLabel.textContent = (index + 1).toString().padStart(2, '0');

        gutterContainer.appendChild(gutterLabel);

        gutterCon.appendChild(gutterContainer);

        const editorRow = document.createElement('div');
        editorRow.className = 'editor-row';

        if (lineText.length === 0) {
            editorRow.innerHTML = '&nbsp;';
        } else {
            const safeText = escapeHTML(lineText);
            editorRow.innerHTML = tokenMatch(tokenTree, safeText);
        }

        rowCon.appendChild(editorRow);
    });

    return lines.length;
};
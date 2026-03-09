// auto software - auto editor - (c) 2026 
// under MIT license 
import { tokenMatch } from "../token-match/token-match.js";
export const rowEngine = (text, tokenTree, gutterCon, rowCon) => {
    const lines = text.split('\n');
    gutterCon.innerHTML = "";
    rowCon.innerHTML = "";
    lines.forEach((lineText, index) => {
        const gutterContainer = document.createElement('div');
        gutterContainer.className = 'gutter';
        const gutterLabel = document.createElement('span');
        gutterLabel.className = 'gutter-label';
        // Mantendo seu padStart(2, '0') da base original
        gutterLabel.textContent = (index + 1).toString().padStart(2, '0');
        gutterContainer.appendChild(gutterLabel);
        gutterCon.appendChild(gutterContainer);
        const editorRow = document.createElement('div');
        editorRow.className = 'editor-row';
        if (lineText.length === 0) {
            editorRow.innerHTML = '&nbsp;';
        }
        else {
            // REMOVIDO: escapeHTML e innerHTML que causavam o erro do < >
            // Agora pegamos o array de partes (TokenPart)
            const parts = tokenMatch(tokenTree, lineText);
            parts.forEach(part => {
                if (part.isToken) {
                    const span = document.createElement('span');
                    span.className = 'token';
                    span.style.color = part.color || 'inherit';
                    // O SEGREDO: textContent faz o navegador desenhar < ou > puro
                    // sem precisar converter para string HTML
                    span.textContent = part.text;
                    editorRow.appendChild(span);
                }
                else {
                    // Texto plano vira um TextNode puro, ignorando tags HTML
                    editorRow.appendChild(document.createTextNode(part.text));
                }
            });
        }
        rowCon.appendChild(editorRow);
    });
    return lines.length;
};
//# sourceMappingURL=row-engine.js.map
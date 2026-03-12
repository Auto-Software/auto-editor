import { matchBracket } from "../match-bracket/match-bracket.js";
import { tokenMatch } from "../token-match/token-match.js";
const getLineFromPos = (text, pos) => text.substring(0, pos).split('\n').length;
export const rowEngine = (editor) => {
    const textarea = editor.editorTrueTextarea;
    const lines = textarea.value.split('\n');
    const currentDigits = lines.length.toString().length;
    const maxDigits = Math.max(2, currentDigits);
    const charWidth = 9;
    const gutterWidthPx = (maxDigits * charWidth) + 25;
    const finalPaddingLeft = gutterWidthPx + 5;
    // Sincronização de Padding (Melhorada para o seu Scroll H)
    const scrollLeft = textarea.scrollLeft;
    textarea.style.paddingLeft = `${finalPaddingLeft + scrollLeft}px`;
    // 1. Uso de DocumentFragment para evitar Reflows excessivos
    const fragment = document.createDocumentFragment();
    const lineElements = [];
    let globalCharIndex = 0;
    lines.forEach((lineText, index) => {
        const editorSuperRow = document.createElement("div");
        editorSuperRow.className = "editor-super-row";
        editorSuperRow.style.cssText = "width: max-content; min-width: 100%; display: flex;";
        // Gutter (Número da linha)
        const editorGutter = document.createElement('div');
        editorGutter.className = "gutter";
        editorGutter.style.cssText = `background: ${editor.themePreset.gutterBackground}; width: ${gutterWidthPx}px; flex-shrink: 0; position: sticky; left: 0px; z-index: 10;`;
        const editorGutterNumber = document.createElement('span');
        editorGutterNumber.className = "gutter-label";
        editorGutterNumber.style.color = editor.themePreset.gutterColor;
        editorGutterNumber.textContent = (index + 1).toString().padStart(maxDigits, '0');
        editorGutter.appendChild(editorGutterNumber);
        editorSuperRow.appendChild(editorGutter);
        // Área do Código (Row)
        const editorRow = document.createElement('div');
        editorRow.className = 'editor-row';
        editorRow.style.flexGrow = "1";
        if (lineText.length === 0) {
            editorRow.innerHTML = '&nbsp;';
        }
        else {
            // Tokenização
            const parts = tokenMatch(editor.tokenTree, lineText);
            const rowFragment = document.createDocumentFragment();
            parts.forEach(part => {
                if (part.text.match(/[()\[\]{}]/)) {
                    for (let char of part.text) {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.setAttribute('data-char-idx', globalCharIndex.toString());
                        if (part.isToken)
                            span.style.color = part.color || 'inherit';
                        rowFragment.appendChild(span);
                        globalCharIndex++;
                    }
                }
                else {
                    const node = document.createElement('span');
                    node.textContent = part.text;
                    node.setAttribute('data-char-idx-start', globalCharIndex.toString());
                    if (part.isToken)
                        node.style.color = part.color || 'inherit';
                    rowFragment.appendChild(node);
                    globalCharIndex += part.text.length;
                }
            });
            editorRow.appendChild(rowFragment);
        }
        globalCharIndex++; // \n
        editorSuperRow.appendChild(editorRow);
        fragment.appendChild(editorSuperRow);
        lineElements.push({
            gutter: editorGutter,
            number: editorGutterNumber,
            row: editorRow,
            superRow: editorSuperRow,
            index
        });
    });
    // Atualiza o DOM uma única vez
    editor.editorAutoHeightContainer.innerHTML = "";
    editor.editorAutoHeightContainer.appendChild(fragment);
    editor.elements = lineElements;
    // ... lógica de applyHighlight simplificada ...
    applyHighlight(editor, textarea, lineElements);
    return lines.length;
};
// Separar o Highlight do Processamento de Linhas para economia de CPU
const applyHighlight = (editor, textarea, lineElements) => {
    const val = textarea.value;
    const startLine = getLineFromPos(val, textarea.selectionStart);
    const endLine = getLineFromPos(val, textarea.selectionEnd);
    const cursorPos = textarea.selectionStart;
    requestAnimationFrame(() => {
        // 1. Bracket Match (Lógica otimizada)
        const containers = editor.editorAutoHeightContainer;
        containers.querySelectorAll('.bracket-match').forEach((el) => el.classList.remove('bracket-match'));
        [cursorPos, cursorPos - 1].forEach(pos => {
            const matchIdx = matchBracket(val, pos);
            if (matchIdx !== null) {
                containers.querySelector(`[data-char-idx="${pos}"]`)?.classList.add('bracket-match');
                containers.querySelector(`[data-char-idx="${matchIdx}"]`)?.classList.add('bracket-match');
            }
        });
        // 2. Destaque de Linha (Loop eficiente)
        const isMultiple = startLine !== endLine;
        const theme = editor.themePreset;
        for (const item of lineElements) {
            const lineNum = item.index + 1;
            const isSelected = lineNum >= startLine && lineNum <= endLine;
            if (isSelected) {
                item.gutter.style.background = theme.gutterBackgroundSelected;
                item.row.style.background = theme.rowBackgroundSelected;
                item.row.style.borderTopColor = (lineNum === startLine) ? theme.rowBorderSelected : "transparent";
                item.row.style.borderBottomColor = (lineNum === endLine) ? theme.rowBorderSelected : "transparent";
            }
            else {
                item.gutter.style.background = theme.gutterBackground;
                item.row.style.background = "transparent";
                item.row.style.borderTopColor = "transparent";
                item.row.style.borderBottomColor = "transparent";
            }
        }
    });
};
//# sourceMappingURL=row-engine.js.map
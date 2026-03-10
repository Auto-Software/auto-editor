// auto software - auto editor - (c) 2026 
// under MIT license 

import { Editor } from "../editor/editor.js";
import { tokenMatch, TokenPart, tokenTreeOption } from "../token-match/token-match.js";

const getLineFromPos = (text: string, pos: number): number => {
    return text.substring(0, pos).split('\n').length;
};

export const rowEngine = (editor: Editor, text: string, tokenTree: tokenTreeOption[], gutterCon: HTMLDivElement, rowCon: HTMLDivElement): number => {
    
    const lines = text.split('\n');
    
    gutterCon.innerHTML = "";
    rowCon.innerHTML = "";

    const lineElements: any[] = [];

    lines.forEach((lineText, index) => {

        const gutterContainer = document.createElement('div');
        gutterContainer.className = 'gutter';
        gutterContainer.style.background = editor.themePreset.gutterBackground;

        const gutterLabel = document.createElement('span');
        gutterLabel.className = 'gutter-label';
        gutterLabel.style.color = editor.themePreset.gutterColor;
        gutterLabel.textContent = (index + 1).toString().padStart(2, '0');

        gutterContainer.appendChild(gutterLabel);
        gutterCon.appendChild(gutterContainer);

        const editorRow = document.createElement('div');
        editorRow.className = 'editor-row';
        
        lineElements.push({ 
            gutter: gutterContainer,
            number: gutterLabel,
            row : editorRow,
            index: index
        });

        if (lineText.length === 0) {
            editorRow.innerHTML = '&nbsp;';
        } else {

            const parts: TokenPart[] = tokenMatch(tokenTree, lineText);

            parts.forEach(part => {
                if (part.isToken) {
                    const span = document.createElement('span');
                    span.className = 'token'; 
                    span.style.color = part.color || 'inherit';
                    span.textContent = part.text; 
                    editorRow.appendChild(span);
                } else {
                    editorRow.appendChild(document.createTextNode(part.text));
                }
            });
        }
        rowCon.appendChild(editorRow);
    });

    const applyHighlight = () => {

        const textArea = editor.editorTrueTextarea;
        const val = textArea.value;
        const startLine = getLineFromPos(val, textArea.selectionStart);
        const endLine = getLineFromPos(val, textArea.selectionEnd);

        requestAnimationFrame(() => {
            const isActuallyMultiple = startLine !== endLine;

            lineElements.forEach((selectedRow) => {
                
                const lineNum = selectedRow.index + 1;
                const isSelected = lineNum >= startLine && lineNum <= endLine;

                const selectedColor = editor.themePreset.rowBorderSelected;
                const transparent = "transparent";

                if (isSelected) {
                    selectedRow.gutter.style.background = editor.themePreset.gutterBackgroundSelected;
                    selectedRow.number.style.color = editor.themePreset.gutterColorSelected;
                    selectedRow.row.style.background = editor.themePreset.rowBackgroundSelected;

                    const isFirst = lineNum === startLine;
                    const isLast = lineNum === endLine;

                    if (!isActuallyMultiple) {
                        selectedRow.row.style.borderTopColor = selectedColor;
                        selectedRow.row.style.borderBottomColor = selectedColor;
                    } else {
                        selectedRow.row.style.borderTopColor = isFirst ? selectedColor : transparent;
                        selectedRow.row.style.borderBottomColor = isLast ? selectedColor : transparent;
                    }
                    
                } else {
                    selectedRow.gutter.style.background = editor.themePreset.gutterBackground;
                    selectedRow.number.style.color = editor.themePreset.gutterColor;
                    selectedRow.row.style.background = transparent;
                    selectedRow.row.style.borderTopColor = transparent;
                    selectedRow.row.style.borderBottomColor = transparent;
                }
            });
        });
    };
    
    editor.editorTrueTextarea.onmousedown = () => {

        const onMove = () => applyHighlight();
        
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', onMove);
            setTimeout(applyHighlight, 0); 
        }, { once: true });

        setTimeout(applyHighlight, 1);
    };

    editor.editorTrueTextarea.onkeydown = (e) => {
        const navKeys = [
            "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", 
            "Home", "End", "PageUp", "PageDown", "a"
        ];
        
        if (navKeys.includes(e.key) || e.ctrlKey) {
            setTimeout(applyHighlight, 0);
        }
    };

    editor.editorTrueTextarea.oninput = () => {
        applyHighlight();
    };

    applyHighlight();

    return lines.length;
};
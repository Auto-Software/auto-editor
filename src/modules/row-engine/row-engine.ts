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
            lineElements.forEach((el) => {
                const lineNum = el.index + 1;
                const isSelected = lineNum >= startLine && lineNum <= endLine;
                
                const targetBg = isSelected ? editor.themePreset.gutterBackgroundSelected : editor.themePreset.gutterBackground;
                const targetColor = isSelected ? editor.themePreset.gutterColorSelected : editor.themePreset.gutterColor;

                if (el.gutter.style.background !== targetBg) {
                    el.gutter.style.background = targetBg;
                }
                if (el.number.style.color !== targetColor) {
                    el.number.style.color = targetColor;
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
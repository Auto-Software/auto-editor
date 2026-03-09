// OPEN CLOSE : 
import { rowEngine } from "../row-engine/row-engine.js";
const pairs = {
    '(': ')',
    '{': '}',
    '[': ']',
    '"': '"',
    "'": "'",
    '`': '`'
};
const closeChars = new Set(Object.values(pairs));
export const closeOpen = (e, editor) => {
    const cursor = editor.editorTrueTextarea.selectionStart;
    const text = editor.editorTrueTextarea.value;
    const charAhead = text[cursor];
    if (closeChars.has(e.key) && e.key === charAhead) {
        e.preventDefault();
        editor.editorTrueTextarea.setSelectionRange(cursor + 1, cursor + 1);
        return true;
    }
    if (pairs[e.key]) {
        e.preventDefault();
        const openChar = e.key;
        const closeChar = pairs[e.key];
        document.execCommand('insertText', false, openChar + closeChar);
        const selectionPos = editor.editorTrueTextarea.selectionStart;
        editor.editorTrueTextarea.setSelectionRange(selectionPos - 1, selectionPos - 1);
        rowEngine(editor.editorTrueTextarea.value, editor.tokenTree, editor.editorGutterContainer, editor.editorRowContainer);
        return true;
    }
    return false;
};
//# sourceMappingURL=open-close.js.map
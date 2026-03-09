export const getCursorLine = (el) => {
    const cursorPos = el.selectionStart;
    const textBeforeCursor = el.value.substring(0, cursorPos);
    return textBeforeCursor.split('\n').length;
};
//# sourceMappingURL=get-editor-line.js.map
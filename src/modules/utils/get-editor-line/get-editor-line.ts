


export const getCursorLine = (el: HTMLTextAreaElement): number => {
    const cursorPos = el.selectionStart;
    const textBeforeCursor = el.value.substring(0, cursorPos);
    return textBeforeCursor.split('\n').length;
};
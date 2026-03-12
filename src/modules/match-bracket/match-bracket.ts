



// MATCH BRACKET : 

export const matchBracket = (text: string, index: number): number | null => {
    
    const brackets: Record<string, string> = { '(': ')', '[': ']', '{': '}', ')': '(', ']': '[', '}': '{' };
    const target = text[index];
    const closing = brackets[target];
    if (!closing) return null;

    const isForward = ['(', '[', '{'].includes(target);
    const step = isForward ? 1 : -1;
    let depth = 0;

    for (let i = index; i >= 0 && i < text.length; i += step) {
        if (text[i] === target) depth++;
        else if (text[i] === closing) depth--;

        if (depth === 0) return i;
    }
    return null;
};
// auto software - auto editor - (c) 2026 
// under MIT lincese 
export const tokenMatch = (tokenTree, text) => {
    let parts = [{ text: text, isToken: false }];
    tokenTree.forEach(item => {
        let newParts = [];
        let regex;
        if (item.token instanceof RegExp) {
            regex = new RegExp(item.token.source, item.token.flags.includes('g') ? item.token.flags : item.token.flags + 'g');
        }
        else {
            const tokens = Array.isArray(item.token) ? item.token : [item.token];
            const escaped = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            regex = new RegExp(`(${escaped})`, 'g'); // Sem \b para pegar símbolos
        }
        parts.forEach(part => {
            if (part.isToken) {
                newParts.push(part);
                return;
            }
            let lastIndex = 0;
            let m;
            while ((m = regex.exec(part.text)) !== null) {
                if (m.index > lastIndex) {
                    newParts.push({ text: part.text.substring(lastIndex, m.index), isToken: false });
                }
                newParts.push({ text: m[0], isToken: true, color: item.color });
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < part.text.length) {
                newParts.push({ text: part.text.substring(lastIndex), isToken: false });
            }
        });
        parts = newParts;
    });
    return parts; // Retorna o objeto puro, como o CodeMirror faz internamente
};
//# sourceMappingURL=token-match.js.map
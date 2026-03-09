// auto software - auto editor - (c) 2026 
// under MIT license 
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
            regex = new RegExp(`(${escaped})`, 'g');
        }
        parts.forEach(part => {
            if (part.isToken) {
                newParts.push(part);
                return;
            }
            let lastIndex = 0;
            let m;
            while ((m = regex.exec(part.text)) !== null) {
                const matchText = m[0];
                const matchIndex = m.index;
                // 1. role="own": Linha toda
                if (item.role === "own") {
                    newParts = [{ text: part.text, isToken: true, color: item.color }];
                    lastIndex = part.text.length;
                    break;
                }
                // 2. role="ownleft": Tudo à esquerda
                if (item.role === "ownleft") {
                    newParts = [{ text: part.text.substring(0, regex.lastIndex), isToken: true, color: item.color }];
                    lastIndex = regex.lastIndex;
                    if (lastIndex < part.text.length) {
                        newParts.push({ text: part.text.substring(lastIndex), isToken: false });
                    }
                    lastIndex = part.text.length;
                    break;
                }
                // 3. role="ownright": Tudo à direita
                if (item.role === "ownright") {
                    if (matchIndex > lastIndex) {
                        newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                    }
                    newParts.push({ text: part.text.substring(matchIndex), isToken: true, color: item.color });
                    lastIndex = part.text.length;
                    break;
                }
                // 4. role="ownscope": Colore o conteúdo capturado (ex: entre aspas ou chaves)
                if (item.role === "ownscope") {
                    if (matchIndex > lastIndex) {
                        newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                    }
                    // Se houver grupo de captura m[1], usamos ele, senão o m[0]
                    const scopeText = m[1] !== undefined ? m[1] : matchText;
                    newParts.push({
                        text: item.replace || scopeText,
                        isToken: true,
                        color: item.color
                    });
                    lastIndex = regex.lastIndex;
                    continue;
                }
                // Padrão (Sem role ou role não identificado)
                if (matchIndex > lastIndex) {
                    newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                }
                newParts.push({
                    text: item.replace || matchText,
                    isToken: true,
                    color: item.color
                });
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < part.text.length) {
                newParts.push({ text: part.text.substring(lastIndex), isToken: false });
            }
        });
        parts = newParts;
    });
    return parts;
};
//# sourceMappingURL=token-match.js.map
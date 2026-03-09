
// auto software - auto editor - (c) 2026 
// under MIT lincese 

// TOKEN MATCH :

export interface tokenTreeOption {
    token: (string[] | string | RegExp);
    color: string; 
}

export const tokenMatch = (tokenTree: tokenTreeOption[], text: string): string => {
    
    let safeText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    let matches: { start: number; end: number; color: string; text: string }[] = [];

    tokenTree.forEach(item => {

        let regex: RegExp;

        if (item.token instanceof RegExp) {
            regex = new RegExp(item.token.source, item.token.flags.includes('g') ? item.token.flags : item.token.flags + 'g');
        } else {
            const tokens = Array.isArray(item.token) ? item.token : [item.token];
            const escaped = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            regex = new RegExp(`\\b(${escaped})\\b`, 'g');
        }

        let m;

        while ((m = regex.exec(safeText)) !== null) {
            matches.push({
                start: m.index,
                end: m.index + m[0].length,
                color: item.color,
                text: m[0]
            });
        }
    });

    matches.sort((a, b) => {
        if (a.start !== b.start) return a.start - b.start;
        return b.end - a.end;
    });

    let result = "";
    let lastIndex = 0;

    for (const match of matches) {
        if (match.start < lastIndex) continue; 

        result += safeText.slice(lastIndex, match.start);
        
        result += `<span class="token" style="color: ${match.color}">${match.text}</span>`;
        
        lastIndex = match.end;
    }
    result += safeText.slice(lastIndex);

    return result;
};

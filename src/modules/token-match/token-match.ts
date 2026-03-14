
// TOKEN MATCH : 

import { TokenPart, tokenTreeOption } from "../typescript/interface/interface.js";

export const tokenMatch = (tokenTree: tokenTreeOption[], text: string): TokenPart[] => {

    let parts: TokenPart[] = [{ text: text, isToken: false }];

    tokenTree.forEach(item => {

        let newParts: TokenPart[] = [];
        let regex: RegExp;
        
        if (item.token instanceof RegExp) {
            regex = new RegExp(item.token.source, item.token.flags.includes('g') ? item.token.flags : item.token.flags + 'g');
        } else {
            const tokens = Array.isArray(item.token) ? item.token : [item.token];
            const escaped = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            regex = new RegExp(`(${escaped})`, 'g');
        };

        parts.forEach(part => {

            if (part.isToken) {
                newParts.push(part);
                return;
            };

            let lastIndex = 0;

            let m;

            while ((m = regex.exec(part.text)) !== null) {

                const matchText = m[0];
                const matchIndex = m.index;

                if (item.role === "own") {
                    newParts = [{ text: part.text, isToken: true, color: item.color }];
                    lastIndex = part.text.length;
                    break;
                }

                if (item.role === "ownleft") {
                    newParts = [{ text: part.text.substring(0, regex.lastIndex), isToken: true, color: item.color }];
                    lastIndex = regex.lastIndex;
                    if (lastIndex < part.text.length) {
                        newParts.push({ text: part.text.substring(lastIndex), isToken: false });
                    }
                    lastIndex = part.text.length;
                    break;
                }

                if (item.role === "ownright") {
                    if (matchIndex > lastIndex) {
                        newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                    }
                    newParts.push({ text: part.text.substring(matchIndex), isToken: true, color: item.color });
                    lastIndex = part.text.length;
                    break;
                }

                if (item.role === "ownscope") {
                    if (matchIndex > lastIndex) {
                        newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                    }
                    
                    const scopeText = m[1] !== undefined ? m[1] : matchText;
                    
                    newParts.push({ 
                        text: item.replace || scopeText, 
                        isToken: true, 
                        color: item.color 
                    });
                    
                    lastIndex = regex.lastIndex;
                    continue; 
                }

                if (matchIndex > lastIndex) newParts.push({ text: part.text.substring(lastIndex, matchIndex), isToken: false });
                
                newParts.push({ 
                    text: item.replace || matchText,
                    isToken: true, 
                    color: item.color 
                });

                lastIndex = regex.lastIndex;
            };

            if (lastIndex < part.text.length) newParts.push({ text: part.text.substring(lastIndex), isToken: false });
            
        });

        parts = newParts;

    });

    return parts;
};
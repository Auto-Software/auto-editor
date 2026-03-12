// auto software - auto editor - (c) 2026 
// under MIT license 

import { Editor } from "../editor/editor.js";

interface chunckResponse { 
    full: string;   
    chunk: string;  
}

export const textChunk = (editor: Editor, text: string): chunckResponse => {
    const lines = text.split('\n');
    const rowHeight = 21; 
    const scrollTop = editor.editorBody.scrollTop;
    const viewportHeight = editor.editorBody.clientHeight;

    // Calculamos o range visível com um buffer para evitar "piscadas"
    const buffer = 20; 
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    const endIndex = Math.min(lines.length - 1, Math.ceil((scrollTop + viewportHeight) / rowHeight) + buffer);

    const chunkedLines = lines.map((line, index) => {
        // Se estiver fora do range, vira espaço vazio.
        // Isso mantém o índice da linha correto no loop do rowEngine.
        return (index >= startIndex && index <= endIndex) ? line : "";
    });

    return {
        full: text,
        chunk: chunkedLines.join('\n')
    };
};

// JAVASCRIPT LANG TOKEN TREE : 

import { tokenTreeOption } from "../token-match/token-match.js";

export const javascriptTokenTree: tokenTreeOption[] = [
    { token: /\/\/.*|\/\*[\s\S]*?\*\//g, color: "#75715e" },
    { token: /"(.*?)"|'(.*?)'|`(.*?)`/g, color: "#e6db74" },
    { 
        token: /\b(if|else|return|const|let|var|function|class|export|import|from|async|await|try|catch|new|this|throw)\b/g, 
        color: "#f92672" 
    },
    { token: /\b(true|false|null|undefined)\b/g, color: "#ae81ff" },
    { token: /\b\d+(\.\d+)?\b/g, color: "#ae81ff" },
    { token: /\.\w+/g, color: "#a6e22e" },
    { token: ["[", "]", "{", "}", "(", ")"], color: "#f8f8f2" },
    { token: /[+\-*/%=!<>|&^~?:]+/g, color: "#f92672" }
];
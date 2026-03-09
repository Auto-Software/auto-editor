
// JAVASCRIPT LANG TOKEN TREE : 

import { tokenTreeOption } from "../../token-match/token-match.js";

export const javascriptTokenTree: tokenTreeOption[] = [
    { token: "//", color: "#75715e", role: "ownright" },
    { token: /\/\*[\s\S]*?\*\//g, color: "#75715e" },
    { token: /"(.*?)"|'(.*?)'|`(.*?)`/g, color: "#e6db74" },
    { 
        token: /\b(if|else|return|try|catch|throw|break|continue|switch|case|default|do|while|for|async|await)\b/g, 
        color: "#f92672" 
    },
    { 
        token: /\b(const|let|var|function|class|export|import|from|new|this|extends|static|get|set)\b/g, 
        color: "#66d9ef" 
    },
    { token: "=>", color: "#66d9ef", replace: "⇒" },
    { token: /\b(true|false|null|undefined)\b/g, color: "#ae81ff" },
    { token: /\b\d+(\.\d+)?\b/g, color: "#ae81ff" , role: "ownscope"},
    { token: /\.\w+/g, color: "#a6e22e" },
    { token: ["[", "]", "{", "}", "(", ")"], color: "#f8f8f2" },
    { token: /[+\-*/%=!<>|&^~?:]+/g, color: "#fd971f", }
];
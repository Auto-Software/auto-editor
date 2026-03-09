
// RUST LANG TOKEN TREE : 

import { tokenTreeOption } from "../../token-match/token-match.js";

export const rustTokenTree: tokenTreeOption[] = [
    { token: /\/\/.*|\/\*[\s\S]*?\*\//g, color: "#75715e" },
    { token: /b?"(\\.|[^\\"])*"|b?'.*?'|r(#*)"(.|\n)*?"\2/g, color: "#e6db74" },
    { 
        token: /\b(fn|let|mut|match|if|else|return|impl|trait|struct|enum|type|use|mod|pub|crate|async|await|loop|while|for|in|as|where|dyn|move|unsafe)\b/g, 
        color: "#f92672" 
    },
    { token: /\b\w+!\b/g, color: "#a6e22e" },
    { token: /\b(i8|i16|i32|i64|i128|isize|u8|u16|u32|u64|u128|usize|f32|f64|str|String|Vec|Option|Result|bool|char)\b/g, color: "#66d9ef" },
    { token: /\b(true|false|Some|None|Ok|Err)\b|\b\d+(\.\d+)?([u|i]\d+)?\b/g, color: "#ae81ff" },
    { token: /'\w+\b/g, color: "#fd971f" },
    { token: /#!?\[.*\]/g, color: "#bdc3c7" },
    { token: ["[", "]", "{", "}", "(", ")"], color: "#f8f8f2" },
    { token: /([+\-*/%=!<>|&^~?:]+|->|=>|::)/g, color: "#f92672" }
];

// GML ( GAME MAKER LANGUAGE ) TOKEN TREE : 

import { tokenTreeOption } from "../../token-match/token-match.js";

export const gmlTokenTree: tokenTreeOption[] = [
    { token: /\/\/.*|\/\*[\s\S]*?\*\//g, color: "#75715e" },
    { token: /"(.*?)"|'(.*?)'/g, color: "#e6db74" },
    { 
        token: /\b(if|else|switch|case|default|break|continue|return|for|while|do|until|repeat|with|var|globalvar|enum|function|exit|new|delete|try|catch|finally|throw)\b/g, 
        color: "#f92672" 
    },
    { token: /\b\w+_\w+\b(?=\()/g, color: "#a6e22e" },
    { token: /\b(x|y|z|id|visible|solid|persistent|depth|layer|alarm|direction|speed|hspeed|vspeed|gravity|friction|image_index|image_speed|image_alpha|image_angle|sprite_index|mask_index)\b/g, color: "#66d9ef" },
    { token: /\b(true|false|noone|all|self|other|global)\b|\b\d+(\.\d+)?\b|\$[0-9a-fA-F]+/g, color: "#ae81ff" },
    { token: /\b(vk_\w+|c_\w+|ev_\w+|fa_\w+)\b/g, color: "#fd971f" },
    { token: ["[", "]", "{", "}", "(", ")"], color: "#f8f8f2" },
    { token: /([+\-*/%=!<>|&^~?:]+|&&|\|\||!=|\b(and|or|not|xor)\b)/g, color: "#f92672" }
];
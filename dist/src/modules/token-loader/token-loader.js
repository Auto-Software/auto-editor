// LANG PRESET : 
import { gmlTokenTree } from "./editor-token/gml-token.js";
import { javascriptTokenTree } from "./editor-token/js-token.js";
import { rustTokenTree } from "./editor-token/rust-token.js";
export const tokenLoader = (preset) => {
    if (Array.isArray(preset))
        return preset;
    switch (preset) {
        case "javascript":
            return javascriptTokenTree;
        case "rust":
            return rustTokenTree;
        case "gml":
            return gmlTokenTree;
        default:
            return javascriptTokenTree;
    }
};
//# sourceMappingURL=token-loader.js.map
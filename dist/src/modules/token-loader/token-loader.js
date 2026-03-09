// LANG PRESET : 
import { gmlTokenTree } from "./editor-token/gml-token.js";
import { javascriptTokenTree } from "./editor-token/js-token.js";
import { rustTokenTree } from "./editor-token/rust-token.js";
export const tokenLoader = (preset) => {
    if (preset === "javascript")
        return javascriptTokenTree;
    if (preset === "rust")
        return rustTokenTree;
    if (preset === "gml")
        return gmlTokenTree;
    return javascriptTokenTree;
};
//# sourceMappingURL=token-loader.js.map
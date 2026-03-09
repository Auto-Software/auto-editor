// LANG PRESET : 
import { gmlTokenTree } from "../token-lang/gml-token.js";
import { javascriptTokenTree } from "../token-lang/js-token.js";
import { rustTokenTree } from "../token-lang/rust-token.js";
export const langPreset = (preset) => {
    if (preset === "javascript")
        return javascriptTokenTree;
    if (preset === "rust")
        return rustTokenTree;
    if (preset === "gml")
        return gmlTokenTree;
    return javascriptTokenTree;
};
//# sourceMappingURL=lang-preset.js.map
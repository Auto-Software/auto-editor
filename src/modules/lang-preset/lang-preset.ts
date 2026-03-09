
// LANG PRESET : 

import { gmlTokenTree } from "../token-lang/gml-token.js";
import { javascriptTokenTree } from "../token-lang/js-token.js";
import { rustTokenTree } from "../token-lang/rust-token.js";
import { tokenTreeOption } from "../token-match/token-match.js";

export type LangPresetOption = "javascript" | "golang" | "cplusplus" | "csharp" | "rust" | "gml";

export const langPreset = (preset : LangPresetOption): tokenTreeOption[] => {

    if(preset === "javascript") return javascriptTokenTree;
    if(preset === "rust") return rustTokenTree;
    if(preset === "gml") return gmlTokenTree;

    return javascriptTokenTree;

}
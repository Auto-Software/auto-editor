
// LANG PRESET : 

import { gmlTokenTree } from "./editor-token/gml-token.js";
import { javascriptTokenTree } from "./editor-token/js-token.js";
import { rustTokenTree } from "./editor-token/rust-token.js";
import { tokenTreeOption } from "../token-match/token-match.js";

export type LangPresetOption = "javascript" | "golang" | "cplusplus" | "csharp" | "rust" | "gml";

export const tokenLoader = (preset : LangPresetOption): tokenTreeOption[] => {

    if(preset === "javascript") return javascriptTokenTree;
    if(preset === "rust") return rustTokenTree;
    if(preset === "gml") return gmlTokenTree;

    return javascriptTokenTree;

};

// EDITOR : 

import { Editor } from "../modules/editor/editor.js";
import { ui } from "../modules/ui/ui.js";

const myEditor = new Editor({
    container : ui.custom("editor-area"),
    width : "full",
    height : "full",
    tabSize : 4,
    langPreset : "javascript",
});

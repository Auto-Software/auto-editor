
// EDITOR : 

import { Editor } from "../modules/editor/editor.js";

const myEditor = new Editor({
    container : document.getElementById("editor-area") as HTMLDivElement,
    tabSize : 4,
    lang : "javascript",
});

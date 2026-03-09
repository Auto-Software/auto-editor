// EDITOR : 
import { Constructor } from "./modules/constructor/constructor.js";
import { javascriptTokenTree } from "./modules/token-lang/js-token.js";
import { ui } from "./modules/ui/ui.js";
const myEditor = new Constructor({
    container: ui.custom("editor-area"),
    tabSize: 4,
    tokenTree: javascriptTokenTree
});
//# sourceMappingURL=editor.js.map
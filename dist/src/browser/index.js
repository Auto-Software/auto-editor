// EDITOR : 
import { Editor } from "../modules/editor/editor.js";
const template = `
const user = {
    name: "Alice",
    age: 25,
    active: true
};

function greet(name) {
    if (!name) {
        return "Hello, stranger!";
    }
    return \`Hello, \${name}!\`;
}

for (let i = 0; i < 3; i++) {
    console.log(greet(user.name));
}
`;
const myEditor = new Editor({
    container: document.getElementById("editor-area"),
    tabSize: 4,
    lang: "javascript",
    pre: template
});
//# sourceMappingURL=index.js.map
// // auto software - auto editor - (c) 2026 
// // under MIT license 

// import { Editor } from "../editor/editor.js";

// export const renderOffset = (editor: Editor, lineElements: any[]): void => {
//     if (!lineElements || lineElements.length === 0) return;

//     const body = editor.editorBody;
//     const container = editor.editorAutoHeightContainer;
//     const rowHeight = 21; 
//     const scrollTop = body.scrollTop;
//     const viewportHeight = body.clientHeight;

//     // 1. Range com folga de 15 linhas (para não "piscar" ao scrollar)
//     const buffer = 15;
//     const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
//     const endIndex = Math.min(lineElements.length - 1, Math.ceil((scrollTop + viewportHeight) / rowHeight) + buffer);

//     // 2. Compensação Hardcore (Padding)
//     const paddingTop = startIndex * rowHeight;
//     const paddingBottom = (lineElements.length - 1 - endIndex) * rowHeight;

//     container.style.paddingTop = `${paddingTop}px`;
//     container.style.paddingBottom = `${paddingBottom}px`;

//     // 3. Loop de Visibilidade (Display None para performance extrema)
//     for (let i = 0; i < lineElements.length; i++) {
//         const line = lineElements[i];
//         if (!line.superRow) continue;

//         const isVisible = i >= startIndex && i <= endIndex;
//         const currentDisplay = line.superRow.style.display;

//         if (isVisible) {
//             if (currentDisplay === "none") line.superRow.style.display = "flex";
//         } else {
//             if (currentDisplay !== "none") line.superRow.style.display = "none";
//         }
//     }
// };
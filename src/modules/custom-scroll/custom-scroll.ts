
// CUSTOM SCROLL : 









import { Editor } from "../editor/editor.js";

export const customScroll = (editor : Editor): void => {

    console.log("is native scroll : " + editor.nativeScrollBar)
    if(editor.nativeScrollBar) return;

    const customScrollStyle : HTMLStyleElement = document.createElement("style");

    customScrollStyle.innerHTML = `

        .editor-textarea::-webkit-scrollbar {
            width: ${editor.scrollBarScale}px;  
            height: ${editor.scrollBarScale}px; 
        }

        .editor-textarea::-webkit-scrollbar-track {
            background: ${editor.theme.scrollBarBackgroundColor};
        }

        .editor-textarea::-webkit-scrollbar-thumb {
            background: ${editor.theme.scrollBarThumbBackgroundColor}; 
            border-radius: ${editor.scrollBarRadius}px;
            border: 2px solid ${editor.theme.scrollBarBackgroundColor}; 
            background-clip: content-box; 
        }

        .editor-textarea::-webkit-scrollbar-thumb:hover {
            background: ${editor.theme.scrollBarThumbSelectedBackgroundColor};
            border-radius: ${editor.scrollBarRadius}px;
            border: 2px solid ${editor.theme.scrollBarBackgroundColor}; 
            background-clip: content-box; 
        }

        .editor-textarea::-webkit-scrollbar-corner {
            background: ${editor.theme.scrollBarBackgroundColor};
        }
    `

    document.head.appendChild(customScrollStyle);
};
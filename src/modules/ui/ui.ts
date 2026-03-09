
/*---------------------------------------------------------------------------------------------*
*  copyright (c) 2024 - 2026 snack software ltda. CREACTED IN 09/08/2024 DD/MM/YYYYY           *
*  all rights reserverds.                                                                      *
*----------------------------------------------------------------------------------------------*/

// UI : 

import { fromdom } from "../fromdom/fromdom.js";

export const ui = {
    editor : {
        editorGuitterContainer : fromdom(".editor-gutter") as HTMLDivElement,
        editorRowContainer : fromdom(".editor-row-container") as HTMLDivElement
    },
    custom : (element: any) => fromdom(element)
};
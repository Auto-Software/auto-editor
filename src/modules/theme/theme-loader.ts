
// THEME LOADER : 
// auto software - auto editor - (c) 2026 

import { monacoTheme } from "./editor-theme/manaco-theme.js";

export const themeLoader = (theme: (themeType | themePresetName)): themeType => {

    if (typeof theme === "string") {
        switch (theme) {
            case "monaco":
                return monacoTheme;
            default:
                console.warn(`Tema "${theme}" não encontrado. Usando padrão.`);
            return monacoTheme;
        }
    }

    if (typeof theme === "object" && theme !== null) return theme;
    
    return monacoTheme;
};
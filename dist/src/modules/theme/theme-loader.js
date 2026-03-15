// THEME LOADER : 
// auto software - auto editor - (c) 2026 
import { baboonTheme } from "./editor-theme/baboon-theme.js";
import { monacoTheme } from "./editor-theme/manaco-theme.js";
export const themeLoader = (theme) => {
    if (typeof theme === "string") {
        switch (theme) {
            case "monaco":
                return monacoTheme;
            case "baboon":
                return baboonTheme;
            default:
                console.warn(`Tema "${theme}" não encontrado. Usando padrão.`);
                return monacoTheme;
        }
    }
    if (typeof theme === "object" && theme !== null)
        return theme;
    return monacoTheme;
};
//# sourceMappingURL=theme-loader.js.map
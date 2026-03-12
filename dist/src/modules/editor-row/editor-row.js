import { BitmapText, Container, Graphics } from '../../../node_modules/pixi.js/dist/pixi.js';
import { tokenMatch } from '../token-match/token-match';
;
export class EditorRow {
    rowNumber;
    content;
    rowHeight;
    editor;
    // Containers internos para organizar os elementos
    rowGroup;
    gutterGroup;
    rowBg;
    gutterBg;
    gutterLabel;
    tokensContainer;
    constructor(option) {
        this.rowNumber = option.rowNumber;
        this.content = option.content;
        this.editor = option.editor;
        this.rowHeight = option.rowHeight;
        this.rowGroup = new Container();
        this.gutterGroup = new Container();
        this.tokensContainer = new Container();
        // 1. Elementos da Linha (Código)
        this.rowBg = new Graphics();
        this.rowGroup.addChild(this.rowBg);
        this.rowGroup.addChild(this.tokensContainer);
        // 2. Elementos do Gutter (Número)
        this.gutterBg = new Graphics();
        this.gutterLabel = new BitmapText({
            text: this.rowNumber.toString(),
            style: {
                fontFamily: 'MyFont',
                fontSize: 14,
                fill: '#858585', // Cor padrão do gutter
            },
        });
        this.gutterGroup.addChild(this.gutterBg);
        this.gutterGroup.addChild(this.gutterLabel);
        // Adiciona nos containers principais do Editor
        option.rowContainer.addChild(this.rowGroup);
        option.gutterContainer.addChild(this.gutterGroup);
        this.updatePosition();
        this.drawRow();
        this.renderTokens();
    }
    // Posicionamento Vertical (Y)
    updatePosition() {
        const yPos = (this.rowNumber - 1) * this.rowHeight;
        this.rowGroup.y = yPos;
        this.gutterGroup.y = yPos;
    }
    drawRow() {
        const charWidth = 9;
        const maxDigits = Math.max(2, this.editor.editorTrueTextarea.value.split('\n').length.toString().length);
        const gutterWidth = (maxDigits * charWidth) + 25;
        // Limpa e redesenha fundos
        this.rowBg.clear();
        this.rowBg.rect(0, 0, 3000, this.rowHeight); // Largura grande para o scroll horizontal
        this.rowBg.fill({ color: 0x000000, alpha: 0 });
        this.gutterBg.clear();
        this.gutterBg.rect(0, 0, gutterWidth, this.rowHeight);
        this.gutterBg.fill(this.editor.themePreset.gutterBackground);
        this.gutterLabel.text = this.rowNumber.toString().padStart(maxDigits, '0');
        this.gutterLabel.x = 10;
        this.gutterLabel.y = (this.rowHeight - this.gutterLabel.height) / 2;
        this.tokensContainer.x = gutterWidth + 5;
    }
    renderTokens() {
        this.tokensContainer.removeChildren();
        const parts = tokenMatch(this.editor.tokenTree, this.content);
        let currentX = 0;
        parts.forEach(part => {
            const t = new BitmapText({
                text: part.text,
                style: {
                    fontFamily: 'MyFont',
                    fontSize: 14,
                    fill: part.color || '#d3d3d2',
                },
            });
            t.x = currentX;
            t.y = (this.rowHeight - t.height) / 2;
            this.tokensContainer.addChild(t);
            currentX += t.width;
        });
    }
    updateContent(newContent, newRowNumber) {
        if (newRowNumber !== undefined) {
            this.rowNumber = newRowNumber;
            this.updatePosition();
        }
        this.content = newContent;
        this.drawRow();
        this.renderTokens();
    }
    setHighlight(selected) {
        this.rowBg.clear();
        if (selected) {
            this.rowBg.rect(0, 0, 3000, this.rowHeight);
            this.rowBg.fill({ color: 0x2a2d2e, alpha: 0.5 }); // Exemplo de cor de destaque
        }
    }
    remove() {
        this.rowGroup.destroy({ children: true });
        this.gutterGroup.destroy({ children: true });
    }
}
//# sourceMappingURL=editor-row.js.map
export type TokenRole = "own" | "ownleft" | "ownright" | "ownscope";
export interface tokenTreeOption {
    token: (string[] | string | RegExp);
    color: string;
    replace?: string;
    role?: TokenRole;
}
export interface TokenPart {
    text: string;
    isToken: boolean;
    color?: string;
}
export declare const tokenMatch: (tokenTree: tokenTreeOption[], text: string) => TokenPart[];
//# sourceMappingURL=token-match.d.ts.map
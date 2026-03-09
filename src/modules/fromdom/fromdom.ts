
/*---------------------------------------------------------------------------------------------*
 *  copyright (c) 2024 Snack Food Services. CREACTED IN 09/08/2024 DD/MM/YYYYY                 *
 *  all rights reserverds.                                                                     *
 *---------------------------------------------------------------------------------------------*/

// GET ELEMENT : 

export const fromdom = (selector: string, node: Document | HTMLElement = document): any => {

    if (!selector) return null;

    if (selector.startsWith('...')) {
        const className = "." + selector.slice(3); 
        return node.querySelectorAll(className);
    };

    if (selector.startsWith('.')) return node.querySelector(selector);

    const id: string = selector.startsWith('#') ? selector.slice(1) : selector;

    return document.getElementById(id);
};



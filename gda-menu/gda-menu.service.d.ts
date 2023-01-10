import { ElementRef, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
declare class DataForPosition {
    positionButton: DOMRect;
    typeButton: boolean;
    positionContainer: DOMRect;
    viewW: number;
    viewH: number;
    constructor(positionButton: DOMRect, typeButton: boolean, positionContainer: DOMRect, viewW: number, viewH: number);
}
export declare class GdaMenuService {
    private rendererFactory;
    menuClose: Subject<void>;
    onEnter: Subject<{
        parent: Element;
        button: ElementRef;
        direction: 'top' | 'left' | 'right' | 'bottom';
    }>;
    private renderer;
    constructor(rendererFactory: RendererFactory2);
    resetContainerAndCreateData(container: any, el: ElementRef): DataForPosition;
    setDirection(direction: 'top' | 'left' | 'right' | 'bottom', container: any, el: ElementRef): void;
    private setDirectionLeft;
    private setDirectionRight;
    private setDirectionBottom;
    private setDirectionTop;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GdaMenuService>;
}
export {};

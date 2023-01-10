import { AfterViewInit, ElementRef, Renderer2 } from "@angular/core";
import { GdaMenuService } from "./gda-menu.service";
import * as i0 from "@angular/core";
export declare class GdaMenuItemDirective implements AfterViewInit {
    private elementRef;
    private renderer;
    private gdaMenuService;
    private setClass;
    direction: 'top' | 'left' | 'right' | 'bottom';
    constructor(elementRef: ElementRef, renderer: Renderer2, gdaMenuService: GdaMenuService);
    ngAfterViewInit(): void;
    private onClick;
    private onEnter;
    private animationClick;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaMenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GdaMenuItemDirective, "[gdaMenuItem]", never, { "direction": "direction"; }, {}, never, never, false, never>;
}

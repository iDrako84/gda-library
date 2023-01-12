import { AfterViewInit, ElementRef, OnDestroy, Renderer2, ViewContainerRef } from "@angular/core";
import { GdaMenu } from "./gda-menu.component";
import { GdaMenuService } from "./gda-menu.service";
import * as i0 from "@angular/core";
export declare class GdaMenuTrigger implements AfterViewInit, OnDestroy {
    viewContainerRef: ViewContainerRef;
    private elementRef;
    private renderer;
    private gdaMenuService;
    private setClass;
    private setProperty;
    set gdaMenuTrigger(value: GdaMenu);
    direction: 'top' | 'left' | 'right' | 'bottom';
    private embeddedViewRef;
    private containers;
    private container;
    private menuTriggerVal;
    private listenFunc;
    private sub1;
    private sub2;
    constructor(viewContainerRef: ViewContainerRef, elementRef: ElementRef, renderer: Renderer2, gdaMenuService: GdaMenuService);
    ngAfterViewInit(): void;
    private onClick;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaMenuTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GdaMenuTrigger, "[gdaMenuTrigger]", never, { "gdaMenuTrigger": "gdaMenuTrigger"; "direction": "direction"; }, {}, never, never, false, never>;
}

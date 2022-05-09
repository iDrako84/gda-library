import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GdaToastConfig {
    direction: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
    classToast?: string;
    styleToast?: {};
    timing?: number | 'indeterminate';
    constructor(direction?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left', classToast?: string, styleToast?: {}, timing?: number | 'indeterminate');
}
export declare class GdaToast {
    private componentFactoryResolver;
    private appRef;
    private injector;
    /**
     * Config default
     */
    toastConfigDefault: GdaToastConfig;
    /**
     * Component REFs
     */
    private componentRefTopRight;
    private componentRefTopCenter;
    private componentRefTopLeft;
    private componentRefBottomRight;
    private componentRefBottomCenter;
    private componentRefBottomLeft;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    private selectedComponentRef;
    openToast(text: string, config?: GdaToastConfig): void;
    private createToast;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaToast, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GdaToast>;
}

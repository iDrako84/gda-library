import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
declare class GdaToastConfig {
    direction: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
    classToast?: string;
    styleToast?: {};
    timing?: number | 'indeterminate';
    constructor(direction?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left', classToast?: string, styleToast?: {}, timing?: number | 'indeterminate');
}
declare class GdaToastConfigForComponent extends GdaToastConfig {
    id: string;
    constructor(id?: string);
}
export declare class GdaToastComponent implements OnInit {
    elementRef: ElementRef;
    private get addClass();
    /**
     * Toasts
     */
    toasts: {
        text: string;
        config: GdaToastConfigForComponent;
    }[];
    /**
     * Close event
     */
    closeToast: EventEmitter<string>;
    /**
     * Direction
     */
    private directionToast;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    protected close(toast: {
        text: string;
        config: GdaToastConfigForComponent;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaToastComponent, "gda-toast", never, { "toasts": "toasts"; }, { "closeToast": "closeToast"; }, never, never, false, never>;
}
export {};

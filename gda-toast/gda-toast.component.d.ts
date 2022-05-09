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
    get addClass(): {
        'gda-toast': boolean;
        'gda-toast-top-left': boolean;
        'gda-toast-top-center': boolean;
        'gda-toast-top-right': boolean;
        'gda-toast-bottom-left': boolean;
        'gda-toast-bottom-center': boolean;
        'gda-toast-bottom-right': boolean;
    };
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
    close(toast: {
        text: string;
        config: GdaToastConfigForComponent;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaToastComponent, "gda-toast", never, { "toasts": "toasts"; }, { "closeToast": "closeToast"; }, never, never>;
}
export {};

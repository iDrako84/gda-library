import { ElementRef, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { GdaTooltipService } from './gda-tooltip.service';
import * as i0 from "@angular/core";
export declare class GdaTooltip implements OnChanges, OnDestroy {
    elementRef: ElementRef;
    private renderer;
    private gdaTooltipService;
    /**
     * Testo
     */
    gdaTooltip: string;
    /**
     * Testo
     */
    dataHtml: boolean;
    /**
     * Device
     */
    private isMobile;
    /**
     * Span
     */
    private span;
    /**
     * Id
     */
    private id;
    constructor(elementRef: ElementRef, renderer: Renderer2, gdaTooltipService: GdaTooltipService);
    /**
     * Cambio testo
     */
    ngOnChanges(): void;
    /**
     * Crea il tooltip
     */
    private createTooltip;
    /**
     * Mouse sopra
     */
    private onClick;
    /**
     * Mouse over
     */
    private mouseleave;
    private mobileAndTabletCheck;
    /**
     * Distrugge i tooltip
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTooltip, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GdaTooltip, "[gdaTooltip]", never, { "gdaTooltip": "gdaTooltip"; "dataHtml": "dataHtml"; }, {}, never, never, false, never>;
}

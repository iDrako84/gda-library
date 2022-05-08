import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { GdaTooltipService } from './gda-tooltip.service';
import * as i0 from "@angular/core";
export declare class GdaTooltipDirective implements OnInit, OnChanges, OnDestroy {
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
     * Controllo
     */
    ngOnInit(): void;
    /**
     * Crea il tooltip
     */
    private createTooltip;
    /**
     * Mouse sopra
     */
    onClick(e: MouseEvent): void;
    /**
     * Mouse over
     */
    mouseleave(eventData: Event): void;
    private mobileAndTabletCheck;
    /**
     * Distrugge i tooltip
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GdaTooltipDirective, "[gdaTooltip]", never, { "gdaTooltip": "gdaTooltip"; "dataHtml": "dataHtml"; }, {}, never>;
}

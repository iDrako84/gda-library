import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
export declare class GdaSidenavComponent implements AfterViewInit {
    private gdaSidenavService;
    private elementRef;
    private renderer;
    setClass: boolean;
    /**
     * Container
     */
    protected containerEl: ElementRef<HTMLDivElement>;
    /**
     * Container body
     */
    protected containerBodyEl: ElementRef<HTMLDivElement>;
    /**
     * Mode
     */
    mode: 'push' | 'over' | 'responsive';
    /**
     * Direction
     */
    private directions;
    /**
     * Opened
     */
    private opened;
    /**
     * Width container
     */
    private widthContainer;
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2);
    protected getStatusBackdoor(): boolean;
    private pushOpen;
    private overOpen;
    private pushClose;
    private overClose;
    private resizeSidenav;
    ngAfterViewInit(): void;
    protected toggleBackdoor(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavComponent, "gda-sidenav", never, { "mode": "mode"; }, {}, never, ["gda-sidenav-header", "*"], false>;
}

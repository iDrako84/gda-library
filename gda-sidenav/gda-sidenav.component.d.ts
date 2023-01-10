import { AfterViewInit, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
export declare class GdaSidenavComponent implements AfterViewInit {
    private gdaSidenavService;
    private elementRef;
    private renderer;
    private cd;
    private setClass;
    /**
     * Container
     */
    private containerEl;
    /**
     * Container body
     */
    private containerBodyEl;
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
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    protected getStatusBackdoor(): boolean;
    private pushOpen;
    private overOpen;
    private pushClose;
    private overClose;
    private resizeSidenav;
    ngAfterViewInit(): void;
    private onResize;
    protected toggleBackdoor(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavComponent, "gda-sidenav, .gda-sidenav, [gda-sidenav]", never, { "mode": "mode"; }, {}, never, ["gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]", "*"], false, never>;
}

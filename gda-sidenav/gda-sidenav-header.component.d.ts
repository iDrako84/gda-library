import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
export declare class GdaSidenavHeader implements OnInit, AfterViewInit {
    private gdaSidenavService;
    private elementRef;
    private renderer;
    private cd;
    private setClass;
    private get setStyle();
    private containerEl;
    /**
     * Open
     */
    opened: boolean;
    /**
     * Directions
     */
    set directions(val: 'left' | 'right');
    private directionsVal;
    /**
     * Resize
     */
    set resize(val: boolean);
    private resizeVal;
    private resizeObserve;
    /**
     * Status sidenav
     */
    statusSidenav: EventEmitter<boolean>;
    /**
     * Width content
     */
    private widthContainer;
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Toggle
     */
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavHeader, "gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]", never, { "opened": "opened"; "directions": "directions"; "resize": "resize"; }, { "statusSidenav": "statusSidenav"; }, never, ["*"], false, never>;
}

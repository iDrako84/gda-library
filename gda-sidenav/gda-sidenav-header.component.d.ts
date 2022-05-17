import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
export declare class GdaSidenavHeaderComponent implements OnInit, AfterViewInit {
    private gdaSidenavService;
    private elementRef;
    private renderer;
    get setClass(): {
        'gda-sidenav-header': boolean;
    };
    get setStyle(): {
        left: string | number;
        right: string | number;
    };
    containerEl: ElementRef<HTMLDivElement>;
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
    resizeVal: boolean;
    resizeObserve: ResizeObserver;
    /**
     * Width content
     */
    private widthContainer;
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Toggle
     */
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavHeaderComponent, "gda-sidenav-header", never, { "opened": "opened"; "directions": "directions"; "resize": "resize"; }, {}, never, ["*"]>;
}

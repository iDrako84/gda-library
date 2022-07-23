import { AfterViewInit, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
export declare class GdaSidenavHeaderComponent implements OnInit, AfterViewInit {
    private gdaSidenavService;
    private elementRef;
    private renderer;
    setClass: string;
    get setStyle(): {
        left: string | number;
        right: string | number;
    };
    protected containerEl: ElementRef<HTMLDivElement>;
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
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Toggle
     */
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavHeaderComponent, "gda-sidenav-header", never, { "opened": "opened"; "directions": "directions"; "resize": "resize"; }, { "statusSidenav": "statusSidenav"; }, never, ["*"], false>;
}

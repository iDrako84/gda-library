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
    containerEl: ElementRef<HTMLDivElement>;
    /**
     * Container body
     */
    containerBodyEl: ElementRef<HTMLDivElement>;
    /**
     * Direction
     */
    directions: 'left' | 'right';
    /**
     * Opened
     */
    private opened;
    /**
     * Width container
     */
    private widthContainer;
    constructor(gdaSidenavService: GdaSidenavService, elementRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaSidenavComponent, "gda-sidenav", never, {}, {}, never, ["gda-sidenav-header", "*"]>;
}

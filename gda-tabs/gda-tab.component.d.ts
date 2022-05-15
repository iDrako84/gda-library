import { AfterContentChecked, AfterViewInit, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef } from "@angular/core";
import { GdaTabsService } from "./gda-tabs.service";
import { TabsService } from "./tabs.service";
import * as i0 from "@angular/core";
export declare class GdaTabComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
    private elementRef;
    private renderer;
    private gdaTabsService;
    private tabsService;
    /**
     * Class
     */
    setClass: boolean;
    /**
     * Content
     */
    contentEl: ElementRef;
    /**
     * Titolo del tab
     */
    titleTab: string | TemplateRef<any> | any;
    /**
     * Apertura all avvio
     */
    isOpen: boolean;
    /**
     * Animations
     */
    animations: boolean;
    /**
     * Bottone corrispondente al contenuto
     */
    private button;
    /**
     * id del Tab
     */
    private id;
    /**
     * Enabled
     */
    enabled: boolean;
    /**
     * Entrata
     */
    leftEnter: number | string;
    /**
     * Uscita
     */
    leftLeave: number | string;
    /**
     * Subscription
     */
    private sub1;
    private sub2;
    private sub3;
    constructor(elementRef: ElementRef, renderer: Renderer2, gdaTabsService: GdaTabsService, tabsService: TabsService);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    /**
     * unsubscribe
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTabComponent, "gda-tab", never, { "titleTab": "titleTab"; "isOpen": "isOpen"; }, {}, never, ["*"]>;
}

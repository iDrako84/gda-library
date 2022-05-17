import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2, TemplateRef } from '@angular/core';
import { GdaTabsService } from './gda-tabs.service';
import { TabsService } from './tabs.service';
import { GdaTabsStyleModel } from './gda-tabs-style.model';
import * as i0 from "@angular/core";
declare class ButtonTabModel {
    id: number;
    title: string | TemplateRef<any> | any;
    active: boolean;
    constructor(id?: number, title?: string | TemplateRef<any> | any, active?: boolean);
}
export declare class GdaTabsComponent implements AfterViewInit, OnDestroy {
    private gdaTabsServiceService;
    private elementRef;
    private tabsService;
    private renderer;
    /**
     * Class
     */
    setClass: boolean;
    /**
     * Style
     */
    get setStyle(): {
        'min-height': string;
        visibility: string;
    };
    /**
     * Element tabContent
     */
    tabContentEl: ElementRef;
    /**
     * Element tab
     */
    tab: ElementRef;
    /**
     * Element content
     */
    content: ElementRef;
    /**
     * Arrow
     */
    arrowBackEl: ElementRef;
    arrowForwardEl: ElementRef;
    /**
     * Element buttons
     */
    buttonsEl: QueryList<ElementRef>;
    /**
     * Element bar
     */
    bar: QueryList<ElementRef>;
    /**
     * Button style
     */
    tabStyle: GdaTabsStyleModel;
    /**
     * Button style
     */
    set animation(val: boolean);
    /**
     * Index Tab Activated
     */
    indexTabVal: number;
    set indexTab(val: number);
    get indexTab(): number;
    /**
     * Index Tab Activated
     */
    indexTabActivated: EventEmitter<number>;
    /**
     * Bottoni tabs
     */
    buttons: ButtonTabModel[];
    /**
     * Button disabled
     */
    buttonDisabled: boolean;
    /**
     * Lunghezza dei bottoni
     */
    private lengthButtons;
    /**
     * Step per l'animazione
     */
    private step;
    /**
     * Abilita i movimenti della rotellina
     */
    enabledMouseWheel: boolean;
    /**
     * Arrow
     */
    viewArrow: boolean;
    /**
     * Subscription
     */
    private sub1;
    private sub2;
    /**
     * Tab loaded
     */
    tabsLoaded: boolean;
    constructor(gdaTabsServiceService: GdaTabsService, elementRef: ElementRef, tabsService: TabsService, renderer: Renderer2);
    ngAfterViewInit(): void;
    private loadButtons;
    /**
     * Visualizza/togli le freccie
     */
    private getArrow;
    getContentButton(): {
        width: string;
        marginLeft: number | string;
    };
    /**
     * Selezione del tab
     */
    setTab(event: MouseEvent | null, buttonEl: ButtonTabModel, i: number): void;
    /**
     * Click sulla freccia
     */
    arrow(event: MouseEvent | WheelEvent | any, arrow: 'back' | 'forward'): void;
    mouseWheel(event: WheelEvent | any): void;
    /**
     * Animazione dello scrol
     */
    private animationScroll;
    getClass(button: ButtonTabModel): {
        active: boolean;
    };
    getStyleBar(): {
        backgroundColor: string;
    };
    /**
     * Style bottone
     * @param button tipo bottone
     */
    getStyleButton(button: ButtonTabModel): {
        backgroundColor: string;
        color: string;
    };
    private animateRipple;
    getStyleContent(): {
        top: string;
    };
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTabsComponent, "gda-tabs", never, { "tabStyle": "tabStyle"; "animation": "animation"; "indexTab": "indexTab"; }, { "indexTabActivated": "indexTabActivated"; }, never, ["*"]>;
}
export {};

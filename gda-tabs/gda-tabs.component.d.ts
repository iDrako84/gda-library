import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, QueryList, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { GdaTabsPrivateService } from './gda-tabs-private.service';
import { GdaTabsService } from './gda-tabs.service';
import { GdaTabsStyleModel } from './gda-tabs-style.model';
import * as i0 from "@angular/core";
declare class ListTabsModel {
    position: number;
    title: string | TemplateRef<any> | any;
    constructor(position: number, title: string | TemplateRef<any>);
}
export declare class GdaTabsComponent implements OnChanges, AfterViewInit, OnDestroy {
    private cd;
    private renderer;
    private gdaTabsPrivateService;
    private gdaTabsService;
    protected setClass: string;
    protected buttonEl: QueryList<ElementRef>;
    protected tabsHeaderContentEl: ElementRef;
    protected buttonsTabEl: ElementRef;
    protected arrowBackEl: ElementRef;
    protected arrowForwardEl: ElementRef;
    protected tabsContentEl: ElementRef;
    indexTab: number;
    private buttons;
    set animation(val: boolean);
    tabStyle: GdaTabsStyleModel;
    indexTabActivated: EventEmitter<number>;
    private step;
    protected viewArrow: boolean;
    private sub1;
    private sub2;
    constructor(cd: ChangeDetectorRef, renderer: Renderer2, gdaTabsPrivateService: GdaTabsPrivateService, gdaTabsService: GdaTabsService);
    ngOnChanges(changes: SimpleChanges | any): void;
    ngAfterViewInit(): void;
    protected getButtons(): ListTabsModel[];
    protected onSelectedTab(e: MouseEvent | null, index: number): void;
    protected getIndexTab(): number;
    protected arrow(event: MouseEvent | WheelEvent | any, arrow: 0 | 1): void;
    private animationScroll;
    protected mouseWheel(event: WheelEvent | any): void;
    private getArrow;
    protected getStyleButton(active: boolean): {
        backgroundColor: string;
        color: string;
    };
    private animateRipple;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTabsComponent, "gda-tabs", never, { "indexTab": "indexTab"; "animation": "animation"; "tabStyle": "tabStyle"; }, { "indexTabActivated": "indexTabActivated"; }, never, ["*"], false>;
}
export {};

import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
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
    private setClass;
    private buttonEl;
    private tabsHeaderContentEl;
    private buttonsTabEl;
    private arrowBackEl;
    private arrowForwardEl;
    private tabsContentEl;
    indexTab: number;
    private buttons;
    set animation(val: boolean);
    tabStyle: GdaTabsStyleModel;
    indexTabActivated: EventEmitter<number>;
    private step;
    protected viewArrow: boolean;
    protected iconArrow: string;
    private sub1;
    private sub2;
    constructor(cd: ChangeDetectorRef, renderer: Renderer2, gdaTabsPrivateService: GdaTabsPrivateService, gdaTabsService: GdaTabsService);
    private onResize;
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
    protected getStyleBar(): {
        backgroundColor: string;
    };
    private animateRipple;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTabsComponent, "gda-tabs, .gda-tabs, [gda-tabs]", never, { "indexTab": "indexTab"; "animation": "animation"; "tabStyle": "tabStyle"; }, { "indexTabActivated": "indexTabActivated"; }, never, ["*"], false, never>;
}
export {};

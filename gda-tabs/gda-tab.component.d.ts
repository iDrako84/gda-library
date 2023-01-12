import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { GdaTabsService } from './gda-tabs.service';
import { GdaTabsPrivateService } from './gda-tabs-private.service';
import * as i0 from "@angular/core";
export declare class GdaTab implements AfterViewInit, OnDestroy {
    private cd;
    private elementRef;
    private renderer;
    private gdaTabsService;
    private gdaTabsPrivateService;
    private setClass;
    private heightTab;
    private contentEl;
    set titleTab(title: string | TemplateRef<any> | any);
    private tabTitleVal;
    private position;
    leftEnter: string;
    leftLeave: string;
    animations: boolean;
    private sub1;
    private sub2;
    private sub3;
    constructor(cd: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2, gdaTabsService: GdaTabsService, gdaTabsPrivateService: GdaTabsPrivateService);
    ngAfterViewInit(): void;
    onTabActive(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTab, "gda-tab, .gda-tab, [gda-tab]", never, { "titleTab": "titleTab"; }, {}, never, ["*"], false, never>;
}

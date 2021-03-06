import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { GdaTabsService } from './gda-tabs.service';
import { GdaTabsPrivateService } from './gda-tabs-private.service';
import * as i0 from "@angular/core";
export declare class GdaTabComponent implements AfterViewInit, OnDestroy {
    private cd;
    private elementRef;
    private renderer;
    private gdaTabsService;
    private gdaTabsPrivateService;
    setClass: string;
    heightTab: string;
    contentEl: ElementRef;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaTabComponent, "gda-tab", never, { "titleTab": "titleTab"; }, {}, never, ["*"], false>;
}

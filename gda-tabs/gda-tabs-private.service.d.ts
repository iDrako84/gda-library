import { EventEmitter, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
declare class ListTabsModel {
    position: number;
    title: string | TemplateRef<any> | any;
    constructor(position: number, title: string | TemplateRef<any>);
}
export declare class GdaTabsPrivateService {
    private gdaTabsEl;
    callForId: EventEmitter<number>;
    private listTabs;
    buttonLoaded: EventEmitter<ListTabsModel[]>;
    private indexTabVal;
    indexTabChanges: EventEmitter<{
        new: number;
        old: number;
    }>;
    indexTabChangesEmit: EventEmitter<number>;
    private animation;
    constructor();
    tabLoaded(el: HTMLElement, i?: number): void;
    private createTabs;
    addTab(tab: ListTabsModel): void;
    getIndexTab(): number;
    setIndexTab(indexTab: number): void;
    setTitle(position: number, title: string): void;
    getAnimation(): boolean | undefined;
    setAnimation(animation: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTabsPrivateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GdaTabsPrivateService>;
}
export {};

import { EventEmitter, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
declare class ButtonTabModel {
    id: number;
    title: string | TemplateRef<any> | any;
    active: boolean;
    constructor(id?: number, title?: string | TemplateRef<any> | any, active?: boolean);
}
export declare class TabsService {
    /**
     * button
     */
    buttons: ButtonTabModel[];
    /**
     * button activated
     */
    buttonActivated: EventEmitter<ButtonTabModel>;
    /**
     * button activated val
     */
    buttonActivatedVal: ButtonTabModel;
    /**
     * Prevent tab
     */
    preventTabs: number;
    /**
     * Tabs reloaded
     */
    tabsReloaded: EventEmitter<boolean>;
    /**
     * Check active
     */
    checkActive: EventEmitter<void>;
    /**
     * Loading complete
     */
    loadComplete: boolean;
    /**
     * Height tab active
     */
    heightTabActive: number;
    /**
     * boolean
     */
    animationsActivated: boolean;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TabsService>;
}
export {};

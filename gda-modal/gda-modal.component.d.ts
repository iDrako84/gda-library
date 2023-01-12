import { OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { GdaModalService } from './gda-modal.service';
import * as i0 from "@angular/core";
export declare class GdaModal implements OnInit, OnDestroy {
    private renderer;
    private viewContainerRef;
    private gdaModalService;
    /**
     * Display
     */
    private setStyle;
    private contentTemplate;
    backdoor: boolean;
    backdoorNotTriggerClose: boolean;
    modalId: string;
    modalClasses: string;
    escapeEnabled: boolean;
    protected backdoorShow: boolean;
    protected openStatus: boolean;
    private embeddedViewRef;
    private subs;
    constructor(renderer: Renderer2, viewContainerRef: ViewContainerRef, gdaModalService: GdaModalService);
    ngOnInit(): void;
    private onKeydownHandler;
    open(): void;
    close(e?: Event): void;
    protected closeModal(e: Event): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GdaModal, "gda-modal", never, { "backdoor": "backdoor"; "backdoorNotTriggerClose": "backdoorNotTriggerClose"; "modalId": "modalId"; "modalClasses": "modalClasses"; "escapeEnabled": "escapeEnabled"; }, {}, never, ["*"], false, never>;
}

import * as i0 from '@angular/core';
import { Injectable, TemplateRef, Component, HostBinding, ViewChild, Input, HostListener, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class GdaModalService {
    constructor() {
        this.closeAllModalTrigger = new Subject();
    }
    getCloseAllmodals() {
        return this.closeAllModalTrigger;
    }
    closeAllModal() {
        this.closeAllModalTrigger.next();
    }
}
GdaModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class GdaModal {
    constructor(renderer, viewContainerRef, gdaModalService) {
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.gdaModalService = gdaModalService;
        /**
         * Display
         */
        this.setStyle = 'none';
        this.backdoor = true;
        this.backdoorNotTriggerClose = false;
        this.backdoorShow = false;
        this.openStatus = false;
        this.embeddedViewRef = null;
        this.modalId = '';
        this.modalClasses = '';
        this.escapeEnabled = true;
        this.subs = new Subscription();
    }
    ngOnInit() {
        this.gdaModalService.getCloseAllmodals().subscribe(() => this.close());
    }
    onKeydownHandler(event) {
        if (this.escapeEnabled)
            this.close();
    }
    open() {
        if (!this.openStatus) {
            this.openStatus = true;
            this.backdoorShow = true;
            this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate);
            this.embeddedViewRef.detectChanges();
            for (const node of this.embeddedViewRef.rootNodes) {
                if (node.classList?.contains('gda-modal-overlay')) {
                    const numberContainers = document.getElementsByClassName('gda-modal-overlay').length;
                    this.renderer.setStyle(node, 'z-index', 1060 + (numberContainers - 1));
                    // if (numberContainers <= 1) {
                    //   this.renderer.addClass(node, 'gda-modal-overlay-darked');
                    // }
                }
                if (node.classList?.contains('gda-modal-container')) {
                    if (this.modalId) {
                        this.renderer.setProperty(node, 'id', this.modalId);
                    }
                    if (this.modalClasses) {
                        this.modalClasses.split(' ').forEach((c) => this.renderer.addClass(node, c));
                    }
                    const numberContainers = document.getElementsByClassName('gda-modal-container').length;
                    this.renderer.setStyle(node, 'z-index', 1060 + (numberContainers));
                }
                this.renderer.appendChild(document.body, node);
            }
        }
    }
    close(e) {
        if (e)
            e.stopPropagation();
        if (this.openStatus) {
            this.openStatus = false;
            this.backdoorShow = false;
            setTimeout(() => {
                if (this.embeddedViewRef) {
                    this.embeddedViewRef.destroy();
                }
            }, 300);
        }
    }
    closeModal(e) {
        if (!this.backdoorNotTriggerClose)
            this.close(e);
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
GdaModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModal, deps: [{ token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: GdaModalService }], target: i0.ɵɵFactoryTarget.Component });
GdaModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModal, selector: "gda-modal", inputs: { backdoor: "backdoor", backdoorNotTriggerClose: "backdoorNotTriggerClose", modalId: "modalId", modalClasses: "modalClasses", escapeEnabled: "escapeEnabled" }, host: { listeners: { "document:keydown.escape": "onKeydownHandler($event)" }, properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <div class="gda-modal-overlay gda-modal-overlay-darked" *ngIf="backdoor && backdoorShow" (click)="closeModal($event)" @overlay></div>
      <div class="gda-modal-container" *ngIf="openStatus" @contentAnimated>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('overlay', [
            transition(':enter', [
                style({ background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)' }),
                animate('0.3s ease-in-out', keyframes([
                    style({
                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                    }),
                    style({
                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                    })
                ]))
            ]),
            transition(':leave', [
                style({ background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)' }),
                animate('0.3s ease-in-out', keyframes([
                    style({
                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                    }),
                    style({
                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                    })
                ]))
            ])
        ]),
        trigger('contentAnimated', [
            transition(':enter', [
                style({ transform: 'translateY(0)', opacity: 1 }),
                animate('0.3s ease-in-out', keyframes([
                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                    style({ transform: 'translateY(0)', opacity: 1 }),
                ]))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(-10px)', opacity: 0 }),
                animate('0.3s ease-in-out', keyframes([
                    style({ transform: 'translateY(0)', opacity: 1 }),
                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                ]))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-modal',
                    template: `
    <ng-template #content>
      <div class="gda-modal-overlay gda-modal-overlay-darked" *ngIf="backdoor && backdoorShow" (click)="closeModal($event)" @overlay></div>
      <div class="gda-modal-container" *ngIf="openStatus" @contentAnimated>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
                    animations: [
                        trigger('overlay', [
                            transition(':enter', [
                                style({ background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)' }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({
                                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                                    }),
                                    style({
                                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)' }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({
                                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                                    }),
                                    style({
                                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                                    })
                                ]))
                            ])
                        ]),
                        trigger('contentAnimated', [
                            transition(':enter', [
                                style({ transform: 'translateY(0)', opacity: 1 }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                                    style({ transform: 'translateY(0)', opacity: 1 }),
                                ]))
                            ]),
                            transition(':leave', [
                                style({ transform: 'translateY(-10px)', opacity: 0 }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({ transform: 'translateY(0)', opacity: 1 }),
                                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: GdaModalService }]; }, propDecorators: { setStyle: [{
                type: HostBinding,
                args: ['style.display']
            }], contentTemplate: [{
                type: ViewChild,
                args: ['content', { read: TemplateRef, static: false }]
            }], backdoor: [{
                type: Input
            }], backdoorNotTriggerClose: [{
                type: Input
            }], modalId: [{
                type: Input
            }], modalClasses: [{
                type: Input
            }], escapeEnabled: [{
                type: Input
            }], onKeydownHandler: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });

class GdaModalHeader {
    constructor() {
        this.setClass = 'gda-modal-header';
    }
}
GdaModalHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
GdaModalHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModalHeader, selector: "gda-modal-header, .gda-modal-header, [gda-modal-header]", host: { properties: { "class": "this.setClass" } }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-modal-header, .gda-modal-header, [gda-modal-header]',
                    template: `<ng-content></ng-content>`
                }]
        }], propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class GdaModalContent {
    constructor() {
        this.setClass = 'gda-modal-content';
    }
}
GdaModalContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
GdaModalContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModalContent, selector: "gda-modal-content, .gda-modal-content, [gda-modal-content]", host: { properties: { "class": "this.setClass" } }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-modal-content, .gda-modal-content, [gda-modal-content]',
                    template: `<ng-content></ng-content>`
                }]
        }], propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class GdaModalFooter {
    constructor() {
        this.setClass = 'gda-modal-footer';
    }
}
GdaModalFooter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
GdaModalFooter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModalFooter, selector: "gda-modal-footer, .gda-modal-footer, [gda-modal-footer]", host: { properties: { "class": "this.setClass" } }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-modal-footer, .gda-modal-footer, [gda-modal-footer]',
                    template: `<ng-content></ng-content>`
                }]
        }], propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class GdaModalModule {
}
GdaModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, declarations: [GdaModal,
        GdaModalHeader,
        GdaModalContent,
        GdaModalFooter], imports: [CommonModule], exports: [GdaModal,
        GdaModalHeader,
        GdaModalContent,
        GdaModalFooter] });
GdaModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaModal,
                        GdaModalHeader,
                        GdaModalContent,
                        GdaModalFooter
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        GdaModal,
                        GdaModalHeader,
                        GdaModalContent,
                        GdaModalFooter
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-modal
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaModal, GdaModalContent, GdaModalFooter, GdaModalHeader, GdaModalModule, GdaModalService };
//# sourceMappingURL=gda-modal.mjs.map

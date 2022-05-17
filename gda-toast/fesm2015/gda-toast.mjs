import * as i0 from '@angular/core';
import { EventEmitter, Component, HostBinding, Input, Output, Injectable, NgModule } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { of, delay } from 'rxjs';

class GdaToastConfig$1 {
    constructor(direction = 'top-right', classToast = '', styleToast = {}, timing = 3000) {
        this.direction = direction;
        this.classToast = classToast;
        this.styleToast = styleToast;
        this.timing = timing;
    }
}
class GdaToastConfigForComponent$1 extends GdaToastConfig$1 {
    constructor(id = '') {
        super();
        this.id = id;
    }
}
class GdaToastComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.toasts = [];
        this.closeToast = new EventEmitter();
        this.directionToast = 'top-right';
    }
    get addClass() {
        return {
            'gda-toast': true,
            'gda-toast-top-left': this.directionToast === 'top-left',
            'gda-toast-top-center': this.directionToast === 'top-center',
            'gda-toast-top-right': this.directionToast === 'top-right',
            'gda-toast-bottom-left': this.directionToast === 'bottom-left',
            'gda-toast-bottom-center': this.directionToast === 'bottom-center',
            'gda-toast-bottom-right': this.directionToast === 'bottom-right'
        };
    }
    ;
    ngOnInit() {
        this.directionToast = this.toasts[0].config.direction || 'top-right';
    }
    close(toast) {
        this.closeToast.emit(toast.config.id);
    }
}
GdaToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaToastComponent, selector: "gda-toast", inputs: { toasts: "toasts" }, outputs: { closeToast: "closeToast" }, host: { properties: { "class": "this.addClass" } }, ngImport: i0, template: `
    <div 
      *ngFor="let toast of toasts" 
      class="gda-toast-item" 
      [ngClass]="toast.config.classToast || ''" 
      [ngStyle]="toast.config.styleToast || {}" 
      @gdaToastAnimation 
      (click)="close(toast)">
      <div [innerHTML]="toast.text"></div>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('gdaToastAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.4s ease-in-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('0.4s ease-in-out', style({
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0
                }))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-toast',
                    template: `
    <div 
      *ngFor="let toast of toasts" 
      class="gda-toast-item" 
      [ngClass]="toast.config.classToast || ''" 
      [ngStyle]="toast.config.styleToast || {}" 
      @gdaToastAnimation 
      (click)="close(toast)">
      <div [innerHTML]="toast.text"></div>
    </div>
  `,
                    animations: [
                        trigger('gdaToastAnimation', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('0.4s ease-in-out', style({ opacity: 1 }))
                            ]),
                            transition(':leave', [
                                style({ opacity: 1 }),
                                animate('0.4s ease-in-out', style({
                                    opacity: 0,
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { addClass: [{
                type: HostBinding,
                args: ['class']
            }], toasts: [{
                type: Input
            }], closeToast: [{
                type: Output
            }] } });

class GdaToastConfig {
    constructor(direction = 'top-right', classToast = '', styleToast = {}, timing = 3000) {
        this.direction = direction;
        this.classToast = classToast;
        this.styleToast = styleToast;
        this.timing = timing;
    }
}
class GdaToastConfigForComponent extends GdaToastConfig {
    constructor(id = '') {
        super();
        this.id = id;
    }
}
class GdaToast {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.toastConfigDefault = new GdaToastConfig();
    }
    selectedComponentRef(direction = 'top-right') {
        switch (direction) {
            case 'top-center':
                return 'componentRefTopCenter';
            case 'top-left':
                return 'componentRefTopLeft';
            case 'bottom-right':
                return 'componentRefBottomRight';
            case 'bottom-center':
                return 'componentRefBottomCenter';
            case 'bottom-left':
                return 'componentRefBottomLeft';
            case 'top-right':
            default:
                return 'componentRefTopRight';
        }
    }
    openToast(text, config) {
        if (!document.body.querySelector('.gda-toast-' + ((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))) {
            this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))] = this.componentFactoryResolver
                .resolveComponentFactory(GdaToastComponent)
                .create(this.injector);
            this.appRef.attachView(this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].hostView);
            const domElem = this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].hostView
                .rootNodes[0];
            document.body.appendChild(domElem);
            this.createToast(text, config);
        }
        else {
            this.createToast(text, config);
        }
    }
    createToast(text, config) {
        const c = {
            id: 'gda-toast-' + (new Date().getTime()),
            direction: (config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction,
            classToast: (config === null || config === void 0 ? void 0 : config.classToast) || this.toastConfigDefault.classToast,
            styleToast: (config === null || config === void 0 ? void 0 : config.styleToast) || this.toastConfigDefault.styleToast,
            timing: (config === null || config === void 0 ? void 0 : config.timing) || this.toastConfigDefault.timing,
        };
        this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts.push({ text: text, config: c });
        if (c.timing !== 'indeterminate') {
            of(true).pipe(delay(c.timing || 0)).subscribe(() => {
                this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts = this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts.filter((toast) => toast.config.id !== c.id);
                of(true).pipe(delay(500)).subscribe(() => {
                    if (!this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts.length) {
                        this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.closeToast.unsubscribe();
                        this.appRef.detachView(this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].hostView);
                        this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].destroy();
                    }
                });
            });
        }
        else {
            this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.closeToast.subscribe((id) => {
                this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts = this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts.filter((toast) => toast.config.id !== id);
                of(true).pipe(delay(500)).subscribe(() => {
                    if (!this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.toasts.length) {
                        this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].instance.closeToast.unsubscribe();
                        this.appRef.detachView(this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].hostView);
                        this[this.selectedComponentRef(((config === null || config === void 0 ? void 0 : config.direction) || this.toastConfigDefault.direction))].destroy();
                    }
                });
            });
        }
    }
}
GdaToast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToast, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
GdaToast.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToast, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToast, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });

class GdaToastModule {
}
GdaToastModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaToastModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastModule, declarations: [GdaToastComponent], imports: [CommonModule] });
GdaToastModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaToastComponent
                    ],
                    imports: [
                        CommonModule
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-toast
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaToast, GdaToastComponent, GdaToastConfig, GdaToastModule };
//# sourceMappingURL=gda-toast.mjs.map

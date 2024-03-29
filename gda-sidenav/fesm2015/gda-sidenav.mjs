import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Component, ChangeDetectionStrategy, HostBinding, ViewChild, Input, Output, HostListener, NgModule } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class GdaSidenavService {
    constructor() {
        this.toggle = new EventEmitter();
        this.widthContainer = new EventEmitter();
        this.opened = false;
        this.directionsEmit = new EventEmitter();
        this.directions = 'left';
    }
}
GdaSidenavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaSidenavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class GdaSidenavHeader {
    constructor(gdaSidenavService, elementRef, renderer, cd) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.cd = cd;
        this.setClass = 'gda-sidenav-header';
        this.opened = true;
        this.directionsVal = 'left';
        this.widthContainer = 0;
        this.resizeVal = false;
        this.statusSidenav = new EventEmitter();
    }
    get setStyle() {
        return {
            'left': this.directionsVal === 'left' ? 0 : '',
            'right': this.directionsVal === 'right' ? 0 : '',
        };
    }
    ;
    /**
     * Directions
     */
    set directions(val) {
        this.gdaSidenavService.directions = val;
        this.gdaSidenavService.directionsEmit.emit(val);
        this.directionsVal = val;
    }
    ;
    /**
     * Resize
     */
    set resize(val) {
        var _a;
        this.resizeVal = val;
        if (((_a = this.containerEl) === null || _a === void 0 ? void 0 : _a.nativeElement) && this.resizeVal) {
            const t = this;
            this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
            this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
            if (!this.resizeObserve) {
                this.resizeObserve = new ResizeObserver(function (entries) {
                    let rect = entries[0].contentRect;
                    let width = rect.width;
                    t.gdaSidenavService.widthContainer.emit(width);
                    if (t.opened) {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                    }
                    else {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                    }
                });
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
            else {
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
        }
        else if (!this.resizeVal && this.resizeObserve) {
            this.resizeObserve.disconnect();
        }
    }
    ;
    ngOnInit() {
        this.gdaSidenavService.opened = this.opened;
        this.gdaSidenavService.toggle.subscribe(() => {
            this.opened = !this.opened;
            this.statusSidenav.emit(this.opened);
            this.cd.detectChanges();
        });
        this.cd.detectChanges();
    }
    ngAfterViewInit() {
        this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
        this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
        if (this.resizeVal) {
            const t = this;
            this.resizeObserve = new ResizeObserver(function (entries) {
                let rect = entries[0].contentRect;
                let width = rect.width;
                t.gdaSidenavService.widthContainer.emit(width);
                if (t.opened) {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                }
                else {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                }
            });
            this.resizeObserve.observe(this.containerEl.nativeElement);
        }
        this.cd.detectChanges();
    }
    /**
     * Toggle
     */
    toggle() {
        this.gdaSidenavService.toggle.emit(this.widthContainer);
    }
}
GdaSidenavHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavHeader, deps: [{ token: GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaSidenavHeader, selector: "gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]", inputs: { opened: "opened", directions: "directions", resize: "resize" }, outputs: { statusSidenav: "statusSidenav" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavHeader, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]',
                    template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], setStyle: [{
                type: HostBinding,
                args: ['style']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], opened: [{
                type: Input
            }], directions: [{
                type: Input
            }], resize: [{
                type: Input
            }], statusSidenav: [{
                type: Output
            }] } });

class GdaSidenav {
    constructor(gdaSidenavService, elementRef, renderer, cd) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.cd = cd;
        this.setClass = 'gda-sidenav';
        this.opened = false;
        this.mode = 'responsive';
        this.gdaSidenavService.toggle.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            this.opened = !this.opened;
            this.resizeSidenav();
        });
        this.gdaSidenavService.widthContainer.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            setTimeout(() => this.resizeSidenav(), 0);
        });
        this.directions = 'left';
        this.widthContainer = 0;
    }
    getStatusBackdoor() {
        if (this.mode === 'over' && this.opened === true) {
            return true;
        }
        if (this.mode === 'responsive' && window.innerWidth <= 900 && this.opened === true) {
            return true;
        }
        return false;
    }
    pushOpen() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
        this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
    }
    overOpen() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-left', '0');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-right', '0');
    }
    pushClose() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', '0');
    }
    overClose() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-left', '0');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-right', '0');
    }
    resizeSidenav() {
        if (this.opened) {
            /* CONTAINER HEADER */
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'width', (this.widthContainer + 'px'));
            /* CONTAINER BODY */
            if (this.mode === 'push') {
                this.pushOpen();
            }
            if (this.mode === 'over') {
                this.overOpen();
            }
            if (this.mode === 'responsive') {
                if (window.innerWidth > 900) {
                    this.pushOpen();
                }
                else {
                    this.overOpen();
                }
            }
        }
        else {
            /* CONTAINER HEADER */
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'width', '0');
            /* CONTAINER BODY */
            if (this.mode === 'push') {
                this.pushClose();
            }
            if (this.mode === 'over') {
                this.overClose();
            }
            if (this.mode === 'responsive') {
                if (window.innerWidth > 900) {
                    this.pushClose();
                }
                else {
                    this.overClose();
                }
            }
        }
        this.cd.detectChanges();
    }
    ngAfterViewInit() {
        this.opened = this.gdaSidenavService.opened;
        this.resizeSidenav();
        this.directions = this.gdaSidenavService.directions;
        this.gdaSidenavService.directionsEmit.subscribe((val) => this.directions = val);
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
        setTimeout(() => {
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'transition', 'width .2s ease-in-out');
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        }, 300);
    }
    onResize() {
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
    }
    toggleBackdoor() {
        this.gdaSidenavService.toggle.emit();
        this.cd.detectChanges();
    }
}
GdaSidenav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenav, deps: [{ token: GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenav.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaSidenav, selector: "gda-sidenav, .gda-sidenav, [gda-sidenav]", inputs: { mode: "mode" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
        GdaSidenavService
    ], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "containerBodyEl", first: true, predicate: ["containerBody"], descendants: true }], ngImport: i0, template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]"></ng-content>
      <div class="backdoor" *ngIf="getStatusBackdoor()" (click)="toggleBackdoor()" @backdoor></div>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('backdoor', [
            transition(':enter', [
                style({ opacity: 1 }),
                animate('.2s ease-in-out', keyframes([
                    style({
                        opacity: 0
                    }),
                    style({
                        opacity: 1
                    })
                ]))
            ]),
            transition(':leave', [
                style({ opacity: 0 }),
                animate('.2s ease-in-out', keyframes([
                    style({
                        opacity: 1
                    }),
                    style({
                        opacity: 0
                    })
                ]))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenav, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-sidenav, .gda-sidenav, [gda-sidenav]',
                    template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]"></ng-content>
      <div class="backdoor" *ngIf="getStatusBackdoor()" (click)="toggleBackdoor()" @backdoor></div>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `,
                    providers: [
                        GdaSidenavService
                    ],
                    animations: [
                        trigger('backdoor', [
                            transition(':enter', [
                                style({ opacity: 1 }),
                                animate('.2s ease-in-out', keyframes([
                                    style({
                                        opacity: 0
                                    }),
                                    style({
                                        opacity: 1
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ opacity: 0 }),
                                animate('.2s ease-in-out', keyframes([
                                    style({
                                        opacity: 1
                                    }),
                                    style({
                                        opacity: 0
                                    })
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], containerBodyEl: [{
                type: ViewChild,
                args: ['containerBody']
            }], mode: [{
                type: Input
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class GdaSidenavModule {
}
GdaSidenavModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaSidenavModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavModule, declarations: [GdaSidenav,
        GdaSidenavHeader], imports: [CommonModule], exports: [GdaSidenav,
        GdaSidenavHeader] });
GdaSidenavModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaSidenav,
                        GdaSidenavHeader
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        GdaSidenav,
                        GdaSidenavHeader
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-sidenav
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaSidenav, GdaSidenavHeader, GdaSidenavModule, GdaSidenavService };
//# sourceMappingURL=gda-sidenav.mjs.map
//# sourceMappingURL=gda-sidenav.mjs.map

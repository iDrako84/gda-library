import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Component, HostBinding, ViewChild, Input, NgModule } from '@angular/core';
import { of, delay } from 'rxjs';
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
GdaSidenavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaSidenavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class GdaSidenavHeaderComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.opened = false;
        this.directionsVal = 'left';
        this.widthContainer = 0;
        this.resizeVal = false;
    }
    get setClass() {
        return {
            'gda-sidenav-header': true
        };
    }
    ;
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
        this.resizeVal = val;
        if (this.containerEl?.nativeElement && this.resizeVal) {
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
        });
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
    }
    /**
     * Toggle
     */
    toggle() {
        this.gdaSidenavService.toggle.emit(this.widthContainer);
    }
}
GdaSidenavHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavHeaderComponent, deps: [{ token: GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaSidenavHeaderComponent, selector: "gda-sidenav-header", inputs: { opened: "opened", directions: "directions", resize: "resize" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-sidenav-header',
                    template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
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
            }] } });

class GdaSidenavComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.setClass = true;
        this.opened = false;
        this.gdaSidenavService.toggle.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            this.opened = !this.opened;
            if (this.opened) {
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', (this.widthContainer + 'px'));
                this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
                this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
            }
            else {
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', 0);
                this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
                this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', 0);
            }
        });
        this.gdaSidenavService.widthContainer.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            of(true).pipe(delay(0)).subscribe(() => {
                if (this.opened) {
                    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', (this.widthContainer + 'px'));
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
                }
                else {
                    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', 0);
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', 0);
                }
            });
        });
        this.directions = 'left';
        this.widthContainer = 0;
    }
    ngAfterViewInit() {
        this.opened = this.gdaSidenavService.opened;
        this.directions = this.gdaSidenavService.directions;
        this.gdaSidenavService.directionsEmit.subscribe((val) => this.directions = val);
        of(true).pipe(delay(300)).subscribe(() => {
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        });
    }
}
GdaSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavComponent, deps: [{ token: GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaSidenavComponent, selector: "gda-sidenav", host: { properties: { "class.gda-sidenav": "this.setClass" } }, providers: [
        GdaSidenavService
    ], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "containerBodyEl", first: true, predicate: ["containerBody"], descendants: true }], ngImport: i0, template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-sidenav',
                    template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `,
                    providers: [
                        GdaSidenavService
                    ]
                }]
        }], ctorParameters: function () { return [{ type: GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-sidenav']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], containerBodyEl: [{
                type: ViewChild,
                args: ['containerBody']
            }] } });

class GdaSidenavModule {
}
GdaSidenavModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaSidenavModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavModule, declarations: [GdaSidenavComponent,
        GdaSidenavHeaderComponent], imports: [CommonModule], exports: [GdaSidenavComponent,
        GdaSidenavHeaderComponent] });
GdaSidenavModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaSidenavComponent,
                        GdaSidenavHeaderComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        GdaSidenavComponent,
                        GdaSidenavHeaderComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-sidenav
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaSidenavComponent, GdaSidenavHeaderComponent, GdaSidenavModule, GdaSidenavService };
//# sourceMappingURL=gda-sidenav.mjs.map

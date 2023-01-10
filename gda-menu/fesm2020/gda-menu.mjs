import * as i0 from '@angular/core';
import { Injectable, Directive, HostBinding, Input, HostListener, TemplateRef, Component, ViewChild, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

class DataForPosition {
    constructor(positionButton, typeButton, positionContainer, viewW, viewH) {
        this.positionButton = positionButton;
        this.typeButton = typeButton;
        this.positionContainer = positionContainer;
        this.viewW = viewW;
        this.viewH = viewH;
    }
}
class GdaMenuService {
    constructor(rendererFactory) {
        this.rendererFactory = rendererFactory;
        this.menuClose = new Subject();
        this.onEnter = new Subject();
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    resetContainerAndCreateData(container, el) {
        // RESET CONTAINER
        this.renderer.removeStyle(container, 'top');
        this.renderer.removeStyle(container, 'left');
        this.renderer.removeStyle(container, 'width');
        this.renderer.removeStyle(container, 'height');
        this.renderer.removeStyle(container, 'overflow');
        // DATA
        return {
            positionButton: el.nativeElement.getBoundingClientRect(),
            typeButton: el.nativeElement.classList.contains('gda-menu-item'),
            positionContainer: container.getBoundingClientRect(),
            viewW: window.innerWidth,
            viewH: window.innerHeight
        };
    }
    setDirection(direction, container, el) {
        if (direction === 'left')
            this.setDirectionLeft(container, el);
        if (direction === 'right')
            this.setDirectionRight(container, el);
        if (direction === 'bottom')
            this.setDirectionBottom(container, el);
        if (direction === 'top')
            this.setDirectionTop(container, el);
    }
    setDirectionLeft(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - 1}px`);
        if (data.viewW < (data.positionButton.right + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left - data.positionContainer.width}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${data.typeButton ? (data.positionButton.left - data.positionContainer.width) : (data.positionButton.right + 5)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionRight(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - 1}px`);
        if (data.viewW < (data.positionButton.right + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left - data.positionContainer.width}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${data.typeButton ? data.positionButton.right : (data.positionButton.right + 5)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionBottom(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top + data.positionButton.height + 1}px`);
        if (data.viewW > (data.positionButton.left + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${(data.positionButton.right - data.positionContainer.width)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionButton.height + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'top', `${data.positionButton.top - (data.viewH - data.positionButton.top - 10)}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionTop(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - data.positionContainer.height - 1}px`);
        if (data.viewW > (data.positionButton.left + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${(data.positionButton.right - data.positionContainer.width)}px`);
        }
        if (data.positionContainer.height > data.positionButton.top) {
            this.renderer.setStyle(container, 'height', `${data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'top', `${data.positionButton.top + data.positionButton.height + 1}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
}
GdaMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
GdaMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }]; } });

const iconArrow = `
    <svg
        width="24"
        height="24"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
    </svg>
`;
class GdaMenuItemDirective {
    // @ViewChild('button', { static: true }) buttonEl!: ElementRef;
    // @ViewChild('icon', { static: true }) iconEl!: ElementRef;
    constructor(elementRef, renderer, gdaMenuService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaMenuService = gdaMenuService;
        this.setClass = 'gda-menu-item';
        this.direction = 'right';
    }
    ngAfterViewInit() {
        if (this.elementRef.nativeElement.classList.contains('gda-menu-trigger')) {
            const span = this.renderer.createElement('span');
            this.renderer.addClass(span, 'gda-menu-item-button-icon');
            this.renderer.addClass(span, `gda-menu-item-button-icon-right`);
            span.innerHTML = iconArrow;
            this.renderer.appendChild(this.elementRef.nativeElement, span);
        }
        // this.renderer.setStyle(this.elementRef.nativeElement, 'text-align', direction === 'right' ? 'left' : 'right');
    }
    onClick(e) {
        e.stopPropagation();
        this.animationClick(e);
        if (!this.elementRef.nativeElement.classList.contains('gda-menu-trigger')) {
            setTimeout(() => this.gdaMenuService.menuClose.next(), 200);
        }
    }
    onEnter(e) {
        const container = this.renderer.parentNode(this.elementRef.nativeElement);
        this.gdaMenuService.onEnter.next({ parent: container, button: this.elementRef, direction: this.direction });
    }
    animationClick(e) {
        if (e) {
            const div = this.renderer.createElement('div');
            this.renderer.appendChild(this.elementRef.nativeElement, div);
            const d = Math.max(this.elementRef.nativeElement.clientWidth, this.elementRef.nativeElement.clientHeight);
            div.style.width = div.style.height = d + 'px';
            const rect = this.elementRef.nativeElement.getBoundingClientRect();
            div.style.left = e.clientX - rect.left - d / 2 + 'px';
            div.style.top = e.clientY - rect.top - d / 2 + 'px';
            div.style.borderRadius = '50%';
            div.style.backgroundColor = 'rgb(255, 255, 255)';
            div.style.position = 'absolute';
            div.style.WebkitTransform = 'scale(0)';
            div.style.transform = 'scale(0)';
            div.style.WebkitAnimation = 'gda-menu-button-ripple 300ms linear';
            div.style.animation = 'gda-menu-button-ripple 300ms linear';
            setTimeout(() => this.renderer.removeChild(this.elementRef.nativeElement, div), 400);
        }
    }
}
GdaMenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuItemDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: GdaMenuService }], target: i0.ɵɵFactoryTarget.Directive });
GdaMenuItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuItemDirective, selector: "[gdaMenuItem]", inputs: { direction: "direction" }, host: { listeners: { "click": "onClick($event)", "mouseenter": "onEnter($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaMenuItem]',
                    // template: `
                    //     <button class="gda-menu-item-button" type="button" (click)="onClick($event)" #button>
                    //         <ng-content></ng-content>
                    //         <span class="gda-menu-item-button-icon" #icon>
                    //         </span>
                    //     </button>
                    // `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: GdaMenuService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], direction: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnter: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }] } });

class GdaMenuTriggerDirective {
    constructor(viewContainerRef, elementRef, renderer, gdaMenuService) {
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaMenuService = gdaMenuService;
        this.setClass = 'gda-menu-trigger';
        this.setProperty = '';
        this.sub1 = new Subscription();
        this.sub2 = new Subscription();
        this.direction = 'right';
        this.sub1 = this.gdaMenuService.onEnter.subscribe((e) => {
            if (this.elementRef.nativeElement === e.button.nativeElement) {
                const containers = Array.prototype.slice.call(document.body.querySelectorAll('.gda-menu-containers .gda-menu-container'));
                if (containers.some(c => c === e.parent) && !containers.some(c => c === this.container)) {
                    this.renderer.appendChild(document.body.querySelector('.gda-menu-containers'), this.container);
                    this.gdaMenuService.setDirection(e.direction, this.container, this.elementRef);
                }
            }
            else if (this.container !== e.parent) {
                const containers = Array.prototype.slice.call(document.body.querySelectorAll('.gda-menu-container'));
                const index1 = containers.indexOf(this.container);
                const index2 = containers.indexOf(e.parent);
                if (index1 !== -1 && index2 !== -1 && index1 > index2) {
                    if (this.listenFunc)
                        this.listenFunc();
                    this.renderer.removeChild(document.body, this.container);
                }
            }
        });
        this.sub2 = this.gdaMenuService.menuClose.subscribe(() => {
            if (this.containers) {
                this.listenFunc = this.renderer.listen(this.containers, 'click', (event) => {
                    this.gdaMenuService.menuClose.next();
                });
                this.renderer.removeChild(document.body, this.containers);
            }
            ;
        });
    }
    set gdaMenuTrigger(value) {
        this.menuTriggerVal = value;
    }
    ;
    ngAfterViewInit() {
        this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.menuTriggerVal.contentTemplate);
        this.embeddedViewRef.detectChanges();
        this.container = this.renderer.createElement('div');
        this.renderer.addClass(this.container, 'gda-menu-container');
        this.renderer.addClass(this.container, `gda-menu-container-direction-${this.direction}`);
        for (const node of this.embeddedViewRef.rootNodes) {
            this.renderer.appendChild(this.container, node);
        }
    }
    onClick() {
        const childrenBody = Array.prototype.slice.call(document.body.children);
        if (!childrenBody.some((n) => n.classList.contains('gda-menu-containers'))) {
            this.containers = this.renderer.createElement('div');
            this.renderer.listen(this.containers, 'click', (event) => {
                this.gdaMenuService.menuClose.next();
            });
            this.renderer.addClass(this.containers, 'gda-menu-containers');
            this.renderer.appendChild(document.body, this.containers);
            this.renderer.appendChild(this.containers, this.container);
            this.gdaMenuService.setDirection(this.direction, this.container, this.elementRef);
        }
        else {
            if (childrenBody.some(c => c === this.container)) {
                this.renderer.removeChild(this.containers, this.container);
            }
            else {
                this.renderer.appendChild(this.containers, this.container);
                this.gdaMenuService.setDirection(this.direction, this.container, this.elementRef);
            }
        }
    }
    ngOnDestroy() {
        if (this.container)
            this.renderer.removeChild(this.containers, this.container);
        if (this.listenFunc)
            this.listenFunc();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
GdaMenuTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTriggerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: GdaMenuService }], target: i0.ɵɵFactoryTarget.Directive });
GdaMenuTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuTriggerDirective, selector: "[gdaMenuTrigger]", inputs: { gdaMenuTrigger: "gdaMenuTrigger", direction: "direction" }, host: { listeners: { "click": "onClick()" }, properties: { "class": "this.setClass", "attr.data-menu": "this.setProperty" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaMenuTrigger]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: GdaMenuService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], setProperty: [{
                type: HostBinding,
                args: ['attr.data-menu']
            }], gdaMenuTrigger: [{
                type: Input
            }], direction: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class GdaMenuComponent {
    constructor(el) {
        this.el = el;
        /**
         * Display
         */
        this.setStyle = 'none';
    }
}
GdaMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuComponent, selector: "gda-menu", host: { properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-menu',
                    template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { setStyle: [{
                type: HostBinding,
                args: ['style.display']
            }], contentTemplate: [{
                type: ViewChild,
                args: ['content', { read: TemplateRef, static: false }]
            }] } });

class GdaMenuModule {
}
GdaMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuModule, declarations: [GdaMenuComponent,
        GdaMenuTriggerDirective,
        GdaMenuItemDirective], exports: [GdaMenuComponent,
        GdaMenuTriggerDirective,
        GdaMenuItemDirective] });
GdaMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaMenuComponent,
                        GdaMenuTriggerDirective,
                        GdaMenuItemDirective
                    ],
                    exports: [
                        GdaMenuComponent,
                        GdaMenuTriggerDirective,
                        GdaMenuItemDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaMenuComponent, GdaMenuItemDirective, GdaMenuModule, GdaMenuTriggerDirective };
//# sourceMappingURL=gda-menu.mjs.map

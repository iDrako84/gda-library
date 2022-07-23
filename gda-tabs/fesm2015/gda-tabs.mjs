import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, HostBinding, ViewChild, Input, ViewChildren, Output, NgModule } from '@angular/core';
import { of, delay } from 'rxjs';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

class GdaTabsStyleStatusModel {
    constructor(backgroundColor, color) {
        this.backgroundColor = backgroundColor;
        this.color = color;
    }
}
class GdaTabsStyleModel {
    constructor(normal = { backgroundColor: '#ddd', color: '#000' }, selected = { backgroundColor: '#ddd', color: '#000' }, barBackgroundColor = '#000') {
        this.normal = normal;
        this.selected = selected;
        this.barBackgroundColor = barBackgroundColor;
    }
}

class GdaTabsService {
    constructor() {
        this.tabsStyle = new GdaTabsStyleModel();
    }
}
GdaTabsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ListTabsModel$1 {
    constructor(position, title) {
        this.position = position;
        this.title = title;
    }
}
class GdaTabsPrivateService {
    constructor() {
        this.callForId = new EventEmitter();
        this.listTabs = [];
        this.buttonLoaded = new EventEmitter();
        this.indexTabVal = 0;
        this.indexTabChanges = new EventEmitter();
        this.indexTabChangesEmit = new EventEmitter();
    }
    tabLoaded(el, i) {
        var _a;
        if (!this.gdaTabsEl)
            this.gdaTabsEl = el;
        if (i === undefined) {
            setTimeout(() => this.createTabs());
        }
        else {
            const tabsElN = ((_a = this.gdaTabsEl.querySelectorAll('gda-tab')) === null || _a === void 0 ? void 0 : _a.length) || 0;
            if (tabsElN === (i + 1))
                this.createTabs();
        }
    }
    createTabs() {
        this.listTabs = [];
        const tabs = this.gdaTabsEl.querySelectorAll('gda-tab');
        tabs.forEach((tab, index) => this.callForId.emit(index));
        this.buttonLoaded.emit(this.listTabs);
    }
    addTab(tab) {
        this.listTabs.push(tab);
    }
    getIndexTab() {
        return this.indexTabVal;
    }
    setIndexTab(indexTab) {
        this.indexTabChanges.emit({ new: indexTab, old: this.indexTabVal });
        this.indexTabVal = indexTab;
    }
    setTitle(position, title) {
        if (this.listTabs.some((tab) => tab.position = position)) {
            this.listTabs[position].title = title;
            this.buttonLoaded.emit(this.listTabs);
        }
    }
    getAnimation() {
        return this.animation;
    }
    setAnimation(animation) {
        this.animation = animation;
    }
}
GdaTabsPrivateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsPrivateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsPrivateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsPrivateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsPrivateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class GdaTabComponent {
    constructor(cd, elementRef, renderer, gdaTabsService, gdaTabsPrivateService) {
        this.cd = cd;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaTabsService = gdaTabsService;
        this.gdaTabsPrivateService = gdaTabsPrivateService;
        /* CLASS */
        this.setClass = 'gda-tab';
        this.heightTab = '0';
        this.tabTitleVal = '';
        this.position = null;
        this.leftEnter = '0';
        this.leftLeave = '0';
        this.animations = false;
        this.sub1 = this.gdaTabsPrivateService.callForId.subscribe((position) => {
            const container = this.renderer.parentNode(this.elementRef.nativeElement);
            container.querySelectorAll('gda-tab').forEach((tab, index) => {
                if (tab === this.elementRef.nativeElement)
                    this.position = index;
            });
            if (position === this.position)
                this.gdaTabsPrivateService.addTab({ position: position, title: this.tabTitleVal });
            if (this.contentEl)
                this.heightTab = this.contentEl.nativeElement.offsetHeight + 'px';
            this.animations = false;
            this.cd.detectChanges();
        });
        this.sub2 = this.gdaTabsPrivateService.indexTabChanges.subscribe((change) => {
            if (change.new === this.position) {
                if (this.position !== null) {
                    if (this.position > change.old) {
                        this.leftEnter = '100%';
                    }
                    else if (this.position < change.old) {
                        this.leftEnter = '-100%';
                    }
                }
                this.cd.detectChanges();
                setTimeout(() => {
                    this.cd.detectChanges();
                    this.heightTab = this.contentEl.nativeElement.offsetHeight + 'px';
                });
            }
            else {
                if (this.position !== null) {
                    if (this.position > change.new) {
                        this.leftLeave = '100%';
                    }
                    else if (this.position < change.new) {
                        this.leftLeave = '-100%';
                    }
                }
                this.cd.detectChanges();
                setTimeout(() => {
                    this.cd.detectChanges();
                    // this.heightTab = 'min-content';
                });
            }
        });
        this.sub3 = this.gdaTabsPrivateService.buttonLoaded.subscribe(() => of(true).pipe(delay(100)).subscribe(() => {
            const animationPrivate = this.gdaTabsPrivateService.getAnimation();
            if (animationPrivate !== undefined)
                this.animations = animationPrivate;
            else if (this.gdaTabsService.animationsActivated !== undefined)
                this.animations = this.gdaTabsService.animationsActivated;
            else
                this.animations = true;
        }));
    }
    /* TITLE */
    set titleTab(title) {
        this.tabTitleVal = title;
        if (this.position !== null) {
            this.gdaTabsPrivateService.setTitle(this.position, title);
        }
    }
    ;
    ngAfterViewInit() {
        setTimeout(() => {
            this.gdaTabsPrivateService.tabLoaded(this.renderer.parentNode(this.elementRef.nativeElement));
            this.cd.detectChanges();
        });
    }
    onTabActive() {
        return this.position === this.gdaTabsPrivateService.getIndexTab();
    }
    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        this.gdaTabsPrivateService.tabLoaded(this.renderer.parentNode(this.elementRef.nativeElement));
    }
}
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: GdaTabsService }, { token: GdaTabsPrivateService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaTabComponent, selector: "gda-tab", inputs: { titleTab: "titleTab" }, host: { properties: { "class": "this.setClass", "style.height": "this.heightTab" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["contentEl"], descendants: true }], ngImport: i0, template: `
    <div 
      class="gda-tabs-tab-content"
      *ngIf="onTabActive()"
      [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}"
      #contentEl>
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('tabsAnimation', [
            transition(':enter', [
                style({ position: 'absolute', left: '{{ leftEnter }}' }),
                animate('{{ animations }}', keyframes([
                    style({
                        left: '{{ leftEnter }}'
                    }),
                    style({
                        left: 0
                    })
                ]))
            ]),
            transition(':leave', [
                style({ position: 'absolute', left: 0 }),
                animate('{{ animations }}', keyframes([
                    style({
                        left: 0
                    }),
                    style({
                        left: '{{ leftLeave }}'
                    })
                ]))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tab',
                    template: `
    <div 
      class="gda-tabs-tab-content"
      *ngIf="onTabActive()"
      [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}"
      #contentEl>
      <ng-content></ng-content>
    </div>
  `,
                    animations: [
                        trigger('tabsAnimation', [
                            transition(':enter', [
                                style({ position: 'absolute', left: '{{ leftEnter }}' }),
                                animate('{{ animations }}', keyframes([
                                    style({
                                        left: '{{ leftEnter }}'
                                    }),
                                    style({
                                        left: 0
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ position: 'absolute', left: 0 }),
                                animate('{{ animations }}', keyframes([
                                    style({
                                        left: 0
                                    }),
                                    style({
                                        left: '{{ leftLeave }}'
                                    })
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: GdaTabsService }, { type: GdaTabsPrivateService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], heightTab: [{
                type: HostBinding,
                args: ['style.height']
            }], contentEl: [{
                type: ViewChild,
                args: ['contentEl', { static: false }]
            }], titleTab: [{
                type: Input
            }] } });

class ListTabsModel {
    constructor(position, title) {
        this.position = position;
        this.title = title;
    }
}
class GdaTabsComponent {
    constructor(cd, renderer, gdaTabsPrivateService, gdaTabsService) {
        this.cd = cd;
        this.renderer = renderer;
        this.gdaTabsPrivateService = gdaTabsPrivateService;
        this.gdaTabsService = gdaTabsService;
        this.setClass = 'gda-tabs';
        this.step = 0;
        this.tabStyle = this.gdaTabsService.tabsStyle;
        this.indexTab = 0;
        this.buttons = [];
        this.indexTabActivated = new EventEmitter();
        this.sub1 = this.gdaTabsPrivateService.buttonLoaded.subscribe((buttons) => {
            this.buttons = buttons.slice();
            this.cd.detectChanges();
            setTimeout(() => {
                const buttonEl = this.buttonsTabEl.nativeElement.querySelectorAll('button');
                let lengthButtons = 0;
                for (const button of buttonEl)
                    lengthButtons += button.offsetWidth;
                this.step = lengthButtons / this.buttons.length;
                if (!this.buttons[this.gdaTabsPrivateService.getIndexTab()]) {
                    this.gdaTabsPrivateService.setIndexTab(this.buttons.length - 1);
                    this.gdaTabsPrivateService.indexTabChangesEmit.emit(this.buttons.length - 1);
                }
                ;
                this.getArrow('control');
                this.renderer.removeStyle(this.tabsContentEl.nativeElement, 'opacity');
                this.cd.detectChanges();
            });
        });
        this.sub2 = this.gdaTabsPrivateService.indexTabChangesEmit.subscribe((change) => this.indexTabActivated.emit(change));
        this.viewArrow = false;
        window.onresize = () => {
            this.getArrow('control');
            this.cd.detectChanges();
        };
    }
    set animation(val) {
        this.gdaTabsPrivateService.setAnimation(val);
    }
    ;
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        if (((_a = changes.indexTab) === null || _a === void 0 ? void 0 : _a.firstChange) === false && ((_b = changes.indexTab) === null || _b === void 0 ? void 0 : _b.previousValue) !== undefined && ((_c = changes.indexTab) === null || _c === void 0 ? void 0 : _c.previousValue) !== ((_d = changes.indexTab) === null || _d === void 0 ? void 0 : _d.currentValue))
            this.gdaTabsPrivateService.setIndexTab(changes.indexTab.currentValue);
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.tabsContentEl.nativeElement, 'opacity', '0');
    }
    getButtons() {
        return this.buttons;
    }
    onSelectedTab(e, index) {
        if (e) {
            this.animateRipple(e, this.buttonEl.toArray()[index], this.renderer);
        }
        this.gdaTabsPrivateService.setIndexTab(index);
        this.gdaTabsPrivateService.indexTabChangesEmit.emit(index);
        if (this.getArrow('return')) {
            const position = this.buttonsTabEl.nativeElement.getBoundingClientRect();
            const partContent = this.buttonsTabEl.nativeElement.offsetWidth / 4;
            if (e) {
                if (partContent > e.clientX - position.left) {
                    this.animationScroll(0);
                }
                else if ((partContent * 3) < e.clientX - position.left) {
                    this.animationScroll(1);
                }
            }
        }
        this.cd.detectChanges();
    }
    getIndexTab() {
        return this.gdaTabsPrivateService.getIndexTab();
    }
    arrow(event, arrow) {
        if (event) {
            event.stopPropagation();
            this.animateRipple(event, arrow === 0 ? this.arrowBackEl : this.arrowForwardEl, this.renderer);
        }
        this.animationScroll(arrow);
    }
    animationScroll(arrow) {
        const step = 10;
        let fase = 0;
        const scrollInterval = setInterval(() => {
            if (step !== fase) {
                if (arrow === 1) {
                    fase += 1;
                    this.renderer.setProperty(this.buttonsTabEl.nativeElement, 'scrollLeft', (this.buttonsTabEl.nativeElement.scrollLeft + (this.step / 10)));
                }
                else {
                    fase += 1;
                    this.renderer.setProperty(this.buttonsTabEl.nativeElement, 'scrollLeft', (this.buttonsTabEl.nativeElement.scrollLeft - (this.step / 10)));
                }
            }
            else {
                clearInterval(scrollInterval);
            }
        });
    }
    mouseWheel(event) {
        const evento = window.event || event; // Per i vecchi Internet Explorer
        const movimento = Math.max(-1, Math.min(1, evento.wheelDelta || -evento.detail));
        this.arrow(null, movimento > 0 ? 0 : 1);
        // Per Internet Explorer
        evento.returnValue = false;
        // Per Chrome e Firefox
        if (evento.preventDefault) {
            evento.preventDefault();
        }
    }
    getArrow(type) {
        if (this.tabsContentEl) {
            const buttonsEl = this.buttonsTabEl.nativeElement.querySelectorAll('button');
            let totWidth = 0;
            for (const button of buttonsEl) {
                totWidth += button.offsetWidth;
            }
            const divTot = this.tabsHeaderContentEl.nativeElement.offsetWidth;
            totWidth = totWidth;
            if (type === 'return') {
                return divTot < totWidth;
            }
            else {
                this.viewArrow = (divTot < totWidth);
            }
        }
        else {
            if (type === 'return') {
                return false;
            }
        }
        return false;
    }
    getStyleButton(active) {
        return {
            backgroundColor: active ? this.tabStyle.selected.backgroundColor : this.tabStyle.normal.backgroundColor,
            color: active ? this.tabStyle.selected.color : this.tabStyle.normal.color
        };
    }
    getStyleBar() {
        return {
            backgroundColor: this.tabStyle.barBackgroundColor
        };
    }
    animateRipple(e, el, renderer) {
        if (el) {
            const div = renderer.createElement('div');
            renderer.appendChild(el.nativeElement, div);
            const d = Math.max(el.nativeElement.clientWidth, el.nativeElement.clientHeight);
            div.style.width = div.style.height = d + 'px';
            const rect = el.nativeElement.getBoundingClientRect();
            div.style.left = e.clientX - rect.left - d / 2 + 'px';
            div.style.top = e.clientY - rect.top - d / 2 + 'px';
            div.style.borderRadius = '50%';
            div.style.backgroundColor = 'rgb(255, 255, 255)';
            div.style.position = 'absolute';
            div.style.WebkitTransform = 'scale(0)';
            div.style.transform = 'scale(0)';
            div.style.WebkitAnimation = 'gda-tabs-ripple 300ms linear';
            div.style.animation = 'gda-tabs-ripple 300ms linear';
            of(true).pipe(delay(400)).subscribe(() => renderer.removeChild(el.nativeElement, div));
        }
    }
    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
GdaTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: GdaTabsPrivateService }, { token: GdaTabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaTabsComponent, selector: "gda-tabs", inputs: { indexTab: "indexTab", animation: "animation", tabStyle: "tabStyle" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { properties: { "class": "this.setClass" } }, providers: [
        GdaTabsPrivateService
    ], viewQueries: [{ propertyName: "tabsHeaderContentEl", first: true, predicate: ["tabsHeaderContent"], descendants: true, static: true }, { propertyName: "buttonsTabEl", first: true, predicate: ["buttonsTab"], descendants: true, static: true }, { propertyName: "arrowBackEl", first: true, predicate: ["arrowBack"], descendants: true }, { propertyName: "arrowForwardEl", first: true, predicate: ["arrowForward"], descendants: true }, { propertyName: "tabsContentEl", first: true, predicate: ["tabsContent"], descendants: true }, { propertyName: "buttonEl", predicate: ["buttonEl"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="gda-tabs-button-container" [ngClass]="{'gda-tabs-resize': viewArrow}" #tabsHeaderContent>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-back" *ngIf="viewArrow" (click)="arrow($event, 0)" #arrowBack @tabsArrowAnimation>
        &#x2190;
      </button>
      <div class="gda-tabs-button-container-tab" #buttonsTab>
        <button 
          type="button" 
          *ngFor="let button of getButtons(); let i = index" 
          class="gda-tabs-button" 
          [ngClass]="{active: getIndexTab() === i}" 
          [ngStyle]="getStyleButton(getIndexTab() === i)"
          (click)="onSelectedTab($event, i)" 
          (mousewheel)="mouseWheel($event)"
          #buttonEl>
          <ng-container *ngIf="button.title?.elementRef; else titleString">
            <ng-container *ngTemplateOutlet="button.title"></ng-container>
          </ng-container>
          <ng-template #titleString>
            {{ button.title }}
          </ng-template>
          <div class="gda-tabs-bar" [ngStyle]="getStyleBar()"></div>
        </button>
      </div>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-forward" *ngIf="viewArrow" (click)="arrow($event, 1)" #arrowForward @tabsArrowAnimation>
        &#x2192;
      </button>
    </div>
    <div class="gda-tabs-content" #tabsContent>
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('tabsArrowAnimation', [
            transition(':enter', [
                style({ width: '5%' }),
                animate('0.5s ease-in-out', keyframes([
                    style({
                        width: 0
                    }),
                    style({
                        width: '5%'
                    })
                ]))
            ]),
            transition(':leave', [
                style({ width: '5%' }),
                animate('0.5s ease-in-out', keyframes([
                    style({
                        width: '5%'
                    }),
                    style({
                        width: 0
                    })
                ]))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tabs',
                    template: `
    <div class="gda-tabs-button-container" [ngClass]="{'gda-tabs-resize': viewArrow}" #tabsHeaderContent>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-back" *ngIf="viewArrow" (click)="arrow($event, 0)" #arrowBack @tabsArrowAnimation>
        &#x2190;
      </button>
      <div class="gda-tabs-button-container-tab" #buttonsTab>
        <button 
          type="button" 
          *ngFor="let button of getButtons(); let i = index" 
          class="gda-tabs-button" 
          [ngClass]="{active: getIndexTab() === i}" 
          [ngStyle]="getStyleButton(getIndexTab() === i)"
          (click)="onSelectedTab($event, i)" 
          (mousewheel)="mouseWheel($event)"
          #buttonEl>
          <ng-container *ngIf="button.title?.elementRef; else titleString">
            <ng-container *ngTemplateOutlet="button.title"></ng-container>
          </ng-container>
          <ng-template #titleString>
            {{ button.title }}
          </ng-template>
          <div class="gda-tabs-bar" [ngStyle]="getStyleBar()"></div>
        </button>
      </div>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-forward" *ngIf="viewArrow" (click)="arrow($event, 1)" #arrowForward @tabsArrowAnimation>
        &#x2192;
      </button>
    </div>
    <div class="gda-tabs-content" #tabsContent>
      <ng-content></ng-content>
    </div>
  `,
                    providers: [
                        GdaTabsPrivateService
                    ],
                    animations: [
                        trigger('tabsArrowAnimation', [
                            transition(':enter', [
                                style({ width: '5%' }),
                                animate('0.5s ease-in-out', keyframes([
                                    style({
                                        width: 0
                                    }),
                                    style({
                                        width: '5%'
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ width: '5%' }),
                                animate('0.5s ease-in-out', keyframes([
                                    style({
                                        width: '5%'
                                    }),
                                    style({
                                        width: 0
                                    })
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: GdaTabsPrivateService }, { type: GdaTabsService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], buttonEl: [{
                type: ViewChildren,
                args: ['buttonEl']
            }], tabsHeaderContentEl: [{
                type: ViewChild,
                args: ['tabsHeaderContent', { static: true }]
            }], buttonsTabEl: [{
                type: ViewChild,
                args: ['buttonsTab', { static: true }]
            }], arrowBackEl: [{
                type: ViewChild,
                args: ['arrowBack', { static: false }]
            }], arrowForwardEl: [{
                type: ViewChild,
                args: ['arrowForward', { static: false }]
            }], tabsContentEl: [{
                type: ViewChild,
                args: ['tabsContent', { static: false }]
            }], indexTab: [{
                type: Input
            }], animation: [{
                type: Input
            }], tabStyle: [{
                type: Input
            }], indexTabActivated: [{
                type: Output
            }] } });

class GdaTabsModule {
}
GdaTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsModule, declarations: [GdaTabsComponent,
        GdaTabComponent], imports: [CommonModule], exports: [GdaTabsComponent,
        GdaTabComponent] });
GdaTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaTabsComponent,
                        GdaTabComponent
                    ],
                    imports: [
                        CommonModule,
                    ],
                    exports: [
                        GdaTabsComponent,
                        GdaTabComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of gda-tabs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GdaTabComponent, GdaTabsComponent, GdaTabsModule, GdaTabsService, GdaTabsStyleModel, GdaTabsStyleStatusModel };
//# sourceMappingURL=gda-tabs.mjs.map

import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, HostBinding, ViewChild, Input, ViewChildren, Output, NgModule } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { of, delay, Subscription } from 'rxjs';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

class GdaTabsStyleStatusModel {
    constructor(backgroundColor, color) {
        this.backgroundColor = backgroundColor;
        this.color = color;
    }
}
class GdaTabsStyleModel {
    constructor(normal = { backgroundColor: '#ddd', color: '#000' }, selected = { backgroundColor: '#333', color: '#fff' }, barBackgroundColor = '#000') {
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
GdaTabsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ButtonTabModel$2 {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
class TabsService {
    constructor() {
        this.buttons = [];
        this.buttonActivated = new EventEmitter();
        this.buttonActivatedVal = new ButtonTabModel$2();
        this.preventTabs = 0;
        this.tabsReloaded = new EventEmitter();
        this.checkActive = new EventEmitter();
        this.loadComplete = false;
        this.heightTabActive = 0;
        this.heightTabActive = 0;
    }
}
TabsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TabsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class ButtonTabModel$1 {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
class GdaTabComponent {
    constructor(elementRef, renderer, gdaTabsService, tabsService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaTabsService = gdaTabsService;
        this.tabsService = tabsService;
        /**
         * Class
         */
        this.setClass = true;
        /**
         * Apertura all avvio
         */
        this.isOpen = false;
        this.titleTab = '';
        this.leftEnter = 0;
        this.leftLeave = 0;
        this.button = new ButtonTabModel$1();
        this.enabled = false;
        this.sub1 = this.tabsService.buttonActivated.subscribe((button) => {
            this.button.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            this.button.active = (this.button.id === button.id);
            if (this.button.active) {
                this.tabsService.buttonActivatedVal = button;
            }
            if (this.tabsService.animationsActivated !== undefined) {
                this.animations = this.tabsService.animationsActivated;
            }
            else if (this.gdaTabsService.animationsActivated !== undefined) {
                this.animations = this.gdaTabsService.animationsActivated;
            }
            else {
                this.animations = true;
            }
            if (this.id === button.id) {
                this.button = button;
                if (this.tabsService.preventTabs > this.button?.id) {
                    this.leftEnter = '-100%';
                }
                else if (this.tabsService.preventTabs < this.button?.id) {
                    this.leftEnter = '100%';
                }
            }
            else if (this.tabsService.preventTabs === this.button?.id) {
                if (button.id > this.button?.id) {
                    this.leftLeave = '-100%';
                }
                else if (button.id < this.button?.id) {
                    this.leftLeave = '100%';
                }
            }
            else {
                this.animations = false;
            }
            of(true).pipe(delay(0)).subscribe(() => {
                this.enabled = (this.button?.active);
                of(true).pipe(delay(0)).subscribe(() => {
                    if (this.contentEl?.nativeElement) {
                        this.tabsService.heightTabActive = this.contentEl.nativeElement.offsetHeight;
                    }
                    this.animations = false;
                });
            });
        });
        this.sub2 = this.tabsService.tabsReloaded.subscribe(() => {
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            if (!this.tabsService.buttons.some((button) => button.id === this.id)) {
                this.tabsService.buttons.push(new ButtonTabModel$1(this.id, this.titleTab, false));
            }
            this.tabsService.buttons.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        });
        this.sub3 = this.tabsService.checkActive.subscribe(() => {
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            const button = this.tabsService.buttons.find((button) => button.id === this.id);
            this.enabled = button?.active || false;
            if (button?.active) {
                this.tabsService.buttonActivatedVal = button;
            }
            if (button) {
                this.tabsService.buttonActivated.emit(button);
            }
        });
    }
    ngOnInit() {
        if (this.tabsService.animationsActivated !== undefined) {
            this.animations = this.tabsService.animationsActivated;
        }
        else if (this.gdaTabsService.animationsActivated !== undefined) {
            this.animations = this.gdaTabsService.animationsActivated;
        }
        else {
            this.animations = true;
        }
    }
    ngAfterViewInit() {
        const parent = this.renderer.parentNode(this.elementRef.nativeElement);
        parent.querySelectorAll('gda-tab').forEach((e, i) => {
            e.setAttribute('data-gda-tab', String(i));
        });
        this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
        const button = new ButtonTabModel$1(this.id, this.titleTab, this.tabsService.buttons.some((button) => button.active) ? false : this.isOpen);
        this.tabsService.buttons.push(button);
        if (button.active) {
            of(true).pipe(delay(0)).subscribe(() => {
                this.enabled = true;
                this.tabsService.buttonActivatedVal = button;
                this.tabsService.preventTabs = this.id;
            });
            if (this.contentEl?.nativeElement) {
                this.tabsService.heightTabActive = this.contentEl.nativeElement.offsetHeight;
            }
        }
        this.button = button;
        this.tabsService.buttons.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        if (this.tabsService.loadComplete) {
            this.tabsService.buttons = [];
            this.tabsService.tabsReloaded.emit(true);
        }
        else {
            if (this.gdaTabsService.animationsActivated) {
                this.animations = true;
            }
        }
    }
    /**
     * unsubscribe
     */
    ngOnDestroy() {
        this.animations = false;
        this.tabsService.buttons = this.tabsService.buttons.filter((button) => button.id !== this.id);
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        const parent = this.renderer.parentNode(this.elementRef.nativeElement);
        this.elementRef.nativeElement.remove();
        parent.querySelectorAll('gda-tab').forEach((e, i) => {
            e.setAttribute('data-gda-tab', String(i));
            this.tabsService.buttons[i].id = i;
        });
        this.tabsService.tabsReloaded.emit();
    }
}
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: GdaTabsService }, { token: TabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaTabComponent, selector: "gda-tab", inputs: { titleTab: "titleTab", isOpen: "isOpen" }, host: { properties: { "class.gda-tab": "this.setClass" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div 
            class="gda-tab-content"
            #content
            *ngIf="enabled" 
            [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}">
            <ng-content></ng-content>
        </div>    
    `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-tab',
                    template: `
        <div 
            class="gda-tab-content"
            #content
            *ngIf="enabled" 
            [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}">
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: GdaTabsService }, { type: TabsService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-tab']
            }], contentEl: [{
                type: ViewChild,
                args: ['content', { static: false }]
            }], titleTab: [{
                type: Input
            }], isOpen: [{
                type: Input
            }] } });

class ButtonTabModel {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
class GdaTabsComponent {
    constructor(gdaTabsServiceService, elementRef, tabsService, renderer) {
        this.gdaTabsServiceService = gdaTabsServiceService;
        this.elementRef = elementRef;
        this.tabsService = tabsService;
        this.renderer = renderer;
        /**
         * Class
         */
        this.setClass = true;
        /**
         * Bottoni tabs
         */
        this.buttons = this.tabsService.buttons;
        /**
         * Lunghezza dei bottoni
         */
        this.lengthButtons = 0;
        /**
         * Step per l'animazione
         */
        this.step = 0;
        this.getArrow('control');
        this.enabledMouseWheel = this.getArrow('return');
        this.tabStyle = this.gdaTabsServiceService.tabsStyle;
        this.indexTabActivated = new EventEmitter();
        this.indexTabVal = 0;
        this.sub1 = new Subscription();
        this.sub2 = new Subscription();
        this.tabsLoaded = false;
        this.buttonDisabled = false;
        window.onresize = () => {
            this.getArrow('control');
            this.enabledMouseWheel = this.getArrow('return');
        };
    }
    /**
     * Style
     */
    get setStyle() {
        return {
            'min-height': ((this.tabContentEl?.nativeElement?.offsetHeight || 0) + this.tabsService.heightTabActive) + 'px',
            'visibility': this.tabsLoaded ? 'visible' : 'hidden'
        };
    }
    /**
     * Button style
     */
    set animation(val) {
        this.tabsService.animationsActivated = val;
    }
    ;
    set indexTab(val) {
        of(true).pipe(delay(0)).subscribe(() => {
            this.indexTabVal = val;
            if (this.buttons.length && this.buttons[val] && !this.buttons[val].active) {
                this.tabsService.preventTabs = this.buttons.find((button) => button.active)?.id || 0;
                this.buttons.forEach((button, index) => button.active = (index === val));
                this.tabsService.buttonActivatedVal = this.buttons[val];
                this.tabsService.buttonActivatedVal.active = true;
                this.setTab(null, this.tabsService.buttonActivatedVal, this.tabsService.buttonActivatedVal.id);
            }
        });
    }
    ;
    get indexTab() {
        return this.indexTabVal;
    }
    ngAfterViewInit() {
        this.loadButtons();
        this.sub1 = this.tabsService.tabsReloaded.subscribe(() => {
            this.loadButtons(!this.tabsService.loadComplete);
        });
        this.sub2 = this.tabsService.buttonActivated.subscribe(() => {
            this.buttons = [...this.tabsService.buttons];
        });
        of(true).pipe(delay(500)).subscribe(() => {
            this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'min-height .3s ease-in-out');
        });
    }
    loadButtons(reload = false) {
        of(true).pipe(delay(0)).subscribe(() => {
            if (!this.buttons.length) {
                reload = false;
                this.tabsService.loadComplete = false;
                this.tabsService.buttonActivatedVal = new ButtonTabModel();
                this.tabsService.buttonActivatedVal.active = true;
                this.tabsService.preventTabs = 0;
            }
            this.buttons = this.tabsService.buttons.slice();
            if (reload) {
                if (this.buttons.some((button) => button.id === this.tabsService.buttonActivatedVal.id)) {
                    this.buttons.forEach((button) => button.active = (this.tabsService.buttonActivatedVal.id === button.id));
                    this.tabsService.buttons = this.buttons.slice();
                    this.setTab(null, this.tabsService.buttonActivatedVal, this.tabsService.buttonActivatedVal.id);
                }
                else {
                    this.buttons.forEach((button) => button.active = (0 === button.id));
                    this.tabsService.buttons = this.buttons.slice();
                    this.setTab(null, this.buttons[0], 0);
                }
            }
            if (this.buttons && this.buttons.length) {
                this.renderer.setStyle(this.tabContentEl.nativeElement, 'display', 'inline');
                if (!this.buttons.some((button) => button.active === true)) {
                    if (this.tabsService.buttonActivatedVal.active) {
                        this.buttons.forEach((button) => {
                            if (button.id === this.tabsService.buttonActivatedVal.id) {
                                button.active = true;
                            }
                        });
                        if (!this.buttons.some((button) => button.active === true)) {
                            this.buttons[0].active = true;
                            this.tabsService.preventTabs = 0;
                        }
                        this.tabsService.buttonActivated.emit(this.buttons.find((button) => button.active));
                    }
                    else {
                        this.buttons[0].active = true;
                        this.tabsService.preventTabs = 0;
                        this.tabsService.buttonActivated.emit(this.buttons[0]);
                    }
                }
                if (this.indexTabVal !== (this.buttons.find((button) => button.active)?.id || 0)) {
                    this.indexTabActivated.emit(this.buttons.find((button) => button.active)?.id || 0);
                }
                of(true).pipe(delay(0)).subscribe(() => {
                    const buttonEl = this.tab.nativeElement.querySelectorAll('button');
                    for (const button of buttonEl) {
                        this.lengthButtons = this.lengthButtons + button.offsetWidth;
                    }
                    this.step = this.lengthButtons / this.buttons.length;
                    this.enabledMouseWheel = this.getArrow('return');
                    this.getArrow('control');
                    const bars = this.bar.toArray();
                    const buttonsEl = this.buttonsEl.toArray();
                    bars.forEach((bar) => this.renderer.setStyle(bar.nativeElement, 'transition-duration', '500ms'));
                    buttonsEl.forEach((button) => this.renderer.setStyle(button.nativeElement, 'transition-duration', '500ms'));
                    /* if (this.buttons.find((button: ButtonTabModel) => button.active)) {
                      this.tabsService.buttonActivated.emit(this.buttons.find((button: ButtonTabModel) => button.active));
                    } */
                    this.tabsLoaded = true;
                });
            }
            else {
                if (this.tabContentEl?.nativeElement) {
                    this.renderer.setStyle(this.tabContentEl.nativeElement, 'display', 'none');
                }
            }
            this.tabsService.loadComplete = true;
            if (reload) {
                this.elementRef.nativeElement.querySelectorAll('gda-tab').forEach((e, i) => {
                    e.setAttribute('data-gda-tab', String(i));
                });
                this.tabsService.checkActive.emit();
            }
        });
    }
    /**
     * Visualizza/togli le freccie
     */
    getArrow(type) {
        if (this.tab) {
            const buttonsEl = this.tab.nativeElement.querySelectorAll('button');
            let totWidth = 0;
            for (const button of buttonsEl) {
                totWidth += button.offsetWidth;
            }
            const divTot = this.tabContentEl.nativeElement.offsetWidth;
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
    getContentButton() {
        return {
            width: !this.viewArrow ? '100%' : '90%',
            marginLeft: !this.viewArrow ? 0 : '5%'
        };
    }
    /**
     * Selezione del tab
     */
    setTab(event, buttonEl, i) {
        if (!this.buttonDisabled) {
            this.buttonDisabled = true;
            of(true).pipe(delay(500)).subscribe(() => {
                this.buttonDisabled = false;
            });
            if (event) {
                this.indexTabActivated.emit(i);
            }
            this.indexTabVal = i;
            of(true).pipe(delay(0)).subscribe(() => {
                if (this.elementRef.nativeElement.querySelectorAll('gda-tab')[i]) {
                    if (event) {
                        event?.stopPropagation();
                        this.animateRipple(event, this.buttonsEl.toArray()[i]);
                    }
                    this.tabsService.preventTabs = this.buttons.find((button) => button.active === true)?.id || 0;
                    this.buttons.map((button, i) => {
                        button.active = (button.id === buttonEl.id);
                        if (event) {
                            this.tabsService.buttons[i].active = (button.id === buttonEl.id);
                        }
                    });
                    this.getArrow('control');
                    // this.initSetBar();
                    this.tabsService.buttonActivated.emit(buttonEl);
                    if (this.getArrow('return')) {
                        const position = this.tab.nativeElement.getBoundingClientRect();
                        const partContent = this.tab.nativeElement.offsetWidth / 4;
                        if (event) {
                            if (partContent > event.clientX - position.left) {
                                this.animationScroll('back');
                            }
                            else if ((partContent * 3) < event.clientX - position.left) {
                                this.animationScroll('forward');
                            }
                        }
                    }
                }
            });
        }
    }
    /**
     * Click sulla freccia
     */
    arrow(event, arrow) {
        if (event) {
            event.stopPropagation();
            this.animateRipple(event, arrow === 'back' ? this.arrowBackEl : this.arrowForwardEl);
        }
        this.animationScroll(arrow);
    }
    mouseWheel(event) {
        if (this.enabledMouseWheel) {
            const evento = window.event || event; // Per i vecchi Internet Explorer
            const movimento = Math.max(-1, Math.min(1, evento.wheelDelta || -evento.detail));
            this.arrow(null, movimento > 0 ? 'back' : 'forward');
            // Per Internet Explorer
            evento.returnValue = false;
            // Per Chrome e Firefox
            if (evento.preventDefault) {
                evento.preventDefault();
            }
        }
    }
    /**
     * Animazione dello scrol
     */
    animationScroll(type) {
        const step = 10;
        let fase = 0;
        const scrollInterval = setInterval(() => {
            if (step !== fase) {
                if (type === 'forward') {
                    fase += 1;
                    this.renderer.setProperty(this.tab.nativeElement, 'scrollLeft', (this.tab.nativeElement.scrollLeft + (this.step / 10)));
                }
                else {
                    fase += 1;
                    this.renderer.setProperty(this.tab.nativeElement, 'scrollLeft', (this.tab.nativeElement.scrollLeft - (this.step / 10)));
                }
            }
            else {
                clearInterval(scrollInterval);
            }
        });
    }
    getClass(button) {
        return {
            active: (button.active)
        };
    }
    getStyleBar() {
        return {
            backgroundColor: this.gdaTabsServiceService.tabsStyle.barBackgroundColor
        };
    }
    /**
     * Style bottone
     * @param button tipo bottone
     */
    getStyleButton(button) {
        return {
            backgroundColor: button.active ? this.tabStyle.selected.backgroundColor : this.tabStyle.normal.backgroundColor,
            color: button.active ? this.tabStyle.selected.color : this.tabStyle.normal.color
        };
    }
    animateRipple(e, el) {
        if (el) {
            const div = this.renderer.createElement('div');
            this.renderer.appendChild(el.nativeElement, div);
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
            of(true).pipe(delay(400)).subscribe(() => {
                this.renderer.removeChild(el.nativeElement, div);
            });
        }
    }
    getStyleContent() {
        return {
            top: this.tabContentEl ? (this.tabContentEl.nativeElement.offsetHeight + 'px') : '0'
        };
    }
    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
GdaTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsComponent, deps: [{ token: GdaTabsService }, { token: i0.ElementRef }, { token: TabsService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaTabsComponent, selector: "gda-tabs", inputs: { tabStyle: "tabStyle", animation: "animation", indexTab: "indexTab" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { properties: { "class.gda-tabs": "this.setClass", "style": "this.setStyle" } }, providers: [
        TabsService
    ], viewQueries: [{ propertyName: "tabContentEl", first: true, predicate: ["tabContent"], descendants: true }, { propertyName: "tab", first: true, predicate: ["tab"], descendants: true, static: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "arrowBackEl", first: true, predicate: ["arrowBack"], descendants: true }, { propertyName: "arrowForwardEl", first: true, predicate: ["arrowForward"], descendants: true }, { propertyName: "buttonsEl", predicate: ["buttons"], descendants: true }, { propertyName: "bar", predicate: ["bar"], descendants: true }], ngImport: i0, template: `
    <div class="gda-tab-buttons" #tabContent>
        <button *ngIf="viewArrow" type="button" class="gda-arrow-tabs gda-arrow-tabs-back" (click)="arrow($event, 'back')" #arrowBack @tabsArrowAnimation>
          &#x2190;
        </button>
        <div class="gda-content-buttons" [ngStyle]="getContentButton()" #tab>
            <button *ngFor="let button of buttons; let i = index" type="button" class="gda-button-tab" [ngClass]="getClass(button)" [ngStyle]="getStyleButton(button)" (click)="setTab($event, button, i)" (mousewheel)="mouseWheel($event)" #buttons>
                <ng-container *ngIf="button?.title?.elementRef; else title">
                    <ng-container *ngTemplateOutlet="button.title"></ng-container>
                </ng-container>
                <ng-template #title>
                    {{ button.title }}
                </ng-template>
                <div class="gda-tabs-bar" [ngStyle]="getStyleBar()" #bar></div>
            </button>
        </div>
        <button *ngIf="viewArrow" type="button" class="gda-arrow-tabs gda-arrow-tabs-forward" (click)="arrow($event, 'forward')" #arrowForward @tabsArrowAnimation>
          &#x2192;
        </button>
    </div>
    <div class="gda-content-tab" #content>
        <ng-content></ng-content>
        <p *ngIf="!buttons.length && tabsLoaded">
            Nessun tab rilevato
        </p>
    </div>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-tabs',
                    template: `
    <div class="gda-tab-buttons" #tabContent>
        <button *ngIf="viewArrow" type="button" class="gda-arrow-tabs gda-arrow-tabs-back" (click)="arrow($event, 'back')" #arrowBack @tabsArrowAnimation>
          &#x2190;
        </button>
        <div class="gda-content-buttons" [ngStyle]="getContentButton()" #tab>
            <button *ngFor="let button of buttons; let i = index" type="button" class="gda-button-tab" [ngClass]="getClass(button)" [ngStyle]="getStyleButton(button)" (click)="setTab($event, button, i)" (mousewheel)="mouseWheel($event)" #buttons>
                <ng-container *ngIf="button?.title?.elementRef; else title">
                    <ng-container *ngTemplateOutlet="button.title"></ng-container>
                </ng-container>
                <ng-template #title>
                    {{ button.title }}
                </ng-template>
                <div class="gda-tabs-bar" [ngStyle]="getStyleBar()" #bar></div>
            </button>
        </div>
        <button *ngIf="viewArrow" type="button" class="gda-arrow-tabs gda-arrow-tabs-forward" (click)="arrow($event, 'forward')" #arrowForward @tabsArrowAnimation>
          &#x2192;
        </button>
    </div>
    <div class="gda-content-tab" #content>
        <ng-content></ng-content>
        <p *ngIf="!buttons.length && tabsLoaded">
            Nessun tab rilevato
        </p>
    </div>
  `,
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
                    ],
                    providers: [
                        TabsService
                    ]
                }]
        }], ctorParameters: function () { return [{ type: GdaTabsService }, { type: i0.ElementRef }, { type: TabsService }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-tabs']
            }], setStyle: [{
                type: HostBinding,
                args: ['style']
            }], tabContentEl: [{
                type: ViewChild,
                args: ['tabContent', { static: false }]
            }], tab: [{
                type: ViewChild,
                args: ['tab', { static: true }]
            }], content: [{
                type: ViewChild,
                args: ['content', { static: false }]
            }], arrowBackEl: [{
                type: ViewChild,
                args: ['arrowBack', { static: false }]
            }], arrowForwardEl: [{
                type: ViewChild,
                args: ['arrowForward', { static: false }]
            }], buttonsEl: [{
                type: ViewChildren,
                args: ['buttons']
            }], bar: [{
                type: ViewChildren,
                args: ['bar']
            }], tabStyle: [{
                type: Input
            }], animation: [{
                type: Input
            }], indexTab: [{
                type: Input
            }], indexTabActivated: [{
                type: Output
            }] } });

class GdaTabsModule {
}
GdaTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsModule, declarations: [GdaTabsComponent,
        GdaTabComponent], imports: [CommonModule], exports: [GdaTabsComponent,
        GdaTabComponent] });
GdaTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsModule, imports: [[
            CommonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsModule, decorators: [{
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

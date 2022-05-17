import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, ViewChildren } from '@angular/core';
/* ANIMATIONS */
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { TabsService } from './tabs.service';
/* RXJS */
import { delay, of, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./gda-tabs.service";
import * as i2 from "./tabs.service";
import * as i3 from "@angular/common";
class ButtonTabModel {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
export class GdaTabsComponent {
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
GdaTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsComponent, deps: [{ token: i1.GdaTabsService }, { token: i0.ElementRef }, { token: i2.TabsService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.GdaTabsService }, { type: i0.ElementRef }, { type: i2.TabsService }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQXFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEwsZ0JBQWdCO0FBQ2hCLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdDLFVBQVU7QUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBRS9DLE1BQU0sY0FBYztJQUlsQixZQUNFLEtBQWEsQ0FBQyxFQUFFLFFBQXlDLEVBQUUsRUFBRSxTQUFrQixLQUFLO1FBRXBGLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBaUVELE1BQU0sT0FBTyxnQkFBZ0I7SUEwRzNCLFlBQ1UscUJBQXFDLEVBQ3JDLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLFFBQW1CO1FBSG5CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBZ0I7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBN0c3Qjs7V0FFRztRQUM0QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBb0UvQzs7V0FFRztR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LFFBQVE7c0JBQXBCLEtBQUs7Z0JBa0JJLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKiBBTklNQVRJT05TICovXG5pbXBvcnQgeyBhbmltYXRlLCBrZXlmcmFtZXMsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFUYWJzU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vdGFicy5zZXJ2aWNlJztcbi8qIE1PREVMICovXG5pbXBvcnQgeyBHZGFUYWJzU3R5bGVNb2RlbCB9IGZyb20gJy4vZ2RhLXRhYnMtc3R5bGUubW9kZWwnO1xuLyogUlhKUyAqL1xuaW1wb3J0IHsgZGVsYXksIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuY2xhc3MgQnV0dG9uVGFiTW9kZWwge1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogbnVtYmVyID0gMCwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkgPSAnJywgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdkYS10YWItYnV0dG9uc1wiICN0YWJDb250ZW50PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmlld0Fycm93XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtYmFja1wiIChjbGljayk9XCJhcnJvdygkZXZlbnQsICdiYWNrJylcIiAjYXJyb3dCYWNrIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgICAgJiN4MjE5MDtcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnZGEtY29udGVudC1idXR0b25zXCIgW25nU3R5bGVdPVwiZ2V0Q29udGVudEJ1dHRvbigpXCIgI3RhYj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zOyBsZXQgaSA9IGluZGV4XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWJ1dHRvbi10YWJcIiBbbmdDbGFzc109XCJnZXRDbGFzcyhidXR0b24pXCIgW25nU3R5bGVdPVwiZ2V0U3R5bGVCdXR0b24oYnV0dG9uKVwiIChjbGljayk9XCJzZXRUYWIoJGV2ZW50LCBidXR0b24sIGkpXCIgKG1vdXNld2hlZWwpPVwibW91c2VXaGVlbCgkZXZlbnQpXCIgI2J1dHRvbnM+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbj8udGl0bGU/LmVsZW1lbnRSZWY7IGVsc2UgdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1dHRvbi50aXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIHt7IGJ1dHRvbi50aXRsZSB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdkYS10YWJzLWJhclwiIFtuZ1N0eWxlXT1cImdldFN0eWxlQmFyKClcIiAjYmFyPjwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmlld0Fycm93XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtZm9yd2FyZFwiIChjbGljayk9XCJhcnJvdygkZXZlbnQsICdmb3J3YXJkJylcIiAjYXJyb3dGb3J3YXJkIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgICAgJiN4MjE5MjtcbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdkYS1jb250ZW50LXRhYlwiICNjb250ZW50PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxwICpuZ0lmPVwiIWJ1dHRvbnMubGVuZ3RoICYmIHRhYnNMb2FkZWRcIj5cbiAgICAgICAgICAgIE5lc3N1biB0YWIgcmlsZXZhdG9cbiAgICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcigndGFic0Fycm93QW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHdpZHRoOiAnNSUnIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAnNSUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHdpZHRoOiAnNSUnIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGFic1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZGFUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdkYS10YWJzJykgc2V0Q2xhc3MgPSB0cnVlO1xuICAvKipcbiAgICogU3R5bGVcbiAgICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUnKSBnZXQgc2V0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtaW4taGVpZ2h0JzogKCh0aGlzLnRhYkNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudD8ub2Zmc2V0SGVpZ2h0IHx8IDApICsgdGhpcy50YWJzU2VydmljZS5oZWlnaHRUYWJBY3RpdmUpICsgJ3B4JyxcbiAgICAgICd2aXNpYmlsaXR5JzogdGhpcy50YWJzTG9hZGVkID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBFbGVtZW50IHRhYkNvbnRlbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiQ29udGVudEVsITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIEVsZW1lbnQgdGFiXG4gICAqL1xuICBAVmlld0NoaWxkKCd0YWInLCB7IHN0YXRpYzogdHJ1ZSB9KSB0YWIhOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogRWxlbWVudCBjb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQhOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogQXJyb3dcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2Fycm93QmFjaycsIHsgc3RhdGljOiBmYWxzZSB9KSBhcnJvd0JhY2tFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Fycm93Rm9yd2FyZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBhcnJvd0ZvcndhcmRFbCE6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBFbGVtZW50IGJ1dHRvbnNcbiAgICovXG4gIEBWaWV3Q2hpbGRyZW4oJ2J1dHRvbnMnKSBidXR0b25zRWwhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIC8qKlxuICAgKiBFbGVtZW50IGJhclxuICAgKi9cbiAgQFZpZXdDaGlsZHJlbignYmFyJykgYmFyITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICAvKipcbiAgICogQnV0dG9uIHN0eWxlXG4gICAqL1xuICBASW5wdXQoKSB0YWJTdHlsZTogR2RhVGFic1N0eWxlTW9kZWw7XG4gIC8qKlxuICAgKiBCdXR0b24gc3R5bGVcbiAgICovXG4gIEBJbnB1dCgpIHNldCBhbmltYXRpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy50YWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkID0gdmFsO1xuICB9O1xuICAvKipcbiAgICogSW5kZXggVGFiIEFjdGl2YXRlZFxuICAgKi9cbiAgaW5kZXhUYWJWYWw6IG51bWJlcjtcbiAgQElucHV0KCkgc2V0IGluZGV4VGFiKHZhbDogbnVtYmVyKSB7XG4gICAgb2YodHJ1ZSkucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXhUYWJWYWwgPSB2YWw7XG4gICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCAmJiB0aGlzLmJ1dHRvbnNbdmFsXSAmJiAhdGhpcy5idXR0b25zW3ZhbF0uYWN0aXZlKSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UucHJldmVudFRhYnMgPSB0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSk/LmlkIHx8IDA7XG4gICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKChidXR0b246IEJ1dHRvblRhYk1vZGVsLCBpbmRleDogbnVtYmVyKSA9PiBidXR0b24uYWN0aXZlID0gKGluZGV4ID09PSB2YWwpKTtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwgPSB0aGlzLmJ1dHRvbnNbdmFsXTtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRUYWIobnVsbCwgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmlkKTtcbiAgICAgIH1cbiAgICB9KVxuICB9O1xuICBnZXQgaW5kZXhUYWIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleFRhYlZhbDtcbiAgfVxuICAvKipcbiAgICogSW5kZXggVGFiIEFjdGl2YXRlZFxuICAgKi9cbiAgQE91dHB1dCgpIGluZGV4VGFiQWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPjtcbiAgLyoqXG4gICAqIEJvdHRvbmkgdGFic1xuICAgKi9cbiAgcHVibGljIGJ1dHRvbnM6IEJ1dHRvblRhYk1vZGVsW10gPSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnM7XG4gIC8qKlxuICAgKiBCdXR0b24gZGlzYWJsZWRcbiAgICovXG4gIHB1YmxpYyBidXR0b25EaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEx1bmdoZXp6YSBkZWkgYm90dG9uaVxuICAgKi9cbiAgcHJpdmF0ZSBsZW5ndGhCdXR0b25zID0gMDtcbiAgLyoqXG4gICAqIFN0ZXAgcGVyIGwnYW5pbWF6aW9uZVxuICAgKi9cbiAgcHJpdmF0ZSBzdGVwID0gMDtcbiAgLyoqXG4gICAqIEFiaWxpdGEgaSBtb3ZpbWVudGkgZGVsbGEgcm90ZWxsaW5hXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlZE1vdXNlV2hlZWw6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBcnJvd1xuICAgKi9cbiAgcHVibGljIHZpZXdBcnJvdyE6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25cbiAgICovXG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcbiAgLyoqXG4gICAqIFRhYiBsb2FkZWRcbiAgICovXG4gIHB1YmxpYyB0YWJzTG9hZGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2VTZXJ2aWNlOiBHZGFUYWJzU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICB0aGlzLmVuYWJsZWRNb3VzZVdoZWVsID0gdGhpcy5nZXRBcnJvdygncmV0dXJuJyk7XG4gICAgdGhpcy50YWJTdHlsZSA9IHRoaXMuZ2RhVGFic1NlcnZpY2VTZXJ2aWNlLnRhYnNTdHlsZTtcbiAgICB0aGlzLmluZGV4VGFiQWN0aXZhdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuaW5kZXhUYWJWYWwgPSAwO1xuICAgIHRoaXMuc3ViMSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnN1YjIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy50YWJzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5idXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHsgLy8gYWdnaW9ybmEgd2lkdGhcbiAgICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICAgIHRoaXMuZW5hYmxlZE1vdXNlV2hlZWwgPSB0aGlzLmdldEFycm93KCdyZXR1cm4nKTtcbiAgICB9O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZEJ1dHRvbnMoKTtcbiAgICB0aGlzLnN1YjEgPSB0aGlzLnRhYnNTZXJ2aWNlLnRhYnNSZWxvYWRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkQnV0dG9ucyghdGhpcy50YWJzU2VydmljZS5sb2FkQ29tcGxldGUpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMiA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSBbLi4udGhpcy50YWJzU2VydmljZS5idXR0b25zXTtcbiAgICB9KTtcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICdtaW4taGVpZ2h0IC4zcyBlYXNlLWluLW91dCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQnV0dG9ucyhyZWxvYWQgPSBmYWxzZSk6IHZvaWQge1xuICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuYnV0dG9ucy5sZW5ndGgpIHtcbiAgICAgICAgcmVsb2FkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UubG9hZENvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gbmV3IEJ1dHRvblRhYk1vZGVsKCk7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UucHJldmVudFRhYnMgPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5idXR0b25zID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zLnNsaWNlKCk7XG4gICAgICBpZiAocmVsb2FkKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbnMuc29tZSgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmlkID09PSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCkpIHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSA9ICh0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCA9PT0gYnV0dG9uLmlkKSk7XG4gICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zID0gdGhpcy5idXR0b25zLnNsaWNlKCk7XG4gICAgICAgICAgdGhpcy5zZXRUYWIobnVsbCwgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSA9ICgwID09PSBidXR0b24uaWQpKTtcbiAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMgPSB0aGlzLmJ1dHRvbnMuc2xpY2UoKTtcbiAgICAgICAgICB0aGlzLnNldFRhYihudWxsLCB0aGlzLmJ1dHRvbnNbMF0sIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5idXR0b25zICYmIHRoaXMuYnV0dG9ucy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYkNvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdpbmxpbmUnKTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbnMuc29tZSgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYnV0dG9uLmlkID09PSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLmVtaXQodGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gMDtcbiAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLmVtaXQodGhpcy5idXR0b25zWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5kZXhUYWJWYWwgIT09ICh0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSk/LmlkIHx8IDApKSB7XG4gICAgICAgICAgdGhpcy5pbmRleFRhYkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKT8uaWQgfHwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBidXR0b25FbCA9IHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9uRWwpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoQnV0dG9ucyA9IHRoaXMubGVuZ3RoQnV0dG9ucyArIGJ1dHRvbi5vZmZzZXRXaWR0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdGVwID0gdGhpcy5sZW5ndGhCdXR0b25zIC8gdGhpcy5idXR0b25zLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLmVuYWJsZWRNb3VzZVdoZWVsID0gdGhpcy5nZXRBcnJvdygncmV0dXJuJyk7XG4gICAgICAgICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgICAgICAgIGNvbnN0IGJhcnMgPSB0aGlzLmJhci50b0FycmF5KCk7XG4gICAgICAgICAgY29uc3QgYnV0dG9uc0VsID0gdGhpcy5idXR0b25zRWwudG9BcnJheSgpO1xuICAgICAgICAgIGJhcnMuZm9yRWFjaCgoYmFyOiBFbGVtZW50UmVmKSA9PiB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJhci5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kdXJhdGlvbicsICc1MDBtcycpKTtcbiAgICAgICAgICBidXR0b25zRWwuZm9yRWFjaCgoYnV0dG9uOiBFbGVtZW50UmVmKSA9PiB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kdXJhdGlvbicsICc1MDBtcycpKTtcbiAgICAgICAgICAvKiBpZiAodGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpKSB7XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKSk7XG4gICAgICAgICAgfSAqL1xuICAgICAgICAgIHRoaXMudGFic0xvYWRlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMudGFiQ29udGVudEVsPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYkNvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudGFic1NlcnZpY2UubG9hZENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIGlmIChyZWxvYWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYicpLmZvckVhY2goKGU6IEhUTUxEaXZFbGVtZW50LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBlLnNldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJywgU3RyaW5nKGkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuY2hlY2tBY3RpdmUuZW1pdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpc3VhbGl6emEvdG9nbGkgbGUgZnJlY2NpZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRBcnJvdyh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy50YWIpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbnNFbCA9IHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICBsZXQgdG90V2lkdGggPSAwO1xuICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9uc0VsKSB7XG4gICAgICAgIHRvdFdpZHRoICs9IGJ1dHRvbi5vZmZzZXRXaWR0aDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdlRvdCA9IHRoaXMudGFiQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICB0b3RXaWR0aCA9IHRvdFdpZHRoO1xuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XG4gICAgICAgIHJldHVybiBkaXZUb3QgPCB0b3RXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld0Fycm93ID0gKGRpdlRvdCA8IHRvdFdpZHRoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldENvbnRlbnRCdXR0b24oKTogeyB3aWR0aDogc3RyaW5nLCBtYXJnaW5MZWZ0OiBudW1iZXIgfCBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiAhdGhpcy52aWV3QXJyb3cgPyAnMTAwJScgOiAnOTAlJyxcbiAgICAgIG1hcmdpbkxlZnQ6ICF0aGlzLnZpZXdBcnJvdyA/IDAgOiAnNSUnXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlemlvbmUgZGVsIHRhYlxuICAgKi9cbiAgcHVibGljIHNldFRhYihldmVudDogTW91c2VFdmVudCB8IG51bGwsIGJ1dHRvbkVsOiBCdXR0b25UYWJNb2RlbCwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJ1dHRvbkRpc2FibGVkKSB7XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoNTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5idXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICB0aGlzLmluZGV4VGFiQWN0aXZhdGVkLmVtaXQoaSk7XG4gICAgICB9XG4gICAgICB0aGlzLmluZGV4VGFiVmFsID0gaTtcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJylbaV0pIHtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50Py5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShldmVudCwgdGhpcy5idXR0b25zRWwudG9BcnJheSgpW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlID09PSB0cnVlKT8uaWQgfHwgMDtcbiAgICAgICAgICB0aGlzLmJ1dHRvbnMubWFwKChidXR0b246IEJ1dHRvblRhYk1vZGVsLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hY3RpdmUgPSAoYnV0dG9uLmlkID09PSBidXR0b25FbC5pZCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zW2ldLmFjdGl2ZSA9IChidXR0b24uaWQgPT09IGJ1dHRvbkVsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgICAgICAgLy8gdGhpcy5pbml0U2V0QmFyKCk7XG4gICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWQuZW1pdChidXR0b25FbCk7XG4gICAgICAgICAgaWYgKHRoaXMuZ2V0QXJyb3coJ3JldHVybicpKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXJ0Q29udGVudCA9IHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyA0O1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChwYXJ0Q29udGVudCA+IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoJ2JhY2snKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgocGFydENvbnRlbnQgKiAzKSA8IGV2ZW50LmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoJ2ZvcndhcmQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2sgc3VsbGEgZnJlY2NpYVxuICAgKi9cbiAgcHVibGljIGFycm93KGV2ZW50OiBNb3VzZUV2ZW50IHwgV2hlZWxFdmVudCB8IGFueSwgYXJyb3c6ICdiYWNrJyB8ICdmb3J3YXJkJyk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIGFycm93ID09PSAnYmFjaycgPyB0aGlzLmFycm93QmFja0VsIDogdGhpcy5hcnJvd0ZvcndhcmRFbClcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25TY3JvbGwoYXJyb3cpO1xuICB9XG5cbiAgcHVibGljIG1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkTW91c2VXaGVlbCkge1xuICAgICAgY29uc3QgZXZlbnRvID0gd2luZG93LmV2ZW50IHx8IGV2ZW50OyAvLyBQZXIgaSB2ZWNjaGkgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAgIGNvbnN0IG1vdmltZW50byA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudG8ud2hlZWxEZWx0YSB8fCAtZXZlbnRvLmRldGFpbCkpO1xuICAgICAgdGhpcy5hcnJvdyhudWxsLCBtb3ZpbWVudG8gPiAwID8gJ2JhY2snIDogJ2ZvcndhcmQnKTtcbiAgICAgIC8vIFBlciBJbnRlcm5ldCBFeHBsb3JlclxuICAgICAgZXZlbnRvLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAvLyBQZXIgQ2hyb21lIGUgRmlyZWZveFxuICAgICAgaWYgKGV2ZW50by5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudG8ucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF6aW9uZSBkZWxsbyBzY3JvbFxuICAgKi9cbiAgcHJpdmF0ZSBhbmltYXRpb25TY3JvbGwodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IDEwO1xuICAgIGxldCBmYXNlID0gMDtcbiAgICBjb25zdCBzY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChzdGVwICE9PSBmYXNlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZm9yd2FyZCcpIHtcbiAgICAgICAgICBmYXNlICs9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnRhYi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsTGVmdCcsICh0aGlzLnRhYi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAodGhpcy5zdGVwIC8gMTApKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFzZSArPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy50YWIubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy50YWIubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IC0gKHRoaXMuc3RlcCAvIDEwKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDbGFzcyhidXR0b246IEJ1dHRvblRhYk1vZGVsKTogeyBhY3RpdmU6IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGl2ZTogKGJ1dHRvbi5hY3RpdmUpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdHlsZUJhcigpOiB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2RhVGFic1NlcnZpY2VTZXJ2aWNlLnRhYnNTdHlsZS5iYXJCYWNrZ3JvdW5kQ29sb3JcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlIGJvdHRvbmVcbiAgICogQHBhcmFtIGJ1dHRvbiB0aXBvIGJvdHRvbmVcbiAgICovXG4gIHB1YmxpYyBnZXRTdHlsZUJ1dHRvbihidXR0b246IEJ1dHRvblRhYk1vZGVsKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZywgY29sb3I6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBidXR0b24uYWN0aXZlID8gdGhpcy50YWJTdHlsZS5zZWxlY3RlZC5iYWNrZ3JvdW5kQ29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBjb2xvcjogYnV0dG9uLmFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuY29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5jb2xvclxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICAgIGRpdi5zdHlsZS5hbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDQwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRTdHlsZUNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogdGhpcy50YWJDb250ZW50RWwgPyAodGhpcy50YWJDb250ZW50RWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnKSA6ICcwJ1xuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19
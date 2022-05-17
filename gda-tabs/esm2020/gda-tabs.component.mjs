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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFxQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RMLGdCQUFnQjtBQUNoQixPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3JGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxVQUFVO0FBQ1YsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUUvQyxNQUFNLGNBQWM7SUFJbEIsWUFDRSxLQUFhLENBQUMsRUFBRSxRQUF5QyxFQUFFLEVBQUUsU0FBa0IsS0FBSztRQUVwRixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQWlFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBMEczQixZQUNVLHFCQUFxQyxFQUNyQyxVQUFzQixFQUN0QixXQUF3QixFQUN4QixRQUFtQjtRQUhuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQWdCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTdHN0I7O1dBRUc7UUFDNEIsYUFBUSxHQUFHLElBQUksQ0FB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QkFBckIsS0FBSztnQkFPTyxRQUFRO3NCQUFwQixLQUFLO2dCQWtCSSxpQkFBaUI7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyogQU5JTUFUSU9OUyAqL1xuaW1wb3J0IHsgYW5pbWF0ZSwga2V5ZnJhbWVzLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhVGFic1NlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3RhYnMuc2VydmljZSc7XG4vKiBNT0RFTCAqL1xuaW1wb3J0IHsgR2RhVGFic1N0eWxlTW9kZWwgfSBmcm9tICcuL2dkYS10YWJzLXN0eWxlLm1vZGVsJztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IGRlbGF5LCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmNsYXNzIEJ1dHRvblRhYk1vZGVsIHtcbiAgcHVibGljIGlkOiBudW1iZXI7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IG51bWJlciA9IDAsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55ID0gJycsIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFiLWJ1dHRvbnNcIiAjdGFiQ29udGVudD5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInZpZXdBcnJvd1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImdkYS1hcnJvdy10YWJzIGdkYS1hcnJvdy10YWJzLWJhY2tcIiAoY2xpY2spPVwiYXJyb3coJGV2ZW50LCAnYmFjaycpXCIgI2Fycm93QmFjayBAdGFic0Fycm93QW5pbWF0aW9uPlxuICAgICAgICAgICYjeDIxOTA7XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2RhLWNvbnRlbnQtYnV0dG9uc1wiIFtuZ1N0eWxlXT1cImdldENvbnRlbnRCdXR0b24oKVwiICN0YWI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uczsgbGV0IGkgPSBpbmRleFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImdkYS1idXR0b24tdGFiXCIgW25nQ2xhc3NdPVwiZ2V0Q2xhc3MoYnV0dG9uKVwiIFtuZ1N0eWxlXT1cImdldFN0eWxlQnV0dG9uKGJ1dHRvbilcIiAoY2xpY2spPVwic2V0VGFiKCRldmVudCwgYnV0dG9uLCBpKVwiIChtb3VzZXdoZWVsKT1cIm1vdXNlV2hlZWwoJGV2ZW50KVwiICNidXR0b25zPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24/LnRpdGxlPy5lbGVtZW50UmVmOyBlbHNlIHRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidXR0b24udGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3RpdGxlPlxuICAgICAgICAgICAgICAgICAgICB7eyBidXR0b24udGl0bGUgfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1iYXJcIiBbbmdTdHlsZV09XCJnZXRTdHlsZUJhcigpXCIgI2Jhcj48L2Rpdj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInZpZXdBcnJvd1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImdkYS1hcnJvdy10YWJzIGdkYS1hcnJvdy10YWJzLWZvcndhcmRcIiAoY2xpY2spPVwiYXJyb3coJGV2ZW50LCAnZm9yd2FyZCcpXCIgI2Fycm93Rm9yd2FyZCBAdGFic0Fycm93QW5pbWF0aW9uPlxuICAgICAgICAgICYjeDIxOTI7XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnZGEtY29udGVudC10YWJcIiAjY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8cCAqbmdJZj1cIiFidXR0b25zLmxlbmd0aCAmJiB0YWJzTG9hZGVkXCI+XG4gICAgICAgICAgICBOZXNzdW4gdGFiIHJpbGV2YXRvXG4gICAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBcnJvd0FuaW1hdGlvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICc1JSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRhYnNTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBDbGFzc1xuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5nZGEtdGFicycpIHNldENsYXNzID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFN0eWxlXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlJykgZ2V0IHNldFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbWluLWhlaWdodCc6ICgodGhpcy50YWJDb250ZW50RWw/Lm5hdGl2ZUVsZW1lbnQ/Lm9mZnNldEhlaWdodCB8fCAwKSArIHRoaXMudGFic1NlcnZpY2UuaGVpZ2h0VGFiQWN0aXZlKSArICdweCcsXG4gICAgICAndmlzaWJpbGl0eSc6IHRoaXMudGFic0xvYWRlZCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogRWxlbWVudCB0YWJDb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHRhYkNvbnRlbnRFbCE6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBFbGVtZW50IHRhYlxuICAgKi9cbiAgQFZpZXdDaGlsZCgndGFiJywgeyBzdGF0aWM6IHRydWUgfSkgdGFiITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIEVsZW1lbnQgY29udGVudFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50ITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIEFycm93XG4gICAqL1xuICBAVmlld0NoaWxkKCdhcnJvd0JhY2snLCB7IHN0YXRpYzogZmFsc2UgfSkgYXJyb3dCYWNrRWwhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdhcnJvd0ZvcndhcmQnLCB7IHN0YXRpYzogZmFsc2UgfSkgYXJyb3dGb3J3YXJkRWwhOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogRWxlbWVudCBidXR0b25zXG4gICAqL1xuICBAVmlld0NoaWxkcmVuKCdidXR0b25zJykgYnV0dG9uc0VsITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICAvKipcbiAgICogRWxlbWVudCBiYXJcbiAgICovXG4gIEBWaWV3Q2hpbGRyZW4oJ2JhcicpIGJhciE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgLyoqXG4gICAqIEJ1dHRvbiBzdHlsZVxuICAgKi9cbiAgQElucHV0KCkgdGFiU3R5bGU6IEdkYVRhYnNTdHlsZU1vZGVsO1xuICAvKipcbiAgICogQnV0dG9uIHN0eWxlXG4gICAqL1xuICBASW5wdXQoKSBzZXQgYW5pbWF0aW9uKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCA9IHZhbDtcbiAgfTtcbiAgLyoqXG4gICAqIEluZGV4IFRhYiBBY3RpdmF0ZWRcbiAgICovXG4gIGluZGV4VGFiVmFsOiBudW1iZXI7XG4gIEBJbnB1dCgpIHNldCBpbmRleFRhYih2YWw6IG51bWJlcikge1xuICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4VGFiVmFsID0gdmFsO1xuICAgICAgaWYgKHRoaXMuYnV0dG9ucy5sZW5ndGggJiYgdGhpcy5idXR0b25zW3ZhbF0gJiYgIXRoaXMuYnV0dG9uc1t2YWxdLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gdGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpPy5pZCB8fCAwO1xuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCwgaW5kZXg6IG51bWJlcikgPT4gYnV0dG9uLmFjdGl2ZSA9IChpbmRleCA9PT0gdmFsKSk7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gdGhpcy5idXR0b25zW3ZhbF07XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0VGFiKG51bGwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLCB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCk7XG4gICAgICB9XG4gICAgfSlcbiAgfTtcbiAgZ2V0IGluZGV4VGFiKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhUYWJWYWw7XG4gIH1cbiAgLyoqXG4gICAqIEluZGV4IFRhYiBBY3RpdmF0ZWRcbiAgICovXG4gIEBPdXRwdXQoKSBpbmRleFRhYkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIC8qKlxuICAgKiBCb3R0b25pIHRhYnNcbiAgICovXG4gIHB1YmxpYyBidXR0b25zOiBCdXR0b25UYWJNb2RlbFtdID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zO1xuICAvKipcbiAgICogQnV0dG9uIGRpc2FibGVkXG4gICAqL1xuICBwdWJsaWMgYnV0dG9uRGlzYWJsZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBMdW5naGV6emEgZGVpIGJvdHRvbmlcbiAgICovXG4gIHByaXZhdGUgbGVuZ3RoQnV0dG9ucyA9IDA7XG4gIC8qKlxuICAgKiBTdGVwIHBlciBsJ2FuaW1hemlvbmVcbiAgICovXG4gIHByaXZhdGUgc3RlcCA9IDA7XG4gIC8qKlxuICAgKiBBYmlsaXRhIGkgbW92aW1lbnRpIGRlbGxhIHJvdGVsbGluYVxuICAgKi9cbiAgcHVibGljIGVuYWJsZWRNb3VzZVdoZWVsOiBib29sZWFuO1xuICAvKipcbiAgICogQXJyb3dcbiAgICovXG4gIHB1YmxpYyB2aWV3QXJyb3chOiBib29sZWFuO1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XG4gIC8qKlxuICAgKiBUYWIgbG9hZGVkXG4gICAqL1xuICBwdWJsaWMgdGFic0xvYWRlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdkYVRhYnNTZXJ2aWNlU2VydmljZTogR2RhVGFic1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgdGhpcy5lbmFibGVkTW91c2VXaGVlbCA9IHRoaXMuZ2V0QXJyb3coJ3JldHVybicpO1xuICAgIHRoaXMudGFiU3R5bGUgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlU2VydmljZS50YWJzU3R5bGU7XG4gICAgdGhpcy5pbmRleFRhYkFjdGl2YXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmluZGV4VGFiVmFsID0gMDtcbiAgICB0aGlzLnN1YjEgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWIyID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMudGFic0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7IC8vIGFnZ2lvcm5hIHdpZHRoXG4gICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgICB0aGlzLmVuYWJsZWRNb3VzZVdoZWVsID0gdGhpcy5nZXRBcnJvdygncmV0dXJuJyk7XG4gICAgfTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRCdXR0b25zKCk7XG4gICAgdGhpcy5zdWIxID0gdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9hZEJ1dHRvbnMoIXRoaXMudGFic1NlcnZpY2UubG9hZENvbXBsZXRlKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5idXR0b25zID0gWy4uLnRoaXMudGFic1NlcnZpY2UuYnV0dG9uc107XG4gICAgfSk7XG4gICAgb2YodHJ1ZSkucGlwZShkZWxheSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCAnbWluLWhlaWdodCAuM3MgZWFzZS1pbi1vdXQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEJ1dHRvbnMocmVsb2FkID0gZmFsc2UpOiB2b2lkIHtcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJlbG9hZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxvYWRDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IG5ldyBCdXR0b25UYWJNb2RlbCgpO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5zbGljZSgpO1xuICAgICAgaWYgKHJlbG9hZCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5pZCA9PT0gdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQpKSB7XG4gICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPSAodGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQgPT09IGJ1dHRvbi5pZCkpO1xuICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucyA9IHRoaXMuYnV0dG9ucy5zbGljZSgpO1xuICAgICAgICAgIHRoaXMuc2V0VGFiKG51bGwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLCB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPSAoMCA9PT0gYnV0dG9uLmlkKSk7XG4gICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zID0gdGhpcy5idXR0b25zLnNsaWNlKCk7XG4gICAgICAgICAgdGhpcy5zZXRUYWIobnVsbCwgdGhpcy5idXR0b25zWzBdLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gICAgICAgIGlmICghdGhpcy5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5pZCA9PT0gdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9ucy5zb21lKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9uc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluZGV4VGFiVmFsICE9PSAodGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpPy5pZCB8fCAwKSkge1xuICAgICAgICAgIHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQuZW1pdCh0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSk/LmlkIHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnV0dG9uRWwgPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbkVsKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aEJ1dHRvbnMgPSB0aGlzLmxlbmd0aEJ1dHRvbnMgKyBidXR0b24ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3RlcCA9IHRoaXMubGVuZ3RoQnV0dG9ucyAvIHRoaXMuYnV0dG9ucy5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5lbmFibGVkTW91c2VXaGVlbCA9IHRoaXMuZ2V0QXJyb3coJ3JldHVybicpO1xuICAgICAgICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICAgICAgICBjb25zdCBiYXJzID0gdGhpcy5iYXIudG9BcnJheSgpO1xuICAgICAgICAgIGNvbnN0IGJ1dHRvbnNFbCA9IHRoaXMuYnV0dG9uc0VsLnRvQXJyYXkoKTtcbiAgICAgICAgICBiYXJzLmZvckVhY2goKGJhcjogRWxlbWVudFJlZikgPT4gdGhpcy5yZW5kZXJlci5zZXRTdHlsZShiYXIubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnNTAwbXMnKSk7XG4gICAgICAgICAgYnV0dG9uc0VsLmZvckVhY2goKGJ1dHRvbjogRWxlbWVudFJlZikgPT4gdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24ubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnNTAwbXMnKSk7XG4gICAgICAgICAgLyogaWYgKHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKSkge1xuICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWQuZW1pdCh0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSkpO1xuICAgICAgICAgIH0gKi9cbiAgICAgICAgICB0aGlzLnRhYnNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnRhYkNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxvYWRDb21wbGV0ZSA9IHRydWU7XG4gICAgICBpZiAocmVsb2FkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2dkYS10YWInKS5mb3JFYWNoKChlOiBIVE1MRGl2RWxlbWVudCwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicsIFN0cmluZyhpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmNoZWNrQWN0aXZlLmVtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaXN1YWxpenphL3RvZ2xpIGxlIGZyZWNjaWVcbiAgICovXG4gIHByaXZhdGUgZ2V0QXJyb3codHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudGFiKSB7XG4gICAgICBjb25zdCBidXR0b25zRWwgPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgICAgbGV0IHRvdFdpZHRoID0gMDtcbiAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnNFbCkge1xuICAgICAgICB0b3RXaWR0aCArPSBidXR0b24ub2Zmc2V0V2lkdGg7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXZUb3QgPSB0aGlzLnRhYkNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgdG90V2lkdGggPSB0b3RXaWR0aDtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZGl2VG90IDwgdG90V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdBcnJvdyA9IChkaXZUb3QgPCB0b3RXaWR0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb250ZW50QnV0dG9uKCk6IHsgd2lkdGg6IHN0cmluZywgbWFyZ2luTGVmdDogbnVtYmVyIHwgc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogIXRoaXMudmlld0Fycm93ID8gJzEwMCUnIDogJzkwJScsXG4gICAgICBtYXJnaW5MZWZ0OiAhdGhpcy52aWV3QXJyb3cgPyAwIDogJzUlJ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2VsZXppb25lIGRlbCB0YWJcbiAgICovXG4gIHB1YmxpYyBzZXRUYWIoZXZlbnQ6IE1vdXNlRXZlbnQgfCBudWxsLCBidXR0b25FbDogQnV0dG9uVGFiTW9kZWwsIGk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5idXR0b25EaXNhYmxlZCkge1xuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZCA9IHRydWU7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pbmRleFRhYkFjdGl2YXRlZC5lbWl0KGkpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbmRleFRhYlZhbCA9IGk7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYicpW2ldKSB7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudD8uc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIHRoaXMuYnV0dG9uc0VsLnRvQXJyYXkoKVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UucHJldmVudFRhYnMgPSB0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSA9PT0gdHJ1ZSk/LmlkIHx8IDA7XG4gICAgICAgICAgdGhpcy5idXR0b25zLm1hcCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWN0aXZlID0gKGJ1dHRvbi5pZCA9PT0gYnV0dG9uRWwuaWQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uc1tpXS5hY3RpdmUgPSAoYnV0dG9uLmlkID09PSBidXR0b25FbC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgICAgICAgIC8vIHRoaXMuaW5pdFNldEJhcigpO1xuICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLmVtaXQoYnV0dG9uRWwpO1xuICAgICAgICAgIGlmICh0aGlzLmdldEFycm93KCdyZXR1cm4nKSkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFydENvbnRlbnQgPSB0aGlzLnRhYi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gNDtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICBpZiAocGFydENvbnRlbnQgPiBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ubGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2Nyb2xsKCdiYWNrJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRDb250ZW50ICogMykgPCBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ubGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2Nyb2xsKCdmb3J3YXJkJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsaWNrIHN1bGxhIGZyZWNjaWFcbiAgICovXG4gIHB1YmxpYyBhcnJvdyhldmVudDogTW91c2VFdmVudCB8IFdoZWVsRXZlbnQgfCBhbnksIGFycm93OiAnYmFjaycgfCAnZm9yd2FyZCcpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGV2ZW50LCBhcnJvdyA9PT0gJ2JhY2snID8gdGhpcy5hcnJvd0JhY2tFbCA6IHRoaXMuYXJyb3dGb3J3YXJkRWwpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uU2Nyb2xsKGFycm93KTtcbiAgfVxuXG4gIHB1YmxpYyBtb3VzZVdoZWVsKGV2ZW50OiBXaGVlbEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZE1vdXNlV2hlZWwpIHtcbiAgICAgIGNvbnN0IGV2ZW50byA9IHdpbmRvdy5ldmVudCB8fCBldmVudDsgLy8gUGVyIGkgdmVjY2hpIEludGVybmV0IEV4cGxvcmVyXG4gICAgICBjb25zdCBtb3ZpbWVudG8gPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnRvLndoZWVsRGVsdGEgfHwgLWV2ZW50by5kZXRhaWwpKTtcbiAgICAgIHRoaXMuYXJyb3cobnVsbCwgbW92aW1lbnRvID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJyk7XG4gICAgICAvLyBQZXIgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAgIGV2ZW50by5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgLy8gUGVyIENocm9tZSBlIEZpcmVmb3hcbiAgICAgIGlmIChldmVudG8ucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnRvLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hemlvbmUgZGVsbG8gc2Nyb2xcbiAgICovXG4gIHByaXZhdGUgYW5pbWF0aW9uU2Nyb2xsKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0ZXAgPSAxMDtcbiAgICBsZXQgZmFzZSA9IDA7XG4gICAgY29uc3Qgc2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoc3RlcCAhPT0gZmFzZSkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgICAgICAgZmFzZSArPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy50YWIubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy50YWIubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICsgKHRoaXMuc3RlcCAvIDEwKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZhc2UgKz0gMTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxMZWZ0JywgKHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCAtICh0aGlzLnN0ZXAgLyAxMCkpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzY3JvbGxJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2xhc3MoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCk6IHsgYWN0aXZlOiBib29sZWFuIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmU6IChidXR0b24uYWN0aXZlKVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0U3R5bGVCYXIoKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmdkYVRhYnNTZXJ2aWNlU2VydmljZS50YWJzU3R5bGUuYmFyQmFja2dyb3VuZENvbG9yXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZSBib3R0b25lXG4gICAqIEBwYXJhbSBidXR0b24gdGlwbyBib3R0b25lXG4gICAqL1xuICBwdWJsaWMgZ2V0U3R5bGVCdXR0b24oYnV0dG9uOiBCdXR0b25UYWJNb2RlbCk6IHsgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYnV0dG9uLmFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuYmFja2dyb3VuZENvbG9yIDogdGhpcy50YWJTdHlsZS5ub3JtYWwuYmFja2dyb3VuZENvbG9yLFxuICAgICAgY29sb3I6IGJ1dHRvbi5hY3RpdmUgPyB0aGlzLnRhYlN0eWxlLnNlbGVjdGVkLmNvbG9yIDogdGhpcy50YWJTdHlsZS5ub3JtYWwuY29sb3JcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlUmlwcGxlKGU6IE1vdXNlRXZlbnQsIGVsOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgaWYgKGVsKSB7XG4gICAgICBjb25zdCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgICAgY29uc3QgZCA9IE1hdGgubWF4KGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsIGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdi5zdHlsZS5oZWlnaHQgPSBkICsgJ3B4JztcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZGl2LnN0eWxlLmxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnQgLSBkIC8gMiArICdweCc7XG4gICAgICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZIC0gcmVjdC50b3AgLSBkIC8gMiArICdweCc7XG4gICAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRBbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBkaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2dkYS10YWJzLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSg0MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3R5bGVDb250ZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHRoaXMudGFiQ29udGVudEVsID8gKHRoaXMudGFiQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JykgOiAnMCdcbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
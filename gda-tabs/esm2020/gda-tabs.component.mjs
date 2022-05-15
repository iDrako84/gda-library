import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, ViewChildren } from '@angular/core';
/* ANIMATIONS */
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { TabsService } from './tabs.service';
/* RXJS */
import { Subscription } from 'rxjs';
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
            /* 'transition': this.tabsLoaded ? 'min-height .5s ease-in-out' : 'min-height .0s ease-in-out' */
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
        setTimeout(() => {
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
    }
    loadButtons(reload = false) {
        setTimeout(() => {
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
                setTimeout(() => {
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
                }, 0);
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
        if (event) {
            this.indexTabActivated.emit(i);
        }
        this.indexTabVal = i;
        setTimeout(() => {
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
            setTimeout(() => {
                this.renderer.removeChild(el.nativeElement, div);
            }, 400);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQXFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEwsZ0JBQWdCO0FBQ2hCLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdDLFVBQVU7QUFDVixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUVwQyxNQUFNLGNBQWM7SUFJbEIsWUFDRSxLQUFhLENBQUMsRUFBRSxRQUF5QyxFQUFFLEVBQUUsU0FBa0IsS0FBSztRQUVwRixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQWlFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBc0czQixZQUNVLHFCQUFxQyxFQUNyQyxVQUFzQixFQUN0QixXQUF3QixFQUN4QixRQUFtQjtRQUhuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQWdCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXpHN0I7O1dBRUc7UUFDNEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQW9FL0M7O1dBRUc7UUFDSSxZQUFPLEdBQXFCLElBQUks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QUFRO3NCQUFoQixLQUFLO2dCQUlPLFNBQVM7c0JBQXJCLEtBQUs7Z0JBT08sUUFBUTtzQkFBcEIsS0FBSztnQkFrQkksaUJBQWlCO3NCQUExQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qIEFOSU1BVElPTlMgKi9cbmltcG9ydCB7IGFuaW1hdGUsIGtleWZyYW1lcywgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi90YWJzLnNlcnZpY2UnO1xuLyogTU9ERUwgKi9cbmltcG9ydCB7IEdkYVRhYnNTdHlsZU1vZGVsIH0gZnJvbSAnLi9nZGEtdGFicy1zdHlsZS5tb2RlbCc7XG4vKiBSWEpTICovXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuY2xhc3MgQnV0dG9uVGFiTW9kZWwge1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogbnVtYmVyID0gMCwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkgPSAnJywgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdkYS10YWItYnV0dG9uc1wiICN0YWJDb250ZW50PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmlld0Fycm93XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtYmFja1wiIChjbGljayk9XCJhcnJvdygkZXZlbnQsICdiYWNrJylcIiAjYXJyb3dCYWNrIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgICAgJiN4MjE5MDtcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnZGEtY29udGVudC1idXR0b25zXCIgW25nU3R5bGVdPVwiZ2V0Q29udGVudEJ1dHRvbigpXCIgI3RhYj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zOyBsZXQgaSA9IGluZGV4XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWJ1dHRvbi10YWJcIiBbbmdDbGFzc109XCJnZXRDbGFzcyhidXR0b24pXCIgW25nU3R5bGVdPVwiZ2V0U3R5bGVCdXR0b24oYnV0dG9uKVwiIChjbGljayk9XCJzZXRUYWIoJGV2ZW50LCBidXR0b24sIGkpXCIgKG1vdXNld2hlZWwpPVwibW91c2VXaGVlbCgkZXZlbnQpXCIgI2J1dHRvbnM+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbj8udGl0bGU/LmVsZW1lbnRSZWY7IGVsc2UgdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1dHRvbi50aXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIHt7IGJ1dHRvbi50aXRsZSB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdkYS10YWJzLWJhclwiIFtuZ1N0eWxlXT1cImdldFN0eWxlQmFyKClcIiAjYmFyPjwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmlld0Fycm93XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtZm9yd2FyZFwiIChjbGljayk9XCJhcnJvdygkZXZlbnQsICdmb3J3YXJkJylcIiAjYXJyb3dGb3J3YXJkIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgICAgJiN4MjE5MjtcbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdkYS1jb250ZW50LXRhYlwiICNjb250ZW50PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxwICpuZ0lmPVwiIWJ1dHRvbnMubGVuZ3RoICYmIHRhYnNMb2FkZWRcIj5cbiAgICAgICAgICAgIE5lc3N1biB0YWIgcmlsZXZhdG9cbiAgICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcigndGFic0Fycm93QW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHdpZHRoOiAnNSUnIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAnNSUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHdpZHRoOiAnNSUnIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGFic1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZGFUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdkYS10YWJzJykgc2V0Q2xhc3MgPSB0cnVlO1xuICAvKipcbiAgICogU3R5bGVcbiAgICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUnKSBnZXQgc2V0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtaW4taGVpZ2h0JzogKCh0aGlzLnRhYkNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudD8ub2Zmc2V0SGVpZ2h0IHx8IDApICsgdGhpcy50YWJzU2VydmljZS5oZWlnaHRUYWJBY3RpdmUpICsgJ3B4JyxcbiAgICAgIC8qICd0cmFuc2l0aW9uJzogdGhpcy50YWJzTG9hZGVkID8gJ21pbi1oZWlnaHQgLjVzIGVhc2UtaW4tb3V0JyA6ICdtaW4taGVpZ2h0IC4wcyBlYXNlLWluLW91dCcgKi9cbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBFbGVtZW50IHRhYkNvbnRlbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiQ29udGVudEVsITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIEVsZW1lbnQgdGFiXG4gICAqL1xuICBAVmlld0NoaWxkKCd0YWInLCB7IHN0YXRpYzogdHJ1ZSB9KSB0YWIhOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogRWxlbWVudCBjb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQhOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogQXJyb3dcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2Fycm93QmFjaycsIHsgc3RhdGljOiBmYWxzZSB9KSBhcnJvd0JhY2tFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Fycm93Rm9yd2FyZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBhcnJvd0ZvcndhcmRFbCE6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBFbGVtZW50IGJ1dHRvbnNcbiAgICovXG4gIEBWaWV3Q2hpbGRyZW4oJ2J1dHRvbnMnKSBidXR0b25zRWwhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIC8qKlxuICAgKiBFbGVtZW50IGJhclxuICAgKi9cbiAgQFZpZXdDaGlsZHJlbignYmFyJykgYmFyITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICAvKipcbiAgICogQnV0dG9uIHN0eWxlXG4gICAqL1xuICBASW5wdXQoKSB0YWJTdHlsZTogR2RhVGFic1N0eWxlTW9kZWw7XG4gIC8qKlxuICAgKiBCdXR0b24gc3R5bGVcbiAgICovXG4gIEBJbnB1dCgpIHNldCBhbmltYXRpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy50YWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkID0gdmFsO1xuICB9O1xuICAvKipcbiAgICogSW5kZXggVGFiIEFjdGl2YXRlZFxuICAgKi9cbiAgaW5kZXhUYWJWYWw6IG51bWJlcjtcbiAgQElucHV0KCkgc2V0IGluZGV4VGFiKHZhbDogbnVtYmVyKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmluZGV4VGFiVmFsID0gdmFsO1xuICAgICAgaWYgKHRoaXMuYnV0dG9ucy5sZW5ndGggJiYgdGhpcy5idXR0b25zW3ZhbF0gJiYgIXRoaXMuYnV0dG9uc1t2YWxdLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gdGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpPy5pZCB8fCAwO1xuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCwgaW5kZXg6IG51bWJlcikgPT4gYnV0dG9uLmFjdGl2ZSA9IChpbmRleCA9PT0gdmFsKSk7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gdGhpcy5idXR0b25zW3ZhbF07XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0VGFiKG51bGwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLCB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCk7XG4gICAgICB9XG4gICAgfSlcbiAgfTtcbiAgZ2V0IGluZGV4VGFiKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhUYWJWYWw7XG4gIH1cbiAgLyoqXG4gICAqIEluZGV4IFRhYiBBY3RpdmF0ZWRcbiAgICovXG4gIEBPdXRwdXQoKSBpbmRleFRhYkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIC8qKlxuICAgKiBCb3R0b25pIHRhYnNcbiAgICovXG4gIHB1YmxpYyBidXR0b25zOiBCdXR0b25UYWJNb2RlbFtdID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zO1xuICAvKipcbiAgICogTHVuZ2hlenphIGRlaSBib3R0b25pXG4gICAqL1xuICBwcml2YXRlIGxlbmd0aEJ1dHRvbnMgPSAwO1xuICAvKipcbiAgICogU3RlcCBwZXIgbCdhbmltYXppb25lXG4gICAqL1xuICBwcml2YXRlIHN0ZXAgPSAwO1xuICAvKipcbiAgICogQWJpbGl0YSBpIG1vdmltZW50aSBkZWxsYSByb3RlbGxpbmFcbiAgICovXG4gIHB1YmxpYyBlbmFibGVkTW91c2VXaGVlbDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFycm93XG4gICAqL1xuICBwdWJsaWMgdmlld0Fycm93ITogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICAvKipcbiAgICogVGFiIGxvYWRlZFxuICAgKi9cbiAgcHVibGljIHRhYnNMb2FkZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBnZGFUYWJzU2VydmljZVNlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgIHRoaXMuZW5hYmxlZE1vdXNlV2hlZWwgPSB0aGlzLmdldEFycm93KCdyZXR1cm4nKTtcbiAgICB0aGlzLnRhYlN0eWxlID0gdGhpcy5nZGFUYWJzU2VydmljZVNlcnZpY2UudGFic1N0eWxlO1xuICAgIHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5pbmRleFRhYlZhbCA9IDA7XG4gICAgdGhpcy5zdWIxID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuc3ViMiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLnRhYnNMb2FkZWQgPSBmYWxzZTtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7IC8vIGFnZ2lvcm5hIHdpZHRoXG4gICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgICB0aGlzLmVuYWJsZWRNb3VzZVdoZWVsID0gdGhpcy5nZXRBcnJvdygncmV0dXJuJyk7XG4gICAgfTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRCdXR0b25zKCk7XG4gICAgdGhpcy5zdWIxID0gdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9hZEJ1dHRvbnMoIXRoaXMudGFic1NlcnZpY2UubG9hZENvbXBsZXRlKTtcbiAgICB9KVxuICAgIHRoaXMuc3ViMiA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSBbLi4udGhpcy50YWJzU2VydmljZS5idXR0b25zXTtcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQnV0dG9ucyhyZWxvYWQgPSBmYWxzZSk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJlbG9hZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxvYWRDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IG5ldyBCdXR0b25UYWJNb2RlbCgpO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5zbGljZSgpO1xuICAgICAgaWYgKHJlbG9hZCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5pZCA9PT0gdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQpKSB7XG4gICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPSAodGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQgPT09IGJ1dHRvbi5pZCkpO1xuICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucyA9IHRoaXMuYnV0dG9ucy5zbGljZSgpO1xuICAgICAgICAgIHRoaXMuc2V0VGFiKG51bGwsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLCB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPSAoMCA9PT0gYnV0dG9uLmlkKSk7XG4gICAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zID0gdGhpcy5idXR0b25zLnNsaWNlKCk7XG4gICAgICAgICAgdGhpcy5zZXRUYWIobnVsbCwgdGhpcy5idXR0b25zWzBdLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYnV0dG9ucyAmJiB0aGlzLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gICAgICAgIGlmICghdGhpcy5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUgPT09IHRydWUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5pZCA9PT0gdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWRWYWwuaWQpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYnV0dG9ucy5zb21lKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IDA7XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KHRoaXMuYnV0dG9uc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluZGV4VGFiVmFsICE9PSAodGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpPy5pZCB8fCAwKSkge1xuICAgICAgICAgIHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQuZW1pdCh0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSk/LmlkIHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1dHRvbkVsID0gdGhpcy50YWIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25FbCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhCdXR0b25zID0gdGhpcy5sZW5ndGhCdXR0b25zICsgYnV0dG9uLm9mZnNldFdpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnN0ZXAgPSB0aGlzLmxlbmd0aEJ1dHRvbnMgLyB0aGlzLmJ1dHRvbnMubGVuZ3RoO1xuICAgICAgICAgIHRoaXMuZW5hYmxlZE1vdXNlV2hlZWwgPSB0aGlzLmdldEFycm93KCdyZXR1cm4nKTtcbiAgICAgICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgICAgICAgY29uc3QgYmFycyA9IHRoaXMuYmFyLnRvQXJyYXkoKTtcbiAgICAgICAgICBjb25zdCBidXR0b25zRWwgPSB0aGlzLmJ1dHRvbnNFbC50b0FycmF5KCk7XG4gICAgICAgICAgYmFycy5mb3JFYWNoKChiYXI6IEVsZW1lbnRSZWYpID0+IHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYmFyLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzUwMG1zJykpO1xuICAgICAgICAgIGJ1dHRvbnNFbC5mb3JFYWNoKChidXR0b246IEVsZW1lbnRSZWYpID0+IHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzUwMG1zJykpO1xuICAgICAgICAgIC8qIGlmICh0aGlzLmJ1dHRvbnMuZmluZCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkLmVtaXQodGhpcy5idXR0b25zLmZpbmQoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpKTtcbiAgICAgICAgICB9ICovXG4gICAgICAgICAgdGhpcy50YWJzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy50YWJDb250ZW50RWw/Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFiQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy50YWJzU2VydmljZS5sb2FkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgaWYgKHJlbG9hZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJykuZm9yRWFjaCgoZTogSFRNTERpdkVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGUuc2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInLCBTdHJpbmcoaSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5jaGVja0FjdGl2ZS5lbWl0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVmlzdWFsaXp6YS90b2dsaSBsZSBmcmVjY2llXG4gICAqL1xuICBwcml2YXRlIGdldEFycm93KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnRhYikge1xuICAgICAgY29uc3QgYnV0dG9uc0VsID0gdGhpcy50YWIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICAgIGxldCB0b3RXaWR0aCA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25zRWwpIHtcbiAgICAgICAgdG90V2lkdGggKz0gYnV0dG9uLm9mZnNldFdpZHRoO1xuICAgICAgfVxuICAgICAgY29uc3QgZGl2VG90ID0gdGhpcy50YWJDb250ZW50RWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgIHRvdFdpZHRoID0gdG90V2lkdGg7XG4gICAgICBpZiAodHlwZSA9PT0gJ3JldHVybicpIHtcbiAgICAgICAgcmV0dXJuIGRpdlRvdCA8IHRvdFdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3QXJyb3cgPSAoZGl2VG90IDwgdG90V2lkdGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ3JldHVybicpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29udGVudEJ1dHRvbigpOiB7IHdpZHRoOiBzdHJpbmcsIG1hcmdpbkxlZnQ6IG51bWJlciB8IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6ICF0aGlzLnZpZXdBcnJvdyA/ICcxMDAlJyA6ICc5MCUnLFxuICAgICAgbWFyZ2luTGVmdDogIXRoaXMudmlld0Fycm93ID8gMCA6ICc1JSdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGV6aW9uZSBkZWwgdGFiXG4gICAqL1xuICBwdWJsaWMgc2V0VGFiKGV2ZW50OiBNb3VzZUV2ZW50IHwgbnVsbCwgYnV0dG9uRWw6IEJ1dHRvblRhYk1vZGVsLCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQuZW1pdChpKTtcbiAgICB9XG4gICAgdGhpcy5pbmRleFRhYlZhbCA9IGk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYicpW2ldKSB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIGV2ZW50Py5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIHRoaXMuYnV0dG9uc0VsLnRvQXJyYXkoKVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IHRoaXMuYnV0dG9ucy5maW5kKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlID09PSB0cnVlKT8uaWQgfHwgMDtcbiAgICAgICAgdGhpcy5idXR0b25zLm1hcCgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmFjdGl2ZSA9IChidXR0b24uaWQgPT09IGJ1dHRvbkVsLmlkKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uc1tpXS5hY3RpdmUgPSAoYnV0dG9uLmlkID09PSBidXR0b25FbC5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgICAgICAvLyB0aGlzLmluaXRTZXRCYXIoKTtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWQuZW1pdChidXR0b25FbCk7XG4gICAgICAgIGlmICh0aGlzLmdldEFycm93KCdyZXR1cm4nKSkge1xuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy50YWIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBwYXJ0Q29udGVudCA9IHRoaXMudGFiLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyA0O1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcnRDb250ZW50ID4gZXZlbnQuY2xpZW50WCAtIHBvc2l0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoJ2JhY2snKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcnRDb250ZW50ICogMykgPCBldmVudC5jbGllbnRYIC0gcG9zaXRpb24ubGVmdCkge1xuICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNjcm9sbCgnZm9yd2FyZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ2xpY2sgc3VsbGEgZnJlY2NpYVxuICAgKi9cbiAgcHVibGljIGFycm93KGV2ZW50OiBNb3VzZUV2ZW50IHwgV2hlZWxFdmVudCB8IGFueSwgYXJyb3c6ICdiYWNrJyB8ICdmb3J3YXJkJyk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIGFycm93ID09PSAnYmFjaycgPyB0aGlzLmFycm93QmFja0VsIDogdGhpcy5hcnJvd0ZvcndhcmRFbClcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25TY3JvbGwoYXJyb3cpO1xuICB9XG5cbiAgcHVibGljIG1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkTW91c2VXaGVlbCkge1xuICAgICAgY29uc3QgZXZlbnRvID0gd2luZG93LmV2ZW50IHx8IGV2ZW50OyAvLyBQZXIgaSB2ZWNjaGkgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAgIGNvbnN0IG1vdmltZW50byA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudG8ud2hlZWxEZWx0YSB8fCAtZXZlbnRvLmRldGFpbCkpO1xuICAgICAgdGhpcy5hcnJvdyhudWxsLCBtb3ZpbWVudG8gPiAwID8gJ2JhY2snIDogJ2ZvcndhcmQnKTtcbiAgICAgIC8vIFBlciBJbnRlcm5ldCBFeHBsb3JlclxuICAgICAgZXZlbnRvLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAvLyBQZXIgQ2hyb21lIGUgRmlyZWZveFxuICAgICAgaWYgKGV2ZW50by5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudG8ucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF6aW9uZSBkZWxsbyBzY3JvbFxuICAgKi9cbiAgcHJpdmF0ZSBhbmltYXRpb25TY3JvbGwodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IDEwO1xuICAgIGxldCBmYXNlID0gMDtcbiAgICBjb25zdCBzY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChzdGVwICE9PSBmYXNlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZm9yd2FyZCcpIHtcbiAgICAgICAgICBmYXNlICs9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnRhYi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsTGVmdCcsICh0aGlzLnRhYi5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAodGhpcy5zdGVwIC8gMTApKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFzZSArPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy50YWIubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy50YWIubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IC0gKHRoaXMuc3RlcCAvIDEwKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDbGFzcyhidXR0b246IEJ1dHRvblRhYk1vZGVsKTogeyBhY3RpdmU6IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGl2ZTogKGJ1dHRvbi5hY3RpdmUpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdHlsZUJhcigpOiB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2RhVGFic1NlcnZpY2VTZXJ2aWNlLnRhYnNTdHlsZS5iYXJCYWNrZ3JvdW5kQ29sb3JcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlIGJvdHRvbmVcbiAgICogQHBhcmFtIGJ1dHRvbiB0aXBvIGJvdHRvbmVcbiAgICovXG4gIHB1YmxpYyBnZXRTdHlsZUJ1dHRvbihidXR0b246IEJ1dHRvblRhYk1vZGVsKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZywgY29sb3I6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBidXR0b24uYWN0aXZlID8gdGhpcy50YWJTdHlsZS5zZWxlY3RlZC5iYWNrZ3JvdW5kQ29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBjb2xvcjogYnV0dG9uLmFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuY29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5jb2xvclxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICAgIGRpdi5zdHlsZS5hbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgICAgfSwgNDAwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3R5bGVDb250ZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHRoaXMudGFiQ29udGVudEVsID8gKHRoaXMudGFiQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JykgOiAnMCdcbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, ViewChildren } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
/* SERVICE */
import { GdaTabsPrivateService } from './gda-tabs-private.service';
import * as i0 from "@angular/core";
import * as i1 from "./gda-tabs-private.service";
import * as i2 from "./gda-tabs.service";
import * as i3 from "@angular/common";
class ListTabsModel {
    constructor(position, title) {
        this.position = position;
        this.title = title;
    }
}
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
export class GdaTabsComponent {
    constructor(cd, renderer, gdaTabsPrivateService, gdaTabsService) {
        this.cd = cd;
        this.renderer = renderer;
        this.gdaTabsPrivateService = gdaTabsPrivateService;
        this.gdaTabsService = gdaTabsService;
        this.setClass = 'gda-tabs';
        this.step = 0;
        this.iconArrow = iconArrow;
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
    }
    set animation(val) {
        this.gdaTabsPrivateService.setAnimation(val);
    }
    ;
    onResize() {
        this.getArrow('control');
        this.cd.detectChanges();
    }
    ngOnChanges(changes) {
        if (changes.indexTab?.firstChange === false && changes.indexTab?.previousValue !== undefined && changes.indexTab?.previousValue !== changes.indexTab?.currentValue)
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
        if (el && e) {
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
            setTimeout(() => renderer.removeChild(el.nativeElement, div), 400);
        }
    }
    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
GdaTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsPrivateService }, { token: i2.GdaTabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaTabsComponent, selector: "gda-tabs, .gda-tabs, [gda-tabs]", inputs: { indexTab: "indexTab", animation: "animation", tabStyle: "tabStyle" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
        GdaTabsPrivateService
    ], viewQueries: [{ propertyName: "tabsHeaderContentEl", first: true, predicate: ["tabsHeaderContent"], descendants: true, static: true }, { propertyName: "buttonsTabEl", first: true, predicate: ["buttonsTab"], descendants: true, static: true }, { propertyName: "arrowBackEl", first: true, predicate: ["arrowBack"], descendants: true }, { propertyName: "arrowForwardEl", first: true, predicate: ["arrowForward"], descendants: true }, { propertyName: "tabsContentEl", first: true, predicate: ["tabsContent"], descendants: true }, { propertyName: "buttonEl", predicate: ["buttonEl"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="gda-tabs-button-container" [ngClass]="{'gda-tabs-resize': viewArrow}" #tabsHeaderContent>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-back" *ngIf="viewArrow" (click)="arrow($event, 0)" #arrowBack @tabsArrowAnimation>
        <svg
          width="24"
          height="24"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          style="transform: rotate(180deg);"
          xmlns="http://www.w3.org/2000/svg">
          <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
        </svg>
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tabs, .gda-tabs, [gda-tabs]',
                    template: `
    <div class="gda-tabs-button-container" [ngClass]="{'gda-tabs-resize': viewArrow}" #tabsHeaderContent>
      <button type="button" class="gda-arrow-tabs gda-arrow-tabs-back" *ngIf="viewArrow" (click)="arrow($event, 0)" #arrowBack @tabsArrowAnimation>
        <svg
          width="24"
          height="24"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          style="transform: rotate(180deg);"
          xmlns="http://www.w3.org/2000/svg">
          <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
        </svg>
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.GdaTabsPrivateService }, { type: i2.GdaTabsService }]; }, propDecorators: { setClass: [{
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
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFvRCxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckYsYUFBYTtBQUNiLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQU9uRSxNQUFNLGFBQWE7SUFJakIsWUFBWSxRQUFnQixFQUFFLEtBQWdDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7Q0FDRjtBQUVELE1BQU0sU0FBUyxHQUFHOzs7Ozs7Ozs7Ozs7Q0FZakIsQ0FBQztBQTRGRixNQUFNLE9BQU8sZ0JBQWdCO0lBc0IzQixZQUNVLEVBQXFCLEVBQ3JCLFFBQW1CLEVBQ25CLHFCQUE0QyxFQUM1QyxjQUE4QjtRQUg5QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBekJWLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFjNUMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVQLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFXOUIsSUFBSSxDQUFDLFFBQVEsR0FB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UUFBUTtzQkFBaEIsS0FBSztnQkFFTyxTQUFTO3NCQUFyQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNO2dCQXVDNEMsUUFBUTtzQkFBMUQsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgdHJhbnNpdGlvbiwgc3R5bGUsIGFuaW1hdGUsIGtleWZyYW1lcyB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhVGFic1ByaXZhdGVTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy1wcml2YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2RhVGFic1NlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLnNlcnZpY2UnO1xuLyogTU9ERUwgKi9cbmltcG9ydCB7IEdkYVRhYnNTdHlsZU1vZGVsIH0gZnJvbSAnLi9nZGEtdGFicy1zdHlsZS5tb2RlbCc7XG4vKiBSWEpTICovXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuY2xhc3MgTGlzdFRhYnNNb2RlbCB7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICB9XG59XG5cbmNvbnN0IGljb25BcnJvdyA9IGBcbiAgICA8c3ZnXG4gICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD1cIjJcIlxuICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8cGF0aCBkPVwibTEwLjIxMSA3LjE1NWMtLjE0MS0uMTA4LS4zLS4xNTctLjQ1Ni0uMTU3LS4zODkgMC0uNzU1LjMwNi0uNzU1Ljc0OXY4LjUwMWMwIC40NDUuMzY3Ljc1Ljc1NS43NS4xNTcgMCAuMzE2LS4wNS40NTctLjE1OSAxLjU1NC0xLjIwMyA0LjE5OS0zLjI1MiA1LjQ5OC00LjI1OC4xODQtLjE0Mi4yOS0uMzYuMjktLjU5MiAwLS4yMy0uMTA3LS40NDktLjI5MS0uNTkxLTEuMjk5LTEuMDAyLTMuOTQ1LTMuMDQ0LTUuNDk4LTQuMjQzelwiLz5cbiAgICA8L3N2Zz5cbmA7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtdGFicywgLmdkYS10YWJzLCBbZ2RhLXRhYnNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnZ2RhLXRhYnMtcmVzaXplJzogdmlld0Fycm93fVwiICN0YWJzSGVhZGVyQ29udGVudD5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtYmFja1wiICpuZ0lmPVwidmlld0Fycm93XCIgKGNsaWNrKT1cImFycm93KCRldmVudCwgMClcIiAjYXJyb3dCYWNrIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIHN0cm9rZS1taXRlcmxpbWl0PVwiMlwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgc3R5bGU9XCJ0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1wiXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJtMTAuMjExIDcuMTU1Yy0uMTQxLS4xMDgtLjMtLjE1Ny0uNDU2LS4xNTctLjM4OSAwLS43NTUuMzA2LS43NTUuNzQ5djguNTAxYzAgLjQ0NS4zNjcuNzUuNzU1Ljc1LjE1NyAwIC4zMTYtLjA1LjQ1Ny0uMTU5IDEuNTU0LTEuMjAzIDQuMTk5LTMuMjUyIDUuNDk4LTQuMjU4LjE4NC0uMTQyLjI5LS4zNi4yOS0uNTkyIDAtLjIzLS4xMDctLjQ0OS0uMjkxLS41OTEtMS4yOTktMS4wMDItMy45NDUtMy4wNDQtNS40OTgtNC4yNDN6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cImdkYS10YWJzLWJ1dHRvbi1jb250YWluZXItdGFiXCIgI2J1dHRvbnNUYWI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGdldEJ1dHRvbnMoKTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgY2xhc3M9XCJnZGEtdGFicy1idXR0b25cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInthY3RpdmU6IGdldEluZGV4VGFiKCkgPT09IGl9XCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJnZXRTdHlsZUJ1dHRvbihnZXRJbmRleFRhYigpID09PSBpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0ZWRUYWIoJGV2ZW50LCBpKVwiXG4gICAgICAgICAgKG1vdXNld2hlZWwpPVwibW91c2VXaGVlbCgkZXZlbnQpXCJcbiAgICAgICAgICAjYnV0dG9uRWw+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbi50aXRsZT8uZWxlbWVudFJlZjsgZWxzZSB0aXRsZVN0cmluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1dHRvbi50aXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdGl0bGVTdHJpbmc+XG4gICAgICAgICAgICB7eyBidXR0b24udGl0bGUgfX1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1iYXJcIiBbbmdTdHlsZV09XCJnZXRTdHlsZUJhcigpXCI+PC9kaXY+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImdkYS1hcnJvdy10YWJzIGdkYS1hcnJvdy10YWJzLWZvcndhcmRcIiAqbmdJZj1cInZpZXdBcnJvd1wiIChjbGljayk9XCJhcnJvdygkZXZlbnQsIDEpXCIgI2Fycm93Rm9yd2FyZCBAdGFic0Fycm93QW5pbWF0aW9uPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICAgIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD1cIjJcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aCBkPVwibTEwLjIxMSA3LjE1NWMtLjE0MS0uMTA4LS4zLS4xNTctLjQ1Ni0uMTU3LS4zODkgMC0uNzU1LjMwNi0uNzU1Ljc0OXY4LjUwMWMwIC40NDUuMzY3Ljc1Ljc1NS43NS4xNTcgMCAuMzE2LS4wNS40NTctLjE1OSAxLjU1NC0xLjIwMyA0LjE5OS0zLjI1MiA1LjQ5OC00LjI1OC4xODQtLjE0Mi4yOS0uMzYuMjktLjU5MiAwLS4yMy0uMTA3LS40NDktLjI5MS0uNTkxLTEuMjk5LTEuMDAyLTMuOTQ1LTMuMDQ0LTUuNDk4LTQuMjQzelwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtY29udGVudFwiICN0YWJzQ29udGVudD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR2RhVGFic1ByaXZhdGVTZXJ2aWNlXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCd0YWJzQXJyb3dBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgd2lkdGg6ICc1JScgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICc1JSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgd2lkdGg6ICc1JScgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAnNSUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBwcml2YXRlIHNldENsYXNzID0gJ2dkYS10YWJzJztcbiAgQFZpZXdDaGlsZHJlbignYnV0dG9uRWwnKSBwcml2YXRlIGJ1dHRvbkVsITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKCd0YWJzSGVhZGVyQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgdGFic0hlYWRlckNvbnRlbnRFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbnNUYWInLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIGJ1dHRvbnNUYWJFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Fycm93QmFjaycsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIGFycm93QmFja0VsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYXJyb3dGb3J3YXJkJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgYXJyb3dGb3J3YXJkRWwhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0YWJzQ29udGVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIHRhYnNDb250ZW50RWwhOiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBpbmRleFRhYjogbnVtYmVyO1xuICBwcml2YXRlIGJ1dHRvbnM6IExpc3RUYWJzTW9kZWxbXTtcbiAgQElucHV0KCkgc2V0IGFuaW1hdGlvbih2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRBbmltYXRpb24odmFsKTtcbiAgfTtcbiAgQElucHV0KCkgdGFiU3R5bGU6IEdkYVRhYnNTdHlsZU1vZGVsO1xuICBAT3V0cHV0KCkgaW5kZXhUYWJBY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICBwcml2YXRlIHN0ZXAgPSAwO1xuICBwcm90ZWN0ZWQgdmlld0Fycm93OiBib29sZWFuO1xuICBwcm90ZWN0ZWQgaWNvbkFycm93ID0gaWNvbkFycm93O1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBnZGFUYWJzUHJpdmF0ZVNlcnZpY2U6IEdkYVRhYnNQcml2YXRlU2VydmljZSxcbiAgICBwcml2YXRlIGdkYVRhYnNTZXJ2aWNlOiBHZGFUYWJzU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy50YWJTdHlsZSA9IHRoaXMuZ2RhVGFic1NlcnZpY2UudGFic1N0eWxlO1xuICAgIHRoaXMuaW5kZXhUYWIgPSAwO1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuICAgIHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5zdWIxID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuYnV0dG9uTG9hZGVkLnN1YnNjcmliZSgoYnV0dG9uczogTGlzdFRhYnNNb2RlbFtdKSA9PiB7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zLnNsaWNlKCk7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b25FbCA9IHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICAgIGxldCBsZW5ndGhCdXR0b25zOiBudW1iZXIgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25FbCkgbGVuZ3RoQnV0dG9ucyArPSBidXR0b24ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuc3RlcCA9IGxlbmd0aEJ1dHRvbnMgLyB0aGlzLmJ1dHRvbnMubGVuZ3RoO1xuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uc1t0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5nZXRJbmRleFRhYigpXSkge1xuICAgICAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKHRoaXMuYnV0dG9ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5pbmRleFRhYkNoYW5nZXNFbWl0LmVtaXQodGhpcy5idXR0b25zLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy50YWJzQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5Jyk7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzRW1pdC5zdWJzY3JpYmUoKGNoYW5nZTogbnVtYmVyKSA9PiB0aGlzLmluZGV4VGFiQWN0aXZhdGVkLmVtaXQoY2hhbmdlKSk7XG4gICAgdGhpcy52aWV3QXJyb3cgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKSBwcml2YXRlIG9uUmVzaXplKCkge1xuICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgfCBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5pbmRleFRhYj8uZmlyc3RDaGFuZ2UgPT09IGZhbHNlICYmIGNoYW5nZXMuaW5kZXhUYWI/LnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBjaGFuZ2VzLmluZGV4VGFiPy5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLmluZGV4VGFiPy5jdXJyZW50VmFsdWUpIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKGNoYW5nZXMuaW5kZXhUYWIuY3VycmVudFZhbHVlKVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJzQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzAnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRCdXR0b25zKCk6IExpc3RUYWJzTW9kZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuYnV0dG9ucztcbiAgfVxuXG4gIHByb3RlY3RlZCBvblNlbGVjdGVkVGFiKGU6IE1vdXNlRXZlbnQgfCBudWxsLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmJ1dHRvbkVsLnRvQXJyYXkoKVtpbmRleF0sIHRoaXMucmVuZGVyZXIpO1xuICAgIH1cbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRJbmRleFRhYihpbmRleCk7XG4gICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzRW1pdC5lbWl0KGluZGV4KTtcbiAgICBpZiAodGhpcy5nZXRBcnJvdygncmV0dXJuJykpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHBhcnRDb250ZW50ID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIDQ7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBpZiAocGFydENvbnRlbnQgPiBlLmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHBhcnRDb250ZW50ICogMykgPCBlLmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5kZXhUYWIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0SW5kZXhUYWIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcnJvdyhldmVudDogTW91c2VFdmVudCB8IFdoZWVsRXZlbnQgfCBhbnksIGFycm93OiAwIHwgMSk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIGFycm93ID09PSAwID8gdGhpcy5hcnJvd0JhY2tFbCA6IHRoaXMuYXJyb3dGb3J3YXJkRWwsIHRoaXMucmVuZGVyZXIpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uU2Nyb2xsKGFycm93KTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0aW9uU2Nyb2xsKGFycm93OiAwIHwgMSk6IHZvaWQge1xuICAgIGNvbnN0IHN0ZXAgPSAxMDtcbiAgICBsZXQgZmFzZSA9IDA7XG4gICAgY29uc3Qgc2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoc3RlcCAhPT0gZmFzZSkge1xuICAgICAgICBpZiAoYXJyb3cgPT09IDEpIHtcbiAgICAgICAgICBmYXNlICs9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsTGVmdCcsICh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAodGhpcy5zdGVwIC8gMTApKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFzZSArPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IC0gKHRoaXMuc3RlcCAvIDEwKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtb3VzZVdoZWVsKGV2ZW50OiBXaGVlbEV2ZW50IHwgYW55KSB7XG4gICAgY29uc3QgZXZlbnRvID0gd2luZG93LmV2ZW50IHx8IGV2ZW50OyAvLyBQZXIgaSB2ZWNjaGkgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICBjb25zdCBtb3ZpbWVudG8gPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnRvLndoZWVsRGVsdGEgfHwgLWV2ZW50by5kZXRhaWwpKTtcbiAgICB0aGlzLmFycm93KG51bGwsIG1vdmltZW50byA+IDAgPyAwIDogMSk7XG4gICAgLy8gUGVyIEludGVybmV0IEV4cGxvcmVyXG4gICAgZXZlbnRvLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgLy8gUGVyIENocm9tZSBlIEZpcmVmb3hcbiAgICBpZiAoZXZlbnRvLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudG8ucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFycm93KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnRhYnNDb250ZW50RWwpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbnNFbCA9IHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICBsZXQgdG90V2lkdGggPSAwO1xuICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9uc0VsKSB7XG4gICAgICAgIHRvdFdpZHRoICs9IGJ1dHRvbi5vZmZzZXRXaWR0aDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdlRvdCA9IHRoaXMudGFic0hlYWRlckNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgdG90V2lkdGggPSB0b3RXaWR0aDtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZGl2VG90IDwgdG90V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdBcnJvdyA9IChkaXZUb3QgPCB0b3RXaWR0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdHlsZUJ1dHRvbihhY3RpdmU6IGJvb2xlYW4pOiB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nLCBjb2xvcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuYmFja2dyb3VuZENvbG9yIDogdGhpcy50YWJTdHlsZS5ub3JtYWwuYmFja2dyb3VuZENvbG9yLFxuICAgICAgY29sb3I6IGFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuY29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5jb2xvclxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3R5bGVCYXIoKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnRhYlN0eWxlLmJhckJhY2tncm91bmRDb2xvclxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBpZiAoZWwgJiYgZSkge1xuICAgICAgY29uc3QgZGl2ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgICAgY29uc3QgZCA9IE1hdGgubWF4KGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsIGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdi5zdHlsZS5oZWlnaHQgPSBkICsgJ3B4JztcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZGl2LnN0eWxlLmxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnQgLSBkIC8gMiArICdweCc7XG4gICAgICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZIC0gcmVjdC50b3AgLSBkIC8gMiArICdweCc7XG4gICAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRBbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBkaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2dkYS10YWJzLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZW5kZXJlci5yZW1vdmVDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpLCA0MDApXG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19
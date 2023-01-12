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
export class GdaTabs {
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
GdaTabs.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabs, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsPrivateService }, { token: i2.GdaTabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabs.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaTabs, selector: "gda-tabs, .gda-tabs, [gda-tabs]", inputs: { indexTab: "indexTab", animation: "animation", tabStyle: "tabStyle" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabs, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFvRCxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckYsYUFBYTtBQUNiLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQU9uRSxNQUFNLGFBQWE7SUFJakIsWUFBWSxRQUFnQixFQUFFLEtBQWdDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7Q0FDRjtBQUVELE1BQU0sU0FBUyxHQUFHOzs7Ozs7Ozs7Ozs7Q0FZakIsQ0FBQztBQTRGRixNQUFNLE9BQU8sT0FBTztJQXNCbEIsWUFDVSxFQUFxQixFQUNyQixRQUFtQixFQUNuQixxQkFBNEMsRUFDNUMsY0FBOEI7UUFIOUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXpCVixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBYzVDLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFUCxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBVzlCLElBQUksQ0FBQyxRQUFRLEdBQUcs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QixLQUFLO2dCQUVPLFNBQVM7c0JBQXJCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBdUM0QyxRQUFRO3NCQUExRCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwga2V5ZnJhbWVzIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFUYWJzUHJpdmF0ZVNlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLXByaXZhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBHZGFUYWJzU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMuc2VydmljZSc7XG4vKiBNT0RFTCAqL1xuaW1wb3J0IHsgR2RhVGFic1N0eWxlTW9kZWwgfSBmcm9tICcuL2dkYS10YWJzLXN0eWxlLm1vZGVsJztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5jbGFzcyBMaXN0VGFic01vZGVsIHtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG5cbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlciwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gIH1cbn1cblxuY29uc3QgaWNvbkFycm93ID0gYFxuICAgIDxzdmdcbiAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgIHN0cm9rZS1taXRlcmxpbWl0PVwiMlwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJtMTAuMjExIDcuMTU1Yy0uMTQxLS4xMDgtLjMtLjE1Ny0uNDU2LS4xNTctLjM4OSAwLS43NTUuMzA2LS43NTUuNzQ5djguNTAxYzAgLjQ0NS4zNjcuNzUuNzU1Ljc1LjE1NyAwIC4zMTYtLjA1LjQ1Ny0uMTU5IDEuNTU0LTEuMjAzIDQuMTk5LTMuMjUyIDUuNDk4LTQuMjU4LjE4NC0uMTQyLjI5LS4zNi4yOS0uNTkyIDAtLjIzLS4xMDctLjQ0OS0uMjkxLS41OTEtMS4yOTktMS4wMDItMy45NDUtMy4wNDQtNS40OTgtNC4yNDN6XCIvPlxuICAgIDwvc3ZnPlxuYDtcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2dkYS10YWJzLCAuZ2RhLXRhYnMsIFtnZGEtdGFic10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1idXR0b24tY29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydnZGEtdGFicy1yZXNpemUnOiB2aWV3QXJyb3d9XCIgI3RhYnNIZWFkZXJDb250ZW50PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnZGEtYXJyb3ctdGFicyBnZGEtYXJyb3ctdGFicy1iYWNrXCIgKm5nSWY9XCJ2aWV3QXJyb3dcIiAoY2xpY2spPVwiYXJyb3coJGV2ZW50LCAwKVwiICNhcnJvd0JhY2sgQHRhYnNBcnJvd0FuaW1hdGlvbj5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ9XCIyXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICBzdHlsZT1cInRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XCJcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGggZD1cIm0xMC4yMTEgNy4xNTVjLS4xNDEtLjEwOC0uMy0uMTU3LS40NTYtLjE1Ny0uMzg5IDAtLjc1NS4zMDYtLjc1NS43NDl2OC41MDFjMCAuNDQ1LjM2Ny43NS43NTUuNzUuMTU3IDAgLjMxNi0uMDUuNDU3LS4xNTkgMS41NTQtMS4yMDMgNC4xOTktMy4yNTIgNS40OTgtNC4yNTguMTg0LS4xNDIuMjktLjM2LjI5LS41OTIgMC0uMjMtLjEwNy0uNDQ5LS4yOTEtLjU5MS0xLjI5OS0xLjAwMi0zLjk0NS0zLjA0NC01LjQ5OC00LjI0M3pcIi8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uLWNvbnRhaW5lci10YWJcIiAjYnV0dG9uc1RhYj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBidXR0b24gb2YgZ2V0QnV0dG9ucygpOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICBjbGFzcz1cImdkYS10YWJzLWJ1dHRvblwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwie2FjdGl2ZTogZ2V0SW5kZXhUYWIoKSA9PT0gaX1cIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cImdldFN0eWxlQnV0dG9uKGdldEluZGV4VGFiKCkgPT09IGkpXCJcbiAgICAgICAgICAoY2xpY2spPVwib25TZWxlY3RlZFRhYigkZXZlbnQsIGkpXCJcbiAgICAgICAgICAobW91c2V3aGVlbCk9XCJtb3VzZVdoZWVsKCRldmVudClcIlxuICAgICAgICAgICNidXR0b25FbD5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uLnRpdGxlPy5lbGVtZW50UmVmOyBlbHNlIHRpdGxlU3RyaW5nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnV0dG9uLnRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICN0aXRsZVN0cmluZz5cbiAgICAgICAgICAgIHt7IGJ1dHRvbi50aXRsZSB9fVxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdkYS10YWJzLWJhclwiIFtuZ1N0eWxlXT1cImdldFN0eWxlQmFyKClcIj48L2Rpdj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtZm9yd2FyZFwiICpuZ0lmPVwidmlld0Fycm93XCIgKGNsaWNrKT1cImFycm93KCRldmVudCwgMSlcIiAjYXJyb3dGb3J3YXJkIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIHN0cm9rZS1taXRlcmxpbWl0PVwiMlwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJtMTAuMjExIDcuMTU1Yy0uMTQxLS4xMDgtLjMtLjE1Ny0uNDU2LS4xNTctLjM4OSAwLS43NTUuMzA2LS43NTUuNzQ5djguNTAxYzAgLjQ0NS4zNjcuNzUuNzU1Ljc1LjE1NyAwIC4zMTYtLjA1LjQ1Ny0uMTU5IDEuNTU0LTEuMjAzIDQuMTk5LTMuMjUyIDUuNDk4LTQuMjU4LjE4NC0uMTQyLjI5LS4zNi4yOS0uNTkyIDAtLjIzLS4xMDctLjQ0OS0uMjkxLS41OTEtMS4yOTktMS4wMDItMy45NDUtMy4wNDQtNS40OTgtNC4yNDN6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1jb250ZW50XCIgI3RhYnNDb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICBHZGFUYWJzUHJpdmF0ZVNlcnZpY2VcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBcnJvd0FuaW1hdGlvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICc1JSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFicyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByaXZhdGUgc2V0Q2xhc3MgPSAnZ2RhLXRhYnMnO1xuICBAVmlld0NoaWxkcmVuKCdidXR0b25FbCcpIHByaXZhdGUgYnV0dG9uRWwhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoJ3RhYnNIZWFkZXJDb250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSB0YWJzSGVhZGVyQ29udGVudEVsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYnV0dG9uc1RhYicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgYnV0dG9uc1RhYkVsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYXJyb3dCYWNrJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgYXJyb3dCYWNrRWwhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdhcnJvd0ZvcndhcmQnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBhcnJvd0ZvcndhcmRFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYnNDb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgdGFic0NvbnRlbnRFbCE6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIGluZGV4VGFiOiBudW1iZXI7XG4gIHByaXZhdGUgYnV0dG9uczogTGlzdFRhYnNNb2RlbFtdO1xuICBASW5wdXQoKSBzZXQgYW5pbWF0aW9uKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEFuaW1hdGlvbih2YWwpO1xuICB9O1xuICBASW5wdXQoKSB0YWJTdHlsZTogR2RhVGFic1N0eWxlTW9kZWw7XG4gIEBPdXRwdXQoKSBpbmRleFRhYkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIHByaXZhdGUgc3RlcCA9IDA7XG4gIHByb3RlY3RlZCB2aWV3QXJyb3c6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBpY29uQXJyb3cgPSBpY29uQXJyb3c7XG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGdkYVRhYnNQcml2YXRlU2VydmljZTogR2RhVGFic1ByaXZhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnRhYlN0eWxlID0gdGhpcy5nZGFUYWJzU2VydmljZS50YWJzU3R5bGU7XG4gICAgdGhpcy5pbmRleFRhYiA9IDA7XG4gICAgdGhpcy5idXR0b25zID0gW107XG4gICAgdGhpcy5pbmRleFRhYkFjdGl2YXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLnN1YjEgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5idXR0b25Mb2FkZWQuc3Vic2NyaWJlKChidXR0b25zOiBMaXN0VGFic01vZGVsW10pID0+IHtcbiAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnMuc2xpY2UoKTtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICAgICAgbGV0IGxlbmd0aEJ1dHRvbnM6IG51bWJlciA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbkVsKSBsZW5ndGhCdXR0b25zICs9IGJ1dHRvbi5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5zdGVwID0gbGVuZ3RoQnV0dG9ucyAvIHRoaXMuYnV0dG9ucy5sZW5ndGg7XG4gICAgICAgIGlmICghdGhpcy5idXR0b25zW3RoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEluZGV4VGFiKCldKSB7XG4gICAgICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2Uuc2V0SW5kZXhUYWIodGhpcy5idXR0b25zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmluZGV4VGFiQ2hhbmdlc0VtaXQuZW1pdCh0aGlzLmJ1dHRvbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnRhYnNDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknKTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5pbmRleFRhYkNoYW5nZXNFbWl0LnN1YnNjcmliZSgoY2hhbmdlOiBudW1iZXIpID0+IHRoaXMuaW5kZXhUYWJBY3RpdmF0ZWQuZW1pdChjaGFuZ2UpKTtcbiAgICB0aGlzLnZpZXdBcnJvdyA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pIHByaXZhdGUgb25SZXNpemUoKSB7XG4gICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyB8IGFueSk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmluZGV4VGFiPy5maXJzdENoYW5nZSA9PT0gZmFsc2UgJiYgY2hhbmdlcy5pbmRleFRhYj8ucHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGNoYW5nZXMuaW5kZXhUYWI/LnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXMuaW5kZXhUYWI/LmN1cnJlbnRWYWx1ZSkgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2Uuc2V0SW5kZXhUYWIoY2hhbmdlcy5pbmRleFRhYi5jdXJyZW50VmFsdWUpXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYnNDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEJ1dHRvbnMoKTogTGlzdFRhYnNNb2RlbFtdIHtcbiAgICByZXR1cm4gdGhpcy5idXR0b25zO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uU2VsZWN0ZWRUYWIoZTogTW91c2VFdmVudCB8IG51bGwsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZSkge1xuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuYnV0dG9uRWwudG9BcnJheSgpW2luZGV4XSwgdGhpcy5yZW5kZXJlcik7XG4gICAgfVxuICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKGluZGV4KTtcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5pbmRleFRhYkNoYW5nZXNFbWl0LmVtaXQoaW5kZXgpO1xuICAgIGlmICh0aGlzLmdldEFycm93KCdyZXR1cm4nKSkge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgcGFydENvbnRlbnQgPSB0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gNDtcbiAgICAgIGlmIChlKSB7XG4gICAgICAgIGlmIChwYXJ0Q29udGVudCA+IGUuY2xpZW50WCAtIHBvc2l0aW9uLmxlZnQpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblNjcm9sbCgwKTtcbiAgICAgICAgfSBlbHNlIGlmICgocGFydENvbnRlbnQgKiAzKSA8IGUuY2xpZW50WCAtIHBvc2l0aW9uLmxlZnQpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblNjcm9sbCgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbmRleFRhYigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5nZXRJbmRleFRhYigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFycm93KGV2ZW50OiBNb3VzZUV2ZW50IHwgV2hlZWxFdmVudCB8IGFueSwgYXJyb3c6IDAgfCAxKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShldmVudCwgYXJyb3cgPT09IDAgPyB0aGlzLmFycm93QmFja0VsIDogdGhpcy5hcnJvd0ZvcndhcmRFbCwgdGhpcy5yZW5kZXJlcilcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25TY3JvbGwoYXJyb3cpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25TY3JvbGwoYXJyb3c6IDAgfCAxKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IDEwO1xuICAgIGxldCBmYXNlID0gMDtcbiAgICBjb25zdCBzY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChzdGVwICE9PSBmYXNlKSB7XG4gICAgICAgIGlmIChhcnJvdyA9PT0gMSkge1xuICAgICAgICAgIGZhc2UgKz0gMTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxMZWZ0JywgKHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArICh0aGlzLnN0ZXAgLyAxMCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYXNlICs9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsTGVmdCcsICh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgLSAodGhpcy5zdGVwIC8gMTApKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2Nyb2xsSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQgfCBhbnkpIHtcbiAgICBjb25zdCBldmVudG8gPSB3aW5kb3cuZXZlbnQgfHwgZXZlbnQ7IC8vIFBlciBpIHZlY2NoaSBJbnRlcm5ldCBFeHBsb3JlclxuICAgIGNvbnN0IG1vdmltZW50byA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudG8ud2hlZWxEZWx0YSB8fCAtZXZlbnRvLmRldGFpbCkpO1xuICAgIHRoaXMuYXJyb3cobnVsbCwgbW92aW1lbnRvID4gMCA/IDAgOiAxKTtcbiAgICAvLyBQZXIgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICBldmVudG8ucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAvLyBQZXIgQ2hyb21lIGUgRmlyZWZveFxuICAgIGlmIChldmVudG8ucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGV2ZW50by5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXJyb3codHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMudGFic0NvbnRlbnRFbCkge1xuICAgICAgY29uc3QgYnV0dG9uc0VsID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICAgIGxldCB0b3RXaWR0aCA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25zRWwpIHtcbiAgICAgICAgdG90V2lkdGggKz0gYnV0dG9uLm9mZnNldFdpZHRoO1xuICAgICAgfVxuICAgICAgY29uc3QgZGl2VG90ID0gdGhpcy50YWJzSGVhZGVyQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICB0b3RXaWR0aCA9IHRvdFdpZHRoO1xuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XG4gICAgICAgIHJldHVybiBkaXZUb3QgPCB0b3RXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlld0Fycm93ID0gKGRpdlRvdCA8IHRvdFdpZHRoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN0eWxlQnV0dG9uKGFjdGl2ZTogYm9vbGVhbik6IHsgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYWN0aXZlID8gdGhpcy50YWJTdHlsZS5zZWxlY3RlZC5iYWNrZ3JvdW5kQ29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBjb2xvcjogYWN0aXZlID8gdGhpcy50YWJTdHlsZS5zZWxlY3RlZC5jb2xvciA6IHRoaXMudGFiU3R5bGUubm9ybWFsLmNvbG9yXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdHlsZUJhcigpOiB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMudGFiU3R5bGUuYmFyQmFja2dyb3VuZENvbG9yXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZVJpcHBsZShlOiBNb3VzZUV2ZW50LCBlbDogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMik6IHZvaWQge1xuICAgIGlmIChlbCAmJiBlKSB7XG4gICAgICBjb25zdCBkaXYgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICAgIGRpdi5zdHlsZS5hbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdiksIDQwMClcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=
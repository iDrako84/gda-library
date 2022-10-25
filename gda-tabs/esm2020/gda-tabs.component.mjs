import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, ViewChildren } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
/* SERVICE */
import { GdaTabsPrivateService } from './gda-tabs-private.service';
/* RXJS */
import { delay, of } from 'rxjs';
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
export class GdaTabsComponent {
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
GdaTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaTabsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsPrivateService }, { token: i2.GdaTabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.7", type: GdaTabsComponent, selector: "gda-tabs, .gda-tabs, [gda-tabs]", inputs: { indexTab: "indexTab", animation: "animation", tabStyle: "tabStyle" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaTabsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tabs, .gda-tabs, [gda-tabs]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFvRCxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckYsYUFBYTtBQUNiLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSW5FLFVBQVU7QUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7Ozs7O0FBRS9DLE1BQU0sYUFBYTtJQUlqQixZQUFZLFFBQWdCLEVBQUUsS0FBZ0M7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBdUVELE1BQU0sT0FBTyxnQkFBZ0I7SUFxQjNCLFlBQ1UsRUFBcUIsRUFDckIsUUFBbUIsRUFDbkIscUJBQTRDLEVBQzVDLGNBQThCO1FBSDlCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF4QlIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQWM5QyxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBWWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJ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QVE7c0JBQWhCLEtBQUs7Z0JBRU8sU0FBUztzQkFBckIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFzQzhDLFFBQVE7c0JBQTVELFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVRhYnNQcml2YXRlU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMtcHJpdmF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEdkYVRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy5zZXJ2aWNlJztcbi8qIE1PREVMICovXG5pbXBvcnQgeyBHZGFUYWJzU3R5bGVNb2RlbCB9IGZyb20gJy4vZ2RhLXRhYnMtc3R5bGUubW9kZWwnO1xuLyogUlhKUyAqL1xuaW1wb3J0IHsgZGVsYXksIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuY2xhc3MgTGlzdFRhYnNNb2RlbCB7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtdGFicywgLmdkYS10YWJzLCBbZ2RhLXRhYnNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnZ2RhLXRhYnMtcmVzaXplJzogdmlld0Fycm93fVwiICN0YWJzSGVhZGVyQ29udGVudD5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2RhLWFycm93LXRhYnMgZ2RhLWFycm93LXRhYnMtYmFja1wiICpuZ0lmPVwidmlld0Fycm93XCIgKGNsaWNrKT1cImFycm93KCRldmVudCwgMClcIiAjYXJyb3dCYWNrIEB0YWJzQXJyb3dBbmltYXRpb24+XG4gICAgICAgICYjeDIxOTA7XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1idXR0b24tY29udGFpbmVyLXRhYlwiICNidXR0b25zVGFiPlxuICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGdldEJ1dHRvbnMoKTsgbGV0IGkgPSBpbmRleFwiIFxuICAgICAgICAgIGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uXCIgXG4gICAgICAgICAgW25nQ2xhc3NdPVwie2FjdGl2ZTogZ2V0SW5kZXhUYWIoKSA9PT0gaX1cIiBcbiAgICAgICAgICBbbmdTdHlsZV09XCJnZXRTdHlsZUJ1dHRvbihnZXRJbmRleFRhYigpID09PSBpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0ZWRUYWIoJGV2ZW50LCBpKVwiIFxuICAgICAgICAgIChtb3VzZXdoZWVsKT1cIm1vdXNlV2hlZWwoJGV2ZW50KVwiXG4gICAgICAgICAgI2J1dHRvbkVsPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24udGl0bGU/LmVsZW1lbnRSZWY7IGVsc2UgdGl0bGVTdHJpbmdcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidXR0b24udGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3RpdGxlU3RyaW5nPlxuICAgICAgICAgICAge3sgYnV0dG9uLnRpdGxlIH19XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYmFyXCIgW25nU3R5bGVdPVwiZ2V0U3R5bGVCYXIoKVwiPjwvZGl2PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnZGEtYXJyb3ctdGFicyBnZGEtYXJyb3ctdGFicy1mb3J3YXJkXCIgKm5nSWY9XCJ2aWV3QXJyb3dcIiAoY2xpY2spPVwiYXJyb3coJGV2ZW50LCAxKVwiICNhcnJvd0ZvcndhcmQgQHRhYnNBcnJvd0FuaW1hdGlvbj5cbiAgICAgICAgJiN4MjE5MjtcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1jb250ZW50XCIgI3RhYnNDb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICBHZGFUYWJzUHJpdmF0ZVNlcnZpY2VcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBcnJvd0FuaW1hdGlvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgd2lkdGg6ICc1JSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByb3RlY3RlZCBzZXRDbGFzcyA9ICdnZGEtdGFicyc7XG4gIEBWaWV3Q2hpbGRyZW4oJ2J1dHRvbkVsJykgcHJvdGVjdGVkIGJ1dHRvbkVsITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKCd0YWJzSGVhZGVyQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByb3RlY3RlZCB0YWJzSGVhZGVyQ29udGVudEVsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYnV0dG9uc1RhYicsIHsgc3RhdGljOiB0cnVlIH0pIHByb3RlY3RlZCBidXR0b25zVGFiRWwhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdhcnJvd0JhY2snLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJvdGVjdGVkIGFycm93QmFja0VsITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYXJyb3dGb3J3YXJkJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb3RlY3RlZCBhcnJvd0ZvcndhcmRFbCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYnNDb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb3RlY3RlZCB0YWJzQ29udGVudEVsITogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgaW5kZXhUYWI6IG51bWJlcjtcbiAgcHJpdmF0ZSBidXR0b25zOiBMaXN0VGFic01vZGVsW107XG4gIEBJbnB1dCgpIHNldCBhbmltYXRpb24odmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2Uuc2V0QW5pbWF0aW9uKHZhbCk7XG4gIH07XG4gIEBJbnB1dCgpIHRhYlN0eWxlOiBHZGFUYWJzU3R5bGVNb2RlbDtcbiAgQE91dHB1dCgpIGluZGV4VGFiQWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzdGVwID0gMDtcbiAgcHJvdGVjdGVkIHZpZXdBcnJvdzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhVGFic1ByaXZhdGVTZXJ2aWNlOiBHZGFUYWJzUHJpdmF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnZGFUYWJzU2VydmljZTogR2RhVGFic1NlcnZpY2UsXG4gICkge1xuICAgIHRoaXMudGFiU3R5bGUgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlLnRhYnNTdHlsZTtcbiAgICB0aGlzLmluZGV4VGFiID0gMDtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICB0aGlzLmluZGV4VGFiQWN0aXZhdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc3ViMSA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmJ1dHRvbkxvYWRlZC5zdWJzY3JpYmUoKGJ1dHRvbnM6IExpc3RUYWJzTW9kZWxbXSkgPT4ge1xuICAgICAgdGhpcy5idXR0b25zID0gYnV0dG9ucy5zbGljZSgpO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uRWwgPSB0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgICAgICBsZXQgbGVuZ3RoQnV0dG9uczogbnVtYmVyID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9uRWwpIGxlbmd0aEJ1dHRvbnMgKz0gYnV0dG9uLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLnN0ZXAgPSBsZW5ndGhCdXR0b25zIC8gdGhpcy5idXR0b25zLmxlbmd0aDtcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbnNbdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0SW5kZXhUYWIoKV0pIHtcbiAgICAgICAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRJbmRleFRhYih0aGlzLmJ1dHRvbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzRW1pdC5lbWl0KHRoaXMuYnV0dG9ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMudGFic0NvbnRlbnRFbC5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMiA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmluZGV4VGFiQ2hhbmdlc0VtaXQuc3Vic2NyaWJlKChjaGFuZ2U6IG51bWJlcikgPT4gdGhpcy5pbmRleFRhYkFjdGl2YXRlZC5lbWl0KGNoYW5nZSkpO1xuICAgIHRoaXMudmlld0Fycm93ID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSkgcHJvdGVjdGVkIG9uUmVzaXplKCkge1xuICAgIHRoaXMuZ2V0QXJyb3coJ2NvbnRyb2wnKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgfCBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5pbmRleFRhYj8uZmlyc3RDaGFuZ2UgPT09IGZhbHNlICYmIGNoYW5nZXMuaW5kZXhUYWI/LnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBjaGFuZ2VzLmluZGV4VGFiPy5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLmluZGV4VGFiPy5jdXJyZW50VmFsdWUpIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKGNoYW5nZXMuaW5kZXhUYWIuY3VycmVudFZhbHVlKVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJzQ29udGVudEVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzAnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRCdXR0b25zKCk6IExpc3RUYWJzTW9kZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuYnV0dG9ucztcbiAgfVxuXG4gIHByb3RlY3RlZCBvblNlbGVjdGVkVGFiKGU6IE1vdXNlRXZlbnQgfCBudWxsLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmJ1dHRvbkVsLnRvQXJyYXkoKVtpbmRleF0sIHRoaXMucmVuZGVyZXIpO1xuICAgIH1cbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRJbmRleFRhYihpbmRleCk7XG4gICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzRW1pdC5lbWl0KGluZGV4KTtcbiAgICBpZiAodGhpcy5nZXRBcnJvdygncmV0dXJuJykpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHBhcnRDb250ZW50ID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIDQ7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBpZiAocGFydENvbnRlbnQgPiBlLmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHBhcnRDb250ZW50ICogMykgPCBlLmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5kZXhUYWIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0SW5kZXhUYWIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcnJvdyhldmVudDogTW91c2VFdmVudCB8IFdoZWVsRXZlbnQgfCBhbnksIGFycm93OiAwIHwgMSk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZXZlbnQsIGFycm93ID09PSAwID8gdGhpcy5hcnJvd0JhY2tFbCA6IHRoaXMuYXJyb3dGb3J3YXJkRWwsIHRoaXMucmVuZGVyZXIpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uU2Nyb2xsKGFycm93KTtcbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0aW9uU2Nyb2xsKGFycm93OiAwIHwgMSk6IHZvaWQge1xuICAgIGNvbnN0IHN0ZXAgPSAxMDtcbiAgICBsZXQgZmFzZSA9IDA7XG4gICAgY29uc3Qgc2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoc3RlcCAhPT0gZmFzZSkge1xuICAgICAgICBpZiAoYXJyb3cgPT09IDEpIHtcbiAgICAgICAgICBmYXNlICs9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsTGVmdCcsICh0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAodGhpcy5zdGVwIC8gMTApKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFzZSArPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0IC0gKHRoaXMuc3RlcCAvIDEwKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbEludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtb3VzZVdoZWVsKGV2ZW50OiBXaGVlbEV2ZW50IHwgYW55KSB7XG4gICAgY29uc3QgZXZlbnRvID0gd2luZG93LmV2ZW50IHx8IGV2ZW50OyAvLyBQZXIgaSB2ZWNjaGkgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICBjb25zdCBtb3ZpbWVudG8gPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnRvLndoZWVsRGVsdGEgfHwgLWV2ZW50by5kZXRhaWwpKTtcbiAgICB0aGlzLmFycm93KG51bGwsIG1vdmltZW50byA+IDAgPyAwIDogMSk7XG4gICAgLy8gUGVyIEludGVybmV0IEV4cGxvcmVyXG4gICAgZXZlbnRvLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgLy8gUGVyIENocm9tZSBlIEZpcmVmb3hcbiAgICBpZiAoZXZlbnRvLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudG8ucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFycm93KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnRhYnNDb250ZW50RWwpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbnNFbCA9IHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICBsZXQgdG90V2lkdGggPSAwO1xuICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9uc0VsKSB7XG4gICAgICAgIHRvdFdpZHRoICs9IGJ1dHRvbi5vZmZzZXRXaWR0aDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdlRvdCA9IHRoaXMudGFic0hlYWRlckNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgdG90V2lkdGggPSB0b3RXaWR0aDtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZGl2VG90IDwgdG90V2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpZXdBcnJvdyA9IChkaXZUb3QgPCB0b3RXaWR0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAncmV0dXJuJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdHlsZUJ1dHRvbihhY3RpdmU6IGJvb2xlYW4pOiB7IGJhY2tncm91bmRDb2xvcjogc3RyaW5nLCBjb2xvcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuYmFja2dyb3VuZENvbG9yIDogdGhpcy50YWJTdHlsZS5ub3JtYWwuYmFja2dyb3VuZENvbG9yLFxuICAgICAgY29sb3I6IGFjdGl2ZSA/IHRoaXMudGFiU3R5bGUuc2VsZWN0ZWQuY29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5jb2xvclxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3R5bGVCYXIoKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnRhYlN0eWxlLmJhckJhY2tncm91bmRDb2xvclxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KTtcbiAgICAgIGNvbnN0IGQgPSBNYXRoLm1heChlbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoLCBlbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBkaXYuc3R5bGUuaGVpZ2h0ID0gZCArICdweCc7XG4gICAgICBjb25zdCByZWN0ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gZCAvIDIgKyAncHgnO1xuICAgICAgZGl2LnN0eWxlLnRvcCA9IGUuY2xpZW50WSAtIHJlY3QudG9wIC0gZCAvIDIgKyAncHgnO1xuICAgICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0QW5pbWF0aW9uID0gJ2dkYS10YWJzLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgZGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoNDAwKSkuc3Vic2NyaWJlKCgpID0+IHJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdikpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3ViMS51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3ViMi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==
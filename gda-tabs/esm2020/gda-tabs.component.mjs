import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild, ViewChildren } from '@angular/core';
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
GdaTabsComponent.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsPrivateService }, { token: i2.GdaTabsService }], target: i0.????FactoryTarget.Component });
GdaTabsComponent.??cmp = i0.????ngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaTabsComponent, selector: "gda-tabs", inputs: { indexTab: "indexTab", animation: "animation", tabStyle: "tabStyle" }, outputs: { indexTabActivated: "indexTabActivated" }, host: { properties: { "class": "this.setClass" } }, providers: [
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
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabsComponent, decorators: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQW9ELFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNVAsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixhQUFhO0FBQ2IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJbkUsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFFL0MsTUFBTSxhQUFhO0lBSWpCLFlBQVksUUFBZ0IsRUFBRSxLQUFnQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUF1RUQsTUFBTSxPQUFPLGdCQUFnQjtJQXFCM0IsWUFDVSxFQUFxQixFQUNyQixRQUFtQixFQUNuQixxQkFBNEMsRUFDNUMsY0FBOEI7UUFIOUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXhCUixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBYzlDLFNBQUksR0FBRyxDQUFDLENBQUM7UUFZZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFj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QUssRUFBRTtnQkFDbEMsUUFBUTtzQkFBaEIsS0FBSztnQkFFTyxTQUFTO3NCQUFyQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuLyogU0VSVklDRSAqL1xyXG5pbXBvcnQgeyBHZGFUYWJzUHJpdmF0ZVNlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLXByaXZhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEdkYVRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy5zZXJ2aWNlJztcclxuLyogTU9ERUwgKi9cclxuaW1wb3J0IHsgR2RhVGFic1N0eWxlTW9kZWwgfSBmcm9tICcuL2dkYS10YWJzLXN0eWxlLm1vZGVsJztcclxuLyogUlhKUyAqL1xyXG5pbXBvcnQgeyBkZWxheSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuY2xhc3MgTGlzdFRhYnNNb2RlbCB7XHJcbiAgcG9zaXRpb246IG51bWJlcjtcclxuICB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlciwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc2VsZWN0b3I6ICdnZGEtdGFicycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnZGEtdGFicy1idXR0b24tY29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydnZGEtdGFicy1yZXNpemUnOiB2aWV3QXJyb3d9XCIgI3RhYnNIZWFkZXJDb250ZW50PlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImdkYS1hcnJvdy10YWJzIGdkYS1hcnJvdy10YWJzLWJhY2tcIiAqbmdJZj1cInZpZXdBcnJvd1wiIChjbGljayk9XCJhcnJvdygkZXZlbnQsIDApXCIgI2Fycm93QmFjayBAdGFic0Fycm93QW5pbWF0aW9uPlxyXG4gICAgICAgICYjeDIxOTA7XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uLWNvbnRhaW5lci10YWJcIiAjYnV0dG9uc1RhYj5cclxuICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBnZXRCdXR0b25zKCk7IGxldCBpID0gaW5kZXhcIiBcclxuICAgICAgICAgIGNsYXNzPVwiZ2RhLXRhYnMtYnV0dG9uXCIgXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7YWN0aXZlOiBnZXRJbmRleFRhYigpID09PSBpfVwiIFxyXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0U3R5bGVCdXR0b24oZ2V0SW5kZXhUYWIoKSA9PT0gaSlcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0ZWRUYWIoJGV2ZW50LCBpKVwiIFxyXG4gICAgICAgICAgKG1vdXNld2hlZWwpPVwibW91c2VXaGVlbCgkZXZlbnQpXCJcclxuICAgICAgICAgICNidXR0b25FbD5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24udGl0bGU/LmVsZW1lbnRSZWY7IGVsc2UgdGl0bGVTdHJpbmdcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1dHRvbi50aXRsZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgI3RpdGxlU3RyaW5nPlxyXG4gICAgICAgICAgICB7eyBidXR0b24udGl0bGUgfX1cclxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2RhLXRhYnMtYmFyXCIgW25nU3R5bGVdPVwiZ2V0U3R5bGVCYXIoKVwiPjwvZGl2PlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnZGEtYXJyb3ctdGFicyBnZGEtYXJyb3ctdGFicy1mb3J3YXJkXCIgKm5nSWY9XCJ2aWV3QXJyb3dcIiAoY2xpY2spPVwiYXJyb3coJGV2ZW50LCAxKVwiICNhcnJvd0ZvcndhcmQgQHRhYnNBcnJvd0FuaW1hdGlvbj5cclxuICAgICAgICAmI3gyMTkyO1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdkYS10YWJzLWNvbnRlbnRcIiAjdGFic0NvbnRlbnQ+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBHZGFUYWJzUHJpdmF0ZVNlcnZpY2VcclxuICBdLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ3RhYnNBcnJvd0FuaW1hdGlvbicsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHsgd2lkdGg6ICc1JScgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsXHJcbiAgICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXSlcclxuICAgICAgICApXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoeyB3aWR0aDogJzUlJyB9KSxcclxuICAgICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0JyxcclxuICAgICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICB3aWR0aDogJzUlJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgIClcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2RhVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcHJvdGVjdGVkIHNldENsYXNzID0gJ2dkYS10YWJzJztcclxuICBAVmlld0NoaWxkcmVuKCdidXR0b25FbCcpIHByb3RlY3RlZCBidXR0b25FbCE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuICBAVmlld0NoaWxkKCd0YWJzSGVhZGVyQ29udGVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByb3RlY3RlZCB0YWJzSGVhZGVyQ29udGVudEVsITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdidXR0b25zVGFiJywgeyBzdGF0aWM6IHRydWUgfSkgcHJvdGVjdGVkIGJ1dHRvbnNUYWJFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYXJyb3dCYWNrJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb3RlY3RlZCBhcnJvd0JhY2tFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYXJyb3dGb3J3YXJkJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb3RlY3RlZCBhcnJvd0ZvcndhcmRFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgndGFic0NvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJvdGVjdGVkIHRhYnNDb250ZW50RWwhOiBFbGVtZW50UmVmO1xyXG4gIEBJbnB1dCgpIGluZGV4VGFiOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBidXR0b25zOiBMaXN0VGFic01vZGVsW107XHJcbiAgQElucHV0KCkgc2V0IGFuaW1hdGlvbih2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEFuaW1hdGlvbih2YWwpO1xyXG4gIH07XHJcbiAgQElucHV0KCkgdGFiU3R5bGU6IEdkYVRhYnNTdHlsZU1vZGVsO1xyXG4gIEBPdXRwdXQoKSBpbmRleFRhYkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPG51bWJlcj47XHJcbiAgcHJpdmF0ZSBzdGVwID0gMDtcclxuICBwcm90ZWN0ZWQgdmlld0Fycm93OiBib29sZWFuO1xyXG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZ2RhVGFic1ByaXZhdGVTZXJ2aWNlOiBHZGFUYWJzUHJpdmF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdkYVRhYnNTZXJ2aWNlOiBHZGFUYWJzU2VydmljZSxcclxuICApIHtcclxuICAgIHRoaXMudGFiU3R5bGUgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlLnRhYnNTdHlsZTtcclxuICAgIHRoaXMuaW5kZXhUYWIgPSAwO1xyXG4gICAgdGhpcy5idXR0b25zID0gW107XHJcbiAgICB0aGlzLmluZGV4VGFiQWN0aXZhdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5zdWIxID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuYnV0dG9uTG9hZGVkLnN1YnNjcmliZSgoYnV0dG9uczogTGlzdFRhYnNNb2RlbFtdKSA9PiB7XHJcbiAgICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnMuc2xpY2UoKTtcclxuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcclxuICAgICAgICBsZXQgbGVuZ3RoQnV0dG9uczogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25FbCkgbGVuZ3RoQnV0dG9ucyArPSBidXR0b24ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gbGVuZ3RoQnV0dG9ucyAvIHRoaXMuYnV0dG9ucy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvbnNbdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0SW5kZXhUYWIoKV0pIHtcclxuICAgICAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKHRoaXMuYnV0dG9ucy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmluZGV4VGFiQ2hhbmdlc0VtaXQuZW1pdCh0aGlzLmJ1dHRvbnMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldEFycm93KCdjb250cm9sJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnRhYnNDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknKTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3ViMiA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmluZGV4VGFiQ2hhbmdlc0VtaXQuc3Vic2NyaWJlKChjaGFuZ2U6IG51bWJlcikgPT4gdGhpcy5pbmRleFRhYkFjdGl2YXRlZC5lbWl0KGNoYW5nZSkpO1xyXG4gICAgdGhpcy52aWV3QXJyb3cgPSBmYWxzZTtcclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgdGhpcy5nZXRBcnJvdygnY29udHJvbCcpO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzIHwgYW55KTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5pbmRleFRhYj8uZmlyc3RDaGFuZ2UgPT09IGZhbHNlICYmIGNoYW5nZXMuaW5kZXhUYWI/LnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBjaGFuZ2VzLmluZGV4VGFiPy5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLmluZGV4VGFiPy5jdXJyZW50VmFsdWUpIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldEluZGV4VGFiKGNoYW5nZXMuaW5kZXhUYWIuY3VycmVudFZhbHVlKVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYnNDb250ZW50RWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMCcpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldEJ1dHRvbnMoKTogTGlzdFRhYnNNb2RlbFtdIHtcclxuICAgIHJldHVybiB0aGlzLmJ1dHRvbnM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25TZWxlY3RlZFRhYihlOiBNb3VzZUV2ZW50IHwgbnVsbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKGUpIHtcclxuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuYnV0dG9uRWwudG9BcnJheSgpW2luZGV4XSwgdGhpcy5yZW5kZXJlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRJbmRleFRhYihpbmRleCk7XHJcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5pbmRleFRhYkNoYW5nZXNFbWl0LmVtaXQoaW5kZXgpO1xyXG4gICAgaWYgKHRoaXMuZ2V0QXJyb3coJ3JldHVybicpKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgcGFydENvbnRlbnQgPSB0aGlzLmJ1dHRvbnNUYWJFbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gNDtcclxuICAgICAgaWYgKGUpIHtcclxuICAgICAgICBpZiAocGFydENvbnRlbnQgPiBlLmNsaWVudFggLSBwb3NpdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblNjcm9sbCgwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChwYXJ0Q29udGVudCAqIDMpIDwgZS5jbGllbnRYIC0gcG9zaXRpb24ubGVmdCkge1xyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TY3JvbGwoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRJbmRleFRhYigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEluZGV4VGFiKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYXJyb3coZXZlbnQ6IE1vdXNlRXZlbnQgfCBXaGVlbEV2ZW50IHwgYW55LCBhcnJvdzogMCB8IDEpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGV2ZW50LCBhcnJvdyA9PT0gMCA/IHRoaXMuYXJyb3dCYWNrRWwgOiB0aGlzLmFycm93Rm9yd2FyZEVsLCB0aGlzLnJlbmRlcmVyKVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbmltYXRpb25TY3JvbGwoYXJyb3cpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbmltYXRpb25TY3JvbGwoYXJyb3c6IDAgfCAxKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdGVwID0gMTA7XHJcbiAgICBsZXQgZmFzZSA9IDA7XHJcbiAgICBjb25zdCBzY3JvbGxJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKHN0ZXAgIT09IGZhc2UpIHtcclxuICAgICAgICBpZiAoYXJyb3cgPT09IDEpIHtcclxuICAgICAgICAgIGZhc2UgKz0gMTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudCwgJ3Njcm9sbExlZnQnLCAodGhpcy5idXR0b25zVGFiRWwubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICsgKHRoaXMuc3RlcCAvIDEwKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmYXNlICs9IDE7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxMZWZ0JywgKHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCAtICh0aGlzLnN0ZXAgLyAxMCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzY3JvbGxJbnRlcnZhbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQgfCBhbnkpIHtcclxuICAgIGNvbnN0IGV2ZW50byA9IHdpbmRvdy5ldmVudCB8fCBldmVudDsgLy8gUGVyIGkgdmVjY2hpIEludGVybmV0IEV4cGxvcmVyXHJcbiAgICBjb25zdCBtb3ZpbWVudG8gPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnRvLndoZWVsRGVsdGEgfHwgLWV2ZW50by5kZXRhaWwpKTtcclxuICAgIHRoaXMuYXJyb3cobnVsbCwgbW92aW1lbnRvID4gMCA/IDAgOiAxKTtcclxuICAgIC8vIFBlciBJbnRlcm5ldCBFeHBsb3JlclxyXG4gICAgZXZlbnRvLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAvLyBQZXIgQ2hyb21lIGUgRmlyZWZveFxyXG4gICAgaWYgKGV2ZW50by5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICBldmVudG8ucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QXJyb3codHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy50YWJzQ29udGVudEVsKSB7XHJcbiAgICAgIGNvbnN0IGJ1dHRvbnNFbCA9IHRoaXMuYnV0dG9uc1RhYkVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XHJcbiAgICAgIGxldCB0b3RXaWR0aCA9IDA7XHJcbiAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnNFbCkge1xyXG4gICAgICAgIHRvdFdpZHRoICs9IGJ1dHRvbi5vZmZzZXRXaWR0aDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXZUb3QgPSB0aGlzLnRhYnNIZWFkZXJDb250ZW50RWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgdG90V2lkdGggPSB0b3RXaWR0aDtcclxuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpdlRvdCA8IHRvdFdpZHRoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudmlld0Fycm93ID0gKGRpdlRvdCA8IHRvdFdpZHRoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGUgPT09ICdyZXR1cm4nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0U3R5bGVCdXR0b24oYWN0aXZlOiBib29sZWFuKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZywgY29sb3I6IHN0cmluZyB9IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYWN0aXZlID8gdGhpcy50YWJTdHlsZS5zZWxlY3RlZC5iYWNrZ3JvdW5kQ29sb3IgOiB0aGlzLnRhYlN0eWxlLm5vcm1hbC5iYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgIGNvbG9yOiBhY3RpdmUgPyB0aGlzLnRhYlN0eWxlLnNlbGVjdGVkLmNvbG9yIDogdGhpcy50YWJTdHlsZS5ub3JtYWwuY29sb3JcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0U3R5bGVCYXIoKTogeyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyB9IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy50YWJTdHlsZS5iYXJCYWNrZ3JvdW5kQ29sb3JcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpOiB2b2lkIHtcclxuICAgIGlmIChlbCkge1xyXG4gICAgICBjb25zdCBkaXYgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KTtcclxuICAgICAgY29uc3QgZCA9IE1hdGgubWF4KGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsIGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcclxuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xyXG4gICAgICBjb25zdCByZWN0ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgZGl2LnN0eWxlLmxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnQgLSBkIC8gMiArICdweCc7XHJcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcclxuICAgICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xyXG4gICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XHJcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xyXG4gICAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDApJztcclxuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcclxuICAgICAgZGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdnZGEtdGFicy1yaXBwbGUgMzAwbXMgbGluZWFyJztcclxuICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSg0MDApKS5zdWJzY3JpYmUoKCkgPT4gcmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3ViMS51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
/* SERVICE */
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
import * as i2 from "@angular/common";
export class GdaSidenavComponent {
    constructor(gdaSidenavService, elementRef, renderer, cd) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.cd = cd;
        this.setClass = 'gda-sidenav';
        this.opened = false;
        this.mode = 'responsive';
        this.gdaSidenavService.toggle.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            this.opened = !this.opened;
            this.resizeSidenav();
        });
        this.gdaSidenavService.widthContainer.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            setTimeout(() => this.resizeSidenav(), 0);
        });
        this.directions = 'left';
        this.widthContainer = 0;
    }
    getStatusBackdoor() {
        if (this.mode === 'over' && this.opened === true) {
            return true;
        }
        if (this.mode === 'responsive' && window.innerWidth <= 900 && this.opened === true) {
            return true;
        }
        return false;
    }
    pushOpen() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
        this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
    }
    overOpen() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-left', '0');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-right', '0');
    }
    pushClose() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', '0');
    }
    overClose() {
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-left', '0');
        this.renderer.setStyle(this.containerBodyEl.nativeElement, 'margin-right', '0');
    }
    resizeSidenav() {
        if (this.opened) {
            /* CONTAINER HEADER */
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'width', (this.widthContainer + 'px'));
            /* CONTAINER BODY */
            if (this.mode === 'push') {
                this.pushOpen();
            }
            if (this.mode === 'over') {
                this.overOpen();
            }
            if (this.mode === 'responsive') {
                if (window.innerWidth > 900) {
                    this.pushOpen();
                }
                else {
                    this.overOpen();
                }
            }
        }
        else {
            /* CONTAINER HEADER */
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'width', '0');
            /* CONTAINER BODY */
            if (this.mode === 'push') {
                this.pushClose();
            }
            if (this.mode === 'over') {
                this.overClose();
            }
            if (this.mode === 'responsive') {
                if (window.innerWidth > 900) {
                    this.pushClose();
                }
                else {
                    this.overClose();
                }
            }
        }
        this.cd.detectChanges();
    }
    ngAfterViewInit() {
        this.opened = this.gdaSidenavService.opened;
        this.resizeSidenav();
        this.directions = this.gdaSidenavService.directions;
        this.gdaSidenavService.directionsEmit.subscribe((val) => this.directions = val);
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
        setTimeout(() => {
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]'), 'transition', 'width .2s ease-in-out');
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        }, 300);
    }
    onResize() {
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
    }
    toggleBackdoor() {
        this.gdaSidenavService.toggle.emit();
        this.cd.detectChanges();
    }
}
GdaSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaSidenavComponent, selector: "gda-sidenav, .gda-sidenav, [gda-sidenav]", inputs: { mode: "mode" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
        GdaSidenavService
    ], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "containerBodyEl", first: true, predicate: ["containerBody"], descendants: true }], ngImport: i0, template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]"></ng-content>
      <div class="backdoor" *ngIf="getStatusBackdoor()" (click)="toggleBackdoor()" @backdoor></div>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('backdoor', [
            transition(':enter', [
                style({ opacity: 1 }),
                animate('.2s ease-in-out', keyframes([
                    style({
                        opacity: 0
                    }),
                    style({
                        opacity: 1
                    })
                ]))
            ]),
            transition(':leave', [
                style({ opacity: 0 }),
                animate('.2s ease-in-out', keyframes([
                    style({
                        opacity: 1
                    }),
                    style({
                        opacity: 0
                    })
                ]))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenavComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-sidenav, .gda-sidenav, [gda-sidenav]',
                    template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]"></ng-content>
      <div class="backdoor" *ngIf="getStatusBackdoor()" (click)="toggleBackdoor()" @backdoor></div>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `,
                    providers: [
                        GdaSidenavService
                    ],
                    animations: [
                        trigger('backdoor', [
                            transition(':enter', [
                                style({ opacity: 1 }),
                                animate('.2s ease-in-out', keyframes([
                                    style({
                                        opacity: 0
                                    }),
                                    style({
                                        opacity: 1
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ opacity: 0 }),
                                animate('.2s ease-in-out', keyframes([
                                    style({
                                        opacity: 1
                                    }),
                                    style({
                                        opacity: 0
                                    })
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], containerBodyEl: [{
                type: ViewChild,
                args: ['containerBody']
            }], mode: [{
                type: Input
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLGFBQWE7QUFDYixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWlEMUQsTUFBTSxPQUFPLG1CQUFtQjtJQTJCOUIsWUFDVSxpQkFBb0MsRUFDcEMsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsRUFBcUI7UUFIckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE5QkQsYUFBUSxHQUFHLGFBQWEsQ0FBQztRQWdDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFzQixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FB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QztnQ0FDckIsT0FBTyxDQUFDLGlCQUFpQixFQUN2QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsaUJBQWlCLEVBQ3ZCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGO3lMQUUrQixRQUFRO3NCQUFyQyxXQUFXO3VCQUFDLE9BQU87Z0JBSVksV0FBVztzQkFBMUMsU0FBUzt1QkFBQyxXQUFXO2dCQUljLGVBQWU7c0JBQWxELFNBQVM7dUJBQUMsZUFBZTtnQkFJakIsSUFBSTtzQkFBWixLQUFLO2dCQTBINkMsUUFBUTtzQkFBMUQsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwga2V5ZnJhbWVzIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtc2lkZW5hdiwgLmdkYS1zaWRlbmF2LCBbZ2RhLXNpZGVuYXZdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLXNpZGVuYXYtY29udGFpbmVyXCIgI2NvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImdkYS1zaWRlbmF2LWhlYWRlciwgLmdkYS1zaWRlbmF2LWhlYWRlciwgW2dkYS1zaWRlbmF2LWhlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiYmFja2Rvb3JcIiAqbmdJZj1cImdldFN0YXR1c0JhY2tkb29yKClcIiAoY2xpY2spPVwidG9nZ2xlQmFja2Rvb3IoKVwiIEBiYWNrZG9vcj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnZGEtc2lkZW5hdi1jb250YWluZXJcIiAjY29udGFpbmVyQm9keT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gLS0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIEdkYVNpZGVuYXZTZXJ2aWNlXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdiYWNrZG9vcicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBhbmltYXRlKCcuMnMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJy4ycyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVNpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByaXZhdGUgc2V0Q2xhc3MgPSAnZ2RhLXNpZGVuYXYnO1xuICAvKipcbiAgICogQ29udGFpbmVyXG4gICAqL1xuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBwcml2YXRlIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBDb250YWluZXIgYm9keVxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyQm9keScpIHByaXZhdGUgY29udGFpbmVyQm9keUVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBNb2RlXG4gICAqL1xuICBASW5wdXQoKSBtb2RlOiAncHVzaCcgfCAnb3ZlcicgfCAncmVzcG9uc2l2ZSc7XG4gIC8qKlxuICAgKiBEaXJlY3Rpb25cbiAgICovXG4gIHByaXZhdGUgZGlyZWN0aW9uczogJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgLyoqXG4gICAqIE9wZW5lZFxuICAgKi9cbiAgcHJpdmF0ZSBvcGVuZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaWR0aCBjb250YWluZXJcbiAgICovXG4gIHByaXZhdGUgd2lkdGhDb250YWluZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdkYVNpZGVuYXZTZXJ2aWNlOiBHZGFTaWRlbmF2U2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5tb2RlID0gJ3Jlc3BvbnNpdmUnO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLnN1YnNjcmliZSgod2lkdGhDb250YWluZXI6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyO1xuICAgICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcbiAgICB9KTtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLnN1YnNjcmliZSgod2lkdGhDb250YWluZXI6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlc2l6ZVNpZGVuYXYoKSwgMCk7XG4gICAgfSk7XG4gICAgdGhpcy5kaXJlY3Rpb25zID0gJ2xlZnQnO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN0YXR1c0JhY2tkb29yKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdvdmVyJyAmJiB0aGlzLm9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJyAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA5MDAgJiYgdGhpcy5vcGVuZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHB1c2hPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKCdjYWxjKDEwMCUgLSAnICsgdGhpcy53aWR0aENvbnRhaW5lciArICdweCknKSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCB0aGlzLmRpcmVjdGlvbnMgPT09ICdsZWZ0JyA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLXJpZ2h0JywgKHRoaXMud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgJzAnKTtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaENsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlyZWN0aW9ucyA9PT0gJ2xlZnQnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnLCAnMCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVyQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tcmlnaHQnLCAnMCcpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVTaWRlbmF2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgLyogQ09OVEFJTkVSIEhFQURFUiAqL1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdnZGEtc2lkZW5hdi1oZWFkZXIsIC5nZGEtc2lkZW5hdi1oZWFkZXIsIFtnZGEtc2lkZW5hdi1oZWFkZXJdJyksICd3aWR0aCcsICh0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4JykpO1xuXG4gICAgICAvKiBDT05UQUlORVIgQk9EWSAqL1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3B1c2gnKSB7XG4gICAgICAgIHRoaXMucHVzaE9wZW4oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdvdmVyJykge1xuICAgICAgICB0aGlzLm92ZXJPcGVuKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gOTAwKSB7XG4gICAgICAgICAgdGhpcy5wdXNoT3BlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3Zlck9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiBDT05UQUlORVIgSEVBREVSICovXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlciwgLmdkYS1zaWRlbmF2LWhlYWRlciwgW2dkYS1zaWRlbmF2LWhlYWRlcl0nKSwgJ3dpZHRoJywgJzAnKTtcblxuICAgICAgLyogQ09OVEFJTkVSIEJPRFkgKi9cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdwdXNoJykge1xuICAgICAgICB0aGlzLnB1c2hDbG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ292ZXInKSB7XG4gICAgICAgIHRoaXMub3ZlckNsb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gOTAwKSB7XG4gICAgICAgICAgdGhpcy5wdXNoQ2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm92ZXJDbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMub3BlbmVkID0gdGhpcy5nZGFTaWRlbmF2U2VydmljZS5vcGVuZWQ7XG4gICAgdGhpcy5yZXNpemVTaWRlbmF2KCk7XG4gICAgdGhpcy5kaXJlY3Rpb25zID0gdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9uc0VtaXQuc3Vic2NyaWJlKCh2YWw6ICdsZWZ0JyB8ICdyaWdodCcpID0+IHRoaXMuZGlyZWN0aW9ucyA9IHZhbCk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlciwgLmdkYS1zaWRlbmF2LWhlYWRlciwgW2dkYS1zaWRlbmF2LWhlYWRlcl0nKSwgJ3RyYW5zaXRpb24nLCAnd2lkdGggLjJzIGVhc2UtaW4tb3V0Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJy4ycyBlYXNlLWluLW91dCcpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSkgcHJpdmF0ZSBvblJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB0b2dnbGVCYWNrZG9vcigpOiB2b2lkIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLnRvZ2dsZS5lbWl0KCk7XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==
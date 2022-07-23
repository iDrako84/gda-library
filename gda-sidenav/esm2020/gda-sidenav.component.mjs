import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
/* SERVICE */
import { GdaSidenavService } from './gda-sidenav.service';
/* RXJS */
import { delay, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
import * as i2 from "@angular/common";
export class GdaSidenavComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.setClass = true;
        this.opened = false;
        this.mode = 'responsive';
        this.gdaSidenavService.toggle.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            this.opened = !this.opened;
            this.resizeSidenav();
        });
        this.gdaSidenavService.widthContainer.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            of(true).pipe(delay(0)).subscribe(() => {
                this.resizeSidenav();
            });
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
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', (this.widthContainer + 'px'));
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
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', '0');
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
    }
    ngAfterViewInit() {
        of(true).pipe(delay(0)).subscribe(() => {
            this.opened = this.gdaSidenavService.opened;
            this.resizeSidenav();
        });
        this.directions = this.gdaSidenavService.directions;
        this.gdaSidenavService.directionsEmit.subscribe((val) => this.directions = val);
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
        window.onresize = () => {
            if (this.mode === 'responsive') {
                this.resizeSidenav();
            }
        };
        of(true).pipe(delay(300)).subscribe(() => {
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'transition', 'width .2s ease-in-out');
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        });
    }
    toggleBackdoor() {
        this.gdaSidenavService.toggle.emit();
    }
}
GdaSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaSidenavComponent, selector: "gda-sidenav", inputs: { mode: "mode" }, host: { properties: { "class.gda-sidenav": "this.setClass" } }, providers: [
        GdaSidenavService
    ], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "containerBodyEl", first: true, predicate: ["containerBody"], descendants: true }], ngImport: i0, template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-sidenav',
                    template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
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
        }], ctorParameters: function () { return [{ type: i1.GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-sidenav']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], containerBodyEl: [{
                type: ViewChild,
                args: ['containerBody']
            }], mode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsV0FBVyxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixhQUFhO0FBQ2IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBZ0RqQyxNQUFNLE9BQU8sbUJBQW1CO0lBMkI5QixZQUNVLGlCQUFvQyxFQUNwQyxVQUFzQixFQUN0QixRQUFtQjtRQUZuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTdCSyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBK0JoRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQXNCLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFD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b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGlCQUFpQjtxQkFDbEI7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxVQUFVLEVBQUU7NEJBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLGlCQUFpQixFQUN2QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsaUJBQWlCLEVBQ3ZCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGO3lKQUVtQyxRQUFRO3NCQUF6QyxXQUFXO3VCQUFDLG1CQUFtQjtnQkFJRSxXQUFXO3NCQUE1QyxTQUFTO3VCQUFDLFdBQVc7Z0JBSWdCLGVBQWU7c0JBQXBELFNBQVM7dUJBQUMsZUFBZTtnQkFJakIsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuLyogU0VSVklDRSAqL1xyXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XHJcbi8qIFJYSlMgKi9cclxuaW1wb3J0IHsgZGVsYXksIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dkYS1zaWRlbmF2JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdkYS1zaWRlbmF2LWNvbnRhaW5lclwiICNjb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImdkYS1zaWRlbmF2LWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhY2tkb29yXCIgKm5nSWY9XCJnZXRTdGF0dXNCYWNrZG9vcigpXCIgKGNsaWNrKT1cInRvZ2dsZUJhY2tkb29yKClcIiBAYmFja2Rvb3I+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJnZGEtc2lkZW5hdi1jb250YWluZXJcIiAjY29udGFpbmVyQm9keT5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gLS0+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgR2RhU2lkZW5hdlNlcnZpY2VcclxuICBdLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2JhY2tkb29yJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJy4ycyBlYXNlLWluLW91dCcsXHJcbiAgICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBhbmltYXRlKCcuMnMgZWFzZS1pbi1vdXQnLFxyXG4gICAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgIClcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2RhLXNpZGVuYXYnKSBzZXRDbGFzcyA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICogQ29udGFpbmVyXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgcHJvdGVjdGVkIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XHJcbiAgLyoqXHJcbiAgICogQ29udGFpbmVyIGJvZHlcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdjb250YWluZXJCb2R5JykgcHJvdGVjdGVkIGNvbnRhaW5lckJvZHlFbCE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG4gIC8qKlxyXG4gICAqIE1vZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBtb2RlOiAncHVzaCcgfCAnb3ZlcicgfCAncmVzcG9uc2l2ZSc7XHJcbiAgLyoqXHJcbiAgICogRGlyZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zOiAnbGVmdCcgfCAncmlnaHQnO1xyXG4gIC8qKlxyXG4gICAqIE9wZW5lZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb3BlbmVkOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIGNvbnRhaW5lclxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2lkdGhDb250YWluZXI6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGdkYVNpZGVuYXZTZXJ2aWNlOiBHZGFTaWRlbmF2U2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge1xyXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubW9kZSA9ICdyZXNwb25zaXZlJztcclxuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLnN1YnNjcmliZSgod2lkdGhDb250YWluZXI6IG51bWJlcikgPT4ge1xyXG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XHJcbiAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xyXG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5zdWJzY3JpYmUoKHdpZHRoQ29udGFpbmVyOiBudW1iZXIpID0+IHtcclxuICAgICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyO1xyXG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSAnbGVmdCc7XHJcbiAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gMDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRTdGF0dXNCYWNrZG9vcigpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdvdmVyJyAmJiB0aGlzLm9wZW5lZCA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJyAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA5MDAgJiYgdGhpcy5vcGVuZWQgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHB1c2hPcGVuKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAoJ2NhbGMoMTAwJSAtICcgKyB0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4KScpKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kaXJlY3Rpb25zID09PSAnbGVmdCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCcsICh0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4JykpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvdmVyT3BlbigpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgJzAnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1yaWdodCcsICcwJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHB1c2hDbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kaXJlY3Rpb25zID09PSAnbGVmdCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCcsICcwJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG92ZXJDbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgJzAnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1yaWdodCcsICcwJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2l6ZVNpZGVuYXYoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcclxuICAgICAgLyogQ09OVEFJTkVSIEhFQURFUiAqL1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlcicpLCAnd2lkdGgnLCAodGhpcy53aWR0aENvbnRhaW5lciArICdweCcpKTtcclxuXHJcbiAgICAgIC8qIENPTlRBSU5FUiBCT0RZICovXHJcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdwdXNoJykge1xyXG4gICAgICAgIHRoaXMucHVzaE9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnb3ZlcicpIHtcclxuICAgICAgICB0aGlzLm92ZXJPcGVuKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gOTAwKSB7XHJcbiAgICAgICAgICB0aGlzLnB1c2hPcGVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub3Zlck9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8qIENPTlRBSU5FUiBIRUFERVIgKi9cclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdnZGEtc2lkZW5hdi1oZWFkZXInKSwgJ3dpZHRoJywgJzAnKTtcclxuXHJcbiAgICAgIC8qIENPTlRBSU5FUiBCT0RZICovXHJcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdwdXNoJykge1xyXG4gICAgICAgIHRoaXMucHVzaENsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ292ZXInKSB7XHJcbiAgICAgICAgdGhpcy5vdmVyQ2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncmVzcG9uc2l2ZScpIHtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MDApIHtcclxuICAgICAgICAgIHRoaXMucHVzaENsb3NlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMub3ZlckNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9wZW5lZCA9IHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uub3BlbmVkO1xyXG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kaXJlY3Rpb25zID0gdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zO1xyXG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zRW1pdC5zdWJzY3JpYmUoKHZhbDogJ2xlZnQnIHwgJ3JpZ2h0JykgPT4gdGhpcy5kaXJlY3Rpb25zID0gdmFsKTtcclxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xyXG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XHJcbiAgICAgICAgdGhpcy5yZXNpemVTaWRlbmF2KCk7XHJcbiAgICAgIH1cclxuICAgIH07IFxyXG4gICAgb2YodHJ1ZSkucGlwZShkZWxheSgzMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlcicpLCAndHJhbnNpdGlvbicsICd3aWR0aCAuMnMgZWFzZS1pbi1vdXQnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICcuMnMgZWFzZS1pbi1vdXQnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRvZ2dsZUJhY2tkb29yKCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuZW1pdCgpO1xyXG4gIH1cclxufVxyXG4iXX0=
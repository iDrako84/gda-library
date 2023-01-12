import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
/* SERVICE */
import { GdaSidenavService } from './gda-sidenav.service';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
import * as i2 from "@angular/common";
export class GdaSidenav {
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
GdaSidenav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenav, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenav.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaSidenav, selector: "gda-sidenav, .gda-sidenav, [gda-sidenav]", inputs: { mode: "mode" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class": "this.setClass" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaSidenav, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLGFBQWE7QUFDYixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWlEMUQsTUFBTSxPQUFPLFVBQVU7SUEyQnJCLFlBQ1UsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLEVBQXFCO1FBSHJCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBOUJELGFBQVEsR0FBRyxhQUFhLENBQUM7UUFnQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBc0IsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMs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QUFPLENBQUMsaUJBQWlCLEVBQ3ZCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osT0FBTyxFQUFFLENBQUM7cUNBQ1gsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzs0QkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDdkIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixPQUFPLEVBQUUsQ0FBQztxQ0FDWCxDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixPQUFPLEVBQUUsQ0FBQztxQ0FDWCxDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7eUxBRStCLFFBQVE7c0JBQXJDLFdBQVc7dUJBQUMsT0FBTztnQkFJWSxXQUFXO3NCQUExQyxTQUFTO3VCQUFDLFdBQVc7Z0JBSWMsZUFBZTtzQkFBbEQsU0FBUzt1QkFBQyxlQUFlO2dCQUlqQixJQUFJO3NCQUFaLEtBQUs7Z0JBMEg2QyxRQUFRO3NCQUExRCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVNpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2dkYS1zaWRlbmF2LCAuZ2RhLXNpZGVuYXYsIFtnZGEtc2lkZW5hdl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnZGEtc2lkZW5hdi1jb250YWluZXJcIiAjY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZ2RhLXNpZGVuYXYtaGVhZGVyLCAuZ2RhLXNpZGVuYXYtaGVhZGVyLCBbZ2RhLXNpZGVuYXYtaGVhZGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZG9vclwiICpuZ0lmPVwiZ2V0U3RhdHVzQmFja2Rvb3IoKVwiIChjbGljayk9XCJ0b2dnbGVCYWNrZG9vcigpXCIgQGJhY2tkb29yPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdkYS1zaWRlbmF2LWNvbnRhaW5lclwiICNjb250YWluZXJCb2R5PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiAtLT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR2RhU2lkZW5hdlNlcnZpY2VcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2JhY2tkb29yJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEgfSksXG4gICAgICAgIGFuaW1hdGUoJy4ycyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZSgnLjJzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcHJpdmF0ZSBzZXRDbGFzcyA9ICdnZGEtc2lkZW5hdic7XG4gIC8qKlxuICAgKiBDb250YWluZXJcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHByaXZhdGUgY29udGFpbmVyRWwhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgLyoqXG4gICAqIENvbnRhaW5lciBib2R5XG4gICAqL1xuICBAVmlld0NoaWxkKCdjb250YWluZXJCb2R5JykgcHJpdmF0ZSBjb250YWluZXJCb2R5RWwhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgLyoqXG4gICAqIE1vZGVcbiAgICovXG4gIEBJbnB1dCgpIG1vZGU6ICdwdXNoJyB8ICdvdmVyJyB8ICdyZXNwb25zaXZlJztcbiAgLyoqXG4gICAqIERpcmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBkaXJlY3Rpb25zOiAnbGVmdCcgfCAncmlnaHQnO1xuICAvKipcbiAgICogT3BlbmVkXG4gICAqL1xuICBwcml2YXRlIG9wZW5lZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdpZHRoIGNvbnRhaW5lclxuICAgKi9cbiAgcHJpdmF0ZSB3aWR0aENvbnRhaW5lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2RhU2lkZW5hdlNlcnZpY2U6IEdkYVNpZGVuYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vZGUgPSAncmVzcG9uc2l2ZSc7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuc3Vic2NyaWJlKCh3aWR0aENvbnRhaW5lcjogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XG4gICAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xuICAgIH0pO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuc3Vic2NyaWJlKCh3aWR0aENvbnRhaW5lcjogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplU2lkZW5hdigpLCAwKTtcbiAgICB9KTtcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSAnbGVmdCc7XG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3RhdHVzQmFja2Rvb3IoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ292ZXInICYmIHRoaXMub3BlbmVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCAmJiB0aGlzLm9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaE9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAoJ2NhbGMoMTAwJSAtICcgKyB0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4KScpKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlyZWN0aW9ucyA9PT0gJ2xlZnQnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnLCAodGhpcy53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgfVxuXG4gIHByaXZhdGUgb3Zlck9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tcmlnaHQnLCAnMCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXNoQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kaXJlY3Rpb25zID09PSAnbGVmdCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCcsICcwJyk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLWxlZnQnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1yaWdodCcsICcwJyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZVNpZGVuYXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAvKiBDT05UQUlORVIgSEVBREVSICovXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlciwgLmdkYS1zaWRlbmF2LWhlYWRlciwgW2dkYS1zaWRlbmF2LWhlYWRlcl0nKSwgJ3dpZHRoJywgKHRoaXMud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG5cbiAgICAgIC8qIENPTlRBSU5FUiBCT0RZICovXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncHVzaCcpIHtcbiAgICAgICAgdGhpcy5wdXNoT3BlbigpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ292ZXInKSB7XG4gICAgICAgIHRoaXMub3Zlck9wZW4oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MDApIHtcbiAgICAgICAgICB0aGlzLnB1c2hPcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVyT3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIENPTlRBSU5FUiBIRUFERVIgKi9cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyLCAuZ2RhLXNpZGVuYXYtaGVhZGVyLCBbZ2RhLXNpZGVuYXYtaGVhZGVyXScpLCAnd2lkdGgnLCAnMCcpO1xuXG4gICAgICAvKiBDT05UQUlORVIgQk9EWSAqL1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3B1c2gnKSB7XG4gICAgICAgIHRoaXMucHVzaENsb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnb3ZlcicpIHtcbiAgICAgICAgdGhpcy5vdmVyQ2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MDApIHtcbiAgICAgICAgICB0aGlzLnB1c2hDbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3ZlckNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuZWQgPSB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLm9wZW5lZDtcbiAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnM7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zRW1pdC5zdWJzY3JpYmUoKHZhbDogJ2xlZnQnIHwgJ3JpZ2h0JykgPT4gdGhpcy5kaXJlY3Rpb25zID0gdmFsKTtcbiAgICBpZiAodGhpcy5tb2RlID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyLCAuZ2RhLXNpZGVuYXYtaGVhZGVyLCBbZ2RhLXNpZGVuYXYtaGVhZGVyXScpLCAndHJhbnNpdGlvbicsICd3aWR0aCAuMnMgZWFzZS1pbi1vdXQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCAnLjJzIGVhc2UtaW4tb3V0Jyk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKSBwcml2YXRlIG9uUmVzaXplKCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgdGhpcy5yZXNpemVTaWRlbmF2KCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHRvZ2dsZUJhY2tkb29yKCk6IHZvaWQge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLmVtaXQoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19
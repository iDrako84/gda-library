import { Component, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
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
        of(true).pipe(delay(300)).subscribe(() => {
            this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'transition', 'width .2s ease-in-out');
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        });
    }
    onResize() {
        if (this.mode === 'responsive') {
            this.resizeSidenav();
        }
    }
    toggleBackdoor() {
        this.gdaSidenavService.toggle.emit();
    }
}
GdaSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaSidenavComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.7", type: GdaSidenavComponent, selector: "gda-sidenav", inputs: { mode: "mode" }, host: { listeners: { "window:resize": "onResize($event)" }, properties: { "class.gda-sidenav": "this.setClass" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaSidenavComponent, decorators: [{
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
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckYsYUFBYTtBQUNiLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELFVBQVU7QUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQWdEakMsTUFBTSxPQUFPLG1CQUFtQjtJQTJCOUIsWUFDVSxpQkFBb0MsRUFDcEMsVUFBc0IsRUFDdEIsUUFBbUI7UUFGbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE3QkssYUFBUSxHQUFHLElBQUksQ0FBQztRQStCaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFzQixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFzQixFQUFFLEVBQUU7WUFDekUsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDckMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyxpQkFBaUI7UUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUNsRixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hKLENBQUM7SUFFTyxRQUFRO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVPLFNBQVM7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2Ysc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVqSSxvQkFBb0I7WUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtnQkFDOUIsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pCO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV4RyxvQkFBb0I7WUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtnQkFDOUIsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNsQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ2xCO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFxQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xHLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLFlBQVksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2pJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVvRCxRQUFRO1FBQzNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVTLGNBQWM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDOztnSEFqSlUsbUJBQW1CO29HQUFuQixtQkFBbUIsb0xBbENuQjtRQUNULGlCQUFpQjtLQUNsQix1T0FaUzs7Ozs7Ozs7O0dBU1Qsa0pBSVc7UUFDVixPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLGlCQUFpQixFQUN2QixTQUFTLENBQUM7b0JBQ1IsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7b0JBQ0YsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7aUJBQ0gsQ0FBQyxDQUNIO2FBQ0YsQ0FBQztZQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLGlCQUFpQixFQUN2QixTQUFTLENBQUM7b0JBQ1IsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7b0JBQ0YsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7aUJBQ0gsQ0FBQyxDQUNIO2FBQ0YsQ0FBQztTQUNILENBQUM7S0FDSDsyRkFFVSxtQkFBbUI7a0JBOUMvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO29CQUNELFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7cUJBQ2xCO29CQUNELFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsVUFBVSxFQUFFOzRCQUNsQixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDdkIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixPQUFPLEVBQUUsQ0FBQztxQ0FDWCxDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixPQUFPLEVBQUUsQ0FBQztxQ0FDWCxDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLGlCQUFpQixFQUN2QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLE9BQU8sRUFBRSxDQUFDO3FDQUNYLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjt5SkFFbUMsUUFBUTtzQkFBekMsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBSUUsV0FBVztzQkFBNUMsU0FBUzt1QkFBQyxXQUFXO2dCQUlnQixlQUFlO3NCQUFwRCxTQUFTO3VCQUFDLGVBQWU7Z0JBSWpCLElBQUk7c0JBQVosS0FBSztnQkE0SCtDLFFBQVE7c0JBQTVELFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVNpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtc2lkZW5hdi5zZXJ2aWNlJztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IGRlbGF5LCBvZiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtc2lkZW5hdicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdkYS1zaWRlbmF2LWNvbnRhaW5lclwiICNjb250YWluZXI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJnZGEtc2lkZW5hdi1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiYmFja2Rvb3JcIiAqbmdJZj1cImdldFN0YXR1c0JhY2tkb29yKClcIiAoY2xpY2spPVwidG9nZ2xlQmFja2Rvb3IoKVwiIEBiYWNrZG9vcj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnZGEtc2lkZW5hdi1jb250YWluZXJcIiAjY29udGFpbmVyQm9keT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gLS0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIEdkYVNpZGVuYXZTZXJ2aWNlXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdiYWNrZG9vcicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBhbmltYXRlKCcuMnMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJy4ycyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVNpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5nZGEtc2lkZW5hdicpIHNldENsYXNzID0gdHJ1ZTtcbiAgLyoqXG4gICAqIENvbnRhaW5lclxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgcHJvdGVjdGVkIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBDb250YWluZXIgYm9keVxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyQm9keScpIHByb3RlY3RlZCBjb250YWluZXJCb2R5RWwhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgLyoqXG4gICAqIE1vZGVcbiAgICovXG4gIEBJbnB1dCgpIG1vZGU6ICdwdXNoJyB8ICdvdmVyJyB8ICdyZXNwb25zaXZlJztcbiAgLyoqXG4gICAqIERpcmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBkaXJlY3Rpb25zOiAnbGVmdCcgfCAncmlnaHQnO1xuICAvKipcbiAgICogT3BlbmVkXG4gICAqL1xuICBwcml2YXRlIG9wZW5lZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdpZHRoIGNvbnRhaW5lclxuICAgKi9cbiAgcHJpdmF0ZSB3aWR0aENvbnRhaW5lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2RhU2lkZW5hdlNlcnZpY2U6IEdkYVNpZGVuYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vZGUgPSAncmVzcG9uc2l2ZSc7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuc3Vic2NyaWJlKCh3aWR0aENvbnRhaW5lcjogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XG4gICAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xuICAgIH0pO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuc3Vic2NyaWJlKCh3aWR0aENvbnRhaW5lcjogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgdGhpcy5kaXJlY3Rpb25zID0gJ2xlZnQnO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFN0YXR1c0JhY2tkb29yKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdvdmVyJyAmJiB0aGlzLm9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJyAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA5MDAgJiYgdGhpcy5vcGVuZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHB1c2hPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKCdjYWxjKDEwMCUgLSAnICsgdGhpcy53aWR0aENvbnRhaW5lciArICdweCknKSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCB0aGlzLmRpcmVjdGlvbnMgPT09ICdsZWZ0JyA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLXJpZ2h0JywgKHRoaXMud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG4gIH1cblxuICBwcml2YXRlIG92ZXJPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsICcwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgJzAnKTtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaENsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlyZWN0aW9ucyA9PT0gJ2xlZnQnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnLCAnMCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVyQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tcmlnaHQnLCAnMCcpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVTaWRlbmF2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgLyogQ09OVEFJTkVSIEhFQURFUiAqL1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdnZGEtc2lkZW5hdi1oZWFkZXInKSwgJ3dpZHRoJywgKHRoaXMud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG5cbiAgICAgIC8qIENPTlRBSU5FUiBCT0RZICovXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncHVzaCcpIHtcbiAgICAgICAgdGhpcy5wdXNoT3BlbigpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ292ZXInKSB7XG4gICAgICAgIHRoaXMub3Zlck9wZW4oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA5MDApIHtcbiAgICAgICAgICB0aGlzLnB1c2hPcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVyT3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIENPTlRBSU5FUiBIRUFERVIgKi9cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyJyksICd3aWR0aCcsICcwJyk7XG5cbiAgICAgIC8qIENPTlRBSU5FUiBCT0RZICovXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAncHVzaCcpIHtcbiAgICAgICAgdGhpcy5wdXNoQ2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdvdmVyJykge1xuICAgICAgICB0aGlzLm92ZXJDbG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDkwMCkge1xuICAgICAgICAgIHRoaXMucHVzaENsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVyQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vcGVuZWQgPSB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLm9wZW5lZDtcbiAgICAgIHRoaXMucmVzaXplU2lkZW5hdigpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlyZWN0aW9ucyA9IHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9ucztcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnNFbWl0LnN1YnNjcmliZSgodmFsOiAnbGVmdCcgfCAncmlnaHQnKSA9PiB0aGlzLmRpcmVjdGlvbnMgPSB2YWwpO1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgdGhpcy5yZXNpemVTaWRlbmF2KCk7XG4gICAgfVxuICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMzAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyJyksICd0cmFuc2l0aW9uJywgJ3dpZHRoIC4ycyBlYXNlLWluLW91dCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckJvZHlFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICcuMnMgZWFzZS1pbi1vdXQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKSBwcm90ZWN0ZWQgb25SZXNpemUoKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICB0aGlzLnJlc2l6ZVNpZGVuYXYoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdG9nZ2xlQmFja2Rvb3IoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuZW1pdCgpO1xuICB9XG59XG4iXX0=
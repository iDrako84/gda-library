import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
export class GdaSidenavHeaderComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.opened = false;
        this.directionsVal = 'left';
        this.widthContainer = 0;
        this.resizeVal = false;
    }
    get setClass() {
        return {
            'gda-sidenav-header': true
        };
    }
    ;
    get setStyle() {
        return {
            'left': this.directionsVal === 'left' ? 0 : '',
            'right': this.directionsVal === 'right' ? 0 : '',
        };
    }
    ;
    /**
     * Directions
     */
    set directions(val) {
        this.gdaSidenavService.directions = val;
        this.gdaSidenavService.directionsEmit.emit(val);
        this.directionsVal = val;
    }
    ;
    /**
     * Resize
     */
    set resize(val) {
        this.resizeVal = val;
        if (this.containerEl?.nativeElement && this.resizeVal) {
            const t = this;
            this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
            this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
            if (!this.resizeObserve) {
                this.resizeObserve = new ResizeObserver(function (entries) {
                    let rect = entries[0].contentRect;
                    let width = rect.width;
                    t.gdaSidenavService.widthContainer.emit(width);
                    if (t.opened) {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                    }
                    else {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                    }
                });
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
            else {
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
        }
        else if (!this.resizeVal && this.resizeObserve) {
            this.resizeObserve.disconnect();
        }
    }
    ;
    ngOnInit() {
        this.gdaSidenavService.opened = this.opened;
        this.gdaSidenavService.toggle.subscribe(() => {
            this.opened = !this.opened;
        });
    }
    ngAfterViewInit() {
        this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
        this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
        if (this.resizeVal) {
            const t = this;
            this.resizeObserve = new ResizeObserver(function (entries) {
                let rect = entries[0].contentRect;
                let width = rect.width;
                t.gdaSidenavService.widthContainer.emit(width);
                if (t.opened) {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                }
                else {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                }
            });
            this.resizeObserve.observe(this.containerEl.nativeElement);
        }
    }
    /**
     * Toggle
     */
    toggle() {
        this.gdaSidenavService.toggle.emit(this.widthContainer);
    }
}
GdaSidenavHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavHeaderComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaSidenavHeaderComponent, selector: "gda-sidenav-header", inputs: { opened: "opened", directions: "directions", resize: "resize" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-sidenav-header',
                    template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], setStyle: [{
                type: HostBinding,
                args: ['style']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], opened: [{
                type: Input
            }], directions: [{
                type: Input
            }], resize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtc2lkZW5hdi9zcmMvZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVl2SCxNQUFNLE9BQU8seUJBQXlCO0lBNkRwQyxZQUNVLGlCQUFvQyxFQUNwQyxVQUFzQixFQUN0QixRQUFtQjtRQUZuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBckVELElBQTBCLFFBQVE7UUFDaEMsT0FBTztZQUNMLG9CQUFvQixFQUFFLElBQUk7U0FDM0IsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBQ0YsSUFBMEIsUUFBUTtRQUNoQyxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDakQsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBTUY7O09BRUc7SUFDSCxJQUFhLFVBQVUsQ0FBQyxH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QUFDLE9BQU87Z0JBTUksV0FBVztzQkFBbEMsU0FBUzt1QkFBQyxXQUFXO2dCQUliLE1BQU07c0JBQWQsS0FBSztnQkFJTyxVQUFVO3NCQUF0QixLQUFLO2dCQVNPLE1BQU07c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL2dkYS1zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtc2lkZW5hdi1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnZGEtY29udGFpbmVyLWhlYWRlclwiICNjb250YWluZXI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBHZGFTaWRlbmF2SGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBzZXRDbGFzcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2dkYS1zaWRlbmF2LWhlYWRlcic6IHRydWVcbiAgICB9O1xuICB9O1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlJykgZ2V0IHNldFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbGVmdCc6IHRoaXMuZGlyZWN0aW9uc1ZhbCA9PT0gJ2xlZnQnID8gMCA6ICcnLFxuICAgICAgJ3JpZ2h0JzogdGhpcy5kaXJlY3Rpb25zVmFsID09PSAncmlnaHQnID8gMCA6ICcnLFxuICAgIH07XG4gIH07XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBPcGVuXG4gICAqL1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEaXJlY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9ucyh2YWw6ICdsZWZ0JyB8ICdyaWdodCcpIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnMgPSB2YWw7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zRW1pdC5lbWl0KHZhbCk7XG4gICAgdGhpcy5kaXJlY3Rpb25zVmFsID0gdmFsO1xuICB9O1xuICBwcml2YXRlIGRpcmVjdGlvbnNWYWw6ICdsZWZ0JyB8ICdyaWdodCc7XG4gIC8qKlxuICAgKiBSZXNpemVcbiAgICovXG4gIEBJbnB1dCgpIHNldCByZXNpemUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5yZXNpemVWYWwgPSB2YWw7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWw/Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5yZXNpemVWYWwpIHtcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKTtcbiAgICAgIHRoaXMud2lkdGhDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIGlmICghdGhpcy5yZXNpemVPYnNlcnZlKSB7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZSA9IG5ldyBSZXNpemVPYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICAgIGxldCByZWN0ID0gZW50cmllc1swXS5jb250ZW50UmVjdDtcbiAgICAgICAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgICAgIHQuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuZW1pdCh3aWR0aCk7XG4gICAgICAgICAgaWYgKHQub3BlbmVkKSB7XG4gICAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAodC53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5vYnNlcnZlKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5yZXNpemVWYWwgJiYgdGhpcy5yZXNpemVPYnNlcnZlKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfTtcbiAgcmVzaXplVmFsOiBib29sZWFuO1xuICByZXNpemVPYnNlcnZlITogUmVzaXplT2JzZXJ2ZXI7XG4gIC8qKlxuICAgKiBXaWR0aCBjb250ZW50XG4gICAqL1xuICBwcml2YXRlIHdpZHRoQ29udGFpbmVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBnZGFTaWRlbmF2U2VydmljZTogR2RhU2lkZW5hdlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuZGlyZWN0aW9uc1ZhbCA9ICdsZWZ0JztcbiAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gMDtcbiAgICB0aGlzLnJlc2l6ZVZhbCA9IGZhbHNlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5vcGVuZWQgPSB0aGlzLm9wZW5lZDtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLnRvZ2dsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBpZiAodGhpcy5yZXNpemVWYWwpIHtcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlID0gbmV3IFJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgIGxldCByZWN0ID0gZW50cmllc1swXS5jb250ZW50UmVjdDtcbiAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgdC5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHdpZHRoKTtcbiAgICAgICAgaWYgKHQub3BlbmVkKSB7XG4gICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKHQud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLmVtaXQodGhpcy53aWR0aENvbnRhaW5lcik7XG4gIH1cblxufVxuIl19
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
export class GdaSidenavHeaderComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.setClass = 'gda-sidenav-header';
        this.opened = false;
        this.directionsVal = 'left';
        this.widthContainer = 0;
        this.resizeVal = false;
        this.statusSidenav = new EventEmitter();
    }
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
            this.statusSidenav.emit(this.opened);
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
GdaSidenavHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavHeaderComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaSidenavHeaderComponent, selector: "gda-sidenav-header", inputs: { opened: "opened", directions: "directions", resize: "resize" }, outputs: { statusSidenav: "statusSidenav" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavHeaderComponent, decorators: [{
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
            }], statusSidenav: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtc2lkZW5hdi9zcmMvZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFZN0ksTUFBTSxPQUFPLHlCQUF5QjtJQTZEcEMsWUFDVSxpQkFBb0MsRUFDcEMsVUFBc0IsRUFDdEIsUUFBbUI7UUFGbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUEvRFAsYUFBUSxHQUFHLG9CQUFvQixDQUFDO1FBaUVwRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQXJFRCxJQUEwQixRQUFRO1FBQ2hDLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFNRjs7T0FFRztJQUNILElB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Ozs7O0tBSVA7aUJBQ0o7eUpBRXVCLFFBQVE7c0JBQTdCLFdBQVc7dUJBQUMsT0FBTztnQkFDTSxRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBTWMsV0FBVztzQkFBNUMsU0FBUzt1QkFBQyxXQUFXO2dCQUliLE1BQU07c0JBQWQsS0FBSztnQkFJTyxVQUFVO3NCQUF0QixLQUFLO2dCQVNPLE1BQU07c0JBQWxCLEtBQUs7Z0JBOEJJLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLyogU0VSVklDRSAqL1xyXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dkYS1zaWRlbmF2LWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnZGEtY29udGFpbmVyLWhlYWRlclwiICNjb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHNldENsYXNzID0gJ2dkYS1zaWRlbmF2LWhlYWRlcic7XHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZScpIGdldCBzZXRTdHlsZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICdsZWZ0JzogdGhpcy5kaXJlY3Rpb25zVmFsID09PSAnbGVmdCcgPyAwIDogJycsXHJcbiAgICAgICdyaWdodCc6IHRoaXMuZGlyZWN0aW9uc1ZhbCA9PT0gJ3JpZ2h0JyA/IDAgOiAnJyxcclxuICAgIH07XHJcbiAgfTtcclxuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBwcm90ZWN0ZWQgY29udGFpbmVyRWwhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuICAvKipcclxuICAgKiBPcGVuXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIERpcmVjdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9ucyh2YWw6ICdsZWZ0JyB8ICdyaWdodCcpIHtcclxuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9ucyA9IHZhbDtcclxuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9uc0VtaXQuZW1pdCh2YWwpO1xyXG4gICAgdGhpcy5kaXJlY3Rpb25zVmFsID0gdmFsO1xyXG4gIH07XHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zVmFsOiAnbGVmdCcgfCAncmlnaHQnO1xyXG4gIC8qKlxyXG4gICAqIFJlc2l6ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCByZXNpemUodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVZhbCA9IHZhbDtcclxuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsPy5uYXRpdmVFbGVtZW50ICYmIHRoaXMucmVzaXplVmFsKSB7XHJcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xyXG4gICAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xyXG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICAgIGlmICghdGhpcy5yZXNpemVPYnNlcnZlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlID0gbmV3IFJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzKSB7XHJcbiAgICAgICAgICBsZXQgcmVjdCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Q7XHJcbiAgICAgICAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgICAgdC5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHdpZHRoKTtcclxuICAgICAgICAgIGlmICh0Lm9wZW5lZCkge1xyXG4gICAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAodC53aWR0aENvbnRhaW5lciArICdweCcpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHQucmVuZGVyZXIuc2V0U3R5bGUodC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5vYnNlcnZlKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICghdGhpcy5yZXNpemVWYWwgJiYgdGhpcy5yZXNpemVPYnNlcnZlKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwcml2YXRlIHJlc2l6ZVZhbDogYm9vbGVhbjtcclxuICBwcml2YXRlIHJlc2l6ZU9ic2VydmUhOiBSZXNpemVPYnNlcnZlcjtcclxuICAvKipcclxuICAgKiBTdGF0dXMgc2lkZW5hdlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdGF0dXNTaWRlbmF2OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XHJcbiAgLyoqXHJcbiAgICogV2lkdGggY29udGVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2lkdGhDb250YWluZXI6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGdkYVNpZGVuYXZTZXJ2aWNlOiBHZGFTaWRlbmF2U2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge1xyXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlyZWN0aW9uc1ZhbCA9ICdsZWZ0JztcclxuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSAwO1xyXG4gICAgdGhpcy5yZXNpemVWYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdHVzU2lkZW5hdiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5vcGVuZWQgPSB0aGlzLm9wZW5lZDtcclxuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xyXG4gICAgICB0aGlzLnN0YXR1c1NpZGVuYXYuZW1pdCh0aGlzLm9wZW5lZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xyXG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgaWYgKHRoaXMucmVzaXplVmFsKSB7XHJcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcclxuICAgICAgICBsZXQgcmVjdCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Q7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0LmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQod2lkdGgpO1xyXG4gICAgICAgIGlmICh0Lm9wZW5lZCkge1xyXG4gICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKHQud2lkdGhDb250YWluZXIgKyAncHgnKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHQucmVuZGVyZXIuc2V0U3R5bGUodC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5vYnNlcnZlKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVcclxuICAgKi9cclxuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuZW1pdCh0aGlzLndpZHRoQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
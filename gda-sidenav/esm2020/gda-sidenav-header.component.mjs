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
GdaSidenavHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaSidenavHeaderComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: GdaSidenavHeaderComponent, selector: "gda-sidenav-header", inputs: { opened: "opened", directions: "directions", resize: "resize" }, outputs: { statusSidenav: "statusSidenav" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaSidenavHeaderComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtc2lkZW5hdi9zcmMvZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFZN0ksTUFBTSxPQUFPLHlCQUF5QjtJQTZEcEMsWUFDVSxpQkFBb0MsRUFDcEMsVUFBc0IsRUFDdEIsUUFBbUI7UUFGbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUEvRFAsYUFBUSxHQUFHLG9CQUFvQixDQUFDO1FBaUVwRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQXJFRCxJQUEwQixRQUFRO1FBQ2hDLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFNRjs7T0FFRztJQUNILElB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Ozs7O0tBSVA7aUJBQ0o7eUpBRXVCLFFBQVE7c0JBQTdCLFdBQVc7dUJBQUMsT0FBTztnQkFDTSxRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBTWMsV0FBVztzQkFBNUMsU0FBUzt1QkFBQyxXQUFXO2dCQUliLE1BQU07c0JBQWQsS0FBSztnQkFJTyxVQUFVO3NCQUF0QixLQUFLO2dCQVNPLE1BQU07c0JBQWxCLEtBQUs7Z0JBOEJJLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVNpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLXNpZGVuYXYtaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLWNvbnRhaW5lci1oZWFkZXJcIiAjY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBzZXRDbGFzcyA9ICdnZGEtc2lkZW5hdi1oZWFkZXInO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlJykgZ2V0IHNldFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbGVmdCc6IHRoaXMuZGlyZWN0aW9uc1ZhbCA9PT0gJ2xlZnQnID8gMCA6ICcnLFxuICAgICAgJ3JpZ2h0JzogdGhpcy5kaXJlY3Rpb25zVmFsID09PSAncmlnaHQnID8gMCA6ICcnLFxuICAgIH07XG4gIH07XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHByb3RlY3RlZCBjb250YWluZXJFbCE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICAvKipcbiAgICogT3BlblxuICAgKi9cbiAgQElucHV0KCkgb3BlbmVkOiBib29sZWFuO1xuICAvKipcbiAgICogRGlyZWN0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgc2V0IGRpcmVjdGlvbnModmFsOiAnbGVmdCcgfCAncmlnaHQnKSB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zID0gdmFsO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9uc0VtaXQuZW1pdCh2YWwpO1xuICAgIHRoaXMuZGlyZWN0aW9uc1ZhbCA9IHZhbDtcbiAgfTtcbiAgcHJpdmF0ZSBkaXJlY3Rpb25zVmFsOiAnbGVmdCcgfCAncmlnaHQnO1xuICAvKipcbiAgICogUmVzaXplXG4gICAqL1xuICBASW5wdXQoKSBzZXQgcmVzaXplKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMucmVzaXplVmFsID0gdmFsO1xuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsPy5uYXRpdmVFbGVtZW50ICYmIHRoaXMucmVzaXplVmFsKSB7XG4gICAgICBjb25zdCB0ID0gdGhpcztcbiAgICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuZW1pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCk7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICBpZiAoIXRoaXMucmVzaXplT2JzZXJ2ZSkge1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgICBsZXQgcmVjdCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Q7XG4gICAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgICB0LmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQod2lkdGgpO1xuICAgICAgICAgIGlmICh0Lm9wZW5lZCkge1xuICAgICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKHQud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHQucmVuZGVyZXIuc2V0U3R5bGUodC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5vYnNlcnZlKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmUub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucmVzaXplVmFsICYmIHRoaXMucmVzaXplT2JzZXJ2ZSkge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgcmVzaXplVmFsOiBib29sZWFuO1xuICBwcml2YXRlIHJlc2l6ZU9ic2VydmUhOiBSZXNpemVPYnNlcnZlcjtcbiAgLyoqXG4gICAqIFN0YXR1cyBzaWRlbmF2XG4gICAqL1xuICBAT3V0cHV0KCkgc3RhdHVzU2lkZW5hdjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICAvKipcbiAgICogV2lkdGggY29udGVudFxuICAgKi9cbiAgcHJpdmF0ZSB3aWR0aENvbnRhaW5lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2RhU2lkZW5hdlNlcnZpY2U6IEdkYVNpZGVuYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpcmVjdGlvbnNWYWwgPSAnbGVmdCc7XG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IDA7XG4gICAgdGhpcy5yZXNpemVWYWwgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXR1c1NpZGVuYXYgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLm9wZW5lZCA9IHRoaXMub3BlbmVkO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICAgIHRoaXMuc3RhdHVzU2lkZW5hdi5lbWl0KHRoaXMub3BlbmVkKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuZW1pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCk7XG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIGlmICh0aGlzLnJlc2l6ZVZhbCkge1xuICAgICAgY29uc3QgdCA9IHRoaXM7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0O1xuICAgICAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgICB0LmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQod2lkdGgpO1xuICAgICAgICBpZiAodC5vcGVuZWQpIHtcbiAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAodC53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuZW1pdCh0aGlzLndpZHRoQ29udGFpbmVyKTtcbiAgfVxuXG59XG4iXX0=
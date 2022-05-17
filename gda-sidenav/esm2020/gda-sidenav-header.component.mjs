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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFdBQVcsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBWXZILE1BQU0sT0FBTyx5QkFBeUI7SUE2RHBDLFlBQ1UsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLFFBQW1CO1FBRm5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBRTNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFyRUQsSUFBMEIsUUFBUTtRQUNoQyxPQUFPO1lBQ0wsb0JBQW9CLEVBQUUsSUFBSTtTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFDRixJQUEwQixRQUFRO1FBQ2hDLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFNRjs7T0FFRztJQUNILElBQWEsVUFBVSxDQUFDLEdBQXFCO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFBQSxDQUFDO0lBRUY7O09BRUc7SUFDSCxJQUFhLE1BQU0sQ0FBQyxHQUFZO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsVUFBVSxPQUFPO29CQUN2RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO29CQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN2QixDQUFDLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO3dCQUNaLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDckY7eUJBQU07d0JBQ0wsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUM3RDtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDNUQ7U0FDRjthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFBQSxDQUFDO0lBbUJGLFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDbEYsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsVUFBVSxPQUFPO2dCQUN2RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN2QixDQUFDLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNaLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckY7cUJBQU07b0JBQ0wsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7c0hBeEdVLHlCQUF5QjswR0FBekIseUJBQXlCLDRUQU4xQjs7OztLQUlQOzJGQUVRLHlCQUF5QjtrQkFSckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUU7Ozs7S0FJUDtpQkFDSjt5SkFFMkIsUUFBUTtzQkFBakMsV0FBVzt1QkFBQyxPQUFPO2dCQUtNLFFBQVE7c0JBQWpDLFdBQVc7dUJBQUMsT0FBTztnQkFNSSxXQUFXO3NCQUFsQyxTQUFTO3VCQUFDLFdBQVc7Z0JBSWIsTUFBTTtzQkFBZCxLQUFLO2dCQUlPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBU08sTUFBTTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dkYS1zaWRlbmF2LWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdkYS1jb250YWluZXItaGVhZGVyXCIgI2NvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEdkYVNpZGVuYXZIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IHNldENsYXNzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZ2RhLXNpZGVuYXYtaGVhZGVyJzogdHJ1ZVxuICAgIH07XG4gIH07XG4gIEBIb3N0QmluZGluZygnc3R5bGUnKSBnZXQgc2V0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdsZWZ0JzogdGhpcy5kaXJlY3Rpb25zVmFsID09PSAnbGVmdCcgPyAwIDogJycsXG4gICAgICAncmlnaHQnOiB0aGlzLmRpcmVjdGlvbnNWYWwgPT09ICdyaWdodCcgPyAwIDogJycsXG4gICAgfTtcbiAgfTtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyRWwhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgLyoqXG4gICAqIE9wZW5cbiAgICovXG4gIEBJbnB1dCgpIG9wZW5lZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIERpcmVjdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIHNldCBkaXJlY3Rpb25zKHZhbDogJ2xlZnQnIHwgJ3JpZ2h0Jykge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UuZGlyZWN0aW9ucyA9IHZhbDtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnNFbWl0LmVtaXQodmFsKTtcbiAgICB0aGlzLmRpcmVjdGlvbnNWYWwgPSB2YWw7XG4gIH07XG4gIHByaXZhdGUgZGlyZWN0aW9uc1ZhbDogJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgLyoqXG4gICAqIFJlc2l6ZVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHJlc2l6ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJlc2l6ZVZhbCA9IHZhbDtcbiAgICBpZiAodGhpcy5jb250YWluZXJFbD8ubmF0aXZlRWxlbWVudCAmJiB0aGlzLnJlc2l6ZVZhbCkge1xuICAgICAgY29uc3QgdCA9IHRoaXM7XG4gICAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xuICAgICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgaWYgKCF0aGlzLnJlc2l6ZU9ic2VydmUpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlID0gbmV3IFJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgICAgbGV0IHJlY3QgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0O1xuICAgICAgICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgdC5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHdpZHRoKTtcbiAgICAgICAgICBpZiAodC5vcGVuZWQpIHtcbiAgICAgICAgICAgIHQucmVuZGVyZXIuc2V0U3R5bGUodC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICh0LndpZHRoQ29udGFpbmVyICsgJ3B4JykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmUub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnJlc2l6ZVZhbCAmJiB0aGlzLnJlc2l6ZU9ic2VydmUpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9O1xuICByZXNpemVWYWw6IGJvb2xlYW47XG4gIHJlc2l6ZU9ic2VydmUhOiBSZXNpemVPYnNlcnZlcjtcbiAgLyoqXG4gICAqIFdpZHRoIGNvbnRlbnRcbiAgICovXG4gIHByaXZhdGUgd2lkdGhDb250YWluZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdkYVNpZGVuYXZTZXJ2aWNlOiBHZGFTaWRlbmF2U2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXJlY3Rpb25zVmFsID0gJ2xlZnQnO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSAwO1xuICAgIHRoaXMucmVzaXplVmFsID0gZmFsc2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLm9wZW5lZCA9IHRoaXMub3BlbmVkO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuZW1pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCk7XG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIGlmICh0aGlzLnJlc2l6ZVZhbCkge1xuICAgICAgY29uc3QgdCA9IHRoaXM7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0O1xuICAgICAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgICB0LmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQod2lkdGgpO1xuICAgICAgICBpZiAodC5vcGVuZWQpIHtcbiAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAodC53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lckVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS50b2dnbGUuZW1pdCh0aGlzLndpZHRoQ29udGFpbmVyKTtcbiAgfVxuXG59XG4iXX0=
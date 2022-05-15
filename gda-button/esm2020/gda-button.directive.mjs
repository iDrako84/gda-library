import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./gda-button.service";
export class GdaButtonDirective {
    constructor(elementRef, renderer, gdaButtonService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaButtonService = gdaButtonService;
        this.c = null;
        this.setClassPrimary = false;
        this.setClassSuccess = false;
        this.setClassWarning = false;
        this.setClassDanger = false;
    }
    /**
     * add class
     */
    get setClass() {
        return {
            'gda-button': true,
            'gda-button-primary': this.setClassPrimary,
            'gda-button-success': this.setClassSuccess,
            'gda-button-warning': this.setClassWarning,
            'gda-button-danger': this.setClassDanger
        };
    }
    ;
    /**
     * Color
     */
    set color(c) {
        this.c = c;
        this.setClassControl();
    }
    ;
    setClassControl() {
        this.setClassPrimary = (this.c === 'primary');
        this.setClassSuccess = (this.c === 'success');
        this.setClassWarning = (this.c === 'warning');
        this.setClassDanger = (this.c === 'danger');
    }
    /**
     * Animazione ripple
     */
    onClick(e) {
        if (this.animationEnabled === true) {
            this.animateRipple(e, this.elementRef);
        }
        else if (this.animationEnabled === undefined) {
            if (this.gdaButtonService.animationEnabled) {
                this.animateRipple(e, this.elementRef);
            }
        }
    }
    animateRipple(e, el) {
        const div = this.renderer.createElement('div');
        this.renderer.appendChild(el.nativeElement, div);
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
        div.style.WebkitAnimation = 'gda-button-ripple 300ms linear';
        div.style.animation = 'gda-button-ripple 300ms linear';
        setTimeout(() => {
            this.renderer.removeChild(el.nativeElement, div);
        }, 400);
    }
}
GdaButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaButtonService }], target: i0.ɵɵFactoryTarget.Directive });
GdaButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.6", type: GdaButtonDirective, selector: "[gdaButton]", inputs: { color: "color", animationEnabled: "animationEnabled" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaButton]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaButtonService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], color: [{
                type: Input
            }], animationEnabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9nZGEtYnV0dG9uL3NyYy9nZGEtYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7QUFPbkcsTUFBTSxPQUFPLGtCQUFrQjtJQThCN0IsWUFDUyxVQUFzQixFQUNyQixRQUFtQixFQUNuQixnQkFBa0M7UUFGbkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFMUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDZCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBdkNEOztPQUVHO0lBQ0gsSUFBMEIsUUFBUTtRQUNoQyxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUk7WUFDbEIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDMUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDMUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDMUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDekMsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBS0Y7O09BRUc7SUFDSCxJQUFhLEtBQUssQ0FBQyxDQUFzRDtRQUN2RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixD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QixRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBZ0JQLEtBQUs7c0JBQWpCLEtBQUs7Z0JBUUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQXdCNkIsT0FBTztzQkFBekMsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhQnV0dG9uU2VydmljZSB9IGZyb20gXCIuL2dkYS1idXR0b24uc2VydmljZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2RhQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgR2RhQnV0dG9uRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIGFkZCBjbGFzc1xuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBzZXRDbGFzcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2dkYS1idXR0b24nOiB0cnVlLFxuICAgICAgJ2dkYS1idXR0b24tcHJpbWFyeSc6IHRoaXMuc2V0Q2xhc3NQcmltYXJ5LFxuICAgICAgJ2dkYS1idXR0b24tc3VjY2Vzcyc6IHRoaXMuc2V0Q2xhc3NTdWNjZXNzLFxuICAgICAgJ2dkYS1idXR0b24td2FybmluZyc6IHRoaXMuc2V0Q2xhc3NXYXJuaW5nLFxuICAgICAgJ2dkYS1idXR0b24tZGFuZ2VyJzogdGhpcy5zZXRDbGFzc0RhbmdlclxuICAgIH07XG4gIH07XG4gIHByaXZhdGUgc2V0Q2xhc3NQcmltYXJ5OiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzU3VjY2VzczogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc1dhcm5pbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NEYW5nZXI6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDb2xvclxuICAgKi9cbiAgQElucHV0KCkgc2V0IGNvbG9yKGM6ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbCkge1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5zZXRDbGFzc0NvbnRyb2woKTtcbiAgfTtcbiAgcHJpdmF0ZSBjOiAncHJpbWFyeScgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8IG51bGw7XG4gIC8qKlxuICAgKiBFbmFibGUgYW5pbWF0aW9uXG4gICAqL1xuICBASW5wdXQoKSBhbmltYXRpb25FbmFibGVkITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBnZGFCdXR0b25TZXJ2aWNlOiBHZGFCdXR0b25TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYyA9IG51bGw7XG4gICAgdGhpcy5zZXRDbGFzc1ByaW1hcnkgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzU3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NXYXJuaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc0RhbmdlciA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbGFzc0NvbnRyb2woKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc1ByaW1hcnkgPSAodGhpcy5jID09PSAncHJpbWFyeScpO1xuICAgIHRoaXMuc2V0Q2xhc3NTdWNjZXNzID0gKHRoaXMuYyA9PT0gJ3N1Y2Nlc3MnKTtcbiAgICB0aGlzLnNldENsYXNzV2FybmluZyA9ICh0aGlzLmMgPT09ICd3YXJuaW5nJyk7XG4gICAgdGhpcy5zZXRDbGFzc0RhbmdlciA9ICh0aGlzLmMgPT09ICdkYW5nZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmltYXppb25lIHJpcHBsZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmFibGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZSwgdGhpcy5lbGVtZW50UmVmKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5nZGFCdXR0b25TZXJ2aWNlLmFuaW1hdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuZWxlbWVudFJlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlUmlwcGxlKGU6IE1vdXNlRXZlbnQsIGVsOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgY29uc3QgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgY29uc3QgZCA9IE1hdGgubWF4KGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsIGVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSBkaXYuc3R5bGUuaGVpZ2h0ID0gZCArICdweCc7XG4gICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgZGl2LnN0eWxlLmxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnQgLSBkIC8gMiArICdweCc7XG4gICAgZGl2LnN0eWxlLnRvcCA9IGUuY2xpZW50WSAtIHJlY3QudG9wIC0gZCAvIDIgKyAncHgnO1xuICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICBkaXYuc3R5bGUuV2Via2l0QW5pbWF0aW9uID0gJ2dkYS1idXR0b24tcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgZGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgIH0sIDQwMCk7XG4gIH1cbn1cbiJdfQ==
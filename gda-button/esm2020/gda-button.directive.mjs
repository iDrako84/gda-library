import { Directive, HostBinding, HostListener, Input } from "@angular/core";
/* RXJS */
import { of, delay } from "rxjs";
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
            this.animateRipple(e, this.elementRef, this.renderer);
        }
        else if (this.animationEnabled === undefined) {
            if (this.gdaButtonService.animationEnabled) {
                this.animateRipple(e, this.elementRef, this.renderer);
            }
        }
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
            div.style.WebkitAnimation = 'gda-button-ripple 300ms linear';
            div.style.animation = 'gda-button-ripple 300ms linear';
            of(true).pipe(delay(400)).subscribe(() => renderer.removeChild(el.nativeElement, div));
        }
    }
}
GdaButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaButtonService }], target: i0.ɵɵFactoryTarget.Directive });
GdaButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.7", type: GdaButtonDirective, selector: "[gdaButton]", inputs: { color: "color", animationEnabled: "animationEnabled" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaButtonDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLWJ1dHRvbi9zcmMvZ2RhLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUduRyxVQUFVO0FBQ1YsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtqQyxNQUFNLE9BQU8sa0JBQWtCO0lBOEI3QixZQUNTLFVBQXNCLEVBQ3JCLFFBQW1CLEVBQ25CLGdCQUFrQztRQUZuQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7O09BRUc7SUFDSCxJQUFrQyxRQUFRO1FBQ3hDLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsY0FBYztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFLRjs7T0FFRztJQUNILElBQWEsS0FBSyxDQUFDLENB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QUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4RjtJQUNILENBQUM7OytHQWhGVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjt3SkFLbUMsUUFBUTtzQkFBekMsV0FBVzt1QkFBQyxPQUFPO2dCQWdCUCxLQUFLO3NCQUFqQixLQUFLO2dCQVFHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkF3QnFDLE9BQU87c0JBQWpELFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYUJ1dHRvblNlcnZpY2UgfSBmcm9tIFwiLi9nZGEtYnV0dG9uLnNlcnZpY2VcIjtcbi8qIFJYSlMgKi9cbmltcG9ydCB7IG9mLCBkZWxheSB9IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnZGFCdXR0b25dJ1xufSlcbmV4cG9ydCBjbGFzcyBHZGFCdXR0b25EaXJlY3RpdmUge1xuICAvKipcbiAgICogYWRkIGNsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcHJpdmF0ZSBnZXQgc2V0Q2xhc3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdnZGEtYnV0dG9uJzogdHJ1ZSxcbiAgICAgICdnZGEtYnV0dG9uLXByaW1hcnknOiB0aGlzLnNldENsYXNzUHJpbWFyeSxcbiAgICAgICdnZGEtYnV0dG9uLXN1Y2Nlc3MnOiB0aGlzLnNldENsYXNzU3VjY2VzcyxcbiAgICAgICdnZGEtYnV0dG9uLXdhcm5pbmcnOiB0aGlzLnNldENsYXNzV2FybmluZyxcbiAgICAgICdnZGEtYnV0dG9uLWRhbmdlcic6IHRoaXMuc2V0Q2xhc3NEYW5nZXJcbiAgICB9O1xuICB9O1xuICBwcml2YXRlIHNldENsYXNzUHJpbWFyeTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc1N1Y2Nlc3M6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NXYXJuaW5nOiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzRGFuZ2VyOiBib29sZWFuO1xuICAvKipcbiAgICogQ29sb3JcbiAgICovXG4gIEBJbnB1dCgpIHNldCBjb2xvcihjOiAncHJpbWFyeScgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8IG51bGwpIHtcbiAgICB0aGlzLmMgPSBjO1xuICAgIHRoaXMuc2V0Q2xhc3NDb250cm9sKCk7XG4gIH07XG4gIHByaXZhdGUgYzogJ3ByaW1hcnknIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsO1xuICAvKipcbiAgICogRW5hYmxlIGFuaW1hdGlvblxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0aW9uRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhQnV0dG9uU2VydmljZTogR2RhQnV0dG9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLmMgPSBudWxsO1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzV2FybmluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3NDb250cm9sKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gKHRoaXMuYyA9PT0gJ3ByaW1hcnknKTtcbiAgICB0aGlzLnNldENsYXNzU3VjY2VzcyA9ICh0aGlzLmMgPT09ICdzdWNjZXNzJyk7XG4gICAgdGhpcy5zZXRDbGFzc1dhcm5pbmcgPSAodGhpcy5jID09PSAnd2FybmluZycpO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSAodGhpcy5jID09PSAnZGFuZ2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF6aW9uZSByaXBwbGVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgcHJpdmF0ZSBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmFibGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZSwgdGhpcy5lbGVtZW50UmVmLCB0aGlzLnJlbmRlcmVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5nZGFCdXR0b25TZXJ2aWNlLmFuaW1hdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuZWxlbWVudFJlZiwgdGhpcy5yZW5kZXJlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlUmlwcGxlKGU6IE1vdXNlRXZlbnQsIGVsOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKTogdm9pZCB7XG4gICAgaWYgKGVsKSB7XG4gICAgICBjb25zdCBkaXYgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgZGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSg0MDApKS5zdWJzY3JpYmUoKCkgPT4gcmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KSk7XG4gICAgfVxuICB9XG59XG4iXX0=
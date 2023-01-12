import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./gda-button.service";
export class GdaButton {
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
        if (el && e) {
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
            setTimeout(() => renderer.removeChild(el.nativeElement, div), 400);
        }
    }
}
GdaButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaButton, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaButtonService }], target: i0.ɵɵFactoryTarget.Directive });
GdaButton.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaButton, selector: "[gdaButton]", inputs: { color: "color", animationEnabled: "animationEnabled" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaButton, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLWJ1dHRvbi9zcmMvZ2RhLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7O0FBT25HLE1BQU0sT0FBTyxTQUFTO0lBOEJwQixZQUNTLFVBQXNCLEVBQ3JCLFFBQW1CLEVBQ25CLGdCQUFrQztRQUZuQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7O09BRUc7SUFDSCxJQUFrQyxRQUFRO1FBQ3hDLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsY0FBYztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFLRjs7T0FFRztJQUNILElBQWEsS0FBSyxDQUFDLENBQXNEO1FBQ3ZFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLGVBQWUsRUFB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ckIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7d0pBS21DLFFBQVE7c0JBQXpDLFdBQVc7dUJBQUMsT0FBTztnQkFnQlAsS0FBSztzQkFBakIsS0FBSztnQkFRRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBd0JxQyxPQUFPO3NCQUFqRCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFCdXR0b25TZXJ2aWNlIH0gZnJvbSBcIi4vZ2RhLWJ1dHRvbi5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnZGFCdXR0b25dJ1xufSlcbmV4cG9ydCBjbGFzcyBHZGFCdXR0b24ge1xuICAvKipcbiAgICogYWRkIGNsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcHJpdmF0ZSBnZXQgc2V0Q2xhc3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdnZGEtYnV0dG9uJzogdHJ1ZSxcbiAgICAgICdnZGEtYnV0dG9uLXByaW1hcnknOiB0aGlzLnNldENsYXNzUHJpbWFyeSxcbiAgICAgICdnZGEtYnV0dG9uLXN1Y2Nlc3MnOiB0aGlzLnNldENsYXNzU3VjY2VzcyxcbiAgICAgICdnZGEtYnV0dG9uLXdhcm5pbmcnOiB0aGlzLnNldENsYXNzV2FybmluZyxcbiAgICAgICdnZGEtYnV0dG9uLWRhbmdlcic6IHRoaXMuc2V0Q2xhc3NEYW5nZXJcbiAgICB9O1xuICB9O1xuICBwcml2YXRlIHNldENsYXNzUHJpbWFyeTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc1N1Y2Nlc3M6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NXYXJuaW5nOiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzRGFuZ2VyOiBib29sZWFuO1xuICAvKipcbiAgICogQ29sb3JcbiAgICovXG4gIEBJbnB1dCgpIHNldCBjb2xvcihjOiAncHJpbWFyeScgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8IG51bGwpIHtcbiAgICB0aGlzLmMgPSBjO1xuICAgIHRoaXMuc2V0Q2xhc3NDb250cm9sKCk7XG4gIH07XG4gIHByaXZhdGUgYzogJ3ByaW1hcnknIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsO1xuICAvKipcbiAgICogRW5hYmxlIGFuaW1hdGlvblxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0aW9uRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhQnV0dG9uU2VydmljZTogR2RhQnV0dG9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLmMgPSBudWxsO1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzV2FybmluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3NDb250cm9sKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gKHRoaXMuYyA9PT0gJ3ByaW1hcnknKTtcbiAgICB0aGlzLnNldENsYXNzU3VjY2VzcyA9ICh0aGlzLmMgPT09ICdzdWNjZXNzJyk7XG4gICAgdGhpcy5zZXRDbGFzc1dhcm5pbmcgPSAodGhpcy5jID09PSAnd2FybmluZycpO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSAodGhpcy5jID09PSAnZGFuZ2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF6aW9uZSByaXBwbGVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgcHJpdmF0ZSBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmFibGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZSwgdGhpcy5lbGVtZW50UmVmLCB0aGlzLnJlbmRlcmVyKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5nZGFCdXR0b25TZXJ2aWNlLmFuaW1hdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuZWxlbWVudFJlZiwgdGhpcy5yZW5kZXJlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlUmlwcGxlKGU6IE1vdXNlRXZlbnQsIGVsOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKTogdm9pZCB7XG4gICAgaWYgKGVsICYmIGUpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KTtcbiAgICAgIGNvbnN0IGQgPSBNYXRoLm1heChlbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoLCBlbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBkaXYuc3R5bGUuaGVpZ2h0ID0gZCArICdweCc7XG4gICAgICBjb25zdCByZWN0ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gZCAvIDIgKyAncHgnO1xuICAgICAgZGl2LnN0eWxlLnRvcCA9IGUuY2xpZW50WSAtIHJlY3QudG9wIC0gZCAvIDIgKyAncHgnO1xuICAgICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0QW5pbWF0aW9uID0gJ2dkYS1idXR0b24tcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBkaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2dkYS1idXR0b24tcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdiksIDQwMCk7XG4gICAgfVxuICB9XG59XG4iXX0=
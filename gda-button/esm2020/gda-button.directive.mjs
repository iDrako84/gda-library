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
            div.style.WebkitAnimation = 'gda-tabs-ripple 300ms linear';
            div.style.animation = 'gda-tabs-ripple 300ms linear';
            of(true).pipe(delay(400)).subscribe(() => renderer.removeChild(el.nativeElement, div));
        }
    }
}
GdaButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaButtonService }], target: i0.ɵɵFactoryTarget.Directive });
GdaButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.0", type: GdaButtonDirective, selector: "[gdaButton]", inputs: { color: "color", animationEnabled: "animationEnabled" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaButtonDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLWJ1dHRvbi9zcmMvZ2RhLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUduRyxVQUFVO0FBQ1YsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtqQyxNQUFNLE9BQU8sa0JBQWtCO0lBOEI3QixZQUNTLFVBQXNCLEVBQ3JCLFFBQW1CLEVBQ25CLGdCQUFrQztRQUZuQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7O09BRUc7SUFDSCxJQUEwQixRQUFRO1FBQ2hDLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsY0FBYztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFLRjs7T0FFRztJQUNILElBQWEsS0FBSyxDQUFDLENB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QUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4RjtJQUNILENBQUM7OytHQWhGVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjt3SkFLMkIsUUFBUTtzQkFBakMsV0FBVzt1QkFBQyxPQUFPO2dCQWdCUCxLQUFLO3NCQUFqQixLQUFLO2dCQVFHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkF3QjZCLE9BQU87c0JBQXpDLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLyogU0VSVklDRSAqL1xyXG5pbXBvcnQgeyBHZGFCdXR0b25TZXJ2aWNlIH0gZnJvbSBcIi4vZ2RhLWJ1dHRvbi5zZXJ2aWNlXCI7XHJcbi8qIFJYSlMgKi9cclxuaW1wb3J0IHsgb2YsIGRlbGF5IH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2dkYUJ1dHRvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZGFCdXR0b25EaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIGFkZCBjbGFzc1xyXG4gICAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgc2V0Q2xhc3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAnZ2RhLWJ1dHRvbic6IHRydWUsXHJcbiAgICAgICdnZGEtYnV0dG9uLXByaW1hcnknOiB0aGlzLnNldENsYXNzUHJpbWFyeSxcclxuICAgICAgJ2dkYS1idXR0b24tc3VjY2Vzcyc6IHRoaXMuc2V0Q2xhc3NTdWNjZXNzLFxyXG4gICAgICAnZ2RhLWJ1dHRvbi13YXJuaW5nJzogdGhpcy5zZXRDbGFzc1dhcm5pbmcsXHJcbiAgICAgICdnZGEtYnV0dG9uLWRhbmdlcic6IHRoaXMuc2V0Q2xhc3NEYW5nZXJcclxuICAgIH07XHJcbiAgfTtcclxuICBwcml2YXRlIHNldENsYXNzUHJpbWFyeTogYm9vbGVhbjtcclxuICBwcml2YXRlIHNldENsYXNzU3VjY2VzczogYm9vbGVhbjtcclxuICBwcml2YXRlIHNldENsYXNzV2FybmluZzogYm9vbGVhbjtcclxuICBwcml2YXRlIHNldENsYXNzRGFuZ2VyOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIENvbG9yXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGNvbG9yKGM6ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbCkge1xyXG4gICAgdGhpcy5jID0gYztcclxuICAgIHRoaXMuc2V0Q2xhc3NDb250cm9sKCk7XHJcbiAgfTtcclxuICBwcml2YXRlIGM6ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbDtcclxuICAvKipcclxuICAgKiBFbmFibGUgYW5pbWF0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0aW9uRW5hYmxlZCE6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGdkYUJ1dHRvblNlcnZpY2U6IEdkYUJ1dHRvblNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuYyA9IG51bGw7XHJcbiAgICB0aGlzLnNldENsYXNzUHJpbWFyeSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0Q2xhc3NXYXJuaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldENsYXNzRGFuZ2VyID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldENsYXNzQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gKHRoaXMuYyA9PT0gJ3ByaW1hcnknKTtcclxuICAgIHRoaXMuc2V0Q2xhc3NTdWNjZXNzID0gKHRoaXMuYyA9PT0gJ3N1Y2Nlc3MnKTtcclxuICAgIHRoaXMuc2V0Q2xhc3NXYXJuaW5nID0gKHRoaXMuYyA9PT0gJ3dhcm5pbmcnKTtcclxuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSAodGhpcy5jID09PSAnZGFuZ2VyJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbmltYXppb25lIHJpcHBsZVxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmFibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmVsZW1lbnRSZWYsIHRoaXMucmVuZGVyZXIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhpcy5nZGFCdXR0b25TZXJ2aWNlLmFuaW1hdGlvbkVuYWJsZWQpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZSwgdGhpcy5lbGVtZW50UmVmLCB0aGlzLnJlbmRlcmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhbmltYXRlUmlwcGxlKGU6IE1vdXNlRXZlbnQsIGVsOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKTogdm9pZCB7XHJcbiAgICBpZiAoZWwpIHtcclxuICAgICAgY29uc3QgZGl2ID0gcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XHJcbiAgICAgIGNvbnN0IGQgPSBNYXRoLm1heChlbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoLCBlbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XHJcbiAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdi5zdHlsZS5oZWlnaHQgPSBkICsgJ3B4JztcclxuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gZCAvIDIgKyAncHgnO1xyXG4gICAgICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZIC0gcmVjdC50b3AgLSBkIC8gMiArICdweCc7XHJcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcclxuICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xyXG4gICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcclxuICAgICAgZGl2LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XHJcbiAgICAgIGRpdi5zdHlsZS5XZWJraXRBbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XHJcbiAgICAgIGRpdi5zdHlsZS5hbmltYXRpb24gPSAnZ2RhLXRhYnMtcmlwcGxlIDMwMG1zIGxpbmVhcic7XHJcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoNDAwKSkuc3Vic2NyaWJlKCgpID0+IHJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdikpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
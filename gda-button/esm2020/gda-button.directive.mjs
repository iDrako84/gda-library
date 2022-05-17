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
        of(true).pipe(delay(400)).subscribe(() => {
            this.renderer.removeChild(el.nativeElement, div);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLWJ1dHRvbi9zcmMvZ2RhLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUduRyxVQUFVO0FBQ1YsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtqQyxNQUFNLE9BQU8sa0JBQWtCO0lBOEI3QixZQUNTLFVBQXNCLEVBQ3JCLFFBQW1CLEVBQ25CLGdCQUFrQztRQUZuQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7O09BRUc7SUFDSCxJQUEwQixRQUFRO1FBQ2hDLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUMxQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsY0FBYztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFLRjs7T0FFRztJQUNILElBQWEsS0FBSyxDQUFDLENB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QUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OytHQWhGVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjt3SkFLMkIsUUFBUTtzQkFBakMsV0FBVzt1QkFBQyxPQUFPO2dCQWdCUCxLQUFLO3NCQUFqQixLQUFLO2dCQVFHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkF3QjZCLE9BQU87c0JBQXpDLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYUJ1dHRvblNlcnZpY2UgfSBmcm9tIFwiLi9nZGEtYnV0dG9uLnNlcnZpY2VcIjtcbi8qIFJYSlMgKi9cbmltcG9ydCB7IG9mLCBkZWxheSB9IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnZGFCdXR0b25dJ1xufSlcbmV4cG9ydCBjbGFzcyBHZGFCdXR0b25EaXJlY3RpdmUge1xuICAvKipcbiAgICogYWRkIGNsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IHNldENsYXNzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZ2RhLWJ1dHRvbic6IHRydWUsXG4gICAgICAnZ2RhLWJ1dHRvbi1wcmltYXJ5JzogdGhpcy5zZXRDbGFzc1ByaW1hcnksXG4gICAgICAnZ2RhLWJ1dHRvbi1zdWNjZXNzJzogdGhpcy5zZXRDbGFzc1N1Y2Nlc3MsXG4gICAgICAnZ2RhLWJ1dHRvbi13YXJuaW5nJzogdGhpcy5zZXRDbGFzc1dhcm5pbmcsXG4gICAgICAnZ2RhLWJ1dHRvbi1kYW5nZXInOiB0aGlzLnNldENsYXNzRGFuZ2VyXG4gICAgfTtcbiAgfTtcbiAgcHJpdmF0ZSBzZXRDbGFzc1ByaW1hcnk6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NTdWNjZXNzOiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzV2FybmluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc0RhbmdlcjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbG9yXG4gICAqL1xuICBASW5wdXQoKSBzZXQgY29sb3IoYzogJ3ByaW1hcnknIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsKSB7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLnNldENsYXNzQ29udHJvbCgpO1xuICB9O1xuICBwcml2YXRlIGM6ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbDtcbiAgLyoqXG4gICAqIEVuYWJsZSBhbmltYXRpb25cbiAgICovXG4gIEBJbnB1dCgpIGFuaW1hdGlvbkVuYWJsZWQhOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGdkYUJ1dHRvblNlcnZpY2U6IEdkYUJ1dHRvblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jID0gbnVsbDtcbiAgICB0aGlzLnNldENsYXNzUHJpbWFyeSA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc1dhcm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzRGFuZ2VyID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzQ29udHJvbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzUHJpbWFyeSA9ICh0aGlzLmMgPT09ICdwcmltYXJ5Jyk7XG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSAodGhpcy5jID09PSAnc3VjY2VzcycpO1xuICAgIHRoaXMuc2V0Q2xhc3NXYXJuaW5nID0gKHRoaXMuYyA9PT0gJ3dhcm5pbmcnKTtcbiAgICB0aGlzLnNldENsYXNzRGFuZ2VyID0gKHRoaXMuYyA9PT0gJ2RhbmdlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hemlvbmUgcmlwcGxlXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb25FbmFibGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLmdkYUJ1dHRvblNlcnZpY2UuYW5pbWF0aW9uRW5hYmxlZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGVSaXBwbGUoZSwgdGhpcy5lbGVtZW50UmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVSaXBwbGUoZTogTW91c2VFdmVudCwgZWw6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICBjb25zdCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwubmF0aXZlRWxlbWVudCwgZGl2KTtcbiAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgIGRpdi5zdHlsZS53aWR0aCA9IGRpdi5zdHlsZS5oZWlnaHQgPSBkICsgJ3B4JztcbiAgICBjb25zdCByZWN0ID0gZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZIC0gcmVjdC50b3AgLSBkIC8gMiArICdweCc7XG4gICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGRpdi5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgIGRpdi5zdHlsZS5XZWJraXRBbmltYXRpb24gPSAnZ2RhLWJ1dHRvbi1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICBkaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2dkYS1idXR0b24tcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgb2YodHJ1ZSkucGlwZShkZWxheSg0MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
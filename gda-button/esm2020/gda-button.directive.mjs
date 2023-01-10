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
GdaButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaButtonDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaButtonService }], target: i0.ɵɵFactoryTarget.Directive });
GdaButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaButtonDirective, selector: "[gdaButton]", inputs: { color: "color", animationEnabled: "animationEnabled" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaButtonDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLWJ1dHRvbi9zcmMvZ2RhLWJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7O0FBT25HLE1BQU0sT0FBTyxrQkFBa0I7SUE4QjdCLFlBQ1MsVUFBc0IsRUFDckIsUUFBbUIsRUFDbkIsZ0JBQWtDO1FBRm5DLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRTFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQXZDRDs7T0FFRztJQUNILElBQWtDLFFBQVE7UUFDeEMsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJO1lBQ2xCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3pDLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQUtGOztPQUVHO0lBQ0gsSUFBYSxLQUFLLENBQUMsQ0FBc0Q7UUFDdkUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsZUFBZSxF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QkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO3dKQUttQyxRQUFRO3NCQUF6QyxXQUFXO3VCQUFDLE9BQU87Z0JBZ0JQLEtBQUs7c0JBQWpCLEtBQUs7Z0JBUUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQXdCcUMsT0FBTztzQkFBakQsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhQnV0dG9uU2VydmljZSB9IGZyb20gXCIuL2dkYS1idXR0b24uc2VydmljZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2RhQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgR2RhQnV0dG9uRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIGFkZCBjbGFzc1xuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByaXZhdGUgZ2V0IHNldENsYXNzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZ2RhLWJ1dHRvbic6IHRydWUsXG4gICAgICAnZ2RhLWJ1dHRvbi1wcmltYXJ5JzogdGhpcy5zZXRDbGFzc1ByaW1hcnksXG4gICAgICAnZ2RhLWJ1dHRvbi1zdWNjZXNzJzogdGhpcy5zZXRDbGFzc1N1Y2Nlc3MsXG4gICAgICAnZ2RhLWJ1dHRvbi13YXJuaW5nJzogdGhpcy5zZXRDbGFzc1dhcm5pbmcsXG4gICAgICAnZ2RhLWJ1dHRvbi1kYW5nZXInOiB0aGlzLnNldENsYXNzRGFuZ2VyXG4gICAgfTtcbiAgfTtcbiAgcHJpdmF0ZSBzZXRDbGFzc1ByaW1hcnk6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NTdWNjZXNzOiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzV2FybmluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc0RhbmdlcjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbG9yXG4gICAqL1xuICBASW5wdXQoKSBzZXQgY29sb3IoYzogJ3ByaW1hcnknIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsKSB7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLnNldENsYXNzQ29udHJvbCgpO1xuICB9O1xuICBwcml2YXRlIGM6ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbDtcbiAgLyoqXG4gICAqIEVuYWJsZSBhbmltYXRpb25cbiAgICovXG4gIEBJbnB1dCgpIGFuaW1hdGlvbkVuYWJsZWQhOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGdkYUJ1dHRvblNlcnZpY2U6IEdkYUJ1dHRvblNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jID0gbnVsbDtcbiAgICB0aGlzLnNldENsYXNzUHJpbWFyeSA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc1dhcm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzRGFuZ2VyID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzQ29udHJvbCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzUHJpbWFyeSA9ICh0aGlzLmMgPT09ICdwcmltYXJ5Jyk7XG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSAodGhpcy5jID09PSAnc3VjY2VzcycpO1xuICAgIHRoaXMuc2V0Q2xhc3NXYXJuaW5nID0gKHRoaXMuYyA9PT0gJ3dhcm5pbmcnKTtcbiAgICB0aGlzLnNldENsYXNzRGFuZ2VyID0gKHRoaXMuYyA9PT0gJ2RhbmdlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hemlvbmUgcmlwcGxlXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIHByaXZhdGUgb25DbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuZWxlbWVudFJlZiwgdGhpcy5yZW5kZXJlcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuZ2RhQnV0dG9uU2VydmljZS5hbmltYXRpb25FbmFibGVkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmVsZW1lbnRSZWYsIHRoaXMucmVuZGVyZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZVJpcHBsZShlOiBNb3VzZUV2ZW50LCBlbDogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMik6IHZvaWQge1xuICAgIGlmIChlbCAmJiBlKSB7XG4gICAgICBjb25zdCBkaXYgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgoZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgZWwubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgICAgY29uc3QgcmVjdCA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgZGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZW5kZXJlci5yZW1vdmVDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpLCA0MDApO1xuICAgIH1cbiAgfVxufVxuIl19
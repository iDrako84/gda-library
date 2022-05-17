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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLWJ1dHRvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9nZGEtYnV0dG9uL3NyYy9nZGEtYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR25HLFVBQVU7QUFDVixPQUFPLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS2pDLE1BQU0sT0FBTyxrQkFBa0I7SUE4QjdCLFlBQ1MsVUFBc0IsRUFDckIsUUFBbUIsRUFDbkIsZ0JBQWtDO1FBRm5DLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRTFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQXZDRDs7T0FFRztJQUNILElBQTBCLFFBQVE7UUFDaEMsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJO1lBQ2xCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3pDLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQUtGOztPQUVHO0lBQ0gsSUFBYSxLQUFLLENBQUMsQ0FBc0Q7UUFDdkUsSUFBSSxD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QUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7K0dBaEZVLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO3dKQUsyQixRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBZ0JQLEtBQUs7c0JBQWpCLEtBQUs7Z0JBUUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQXdCNkIsT0FBTztzQkFBekMsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhQnV0dG9uU2VydmljZSB9IGZyb20gXCIuL2dkYS1idXR0b24uc2VydmljZVwiO1xuLyogUlhKUyAqL1xuaW1wb3J0IHsgb2YsIGRlbGF5IH0gZnJvbSBcInJ4anNcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dkYUJ1dHRvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEdkYUJ1dHRvbkRpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBhZGQgY2xhc3NcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgc2V0Q2xhc3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdnZGEtYnV0dG9uJzogdHJ1ZSxcbiAgICAgICdnZGEtYnV0dG9uLXByaW1hcnknOiB0aGlzLnNldENsYXNzUHJpbWFyeSxcbiAgICAgICdnZGEtYnV0dG9uLXN1Y2Nlc3MnOiB0aGlzLnNldENsYXNzU3VjY2VzcyxcbiAgICAgICdnZGEtYnV0dG9uLXdhcm5pbmcnOiB0aGlzLnNldENsYXNzV2FybmluZyxcbiAgICAgICdnZGEtYnV0dG9uLWRhbmdlcic6IHRoaXMuc2V0Q2xhc3NEYW5nZXJcbiAgICB9O1xuICB9O1xuICBwcml2YXRlIHNldENsYXNzUHJpbWFyeTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXRDbGFzc1N1Y2Nlc3M6IGJvb2xlYW47XG4gIHByaXZhdGUgc2V0Q2xhc3NXYXJuaW5nOiBib29sZWFuO1xuICBwcml2YXRlIHNldENsYXNzRGFuZ2VyOiBib29sZWFuO1xuICAvKipcbiAgICogQ29sb3JcbiAgICovXG4gIEBJbnB1dCgpIHNldCBjb2xvcihjOiAncHJpbWFyeScgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8IG51bGwpIHtcbiAgICB0aGlzLmMgPSBjO1xuICAgIHRoaXMuc2V0Q2xhc3NDb250cm9sKCk7XG4gIH07XG4gIHByaXZhdGUgYzogJ3ByaW1hcnknIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsO1xuICAvKipcbiAgICogRW5hYmxlIGFuaW1hdGlvblxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0aW9uRW5hYmxlZCE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhQnV0dG9uU2VydmljZTogR2RhQnV0dG9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLmMgPSBudWxsO1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gZmFsc2U7XG4gICAgdGhpcy5zZXRDbGFzc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLnNldENsYXNzV2FybmluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3NDb250cm9sKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3NQcmltYXJ5ID0gKHRoaXMuYyA9PT0gJ3ByaW1hcnknKTtcbiAgICB0aGlzLnNldENsYXNzU3VjY2VzcyA9ICh0aGlzLmMgPT09ICdzdWNjZXNzJyk7XG4gICAgdGhpcy5zZXRDbGFzc1dhcm5pbmcgPSAodGhpcy5jID09PSAnd2FybmluZycpO1xuICAgIHRoaXMuc2V0Q2xhc3NEYW5nZXIgPSAodGhpcy5jID09PSAnZGFuZ2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF6aW9uZSByaXBwbGVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgb25DbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hbmltYXRlUmlwcGxlKGUsIHRoaXMuZWxlbWVudFJlZik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuZ2RhQnV0dG9uU2VydmljZS5hbmltYXRpb25FbmFibGVkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVJpcHBsZShlLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYW5pbWF0ZVJpcHBsZShlOiBNb3VzZUV2ZW50LCBlbDogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIGNvbnN0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbC5uYXRpdmVFbGVtZW50LCBkaXYpO1xuICAgIGNvbnN0IGQgPSBNYXRoLm1heChlbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoLCBlbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgZGl2LnN0eWxlLndpZHRoID0gZGl2LnN0eWxlLmhlaWdodCA9IGQgKyAncHgnO1xuICAgIGNvbnN0IHJlY3QgPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gZCAvIDIgKyAncHgnO1xuICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZGl2LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgZGl2LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwKSc7XG4gICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtYnV0dG9uLXJpcHBsZSAzMDBtcyBsaW5lYXInO1xuICAgIGRpdi5zdHlsZS5hbmltYXRpb24gPSAnZ2RhLWJ1dHRvbi1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDQwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGVsLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./gda-menu.service";
const iconArrow = `
    <svg
        width="24"
        height="24"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
    </svg>
`;
export class GdaMenuItem {
    // @ViewChild('button', { static: true }) buttonEl!: ElementRef;
    // @ViewChild('icon', { static: true }) iconEl!: ElementRef;
    constructor(elementRef, renderer, gdaMenuService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaMenuService = gdaMenuService;
        this.setClass = 'gda-menu-item';
        this.direction = 'right';
    }
    ngAfterViewInit() {
        if (this.elementRef.nativeElement.classList.contains('gda-menu-trigger')) {
            const span = this.renderer.createElement('span');
            this.renderer.addClass(span, 'gda-menu-item-button-icon');
            this.renderer.addClass(span, `gda-menu-item-button-icon-right`);
            span.innerHTML = iconArrow;
            this.renderer.appendChild(this.elementRef.nativeElement, span);
        }
        // this.renderer.setStyle(this.elementRef.nativeElement, 'text-align', direction === 'right' ? 'left' : 'right');
    }
    onClick(e) {
        e.stopPropagation();
        this.animationClick(e);
        if (!this.elementRef.nativeElement.classList.contains('gda-menu-trigger')) {
            setTimeout(() => this.gdaMenuService.menuClose.next(), 200);
        }
    }
    onEnter(e) {
        const container = this.renderer.parentNode(this.elementRef.nativeElement);
        this.gdaMenuService.onEnter.next({ parent: container, button: this.elementRef, direction: this.direction });
    }
    animationClick(e) {
        if (e) {
            const div = this.renderer.createElement('div');
            this.renderer.appendChild(this.elementRef.nativeElement, div);
            const d = Math.max(this.elementRef.nativeElement.clientWidth, this.elementRef.nativeElement.clientHeight);
            div.style.width = div.style.height = d + 'px';
            const rect = this.elementRef.nativeElement.getBoundingClientRect();
            div.style.left = e.clientX - rect.left - d / 2 + 'px';
            div.style.top = e.clientY - rect.top - d / 2 + 'px';
            div.style.borderRadius = '50%';
            div.style.backgroundColor = 'rgb(255, 255, 255)';
            div.style.position = 'absolute';
            div.style.WebkitTransform = 'scale(0)';
            div.style.transform = 'scale(0)';
            div.style.WebkitAnimation = 'gda-menu-button-ripple 300ms linear';
            div.style.animation = 'gda-menu-button-ripple 300ms linear';
            setTimeout(() => this.renderer.removeChild(this.elementRef.nativeElement, div), 400);
        }
    }
}
GdaMenuItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuItem, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaMenuService }], target: i0.ɵɵFactoryTarget.Directive });
GdaMenuItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuItem, selector: "[gdaMenuItem]", inputs: { direction: "direction" }, host: { listeners: { "click": "onClick($event)", "mouseenter": "onEnter($event)" }, properties: { "class": "this.setClass" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaMenuItem]',
                    // template: `
                    //     <button class="gda-menu-item-button" type="button" (click)="onClick($event)" #button>
                    //         <ng-content></ng-content>
                    //         <span class="gda-menu-item-button-icon" #icon>
                    //         </span>
                    //     </button>
                    // `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaMenuService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], direction: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnter: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUtaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLW1lbnUvc3JjL2dkYS1tZW51LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7QUFJbEgsTUFBTSxTQUFTLEdBQUc7Ozs7Ozs7Ozs7OztDQVlqQixDQUFDO0FBYUYsTUFBTSxPQUFPLFdBQVc7SUFHdEIsZ0VBQWdFO0lBQ2hFLDREQUE0RDtJQUU1RCxZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCO1FBRjlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSVixhQUFRLEdBQUcsZUFBZSxDQUFDO1FBVXZELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDeEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FB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LFFBQVEsRUFBRSxlQUFlO29CQUN6QixjQUFjO29CQUNkLDRGQUE0RjtvQkFDNUYsb0NBQW9DO29CQUNwQyx5REFBeUQ7b0JBRXpELGtCQUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixJQUFJO2lCQUNMO3NKQUUrQixRQUFRO3NCQUFyQyxXQUFXO3VCQUFDLE9BQU87Z0JBQ1gsU0FBUztzQkFBakIsS0FBSztnQkF1QnFDLE9BQU87c0JBQWpELFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVFlLE9BQU87c0JBQXRELFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vIFNFUlZJQ0VcbmltcG9ydCB7IEdkYU1lbnVTZXJ2aWNlIH0gZnJvbSBcIi4vZ2RhLW1lbnUuc2VydmljZVwiO1xuXG5jb25zdCBpY29uQXJyb3cgPSBgXG4gICAgPHN2Z1xuICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ9XCIyXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPHBhdGggZD1cIm0xMC4yMTEgNy4xNTVjLS4xNDEtLjEwOC0uMy0uMTU3LS40NTYtLjE1Ny0uMzg5IDAtLjc1NS4zMDYtLjc1NS43NDl2OC41MDFjMCAuNDQ1LjM2Ny43NS43NTUuNzUuMTU3IDAgLjMxNi0uMDUuNDU3LS4xNTkgMS41NTQtMS4yMDMgNC4xOTktMy4yNTIgNS40OTgtNC4yNTguMTg0LS4xNDIuMjktLjM2LjI5LS41OTIgMC0uMjMtLjEwNy0uNDQ5LS4yOTEtLjU5MS0xLjI5OS0xLjAwMi0zLjk0NS0zLjA0NC01LjQ5OC00LjI0M3pcIi8+XG4gICAgPC9zdmc+XG5gO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2RhTWVudUl0ZW1dJyxcbiAgLy8gdGVtcGxhdGU6IGBcbiAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJnZGEtbWVudS1pdGVtLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCIgI2J1dHRvbj5cbiAgLy8gICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIC8vICAgICAgICAgPHNwYW4gY2xhc3M9XCJnZGEtbWVudS1pdGVtLWJ1dHRvbi1pY29uXCIgI2ljb24+XG5cbiAgLy8gICAgICAgICA8L3NwYW4+XG4gIC8vICAgICA8L2J1dHRvbj5cbiAgLy8gYFxufSlcbmV4cG9ydCBjbGFzcyBHZGFNZW51SXRlbSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcHJpdmF0ZSBzZXRDbGFzcyA9ICdnZGEtbWVudS1pdGVtJztcbiAgQElucHV0KCkgZGlyZWN0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYm90dG9tJztcbiAgLy8gQFZpZXdDaGlsZCgnYnV0dG9uJywgeyBzdGF0aWM6IHRydWUgfSkgYnV0dG9uRWwhOiBFbGVtZW50UmVmO1xuICAvLyBAVmlld0NoaWxkKCdpY29uJywgeyBzdGF0aWM6IHRydWUgfSkgaWNvbkVsITogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhTWVudVNlcnZpY2U6IEdkYU1lbnVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdnZGEtbWVudS10cmlnZ2VyJykpIHtcbiAgICAgIGNvbnN0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhbiwgJ2dkYS1tZW51LWl0ZW0tYnV0dG9uLWljb24nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhbiwgYGdkYS1tZW51LWl0ZW0tYnV0dG9uLWljb24tcmlnaHRgKTtcbiAgICAgIHNwYW4uaW5uZXJIVE1MID0gaWNvbkFycm93O1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3Bhbik7XG4gICAgfVxuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0ZXh0LWFsaWduJywgZGlyZWN0aW9uID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIHByaXZhdGUgb25DbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmFuaW1hdGlvbkNsaWNrKGUpO1xuICAgIGlmICghdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdnZGEtbWVudS10cmlnZ2VyJykpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5nZGFNZW51U2VydmljZS5tZW51Q2xvc2UubmV4dCgpLCAyMDApO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKSBwcml2YXRlIG9uRW50ZXIoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5nZGFNZW51U2VydmljZS5vbkVudGVyLm5leHQoeyBwYXJlbnQ6IGNvbnRhaW5lciwgYnV0dG9uOiB0aGlzLmVsZW1lbnRSZWYsIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24gfSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGlvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZSkge1xuICAgICAgY29uc3QgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGRpdik7XG4gICAgICBjb25zdCBkID0gTWF0aC5tYXgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICBkaXYuc3R5bGUud2lkdGggPSBkaXYuc3R5bGUuaGVpZ2h0ID0gZCArICdweCc7XG4gICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGQgLyAyICsgJ3B4JztcbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMjU1LCAyNTUpJztcbiAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkaXYuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDApJztcbiAgICAgIGRpdi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCknO1xuICAgICAgZGl2LnN0eWxlLldlYmtpdEFuaW1hdGlvbiA9ICdnZGEtbWVudS1idXR0b24tcmlwcGxlIDMwMG1zIGxpbmVhcic7XG4gICAgICBkaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2dkYS1tZW51LWJ1dHRvbi1yaXBwbGUgMzAwbXMgbGluZWFyJztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZGl2KSwgNDAwKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
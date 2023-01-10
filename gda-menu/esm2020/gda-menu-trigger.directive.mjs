import { Directive, HostBinding, HostListener, Input } from "@angular/core";
// RXJS
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "./gda-menu.service";
export class GdaMenuTriggerDirective {
    constructor(viewContainerRef, elementRef, renderer, gdaMenuService) {
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaMenuService = gdaMenuService;
        this.setClass = 'gda-menu-trigger';
        this.setProperty = '';
        this.sub1 = new Subscription();
        this.sub2 = new Subscription();
        this.direction = 'right';
        this.sub1 = this.gdaMenuService.onEnter.subscribe((e) => {
            if (this.elementRef.nativeElement === e.button.nativeElement) {
                const containers = Array.prototype.slice.call(document.body.querySelectorAll('.gda-menu-containers .gda-menu-container'));
                if (containers.some(c => c === e.parent) && !containers.some(c => c === this.container)) {
                    this.renderer.appendChild(document.body.querySelector('.gda-menu-containers'), this.container);
                    this.gdaMenuService.setDirection(e.direction, this.container, this.elementRef);
                }
            }
            else if (this.container !== e.parent) {
                const containers = Array.prototype.slice.call(document.body.querySelectorAll('.gda-menu-container'));
                const index1 = containers.indexOf(this.container);
                const index2 = containers.indexOf(e.parent);
                if (index1 !== -1 && index2 !== -1 && index1 > index2) {
                    if (this.listenFunc)
                        this.listenFunc();
                    this.renderer.removeChild(document.body, this.container);
                }
            }
        });
        this.sub2 = this.gdaMenuService.menuClose.subscribe(() => {
            if (this.containers) {
                this.listenFunc = this.renderer.listen(this.containers, 'click', (event) => {
                    this.gdaMenuService.menuClose.next();
                });
                this.renderer.removeChild(document.body, this.containers);
            }
            ;
        });
    }
    set gdaMenuTrigger(value) {
        this.menuTriggerVal = value;
    }
    ;
    ngAfterViewInit() {
        this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.menuTriggerVal.contentTemplate);
        this.embeddedViewRef.detectChanges();
        this.container = this.renderer.createElement('div');
        this.renderer.addClass(this.container, 'gda-menu-container');
        this.renderer.addClass(this.container, `gda-menu-container-direction-${this.direction}`);
        for (const node of this.embeddedViewRef.rootNodes) {
            this.renderer.appendChild(this.container, node);
        }
    }
    onClick() {
        const childrenBody = Array.prototype.slice.call(document.body.children);
        if (!childrenBody.some((n) => n.classList.contains('gda-menu-containers'))) {
            this.containers = this.renderer.createElement('div');
            this.renderer.listen(this.containers, 'click', (event) => {
                this.gdaMenuService.menuClose.next();
            });
            this.renderer.addClass(this.containers, 'gda-menu-containers');
            this.renderer.appendChild(document.body, this.containers);
            this.renderer.appendChild(this.containers, this.container);
            this.gdaMenuService.setDirection(this.direction, this.container, this.elementRef);
        }
        else {
            if (childrenBody.some(c => c === this.container)) {
                this.renderer.removeChild(this.containers, this.container);
            }
            else {
                this.renderer.appendChild(this.containers, this.container);
                this.gdaMenuService.setDirection(this.direction, this.container, this.elementRef);
            }
        }
    }
    ngOnDestroy() {
        if (this.container)
            this.renderer.removeChild(this.containers, this.container);
        if (this.listenFunc)
            this.listenFunc();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
GdaMenuTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTriggerDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaMenuService }], target: i0.ɵɵFactoryTarget.Directive });
GdaMenuTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuTriggerDirective, selector: "[gdaMenuTrigger]", inputs: { gdaMenuTrigger: "gdaMenuTrigger", direction: "direction" }, host: { listeners: { "click": "onClick()" }, properties: { "class": "this.setClass", "attr.data-menu": "this.setProperty" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaMenuTrigger]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaMenuService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], setProperty: [{
                type: HostBinding,
                args: ['attr.data-menu']
            }], gdaMenuTrigger: [{
                type: Input
            }], direction: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUtdHJpZ2dlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLW1lbnUvc3JjL2dkYS1tZW51LXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBR1QsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBSU4sTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTztBQUNQLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtwQyxNQUFNLE9BQU8sdUJBQXVCO0lBZWxDLFlBQ1MsZ0JBQWtDLEVBQ2pDLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCO1FBSC9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWxCVixhQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFVaEQsU0FBSSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLFNBQUksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVE5QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQTBGLEVBQUUsRUFBRTtZQUMvSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUM1RCxNQUFNLFVBQVUsR0FBYyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxn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LGdCQUFnQjtnQkFDaEIsY0FBYztzQkFBMUIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQXNEeUIsT0FBTztzQkFBckMsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLy8gQ09NUE9ORU5UXG5pbXBvcnQgeyBHZGFNZW51Q29tcG9uZW50IH0gZnJvbSBcIi4vZ2RhLW1lbnUuY29tcG9uZW50XCI7XG4vLyBTRVJWSUNFXG5pbXBvcnQgeyBHZGFNZW51U2VydmljZSB9IGZyb20gXCIuL2dkYS1tZW51LnNlcnZpY2VcIjtcbi8vIFJYSlNcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnZGFNZW51VHJpZ2dlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEdkYU1lbnVUcmlnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByaXZhdGUgc2V0Q2xhc3MgPSAnZ2RhLW1lbnUtdHJpZ2dlcic7XG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLW1lbnUnKSBwcml2YXRlIHNldFByb3BlcnR5ID0gJyc7XG4gIEBJbnB1dCgpIHNldCBnZGFNZW51VHJpZ2dlcih2YWx1ZTogR2RhTWVudUNvbXBvbmVudCkge1xuICAgIHRoaXMubWVudVRyaWdnZXJWYWwgPSB2YWx1ZTtcbiAgfTtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYm90dG9tJztcbiAgcHJpdmF0ZSBlbWJlZGRlZFZpZXdSZWYhOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBjb250YWluZXJzOiBhbnk7XG4gIHByaXZhdGUgY29udGFpbmVyITogYW55O1xuICBwcml2YXRlIG1lbnVUcmlnZ2VyVmFsITogR2RhTWVudUNvbXBvbmVudDtcbiAgcHJpdmF0ZSBsaXN0ZW5GdW5jITogRnVuY3Rpb247XG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhTWVudVNlcnZpY2U6IEdkYU1lbnVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICB0aGlzLnN1YjEgPSB0aGlzLmdkYU1lbnVTZXJ2aWNlLm9uRW50ZXIuc3Vic2NyaWJlKChlOiB7IHBhcmVudDogRWxlbWVudCwgYnV0dG9uOiBFbGVtZW50UmVmLCBkaXJlY3Rpb246ICd0b3AnIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIH0pID0+IHtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZS5idXR0b24ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJzOiBFbGVtZW50W10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nZGEtbWVudS1jb250YWluZXJzIC5nZGEtbWVudS1jb250YWluZXInKSk7XG4gICAgICAgIGlmIChjb250YWluZXJzLnNvbWUoYyA9PiBjID09PSBlLnBhcmVudCkgJiYgIWNvbnRhaW5lcnMuc29tZShjID0+IGMgPT09IHRoaXMuY29udGFpbmVyKSkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcuZ2RhLW1lbnUtY29udGFpbmVycycpLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgdGhpcy5nZGFNZW51U2VydmljZS5zZXREaXJlY3Rpb24oZS5kaXJlY3Rpb24sIHRoaXMuY29udGFpbmVyLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyICE9PSBlLnBhcmVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcuZ2RhLW1lbnUtY29udGFpbmVyJykpO1xuICAgICAgICBjb25zdCBpbmRleDEgPSBjb250YWluZXJzLmluZGV4T2YodGhpcy5jb250YWluZXIpO1xuICAgICAgICBjb25zdCBpbmRleDIgPSBjb250YWluZXJzLmluZGV4T2YoZS5wYXJlbnQpO1xuICAgICAgICBpZiAoaW5kZXgxICE9PSAtMSAmJiBpbmRleDIgIT09IC0xICYmIGluZGV4MSA+IGluZGV4Mikge1xuICAgICAgICAgIGlmICh0aGlzLmxpc3RlbkZ1bmMpIHRoaXMubGlzdGVuRnVuYygpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdGhpcy5nZGFNZW51U2VydmljZS5tZW51Q2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lcnMpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5GdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5jb250YWluZXJzLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmdkYU1lbnVTZXJ2aWNlLm1lbnVDbG9zZS5uZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuY29udGFpbmVycyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLm1lbnVUcmlnZ2VyVmFsLmNvbnRlbnRUZW1wbGF0ZSk7XG4gICAgdGhpcy5lbWJlZGRlZFZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyLCAnZ2RhLW1lbnUtY29udGFpbmVyJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgYGdkYS1tZW51LWNvbnRhaW5lci1kaXJlY3Rpb24tJHt0aGlzLmRpcmVjdGlvbn1gKTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5lbWJlZGRlZFZpZXdSZWYucm9vdE5vZGVzKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCBub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIHByaXZhdGUgb25DbGljaygpOiB2b2lkIHtcbiAgICBjb25zdCBjaGlsZHJlbkJvZHk6IEVsZW1lbnRbXSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgIGlmICghY2hpbGRyZW5Cb2R5LnNvbWUoKG4pID0+IG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdnZGEtbWVudS1jb250YWluZXJzJykpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5jb250YWluZXJzLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5nZGFNZW51U2VydmljZS5tZW51Q2xvc2UubmV4dCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVycywgJ2dkYS1tZW51LWNvbnRhaW5lcnMnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy5jb250YWluZXJzKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJzLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICB0aGlzLmdkYU1lbnVTZXJ2aWNlLnNldERpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgdGhpcy5jb250YWluZXIsIHRoaXMuZWxlbWVudFJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGlsZHJlbkJvZHkuc29tZShjID0+IGMgPT09IHRoaXMuY29udGFpbmVyKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVycywgdGhpcy5jb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcnMsIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5nZGFNZW51U2VydmljZS5zZXREaXJlY3Rpb24odGhpcy5kaXJlY3Rpb24sIHRoaXMuY29udGFpbmVyLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcnMsIHRoaXMuY29udGFpbmVyKTtcbiAgICBpZiAodGhpcy5saXN0ZW5GdW5jKSB0aGlzLmxpc3RlbkZ1bmMoKTtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19
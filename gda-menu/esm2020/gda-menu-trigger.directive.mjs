import { Directive, HostBinding, HostListener, Input } from "@angular/core";
// RXJS
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "./gda-menu.service";
export class GdaMenuTrigger {
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
GdaMenuTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTrigger, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaMenuService }], target: i0.ɵɵFactoryTarget.Directive });
GdaMenuTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuTrigger, selector: "[gdaMenuTrigger]", inputs: { gdaMenuTrigger: "gdaMenuTrigger", direction: "direction" }, host: { listeners: { "click": "onClick()" }, properties: { "class": "this.setClass", "attr.data-menu": "this.setProperty" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuTrigger, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUtdHJpZ2dlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLW1lbnUvc3JjL2dkYS1tZW51LXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBR1QsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBSU4sTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTztBQUNQLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtwQyxNQUFNLE9BQU8sY0FBYztJQWV6QixZQUNTLGdCQUFrQyxFQUNqQyxVQUFzQixFQUN0QixRQUFtQixFQUNuQixjQUE4QjtRQUgvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFsQlYsYUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBVWhELFNBQUksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxTQUFJLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFROUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUEwRixFQUFFLEVBQUU7WUFDL0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDNUQsTUFBTSxVQUFVLEdBQWMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JB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Q2hCLGNBQWM7c0JBQTFCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFzRHlCLE9BQU87c0JBQXJDLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vIENPTVBPTkVOVFxuaW1wb3J0IHsgR2RhTWVudSB9IGZyb20gXCIuL2dkYS1tZW51LmNvbXBvbmVudFwiO1xuLy8gU0VSVklDRVxuaW1wb3J0IHsgR2RhTWVudVNlcnZpY2UgfSBmcm9tIFwiLi9nZGEtbWVudS5zZXJ2aWNlXCI7XG4vLyBSWEpTXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZ2RhTWVudVRyaWdnZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZGFNZW51VHJpZ2dlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBwcml2YXRlIHNldENsYXNzID0gJ2dkYS1tZW51LXRyaWdnZXInO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1tZW51JykgcHJpdmF0ZSBzZXRQcm9wZXJ0eSA9ICcnO1xuICBASW5wdXQoKSBzZXQgZ2RhTWVudVRyaWdnZXIodmFsdWU6IEdkYU1lbnUpIHtcbiAgICB0aGlzLm1lbnVUcmlnZ2VyVmFsID0gdmFsdWU7XG4gIH07XG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ2JvdHRvbSc7XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3UmVmITogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgY29udGFpbmVyczogYW55O1xuICBwcml2YXRlIGNvbnRhaW5lciE6IGFueTtcbiAgcHJpdmF0ZSBtZW51VHJpZ2dlclZhbCE6IEdkYU1lbnU7XG4gIHByaXZhdGUgbGlzdGVuRnVuYyE6IEZ1bmN0aW9uO1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGdkYU1lbnVTZXJ2aWNlOiBHZGFNZW51U2VydmljZVxuICApIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgdGhpcy5zdWIxID0gdGhpcy5nZGFNZW51U2VydmljZS5vbkVudGVyLnN1YnNjcmliZSgoZTogeyBwYXJlbnQ6IEVsZW1lbnQsIGJ1dHRvbjogRWxlbWVudFJlZiwgZGlyZWN0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYm90dG9tJyB9KSA9PiB7XG4gICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGUuYnV0dG9uLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyczogRWxlbWVudFtdID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcuZ2RhLW1lbnUtY29udGFpbmVycyAuZ2RhLW1lbnUtY29udGFpbmVyJykpO1xuICAgICAgICBpZiAoY29udGFpbmVycy5zb21lKGMgPT4gYyA9PT0gZS5wYXJlbnQpICYmICFjb250YWluZXJzLnNvbWUoYyA9PiBjID09PSB0aGlzLmNvbnRhaW5lcikpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignLmdkYS1tZW51LWNvbnRhaW5lcnMnKSwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICAgIHRoaXMuZ2RhTWVudVNlcnZpY2Uuc2V0RGlyZWN0aW9uKGUuZGlyZWN0aW9uLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5lbGVtZW50UmVmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5lciAhPT0gZS5wYXJlbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVycyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnLmdkYS1tZW51LWNvbnRhaW5lcicpKTtcbiAgICAgICAgY29uc3QgaW5kZXgxID0gY29udGFpbmVycy5pbmRleE9mKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgaW5kZXgyID0gY29udGFpbmVycy5pbmRleE9mKGUucGFyZW50KTtcbiAgICAgICAgaWYgKGluZGV4MSAhPT0gLTEgJiYgaW5kZXgyICE9PSAtMSAmJiBpbmRleDEgPiBpbmRleDIpIHtcbiAgICAgICAgICBpZiAodGhpcy5saXN0ZW5GdW5jKSB0aGlzLmxpc3RlbkZ1bmMoKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3ViMiA9IHRoaXMuZ2RhTWVudVNlcnZpY2UubWVudUNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXJzKSB7XG4gICAgICAgIHRoaXMubGlzdGVuRnVuYyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuY29udGFpbmVycywgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5nZGFNZW51U2VydmljZS5tZW51Q2xvc2UubmV4dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLmNvbnRhaW5lcnMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5tZW51VHJpZ2dlclZhbC5jb250ZW50VGVtcGxhdGUpO1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgJ2dkYS1tZW51LWNvbnRhaW5lcicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXIsIGBnZGEtbWVudS1jb250YWluZXItZGlyZWN0aW9uLSR7dGhpcy5kaXJlY3Rpb259YCk7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuZW1iZWRkZWRWaWV3UmVmLnJvb3ROb2Rlcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lciwgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBwcml2YXRlIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRyZW5Cb2R5OiBFbGVtZW50W10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAgICBpZiAoIWNoaWxkcmVuQm9keS5zb21lKChuKSA9PiBuLmNsYXNzTGlzdC5jb250YWlucygnZ2RhLW1lbnUtY29udGFpbmVycycpKSkge1xuICAgICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuY29udGFpbmVycywgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZ2RhTWVudVNlcnZpY2UubWVudUNsb3NlLm5leHQoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lcnMsICdnZGEtbWVudS1jb250YWluZXJzJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMuY29udGFpbmVycyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVycywgdGhpcy5jb250YWluZXIpO1xuICAgICAgdGhpcy5nZGFNZW51U2VydmljZS5zZXREaXJlY3Rpb24odGhpcy5kaXJlY3Rpb24sIHRoaXMuY29udGFpbmVyLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hpbGRyZW5Cb2R5LnNvbWUoYyA9PiBjID09PSB0aGlzLmNvbnRhaW5lcikpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcnMsIHRoaXMuY29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJzLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZ2RhTWVudVNlcnZpY2Uuc2V0RGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5lbGVtZW50UmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXJzLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgaWYgKHRoaXMubGlzdGVuRnVuYykgdGhpcy5saXN0ZW5GdW5jKCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
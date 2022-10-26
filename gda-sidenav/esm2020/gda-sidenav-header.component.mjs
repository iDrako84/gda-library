import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
export class GdaSidenavHeaderComponent {
    constructor(gdaSidenavService, elementRef, renderer, cd) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.cd = cd;
        this.setClass = 'gda-sidenav-header';
        this.opened = true;
        this.directionsVal = 'left';
        this.widthContainer = 0;
        this.resizeVal = false;
        this.statusSidenav = new EventEmitter();
    }
    get setStyle() {
        return {
            'left': this.directionsVal === 'left' ? 0 : '',
            'right': this.directionsVal === 'right' ? 0 : '',
        };
    }
    ;
    /**
     * Directions
     */
    set directions(val) {
        this.gdaSidenavService.directions = val;
        this.gdaSidenavService.directionsEmit.emit(val);
        this.directionsVal = val;
    }
    ;
    /**
     * Resize
     */
    set resize(val) {
        this.resizeVal = val;
        if (this.containerEl?.nativeElement && this.resizeVal) {
            const t = this;
            this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
            this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
            if (!this.resizeObserve) {
                this.resizeObserve = new ResizeObserver(function (entries) {
                    let rect = entries[0].contentRect;
                    let width = rect.width;
                    t.gdaSidenavService.widthContainer.emit(width);
                    if (t.opened) {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                    }
                    else {
                        t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                    }
                });
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
            else {
                this.resizeObserve.observe(this.containerEl.nativeElement);
            }
        }
        else if (!this.resizeVal && this.resizeObserve) {
            this.resizeObserve.disconnect();
        }
    }
    ;
    ngOnInit() {
        this.gdaSidenavService.opened = this.opened;
        this.gdaSidenavService.toggle.subscribe(() => {
            this.opened = !this.opened;
            this.statusSidenav.emit(this.opened);
            this.cd.detectChanges();
        });
        this.cd.detectChanges();
    }
    ngAfterViewInit() {
        this.gdaSidenavService.widthContainer.emit(this.elementRef.nativeElement.getBoundingClientRect().width);
        this.widthContainer = this.elementRef.nativeElement.getBoundingClientRect().width;
        if (this.resizeVal) {
            const t = this;
            this.resizeObserve = new ResizeObserver(function (entries) {
                let rect = entries[0].contentRect;
                let width = rect.width;
                t.gdaSidenavService.widthContainer.emit(width);
                if (t.opened) {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', (t.widthContainer + 'px'));
                }
                else {
                    t.renderer.setStyle(t.elementRef.nativeElement, 'width', 0);
                }
            });
            this.resizeObserve.observe(this.containerEl.nativeElement);
        }
        this.cd.detectChanges();
    }
    /**
     * Toggle
     */
    toggle() {
        this.gdaSidenavService.toggle.emit(this.widthContainer);
    }
}
GdaSidenavHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaSidenavHeaderComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.7", type: GdaSidenavHeaderComponent, selector: "gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]", inputs: { opened: "opened", directions: "directions", resize: "resize" }, outputs: { statusSidenav: "statusSidenav" }, host: { properties: { "class": "this.setClass", "style": "this.setStyle" } }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaSidenavHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-sidenav-header, .gda-sidenav-header, [gda-sidenav-header]',
                    template: `
    <div class="gda-container-header" #container>
      <ng-content></ng-content>
    </div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], setStyle: [{
                type: HostBinding,
                args: ['style']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], opened: [{
                type: Input
            }], directions: [{
                type: Input
            }], resize: [{
                type: Input
            }], statusSidenav: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtc2lkZW5hdi9zcmMvZ2RhLXNpZGVuYXYtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFxQixTQUFTLEVBQWMsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBYXpMLE1BQU0sT0FBTyx5QkFBeUI7SUE2RHBDLFlBQ1UsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLEVBQXFCO1FBSHJCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEVELGFBQVEsR0FBRyxvQkFBb0IsQ0FBQztRQWtFNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUF0RUQsSUFBa0MsUUFBUTtRQUN4QyxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVB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Q0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxRCxDQUFDOztzSEE3R1UseUJBQXlCOzBHQUF6Qix5QkFBeUIsb1pBTjFCOzs7O0tBSVA7MkZBRVEseUJBQXlCO2tCQVRyQyxTQUFTO21CQUFDO29CQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsK0RBQStEO29CQUN6RSxRQUFRLEVBQUU7Ozs7S0FJUDtpQkFDSjt5TEFFK0IsUUFBUTtzQkFBckMsV0FBVzt1QkFBQyxPQUFPO2dCQUNjLFFBQVE7c0JBQXpDLFdBQVc7dUJBQUMsT0FBTztnQkFNWSxXQUFXO3NCQUExQyxTQUFTO3VCQUFDLFdBQVc7Z0JBSWIsTUFBTTtzQkFBZCxLQUFLO2dCQUlPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBU08sTUFBTTtzQkFBbEIsS0FBSztnQkE4QkksYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtc2lkZW5hdi1oZWFkZXIsIC5nZGEtc2lkZW5hdi1oZWFkZXIsIFtnZGEtc2lkZW5hdi1oZWFkZXJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZ2RhLWNvbnRhaW5lci1oZWFkZXJcIiAjY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdkhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBwcml2YXRlIHNldENsYXNzID0gJ2dkYS1zaWRlbmF2LWhlYWRlcic7XG4gIEBIb3N0QmluZGluZygnc3R5bGUnKSBwcml2YXRlIGdldCBzZXRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xlZnQnOiB0aGlzLmRpcmVjdGlvbnNWYWwgPT09ICdsZWZ0JyA/IDAgOiAnJyxcbiAgICAgICdyaWdodCc6IHRoaXMuZGlyZWN0aW9uc1ZhbCA9PT0gJ3JpZ2h0JyA/IDAgOiAnJyxcbiAgICB9O1xuICB9O1xuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBwcml2YXRlIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBPcGVuXG4gICAqL1xuICBASW5wdXQoKSBvcGVuZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEaXJlY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9ucyh2YWw6ICdsZWZ0JyB8ICdyaWdodCcpIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnMgPSB2YWw7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zRW1pdC5lbWl0KHZhbCk7XG4gICAgdGhpcy5kaXJlY3Rpb25zVmFsID0gdmFsO1xuICB9O1xuICBwcml2YXRlIGRpcmVjdGlvbnNWYWw6ICdsZWZ0JyB8ICdyaWdodCc7XG4gIC8qKlxuICAgKiBSZXNpemVcbiAgICovXG4gIEBJbnB1dCgpIHNldCByZXNpemUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5yZXNpemVWYWwgPSB2YWw7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWw/Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5yZXNpemVWYWwpIHtcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKTtcbiAgICAgIHRoaXMud2lkdGhDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIGlmICghdGhpcy5yZXNpemVPYnNlcnZlKSB7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZSA9IG5ldyBSZXNpemVPYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICAgIGxldCByZWN0ID0gZW50cmllc1swXS5jb250ZW50UmVjdDtcbiAgICAgICAgICBsZXQgd2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgICAgIHQuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuZW1pdCh3aWR0aCk7XG4gICAgICAgICAgaWYgKHQub3BlbmVkKSB7XG4gICAgICAgICAgICB0LnJlbmRlcmVyLnNldFN0eWxlKHQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAodC53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZS5vYnNlcnZlKHRoaXMuY29udGFpbmVyRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5yZXNpemVWYWwgJiYgdGhpcy5yZXNpemVPYnNlcnZlKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmUuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSByZXNpemVWYWw6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2ZSE6IFJlc2l6ZU9ic2VydmVyO1xuICAvKipcbiAgICogU3RhdHVzIHNpZGVuYXZcbiAgICovXG4gIEBPdXRwdXQoKSBzdGF0dXNTaWRlbmF2OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG4gIC8qKlxuICAgKiBXaWR0aCBjb250ZW50XG4gICAqL1xuICBwcml2YXRlIHdpZHRoQ29udGFpbmVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBnZGFTaWRlbmF2U2VydmljZTogR2RhU2lkZW5hdlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5kaXJlY3Rpb25zVmFsID0gJ2xlZnQnO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSAwO1xuICAgIHRoaXMucmVzaXplVmFsID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0dXNTaWRlbmF2ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5vcGVuZWQgPSB0aGlzLm9wZW5lZDtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLnRvZ2dsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgICB0aGlzLnN0YXR1c1NpZGVuYXYuZW1pdCh0aGlzLm9wZW5lZCk7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLndpZHRoQ29udGFpbmVyLmVtaXQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpO1xuICAgIHRoaXMud2lkdGhDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBpZiAodGhpcy5yZXNpemVWYWwpIHtcbiAgICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlID0gbmV3IFJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgIGxldCByZWN0ID0gZW50cmllc1swXS5jb250ZW50UmVjdDtcbiAgICAgICAgbGV0IHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgdC5nZGFTaWRlbmF2U2VydmljZS53aWR0aENvbnRhaW5lci5lbWl0KHdpZHRoKTtcbiAgICAgICAgaWYgKHQub3BlbmVkKSB7XG4gICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgKHQud2lkdGhDb250YWluZXIgKyAncHgnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdC5yZW5kZXJlci5zZXRTdHlsZSh0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlLm9ic2VydmUodGhpcy5jb250YWluZXJFbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2UudG9nZ2xlLmVtaXQodGhpcy53aWR0aENvbnRhaW5lcik7XG4gIH1cblxufVxuIl19
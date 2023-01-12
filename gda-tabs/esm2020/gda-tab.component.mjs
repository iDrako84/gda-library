import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
/* ANIMATION */
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "./gda-tabs.service";
import * as i2 from "./gda-tabs-private.service";
import * as i3 from "@angular/common";
export class GdaTab {
    constructor(cd, elementRef, renderer, gdaTabsService, gdaTabsPrivateService) {
        this.cd = cd;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaTabsService = gdaTabsService;
        this.gdaTabsPrivateService = gdaTabsPrivateService;
        /* CLASS */
        this.setClass = 'gda-tab';
        this.heightTab = '0';
        this.tabTitleVal = '';
        this.position = null;
        this.leftEnter = '0';
        this.leftLeave = '0';
        this.animations = false;
        this.sub1 = this.gdaTabsPrivateService.callForId.subscribe((position) => {
            const container = this.renderer.parentNode(this.elementRef.nativeElement);
            container.querySelectorAll('gda-tab, .gda-tab, [gda-tab]').forEach((tab, index) => {
                if (tab === this.elementRef.nativeElement)
                    this.position = index;
            });
            if (position === this.position)
                this.gdaTabsPrivateService.addTab({ position: position, title: this.tabTitleVal });
            if (this.contentEl)
                this.heightTab = this.contentEl.nativeElement.offsetHeight + 'px';
            this.animations = false;
            this.cd.detectChanges();
        });
        this.sub2 = this.gdaTabsPrivateService.indexTabChanges.subscribe((change) => {
            if (change.new === this.position) {
                if (this.position !== null) {
                    if (this.position > change.old) {
                        this.leftEnter = '100%';
                    }
                    else if (this.position < change.old) {
                        this.leftEnter = '-100%';
                    }
                }
                this.cd.detectChanges();
                setTimeout(() => {
                    this.cd.detectChanges();
                    this.heightTab = this.contentEl.nativeElement.offsetHeight + 'px';
                });
            }
            else {
                if (this.position !== null) {
                    if (this.position > change.new) {
                        this.leftLeave = '100%';
                    }
                    else if (this.position < change.new) {
                        this.leftLeave = '-100%';
                    }
                }
                this.cd.detectChanges();
                setTimeout(() => {
                    this.cd.detectChanges();
                    // this.heightTab = 'min-content';
                });
            }
        });
        this.sub3 = this.gdaTabsPrivateService.buttonLoaded.subscribe(() => setTimeout(() => {
            const animationPrivate = this.gdaTabsPrivateService.getAnimation();
            if (animationPrivate !== undefined)
                this.animations = animationPrivate;
            else if (this.gdaTabsService.animationsActivated !== undefined)
                this.animations = this.gdaTabsService.animationsActivated;
            else
                this.animations = true;
        }, 100));
    }
    /* TITLE */
    set titleTab(title) {
        this.tabTitleVal = title;
        if (this.position !== null) {
            this.gdaTabsPrivateService.setTitle(this.position, title);
        }
    }
    ;
    ngAfterViewInit() {
        setTimeout(() => {
            this.gdaTabsPrivateService.tabLoaded(this.renderer.parentNode(this.elementRef.nativeElement));
            this.cd.detectChanges();
        });
    }
    onTabActive() {
        return this.position === this.gdaTabsPrivateService.getIndexTab();
    }
    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        this.gdaTabsPrivateService.tabLoaded(this.renderer.parentNode(this.elementRef.nativeElement));
    }
}
GdaTab.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTab, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsService }, { token: i2.GdaTabsPrivateService }], target: i0.ɵɵFactoryTarget.Component });
GdaTab.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaTab, selector: "gda-tab, .gda-tab, [gda-tab]", inputs: { titleTab: "titleTab" }, host: { properties: { "class": "this.setClass", "style.height": "this.heightTab" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["contentEl"], descendants: true }], ngImport: i0, template: `
    <div 
      class="gda-tabs-tab-content"
      *ngIf="onTabActive()"
      [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}"
      #contentEl>
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('tabsAnimation', [
            transition(':enter', [
                style({ position: 'absolute', left: '{{ leftEnter }}' }),
                animate('{{ animations }}', keyframes([
                    style({
                        left: '{{ leftEnter }}'
                    }),
                    style({
                        left: 0
                    })
                ]))
            ]),
            transition(':leave', [
                style({ position: 'absolute', left: 0 }),
                animate('{{ animations }}', keyframes([
                    style({
                        left: 0
                    }),
                    style({
                        left: '{{ leftLeave }}'
                    })
                ]))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTab, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tab, .gda-tab, [gda-tab]',
                    template: `
    <div 
      class="gda-tabs-tab-content"
      *ngIf="onTabActive()"
      [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}"
      #contentEl>
      <ng-content></ng-content>
    </div>
  `,
                    animations: [
                        trigger('tabsAnimation', [
                            transition(':enter', [
                                style({ position: 'absolute', left: '{{ leftEnter }}' }),
                                animate('{{ animations }}', keyframes([
                                    style({
                                        left: '{{ leftEnter }}'
                                    }),
                                    style({
                                        left: 0
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ position: 'absolute', left: 0 }),
                                animate('{{ animations }}', keyframes([
                                    style({
                                        left: 0
                                    }),
                                    style({
                                        left: '{{ leftLeave }}'
                                    })
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaTabsService }, { type: i2.GdaTabsPrivateService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class']
            }], heightTab: [{
                type: HostBinding,
                args: ['style.height']
            }], contentEl: [{
                type: ViewChild,
                args: ['contentEl', { static: false }]
            }], titleTab: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFxQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbkwsZUFBZTtBQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBNkNyRixNQUFNLE9BQU8sTUFBTTtJQXFCakIsWUFDVSxFQUFxQixFQUNyQixVQUFzQixFQUN0QixRQUFtQixFQUNuQixjQUE4QixFQUM5QixxQkFBNEM7UUFKNUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBekJ0RCxXQUFXO1FBQ21CLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDZCxjQUFTLEdBQUcsR0FBRyxDQUFDO1FBeUJuRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFB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RUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztnQ0FDeEQsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxpQkFBaUI7cUNBQ3hCLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxDQUFDO3FDQUNSLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsQ0FBQztxQ0FDUixDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsaUJBQWlCO3FDQUN4QixDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7ME5BRytCLFFBQVE7c0JBQXJDLFdBQVc7dUJBQUMsT0FBTztnQkFDaUIsU0FBUztzQkFBN0MsV0FBVzt1QkFBQyxjQUFjO2dCQUN3QixTQUFTO3NCQUEzRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRTVCLFFBQVE7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhVGFic1NlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2RhVGFic1ByaXZhdGVTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy1wcml2YXRlLnNlcnZpY2UnO1xuLyogUlhKUyAqL1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG4vKiBBTklNQVRJT04gKi9cbmltcG9ydCB7IHRyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBrZXlmcmFtZXMgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2dkYS10YWIsIC5nZGEtdGFiLCBbZ2RhLXRhYl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgXG4gICAgICBjbGFzcz1cImdkYS10YWJzLXRhYi1jb250ZW50XCJcbiAgICAgICpuZ0lmPVwib25UYWJBY3RpdmUoKVwiXG4gICAgICBbQHRhYnNBbmltYXRpb25dPVwie3ZhbHVlOiAnKicsIHBhcmFtczogeyBsZWZ0RW50ZXI6IGxlZnRFbnRlciwgbGVmdExlYXZlOiBsZWZ0TGVhdmUsIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMgPyAnMC41cyBlYXNlLWluLW91dCcgOiAnMHMnfX1cIlxuICAgICAgI2NvbnRlbnRFbD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6ICd7eyBsZWZ0RW50ZXIgfX0nIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdEVudGVyIH19J1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJ3t7IGFuaW1hdGlvbnMgfX0nLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdExlYXZlIH19J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFiIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyogQ0xBU1MgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHByaXZhdGUgc2V0Q2xhc3MgPSAnZ2RhLXRhYic7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgcHJpdmF0ZSBoZWlnaHRUYWIgPSAnMCc7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBwcml2YXRlIGNvbnRlbnRFbCE6IEVsZW1lbnRSZWY7XG4gIC8qIFRJVExFICovXG4gIEBJbnB1dCgpIHNldCB0aXRsZVRhYih0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueSkge1xuICAgIHRoaXMudGFiVGl0bGVWYWwgPSB0aXRsZTtcbiAgICBpZiAodGhpcy5wb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2Uuc2V0VGl0bGUodGhpcy5wb3NpdGlvbiwgdGl0bGUpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSB0YWJUaXRsZVZhbDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbDtcbiAgcHVibGljIGxlZnRFbnRlcjogc3RyaW5nO1xuICBwdWJsaWMgbGVmdExlYXZlOiBzdHJpbmc7XG4gIHB1YmxpYyBhbmltYXRpb25zOiBib29sZWFuO1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBnZGFUYWJzU2VydmljZTogR2RhVGFic1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBnZGFUYWJzUHJpdmF0ZVNlcnZpY2U6IEdkYVRhYnNQcml2YXRlU2VydmljZVxuICApIHtcbiAgICB0aGlzLnRhYlRpdGxlVmFsID0gJyc7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG51bGw7XG4gICAgdGhpcy5sZWZ0RW50ZXIgPSAnMCc7XG4gICAgdGhpcy5sZWZ0TGVhdmUgPSAnMCc7XG4gICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgdGhpcy5zdWIxID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuY2FsbEZvcklkLnN1YnNjcmliZSgocG9zaXRpb246IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiLCAuZ2RhLXRhYiwgW2dkYS10YWJdJykuZm9yRWFjaCgodGFiOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAodGFiID09PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgdGhpcy5wb3NpdGlvbiA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBpZiAocG9zaXRpb24gPT09IHRoaXMucG9zaXRpb24pIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmFkZFRhYih7IHBvc2l0aW9uOiBwb3NpdGlvbiwgdGl0bGU6IHRoaXMudGFiVGl0bGVWYWwgfSk7XG4gICAgICBpZiAodGhpcy5jb250ZW50RWwpIHRoaXMuaGVpZ2h0VGFiID0gdGhpcy5jb250ZW50RWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5pbmRleFRhYkNoYW5nZXMuc3Vic2NyaWJlKChjaGFuZ2U6IHsgbmV3OiBudW1iZXIsIG9sZDogbnVtYmVyIH0pID0+IHtcbiAgICAgIGlmIChjaGFuZ2UubmV3ID09PSB0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPiBjaGFuZ2Uub2xkKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRFbnRlciA9ICcxMDAlJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24gPCBjaGFuZ2Uub2xkKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRFbnRlciA9ICctMTAwJSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB0aGlzLmhlaWdodFRhYiA9IHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gY2hhbmdlLm5ldykge1xuICAgICAgICAgICAgdGhpcy5sZWZ0TGVhdmUgPSAnMTAwJSc7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uIDwgY2hhbmdlLm5ldykge1xuICAgICAgICAgICAgdGhpcy5sZWZ0TGVhdmUgPSAnLTEwMCUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgLy8gdGhpcy5oZWlnaHRUYWIgPSAnbWluLWNvbnRlbnQnO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YjMgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5idXR0b25Mb2FkZWQuc3Vic2NyaWJlKCgpID0+IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgYW5pbWF0aW9uUHJpdmF0ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEFuaW1hdGlvbigpO1xuICAgICAgaWYgKGFuaW1hdGlvblByaXZhdGUgIT09IHVuZGVmaW5lZCkgdGhpcy5hbmltYXRpb25zID0gYW5pbWF0aW9uUHJpdmF0ZVxuICAgICAgZWxzZSBpZiAodGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZFxuICAgICAgZWxzZSB0aGlzLmFuaW1hdGlvbnMgPSB0cnVlO1xuICAgIH0sIDEwMCkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UudGFiTG9hZGVkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25UYWJBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEluZGV4VGFiKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS50YWJMb2FkZWQodGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gIH1cblxufVxuIl19
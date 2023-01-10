import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
/* ANIMATION */
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "./gda-tabs.service";
import * as i2 from "./gda-tabs-private.service";
import * as i3 from "@angular/common";
export class GdaTabComponent {
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
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsService }, { token: i2.GdaTabsPrivateService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaTabComponent, selector: "gda-tab, .gda-tab, [gda-tab]", inputs: { titleTab: "titleTab" }, host: { properties: { "class": "this.setClass", "style.height": "this.heightTab" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["contentEl"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFxQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbkwsZUFBZTtBQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBNkNyRixNQUFNLE9BQU8sZUFBZTtJQXFCMUIsWUFDVSxFQUFxQixFQUNyQixVQUFzQixFQUN0QixRQUFtQixFQUNuQixjQUE4QixFQUM5QixxQkFBNEM7UUFKNUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBekJ0RCxXQUFXO1FBQ21CLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDZCxjQUFTLEdBQUcsR0FBRyxDQUFDO1FBeUJuRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFB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LEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7Z0NBQ3hELE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsaUJBQWlCO3FDQUN4QixDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsQ0FBQztxQ0FDUixDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUN4QyxPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLENBQUM7cUNBQ1IsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLGlCQUFpQjtxQ0FDeEIsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGOzBOQUcrQixRQUFRO3NCQUFyQyxXQUFXO3VCQUFDLE9BQU87Z0JBQ2lCLFNBQVM7c0JBQTdDLFdBQVc7dUJBQUMsY0FBYztnQkFDd0IsU0FBUztzQkFBM0QsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUU1QixRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IEdkYVRhYnNQcml2YXRlU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMtcHJpdmF0ZS5zZXJ2aWNlJztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuLyogQU5JTUFUSU9OICovXG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwga2V5ZnJhbWVzIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtdGFiLCAuZ2RhLXRhYiwgW2dkYS10YWJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFxuICAgICAgY2xhc3M9XCJnZGEtdGFicy10YWItY29udGVudFwiXG4gICAgICAqbmdJZj1cIm9uVGFiQWN0aXZlKClcIlxuICAgICAgW0B0YWJzQW5pbWF0aW9uXT1cInt2YWx1ZTogJyonLCBwYXJhbXM6IHsgbGVmdEVudGVyOiBsZWZ0RW50ZXIsIGxlZnRMZWF2ZTogbGVmdExlYXZlLCBhbmltYXRpb25zOiBhbmltYXRpb25zID8gJzAuNXMgZWFzZS1pbi1vdXQnIDogJzBzJ319XCJcbiAgICAgICNjb250ZW50RWw+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCd0YWJzQW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAne3sgbGVmdEVudGVyIH19JyB9KSxcbiAgICAgICAgYW5pbWF0ZSgne3sgYW5pbWF0aW9ucyB9fScsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRFbnRlciB9fSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRMZWF2ZSB9fSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qIENMQVNTICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBwcml2YXRlIHNldENsYXNzID0gJ2dkYS10YWInO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIHByaXZhdGUgaGVpZ2h0VGFiID0gJzAnO1xuICBAVmlld0NoaWxkKCdjb250ZW50RWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBjb250ZW50RWwhOiBFbGVtZW50UmVmO1xuICAvKiBUSVRMRSAqL1xuICBASW5wdXQoKSBzZXQgdGl0bGVUYWIodGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkpIHtcbiAgICB0aGlzLnRhYlRpdGxlVmFsID0gdGl0bGU7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldFRpdGxlKHRoaXMucG9zaXRpb24sIHRpdGxlKTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgdGFiVGl0bGVWYWw6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG4gIHByaXZhdGUgcG9zaXRpb246IG51bWJlciB8IG51bGw7XG4gIHB1YmxpYyBsZWZ0RW50ZXI6IHN0cmluZztcbiAgcHVibGljIGxlZnRMZWF2ZTogc3RyaW5nO1xuICBwdWJsaWMgYW5pbWF0aW9uczogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2RhVGFic1ByaXZhdGVTZXJ2aWNlOiBHZGFUYWJzUHJpdmF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50YWJUaXRsZVZhbCA9ICcnO1xuICAgIHRoaXMucG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMubGVmdEVudGVyID0gJzAnO1xuICAgIHRoaXMubGVmdExlYXZlID0gJzAnO1xuICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuc3ViMSA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmNhbGxGb3JJZC5zdWJzY3JpYmUoKHBvc2l0aW9uOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYiwgLmdkYS10YWIsIFtnZGEtdGFiXScpLmZvckVhY2goKHRhYjogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHRhYiA9PT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHRoaXMucG9zaXRpb24gPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHBvc2l0aW9uID09PSB0aGlzLnBvc2l0aW9uKSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5hZGRUYWIoeyBwb3NpdGlvbjogcG9zaXRpb24sIHRpdGxlOiB0aGlzLnRhYlRpdGxlVmFsIH0pO1xuICAgICAgaWYgKHRoaXMuY29udGVudEVsKSB0aGlzLmhlaWdodFRhYiA9IHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzLnN1YnNjcmliZSgoY2hhbmdlOiB7IG5ldzogbnVtYmVyLCBvbGQ6IG51bWJlciB9KSA9PiB7XG4gICAgICBpZiAoY2hhbmdlLm5ldyA9PT0gdGhpcy5wb3NpdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gY2hhbmdlLm9sZCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnMTAwJSc7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uIDwgY2hhbmdlLm9sZCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnLTEwMCUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgdGhpcy5oZWlnaHRUYWIgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA+IGNoYW5nZS5uZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJzEwMCUnO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA8IGNoYW5nZS5uZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJy0xMDAlJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIC8vIHRoaXMuaGVpZ2h0VGFiID0gJ21pbi1jb250ZW50JztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWIzID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuYnV0dG9uTG9hZGVkLnN1YnNjcmliZSgoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvblByaXZhdGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5nZXRBbmltYXRpb24oKTtcbiAgICAgIGlmIChhbmltYXRpb25Qcml2YXRlICE9PSB1bmRlZmluZWQpIHRoaXMuYW5pbWF0aW9ucyA9IGFuaW1hdGlvblByaXZhdGVcbiAgICAgIGVsc2UgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB0aGlzLmFuaW1hdGlvbnMgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWRcbiAgICAgIGVsc2UgdGhpcy5hbmltYXRpb25zID0gdHJ1ZTtcbiAgICB9LCAxMDApKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnRhYkxvYWRlZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uVGFiQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5nZXRJbmRleFRhYigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UudGFiTG9hZGVkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICB9XG5cbn1cbiJdfQ==
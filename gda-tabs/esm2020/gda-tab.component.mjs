import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
/* RXJS */
import { delay, of } from 'rxjs';
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
        this.sub3 = this.gdaTabsPrivateService.buttonLoaded.subscribe(() => of(true).pipe(delay(100)).subscribe(() => {
            const animationPrivate = this.gdaTabsPrivateService.getAnimation();
            if (animationPrivate !== undefined)
                this.animations = animationPrivate;
            else if (this.gdaTabsService.animationsActivated !== undefined)
                this.animations = this.gdaTabsService.animationsActivated;
            else
                this.animations = true;
        }));
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
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsService }, { token: i2.GdaTabsPrivateService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: GdaTabComponent, selector: "gda-tab, .gda-tab, [gda-tab]", inputs: { titleTab: "titleTab" }, host: { properties: { "class": "this.setClass", "style.height": "this.heightTab" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["contentEl"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaTabComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFxQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbkwsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxlQUFlO0FBQ2YsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUE2Q3JGLE1BQU0sT0FBTyxlQUFlO0lBcUIxQixZQUNVLEVBQXFCLEVBQ3JCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCLEVBQzlCLHFCQUE0QztRQUo1QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUF6QnRELFdBQVc7UUFDVyxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ2QsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQXlCM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUks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b0JBQy9DLFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtvQkFDRCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLGVBQWUsRUFBRTs0QkFDdkIsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztnQ0FDeEQsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxpQkFBaUI7cUNBQ3hCLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxDQUFDO3FDQUNSLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsQ0FBQztxQ0FDUixDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsaUJBQWlCO3FDQUN4QixDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7ME5BR3VCLFFBQVE7c0JBQTdCLFdBQVc7dUJBQUMsT0FBTztnQkFDUyxTQUFTO3NCQUFyQyxXQUFXO3VCQUFDLGNBQWM7Z0JBQ2dCLFNBQVM7c0JBQW5ELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFNUIsUUFBUTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFUYWJzU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBHZGFUYWJzUHJpdmF0ZVNlcnZpY2UgfSBmcm9tICcuL2dkYS10YWJzLXByaXZhdGUuc2VydmljZSc7XG4vKiBSWEpTICovXG5pbXBvcnQgeyBkZWxheSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuLyogQU5JTUFUSU9OICovXG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwga2V5ZnJhbWVzIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdnZGEtdGFiLCAuZ2RhLXRhYiwgW2dkYS10YWJdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFxuICAgICAgY2xhc3M9XCJnZGEtdGFicy10YWItY29udGVudFwiXG4gICAgICAqbmdJZj1cIm9uVGFiQWN0aXZlKClcIlxuICAgICAgW0B0YWJzQW5pbWF0aW9uXT1cInt2YWx1ZTogJyonLCBwYXJhbXM6IHsgbGVmdEVudGVyOiBsZWZ0RW50ZXIsIGxlZnRMZWF2ZTogbGVmdExlYXZlLCBhbmltYXRpb25zOiBhbmltYXRpb25zID8gJzAuNXMgZWFzZS1pbi1vdXQnIDogJzBzJ319XCJcbiAgICAgICNjb250ZW50RWw+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCd0YWJzQW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAne3sgbGVmdEVudGVyIH19JyB9KSxcbiAgICAgICAgYW5pbWF0ZSgne3sgYW5pbWF0aW9ucyB9fScsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRFbnRlciB9fSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRMZWF2ZSB9fSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qIENMQVNTICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBzZXRDbGFzcyA9ICdnZGEtdGFiJztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHRUYWIgPSAnMCc7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50RWwhOiBFbGVtZW50UmVmO1xuICAvKiBUSVRMRSAqL1xuICBASW5wdXQoKSBzZXQgdGl0bGVUYWIodGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkpIHtcbiAgICB0aGlzLnRhYlRpdGxlVmFsID0gdGl0bGU7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnNldFRpdGxlKHRoaXMucG9zaXRpb24sIHRpdGxlKTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgdGFiVGl0bGVWYWw6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG4gIHByaXZhdGUgcG9zaXRpb246IG51bWJlciB8IG51bGw7XG4gIHB1YmxpYyBsZWZ0RW50ZXI6IHN0cmluZztcbiAgcHVibGljIGxlZnRMZWF2ZTogc3RyaW5nO1xuICBwdWJsaWMgYW5pbWF0aW9uczogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2RhVGFic1ByaXZhdGVTZXJ2aWNlOiBHZGFUYWJzUHJpdmF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50YWJUaXRsZVZhbCA9ICcnO1xuICAgIHRoaXMucG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMubGVmdEVudGVyID0gJzAnO1xuICAgIHRoaXMubGVmdExlYXZlID0gJzAnO1xuICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuc3ViMSA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmNhbGxGb3JJZC5zdWJzY3JpYmUoKHBvc2l0aW9uOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYiwgLmdkYS10YWIsIFtnZGEtdGFiXScpLmZvckVhY2goKHRhYjogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHRhYiA9PT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHRoaXMucG9zaXRpb24gPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHBvc2l0aW9uID09PSB0aGlzLnBvc2l0aW9uKSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5hZGRUYWIoeyBwb3NpdGlvbjogcG9zaXRpb24sIHRpdGxlOiB0aGlzLnRhYlRpdGxlVmFsIH0pO1xuICAgICAgaWYgKHRoaXMuY29udGVudEVsKSB0aGlzLmhlaWdodFRhYiA9IHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzLnN1YnNjcmliZSgoY2hhbmdlOiB7IG5ldzogbnVtYmVyLCBvbGQ6IG51bWJlciB9KSA9PiB7XG4gICAgICBpZiAoY2hhbmdlLm5ldyA9PT0gdGhpcy5wb3NpdGlvbikge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gY2hhbmdlLm9sZCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnMTAwJSc7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uIDwgY2hhbmdlLm9sZCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnLTEwMCUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgdGhpcy5oZWlnaHRUYWIgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA+IGNoYW5nZS5uZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJzEwMCUnO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA8IGNoYW5nZS5uZXcpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJy0xMDAlJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIC8vIHRoaXMuaGVpZ2h0VGFiID0gJ21pbi1jb250ZW50JztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdWIzID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuYnV0dG9uTG9hZGVkLnN1YnNjcmliZSgoKSA9PiBvZih0cnVlKS5waXBlKGRlbGF5KDEwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBhbmltYXRpb25Qcml2YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0QW5pbWF0aW9uKCk7XG4gICAgICBpZiAoYW5pbWF0aW9uUHJpdmF0ZSAhPT0gdW5kZWZpbmVkKSB0aGlzLmFuaW1hdGlvbnMgPSBhbmltYXRpb25Qcml2YXRlXG4gICAgICBlbHNlIGlmICh0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQgIT09IHVuZGVmaW5lZCkgdGhpcy5hbmltYXRpb25zID0gdGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkXG4gICAgICBlbHNlIHRoaXMuYW5pbWF0aW9ucyA9IHRydWU7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UudGFiTG9hZGVkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25UYWJBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEluZGV4VGFiKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS50YWJMb2FkZWQodGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gIH1cblxufVxuIl19
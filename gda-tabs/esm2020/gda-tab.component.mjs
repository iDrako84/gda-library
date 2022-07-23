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
            container.querySelectorAll('gda-tab').forEach((tab, index) => {
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
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsService }, { token: i2.GdaTabsPrivateService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaTabComponent, selector: "gda-tab", inputs: { titleTab: "titleTab" }, host: { properties: { "class": "this.setClass", "style.height": "this.heightTab" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["contentEl"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTabComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'gda-tab',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFxQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbkwsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxlQUFlO0FBQ2YsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUE2Q3JGLE1BQU0sT0FBTyxlQUFlO0lBcUIxQixZQUNVLEVBQXFCLEVBQ3JCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCLEVBQzlCLHFCQUE0QztRQUo1QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUF6QnRELFdBQVc7UUFDVyxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ2QsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQXlCM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUks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QUMvQyxRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFOzs7Ozs7OztHQVFUO29CQUNELFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsZUFBZSxFQUFFOzRCQUN2QixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2dDQUN4RCxPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLGlCQUFpQjtxQ0FDeEIsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLENBQUM7cUNBQ1IsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzs0QkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDeEMsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixTQUFTLENBQUM7b0NBQ1IsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxDQUFDO3FDQUNSLENBQUM7b0NBQ0YsS0FBSyxDQUFDO3dDQUNKLElBQUksRUFBRSxpQkFBaUI7cUNBQ3hCLENBQUM7aUNBQ0gsQ0FBQyxDQUNIOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjswTkFHdUIsUUFBUTtzQkFBN0IsV0FBVzt1QkFBQyxPQUFPO2dCQUNTLFNBQVM7c0JBQXJDLFdBQVc7dUJBQUMsY0FBYztnQkFDZ0IsU0FBUztzQkFBbkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUU1QixRQUFRO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLyogU0VSVklDRSAqL1xyXG5pbXBvcnQgeyBHZGFUYWJzU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMuc2VydmljZSc7XHJcbmltcG9ydCB7IEdkYVRhYnNQcml2YXRlU2VydmljZSB9IGZyb20gJy4vZ2RhLXRhYnMtcHJpdmF0ZS5zZXJ2aWNlJztcclxuLyogUlhKUyAqL1xyXG5pbXBvcnQgeyBkZWxheSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG4vKiBBTklNQVRJT04gKi9cclxuaW1wb3J0IHsgdHJpZ2dlciwgdHJhbnNpdGlvbiwgc3R5bGUsIGFuaW1hdGUsIGtleWZyYW1lcyB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc2VsZWN0b3I6ICdnZGEtdGFiJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBcclxuICAgICAgY2xhc3M9XCJnZGEtdGFicy10YWItY29udGVudFwiXHJcbiAgICAgICpuZ0lmPVwib25UYWJBY3RpdmUoKVwiXHJcbiAgICAgIFtAdGFic0FuaW1hdGlvbl09XCJ7dmFsdWU6ICcqJywgcGFyYW1zOiB7IGxlZnRFbnRlcjogbGVmdEVudGVyLCBsZWZ0TGVhdmU6IGxlZnRMZWF2ZSwgYW5pbWF0aW9uczogYW5pbWF0aW9ucyA/ICcwLjVzIGVhc2UtaW4tb3V0JyA6ICcwcyd9fVwiXHJcbiAgICAgICNjb250ZW50RWw+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcigndGFic0FuaW1hdGlvbicsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6ICd7eyBsZWZ0RW50ZXIgfX0nIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJ3t7IGFuaW1hdGlvbnMgfX0nLFxyXG4gICAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgIGxlZnQ6ICd7eyBsZWZ0RW50ZXIgfX0nXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgbGVmdDogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXSlcclxuICAgICAgICApXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoeyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCB9KSxcclxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcclxuICAgICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICBsZWZ0OiAwXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRMZWF2ZSB9fSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZGFUYWJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qIENMQVNTICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHNldENsYXNzID0gJ2dkYS10YWInO1xyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0VGFiID0gJzAnO1xyXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50RWwhOiBFbGVtZW50UmVmO1xyXG4gIC8qIFRJVExFICovXHJcbiAgQElucHV0KCkgc2V0IHRpdGxlVGFiKHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55KSB7XHJcbiAgICB0aGlzLnRhYlRpdGxlVmFsID0gdGl0bGU7XHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5zZXRUaXRsZSh0aGlzLnBvc2l0aW9uLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwcml2YXRlIHRhYlRpdGxlVmFsOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xyXG4gIHByaXZhdGUgcG9zaXRpb246IG51bWJlciB8IG51bGw7XHJcbiAgcHVibGljIGxlZnRFbnRlcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBsZWZ0TGVhdmU6IHN0cmluZztcclxuICBwdWJsaWMgYW5pbWF0aW9uczogYm9vbGVhbjtcclxuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBnZGFUYWJzUHJpdmF0ZVNlcnZpY2U6IEdkYVRhYnNQcml2YXRlU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy50YWJUaXRsZVZhbCA9ICcnO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmxlZnRFbnRlciA9ICcwJztcclxuICAgIHRoaXMubGVmdExlYXZlID0gJzAnO1xyXG4gICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1YjEgPSB0aGlzLmdkYVRhYnNQcml2YXRlU2VydmljZS5jYWxsRm9ySWQuc3Vic2NyaWJlKChwb3NpdGlvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJykuZm9yRWFjaCgodGFiOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGlmICh0YWIgPT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB0aGlzLnBvc2l0aW9uID0gaW5kZXg7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocG9zaXRpb24gPT09IHRoaXMucG9zaXRpb24pIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmFkZFRhYih7IHBvc2l0aW9uOiBwb3NpdGlvbiwgdGl0bGU6IHRoaXMudGFiVGl0bGVWYWwgfSk7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCkgdGhpcy5oZWlnaHRUYWIgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWIyID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuaW5kZXhUYWJDaGFuZ2VzLnN1YnNjcmliZSgoY2hhbmdlOiB7IG5ldzogbnVtYmVyLCBvbGQ6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmIChjaGFuZ2UubmV3ID09PSB0aGlzLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gY2hhbmdlLm9sZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRFbnRlciA9ICcxMDAlJztcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA8IGNoYW5nZS5vbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnLTEwMCUnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgdGhpcy5oZWlnaHRUYWIgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID4gY2hhbmdlLm5ldykge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRMZWF2ZSA9ICcxMDAlJztcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbiA8IGNoYW5nZS5uZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0TGVhdmUgPSAnLTEwMCUnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgLy8gdGhpcy5oZWlnaHRUYWIgPSAnbWluLWNvbnRlbnQnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3ViMyA9IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmJ1dHRvbkxvYWRlZC5zdWJzY3JpYmUoKCkgPT4gb2YodHJ1ZSkucGlwZShkZWxheSgxMDApKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCBhbmltYXRpb25Qcml2YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UuZ2V0QW5pbWF0aW9uKCk7XHJcbiAgICAgIGlmIChhbmltYXRpb25Qcml2YXRlICE9PSB1bmRlZmluZWQpIHRoaXMuYW5pbWF0aW9ucyA9IGFuaW1hdGlvblByaXZhdGVcclxuICAgICAgZWxzZSBpZiAodGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZFxyXG4gICAgICBlbHNlIHRoaXMuYW5pbWF0aW9ucyA9IHRydWU7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5nZGFUYWJzUHJpdmF0ZVNlcnZpY2UudGFiTG9hZGVkKHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVGFiQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLmdldEluZGV4VGFiKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3ViMS51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN1YjMudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZ2RhVGFic1ByaXZhdGVTZXJ2aWNlLnRhYkxvYWRlZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcclxuICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19
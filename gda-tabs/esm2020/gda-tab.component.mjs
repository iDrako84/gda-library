import { Component, HostBinding, Input, ViewChild } from "@angular/core";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import * as i0 from "@angular/core";
import * as i1 from "./gda-tabs.service";
import * as i2 from "./tabs.service";
import * as i3 from "@angular/common";
class ButtonTabModel {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
export class GdaTabComponent {
    constructor(elementRef, renderer, gdaTabsService, tabsService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaTabsService = gdaTabsService;
        this.tabsService = tabsService;
        /**
         * Class
         */
        this.setClass = true;
        /**
         * Apertura all avvio
         */
        this.isOpen = false;
        this.titleTab = '';
        this.leftEnter = 0;
        this.leftLeave = 0;
        this.button = new ButtonTabModel();
        this.enabled = false;
        this.sub1 = this.tabsService.buttonActivated.subscribe((button) => {
            this.button.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            this.button.active = (this.button.id === button.id);
            if (this.button.active) {
                this.tabsService.buttonActivatedVal = button;
            }
            if (this.tabsService.animationsActivated !== undefined) {
                this.animations = this.tabsService.animationsActivated;
            }
            else if (this.gdaTabsService.animationsActivated !== undefined) {
                this.animations = this.gdaTabsService.animationsActivated;
            }
            else {
                this.animations = true;
            }
            if (this.id === button.id) {
                this.button = button;
                if (this.tabsService.preventTabs > this.button?.id) {
                    this.leftEnter = '-100%';
                }
                else if (this.tabsService.preventTabs < this.button?.id) {
                    this.leftEnter = '100%';
                }
            }
            else if (this.tabsService.preventTabs === this.button?.id) {
                if (button.id > this.button?.id) {
                    this.leftLeave = '-100%';
                }
                else if (button.id < this.button?.id) {
                    this.leftLeave = '100%';
                }
            }
            else {
                this.animations = false;
            }
            setTimeout(() => {
                this.enabled = (this.button?.active);
                setTimeout(() => {
                    this.animations = false;
                }, 0);
            }, 0);
        });
        this.sub2 = this.tabsService.tabsReloaded.subscribe(() => {
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            if (!this.tabsService.buttons.some((button) => button.id === this.id)) {
                this.tabsService.buttons.push(new ButtonTabModel(this.id, this.titleTab, false));
            }
            this.tabsService.buttons.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        });
        this.sub3 = this.tabsService.checkActive.subscribe(() => {
            this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
            const button = this.tabsService.buttons.find((button) => button.id === this.id);
            this.enabled = button?.active || false;
            if (button?.active) {
                this.tabsService.buttonActivatedVal = button;
            }
            if (button) {
                this.tabsService.buttonActivated.emit(button);
            }
        });
    }
    ngOnInit() {
        if (this.tabsService.animationsActivated !== undefined) {
            this.animations = this.tabsService.animationsActivated;
        }
        else if (this.gdaTabsService.animationsActivated !== undefined) {
            this.animations = this.gdaTabsService.animationsActivated;
        }
        else {
            this.animations = true;
        }
    }
    ngAfterContentChecked() {
        if (this.contentEl?.nativeElement) {
            this.tabsService.heightTabActive = this.contentEl.nativeElement.offsetHeight;
        }
    }
    ngAfterViewInit() {
        const parent = this.renderer.parentNode(this.elementRef.nativeElement);
        parent.querySelectorAll('gda-tab').forEach((e, i) => {
            e.setAttribute('data-gda-tab', String(i));
        });
        this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
        const button = new ButtonTabModel(this.id, this.titleTab, this.tabsService.buttons.some((button) => button.active) ? false : this.isOpen);
        this.tabsService.buttons.push(button);
        if (button.active) {
            setTimeout(() => {
                this.enabled = true;
                this.tabsService.buttonActivatedVal = button;
                this.tabsService.preventTabs = this.id;
            });
        }
        this.button = button;
        this.tabsService.buttons.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        if (this.tabsService.loadComplete) {
            this.tabsService.buttons = [];
            this.tabsService.tabsReloaded.emit(true);
        }
        else {
            if (this.gdaTabsService.animationsActivated) {
                this.animations = true;
            }
        }
    }
    /**
     * unsubscribe
     */
    ngOnDestroy() {
        this.animations = false;
        this.tabsService.buttons = this.tabsService.buttons.filter((button) => button.id !== this.id);
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        const parent = this.renderer.parentNode(this.elementRef.nativeElement);
        this.elementRef.nativeElement.remove();
        parent.querySelectorAll('gda-tab').forEach((e, i) => {
            e.setAttribute('data-gda-tab', String(i));
            this.tabsService.buttons[i].id = i;
        });
        this.tabsService.tabsReloaded.emit();
    }
}
GdaTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTabsService }, { token: i2.TabsService }], target: i0.ɵɵFactoryTarget.Component });
GdaTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaTabComponent, selector: "gda-tab", inputs: { titleTab: "titleTab", isOpen: "isOpen" }, host: { properties: { "class.gda-tab": "this.setClass" } }, viewQueries: [{ propertyName: "contentEl", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div 
            class="gda-tab-content"
            #content
            *ngIf="enabled" 
            [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}">
            <ng-content></ng-content>
        </div>    
    `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-tab',
                    template: `
        <div 
            class="gda-tab-content"
            #content
            *ngIf="enabled" 
            [@tabsAnimation]="{value: '*', params: { leftEnter: leftEnter, leftLeave: leftLeave, animations: animations ? '0.5s ease-in-out' : '0s'}}">
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaTabsService }, { type: i2.TabsService }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-tab']
            }], contentEl: [{
                type: ViewChild,
                args: ['content', { static: false }]
            }], titleTab: [{
                type: Input
            }], isOpen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9nZGEtdGFicy9zcmMvZ2RhLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFzQyxTQUFTLEVBQWMsV0FBVyxFQUFFLEtBQUssRUFBNkMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BLLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBT3JGLE1BQU0sY0FBYztJQUlsQixZQUNFLEtBQWEsQ0FBQyxFQUFFLFFBQXlDLEVBQUUsRUFBRSxTQUFrQixLQUFLO1FBRXBGLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBNENELE1BQU0sT0FBTyxlQUFlO0lBZ0QxQixZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCLEVBQzlCLFdBQXdCO1FBSHhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFuRGxDOztXQUVHO1FBQzJCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFTOUM7O1dBRUc7UUFDTSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBc0N0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FB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LE9BQU8sQ0FBQyxlQUFlLEVBQUU7NEJBQ3ZCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7Z0NBQ3hELE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsU0FBUyxDQUFDO29DQUNSLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsaUJBQWlCO3FDQUN4QixDQUFDO29DQUNGLEtBQUssQ0FBQzt3Q0FDSixJQUFJLEVBQUUsQ0FBQztxQ0FDUixDQUFDO2lDQUNILENBQUMsQ0FDSDs2QkFDRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUN4QyxPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLFNBQVMsQ0FBQztvQ0FDUixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLENBQUM7cUNBQ1IsQ0FBQztvQ0FDRixLQUFLLENBQUM7d0NBQ0osSUFBSSxFQUFFLGlCQUFpQjtxQ0FDeEIsQ0FBQztpQ0FDSCxDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGO2dMQUsrQixRQUFRO3NCQUFyQyxXQUFXO3VCQUFDLGVBQWU7Z0JBSWEsU0FBUztzQkFBakQsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUk5QixRQUFRO3NCQUFoQixLQUFLO2dCQUlHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGFuaW1hdGUsIGtleWZyYW1lcywgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhVGFic1NlcnZpY2UgfSBmcm9tIFwiLi9nZGEtdGFicy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gXCIuL3RhYnMuc2VydmljZVwiO1xuLyogUlhKUyAqL1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcblxuY2xhc3MgQnV0dG9uVGFiTW9kZWwge1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogbnVtYmVyID0gMCwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkgPSAnJywgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtdGFiJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzPVwiZ2RhLXRhYi1jb250ZW50XCJcbiAgICAgICAgICAgICNjb250ZW50XG4gICAgICAgICAgICAqbmdJZj1cImVuYWJsZWRcIiBcbiAgICAgICAgICAgIFtAdGFic0FuaW1hdGlvbl09XCJ7dmFsdWU6ICcqJywgcGFyYW1zOiB7IGxlZnRFbnRlcjogbGVmdEVudGVyLCBsZWZ0TGVhdmU6IGxlZnRMZWF2ZSwgYW5pbWF0aW9uczogYW5pbWF0aW9ucyA/ICcwLjVzIGVhc2UtaW4tb3V0JyA6ICcwcyd9fVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6ICd7eyBsZWZ0RW50ZXIgfX0nIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdEVudGVyIH19J1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJ3t7IGFuaW1hdGlvbnMgfX0nLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdExlYXZlIH19J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogQ2xhc3NcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2RhLXRhYicpIHNldENsYXNzID0gdHJ1ZTtcbiAgLyoqXG4gICAqIENvbnRlbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudEVsITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIFRpdG9sbyBkZWwgdGFiXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZVRhYjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgLyoqXG4gICAqIEFwZXJ0dXJhIGFsbCBhdnZpb1xuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBbmltYXRpb25zXG4gICAqL1xuICBwdWJsaWMgYW5pbWF0aW9ucyE6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBCb3R0b25lIGNvcnJpc3BvbmRlbnRlIGFsIGNvbnRlbnV0b1xuICAgKi9cbiAgcHJpdmF0ZSBidXR0b24hOiBCdXR0b25UYWJNb2RlbDtcbiAgLyoqXG4gICAqIGlkIGRlbCBUYWJcbiAgICovXG4gIHByaXZhdGUgaWQhOiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGVkXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEVudHJhdGFcbiAgICovXG4gIHB1YmxpYyBsZWZ0RW50ZXI6IG51bWJlciB8IHN0cmluZztcbiAgLyoqXG4gICAqIFVzY2l0YVxuICAgKi9cbiAgcHVibGljIGxlZnRMZWF2ZTogbnVtYmVyIHwgc3RyaW5nO1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBnZGFUYWJzU2VydmljZTogR2RhVGFic1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50aXRsZVRhYiA9ICcnO1xuICAgIHRoaXMubGVmdEVudGVyID0gMDtcbiAgICB0aGlzLmxlZnRMZWF2ZSA9IDA7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgQnV0dG9uVGFiTW9kZWwoKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN1YjEgPSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5zdWJzY3JpYmUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgIHRoaXMuYnV0dG9uLmlkID0gK3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJyk7XG4gICAgICB0aGlzLmlkID0gK3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJyk7XG4gICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSAodGhpcy5idXR0b24uaWQgPT09IGJ1dHRvbi5pZCk7XG4gICAgICBpZiAodGhpcy5idXR0b24uYWN0aXZlKSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gdGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlkID09PSBidXR0b24uaWQpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIGlmICh0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID4gdGhpcy5idXR0b24/LmlkKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnLTEwMCUnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFic1NlcnZpY2UucHJldmVudFRhYnMgPCB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgICB0aGlzLmxlZnRFbnRlciA9ICcxMDAlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID09PSB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgaWYgKGJ1dHRvbi5pZCA+IHRoaXMuYnV0dG9uPy5pZCkge1xuICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJy0xMDAlJztcbiAgICAgICAgfSBlbHNlIGlmIChidXR0b24uaWQgPCB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgICB0aGlzLmxlZnRMZWF2ZSA9ICcxMDAlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gKHRoaXMuYnV0dG9uPy5hY3RpdmUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0aGlzLnRhYnNTZXJ2aWNlLnRhYnNSZWxvYWRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgaWYgKCF0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29tZSgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmlkID09PSB0aGlzLmlkKSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMucHVzaChcbiAgICAgICAgICBuZXcgQnV0dG9uVGFiTW9kZWwodGhpcy5pZCwgdGhpcy50aXRsZVRhYiwgZmFsc2UpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29ydCgoYTogQnV0dG9uVGFiTW9kZWwsIGI6IEJ1dHRvblRhYk1vZGVsKSA9PiB7XG4gICAgICAgIGlmIChhLmlkIDwgYi5pZCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYS5pZCA+IGIuaWQpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgdGhpcy5zdWIzID0gdGhpcy50YWJzU2VydmljZS5jaGVja0FjdGl2ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zLmZpbmQoKGJ1dHRvbikgPT4gYnV0dG9uLmlkID09PSB0aGlzLmlkKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGJ1dHRvbj8uYWN0aXZlIHx8IGZhbHNlO1xuICAgICAgaWYgKGJ1dHRvbj8uYWN0aXZlKSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KGJ1dHRvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy50YWJzU2VydmljZS5oZWlnaHRUYWJBY3RpdmUgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYicpLmZvckVhY2goKGU6IEhUTUxEaXZFbGVtZW50LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGUuc2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInLCBTdHJpbmcoaSkpO1xuICAgIH0pO1xuICAgIHRoaXMuaWQgPSArdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInKTtcbiAgICBjb25zdCBidXR0b246IEJ1dHRvblRhYk1vZGVsID0gbmV3IEJ1dHRvblRhYk1vZGVsKHRoaXMuaWQsIHRoaXMudGl0bGVUYWIsIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5zb21lKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiBidXR0b24uYWN0aXZlKSA/IGZhbHNlIDogdGhpcy5pc09wZW4pO1xuICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5wdXNoKFxuICAgICAgYnV0dG9uXG4gICAgKTtcbiAgICBpZiAoYnV0dG9uLmFjdGl2ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gdGhpcy5pZDtcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5zb3J0KChhOiBCdXR0b25UYWJNb2RlbCwgYjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgIGlmIChhLmlkIDwgYi5pZCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5pZCA+IGIuaWQpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgICBpZiAodGhpcy50YWJzU2VydmljZS5sb2FkQ29tcGxldGUpIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucyA9IFtdO1xuICAgICAgdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuZW1pdCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1bnN1YnNjcmliZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zLmZpbHRlcigoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmlkICE9PSB0aGlzLmlkKTtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjMudW5zdWJzY3JpYmUoKTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJykuZm9yRWFjaCgoZTogSFRNTERpdkVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicsIFN0cmluZyhpKSk7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnNbaV0uaWQgPSBpXG4gICAgfSk7XG4gICAgdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuZW1pdCgpO1xuICB9XG59XG4iXX0=
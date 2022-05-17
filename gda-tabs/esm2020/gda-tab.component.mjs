import { Component, HostBinding, Input, ViewChild } from "@angular/core";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
/* RXJS */
import { delay, of } from "rxjs";
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
            of(true).pipe(delay(0)).subscribe(() => {
                this.enabled = (this.button?.active);
                of(true).pipe(delay(0)).subscribe(() => {
                    if (this.contentEl?.nativeElement) {
                        this.tabsService.heightTabActive = this.contentEl.nativeElement.offsetHeight;
                    }
                    this.animations = false;
                });
            });
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
    ngAfterViewInit() {
        const parent = this.renderer.parentNode(this.elementRef.nativeElement);
        parent.querySelectorAll('gda-tab').forEach((e, i) => {
            e.setAttribute('data-gda-tab', String(i));
        });
        this.id = +this.elementRef.nativeElement.getAttribute('data-gda-tab');
        const button = new ButtonTabModel(this.id, this.titleTab, this.tabsService.buttons.some((button) => button.active) ? false : this.isOpen);
        this.tabsService.buttons.push(button);
        if (button.active) {
            of(true).pipe(delay(0)).subscribe(() => {
                this.enabled = true;
                this.tabsService.buttonActivatedVal = button;
                this.tabsService.preventTabs = this.id;
            });
            if (this.contentEl?.nativeElement) {
                this.tabsService.heightTabActive = this.contentEl.nativeElement.offsetHeight;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9nZGEtdGFicy9zcmMvZ2RhLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsV0FBVyxFQUFFLEtBQUssRUFBNkMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJckYsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFFL0MsTUFBTSxjQUFjO0lBSWxCLFlBQ0UsS0FBYSxDQUFDLEVBQUUsUUFBeUMsRUFBRSxFQUFFLFNBQWtCLEtBQUs7UUFFcEYsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUE0Q0QsTUFBTSxPQUFPLGVBQWU7SUFnRDFCLFlBQ1UsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsY0FBOEIsRUFDOUIsV0FBd0I7UUFIeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQW5EbEM7O1dBRUc7UUFDMkIsYUFBUSxHQUFHLElBQUksQ0FBQztRQVM5Qzs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFzQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElB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SDtpQkFDRjtnTEFLK0IsUUFBUTtzQkFBckMsV0FBVzt1QkFBQyxlQUFlO2dCQUlhLFNBQVM7c0JBQWpELFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFJOUIsUUFBUTtzQkFBaEIsS0FBSztnQkFJRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBhbmltYXRlLCBrZXlmcmFtZXMsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVRhYnNTZXJ2aWNlIH0gZnJvbSBcIi4vZ2RhLXRhYnMuc2VydmljZVwiO1xuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tIFwiLi90YWJzLnNlcnZpY2VcIjtcbi8qIFJYSlMgKi9cbmltcG9ydCB7IGRlbGF5LCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcblxuY2xhc3MgQnV0dG9uVGFiTW9kZWwge1xuICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogbnVtYmVyID0gMCwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnkgPSAnJywgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtdGFiJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzPVwiZ2RhLXRhYi1jb250ZW50XCJcbiAgICAgICAgICAgICNjb250ZW50XG4gICAgICAgICAgICAqbmdJZj1cImVuYWJsZWRcIiBcbiAgICAgICAgICAgIFtAdGFic0FuaW1hdGlvbl09XCJ7dmFsdWU6ICcqJywgcGFyYW1zOiB7IGxlZnRFbnRlcjogbGVmdEVudGVyLCBsZWZ0TGVhdmU6IGxlZnRMZWF2ZSwgYW5pbWF0aW9uczogYW5pbWF0aW9ucyA/ICcwLjVzIGVhc2UtaW4tb3V0JyA6ICcwcyd9fVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3RhYnNBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6ICd7eyBsZWZ0RW50ZXIgfX0nIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdEVudGVyIH19J1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJ3t7IGFuaW1hdGlvbnMgfX0nLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAne3sgbGVmdExlYXZlIH19J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogQ2xhc3NcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2RhLXRhYicpIHNldENsYXNzID0gdHJ1ZTtcbiAgLyoqXG4gICAqIENvbnRlbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudEVsITogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIFRpdG9sbyBkZWwgdGFiXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZVRhYjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgLyoqXG4gICAqIEFwZXJ0dXJhIGFsbCBhdnZpb1xuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBbmltYXRpb25zXG4gICAqL1xuICBwdWJsaWMgYW5pbWF0aW9ucyE6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBCb3R0b25lIGNvcnJpc3BvbmRlbnRlIGFsIGNvbnRlbnV0b1xuICAgKi9cbiAgcHJpdmF0ZSBidXR0b24hOiBCdXR0b25UYWJNb2RlbDtcbiAgLyoqXG4gICAqIGlkIGRlbCBUYWJcbiAgICovXG4gIHByaXZhdGUgaWQhOiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGVkXG4gICAqL1xuICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEVudHJhdGFcbiAgICovXG4gIHB1YmxpYyBsZWZ0RW50ZXI6IG51bWJlciB8IHN0cmluZztcbiAgLyoqXG4gICAqIFVzY2l0YVxuICAgKi9cbiAgcHVibGljIGxlZnRMZWF2ZTogbnVtYmVyIHwgc3RyaW5nO1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9uXG4gICAqL1xuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBnZGFUYWJzU2VydmljZTogR2RhVGFic1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50aXRsZVRhYiA9ICcnO1xuICAgIHRoaXMubGVmdEVudGVyID0gMDtcbiAgICB0aGlzLmxlZnRMZWF2ZSA9IDA7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgQnV0dG9uVGFiTW9kZWwoKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN1YjEgPSB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5zdWJzY3JpYmUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgIHRoaXMuYnV0dG9uLmlkID0gK3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJyk7XG4gICAgICB0aGlzLmlkID0gK3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJyk7XG4gICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSAodGhpcy5idXR0b24uaWQgPT09IGJ1dHRvbi5pZCk7XG4gICAgICBpZiAodGhpcy5idXR0b24uYWN0aXZlKSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gdGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlkID09PSBidXR0b24uaWQpIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIGlmICh0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID4gdGhpcy5idXR0b24/LmlkKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnLTEwMCUnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFic1NlcnZpY2UucHJldmVudFRhYnMgPCB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgICB0aGlzLmxlZnRFbnRlciA9ICcxMDAlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID09PSB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgaWYgKGJ1dHRvbi5pZCA+IHRoaXMuYnV0dG9uPy5pZCkge1xuICAgICAgICAgIHRoaXMubGVmdExlYXZlID0gJy0xMDAlJztcbiAgICAgICAgfSBlbHNlIGlmIChidXR0b24uaWQgPCB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgICB0aGlzLmxlZnRMZWF2ZSA9ICcxMDAlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSAodGhpcy5idXR0b24/LmFjdGl2ZSk7XG4gICAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29udGVudEVsPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmhlaWdodFRhYkFjdGl2ZSA9IHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0aGlzLnRhYnNTZXJ2aWNlLnRhYnNSZWxvYWRlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgaWYgKCF0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29tZSgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmlkID09PSB0aGlzLmlkKSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMucHVzaChcbiAgICAgICAgICBuZXcgQnV0dG9uVGFiTW9kZWwodGhpcy5pZCwgdGhpcy50aXRsZVRhYiwgZmFsc2UpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29ydCgoYTogQnV0dG9uVGFiTW9kZWwsIGI6IEJ1dHRvblRhYk1vZGVsKSA9PiB7XG4gICAgICAgIGlmIChhLmlkIDwgYi5pZCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYS5pZCA+IGIuaWQpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgdGhpcy5zdWIzID0gdGhpcy50YWJzU2VydmljZS5jaGVja0FjdGl2ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zLmZpbmQoKGJ1dHRvbikgPT4gYnV0dG9uLmlkID09PSB0aGlzLmlkKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGJ1dHRvbj8uYWN0aXZlIHx8IGZhbHNlO1xuICAgICAgaWYgKGJ1dHRvbj8uYWN0aXZlKSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZC5lbWl0KGJ1dHRvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2dkYS10YWInKS5mb3JFYWNoKChlOiBIVE1MRGl2RWxlbWVudCwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBlLnNldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJywgU3RyaW5nKGkpKTtcbiAgICB9KTtcbiAgICB0aGlzLmlkID0gK3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1nZGEtdGFiJyk7XG4gICAgY29uc3QgYnV0dG9uOiBCdXR0b25UYWJNb2RlbCA9IG5ldyBCdXR0b25UYWJNb2RlbCh0aGlzLmlkLCB0aGlzLnRpdGxlVGFiLCB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29tZSgoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmFjdGl2ZSkgPyBmYWxzZSA6IHRoaXMuaXNPcGVuKTtcbiAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMucHVzaChcbiAgICAgIGJ1dHRvblxuICAgICk7XG4gICAgaWYgKGJ1dHRvbi5hY3RpdmUpIHtcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9uQWN0aXZhdGVkVmFsID0gYnV0dG9uO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzID0gdGhpcy5pZDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuY29udGVudEVsPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UuaGVpZ2h0VGFiQWN0aXZlID0gdGhpcy5jb250ZW50RWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5zb3J0KChhOiBCdXR0b25UYWJNb2RlbCwgYjogQnV0dG9uVGFiTW9kZWwpID0+IHtcbiAgICAgIGlmIChhLmlkIDwgYi5pZCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAoYS5pZCA+IGIuaWQpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgICBpZiAodGhpcy50YWJzU2VydmljZS5sb2FkQ29tcGxldGUpIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucyA9IFtdO1xuICAgICAgdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuZW1pdCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB1bnN1YnNjcmliZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zID0gdGhpcy50YWJzU2VydmljZS5idXR0b25zLmZpbHRlcigoYnV0dG9uOiBCdXR0b25UYWJNb2RlbCkgPT4gYnV0dG9uLmlkICE9PSB0aGlzLmlkKTtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjMudW5zdWJzY3JpYmUoKTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJykuZm9yRWFjaCgoZTogSFRNTERpdkVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicsIFN0cmluZyhpKSk7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnNbaV0uaWQgPSBpXG4gICAgfSk7XG4gICAgdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuZW1pdCgpO1xuICB9XG59XG4iXX0=
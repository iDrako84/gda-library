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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRhYnMvc3JjL2dkYS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFdBQVcsRUFBRSxLQUFLLEVBQTZDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXJGLFVBQVU7QUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7Ozs7O0FBRS9DLE1BQU0sY0FBYztJQUlsQixZQUNFLEtBQWEsQ0FBQyxFQUFFLFFBQXlDLEVBQUUsRUFBRSxTQUFrQixLQUFLO1FBRXBGLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBNENELE1BQU0sT0FBTyxlQUFlO0lBZ0QxQixZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGNBQThCLEVBQzlCLFdBQXdCO1FBSHhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFuRGxDOztXQUVHO1FBQzJCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFTOUM7O1dBRUc7UUFDTSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBc0N0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENB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O3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7Z0xBSytCLFFBQVE7c0JBQXJDLFdBQVc7dUJBQUMsZUFBZTtnQkFJYSxTQUFTO3NCQUFqRCxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBSTlCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBSUcsTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgYW5pbWF0ZSwga2V5ZnJhbWVzLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFUYWJzU2VydmljZSB9IGZyb20gXCIuL2dkYS10YWJzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSBcIi4vdGFicy5zZXJ2aWNlXCI7XG4vKiBSWEpTICovXG5pbXBvcnQgeyBkZWxheSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5cbmNsYXNzIEJ1dHRvblRhYk1vZGVsIHtcbiAgcHVibGljIGlkOiBudW1iZXI7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IG51bWJlciA9IDAsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55ID0gJycsIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLXRhYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzcz1cImdkYS10YWItY29udGVudFwiXG4gICAgICAgICAgICAjY29udGVudFxuICAgICAgICAgICAgKm5nSWY9XCJlbmFibGVkXCIgXG4gICAgICAgICAgICBbQHRhYnNBbmltYXRpb25dPVwie3ZhbHVlOiAnKicsIHBhcmFtczogeyBsZWZ0RW50ZXI6IGxlZnRFbnRlciwgbGVmdExlYXZlOiBsZWZ0TGVhdmUsIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMgPyAnMC41cyBlYXNlLWluLW91dCcgOiAnMHMnfX1cIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+ICAgIFxuICAgIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCd0YWJzQW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAne3sgbGVmdEVudGVyIH19JyB9KSxcbiAgICAgICAgYW5pbWF0ZSgne3sgYW5pbWF0aW9ucyB9fScsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRFbnRlciB9fSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwIH0pLFxuICAgICAgICBhbmltYXRlKCd7eyBhbmltYXRpb25zIH19JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgbGVmdDogJ3t7IGxlZnRMZWF2ZSB9fSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdkYS10YWInKSBzZXRDbGFzcyA9IHRydWU7XG4gIC8qKlxuICAgKiBDb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnRFbCE6IEVsZW1lbnRSZWY7XG4gIC8qKlxuICAgKiBUaXRvbG8gZGVsIHRhYlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGVUYWI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG4gIC8qKlxuICAgKiBBcGVydHVyYSBhbGwgYXZ2aW9cbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbiA9IGZhbHNlO1xuICAvKipcbiAgICogQW5pbWF0aW9uc1xuICAgKi9cbiAgcHVibGljIGFuaW1hdGlvbnMhOiBib29sZWFuO1xuICAvKipcbiAgICogQm90dG9uZSBjb3JyaXNwb25kZW50ZSBhbCBjb250ZW51dG9cbiAgICovXG4gIHByaXZhdGUgYnV0dG9uITogQnV0dG9uVGFiTW9kZWw7XG4gIC8qKlxuICAgKiBpZCBkZWwgVGFiXG4gICAqL1xuICBwcml2YXRlIGlkITogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlZFxuICAgKi9cbiAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbnRyYXRhXG4gICAqL1xuICBwdWJsaWMgbGVmdEVudGVyOiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKlxuICAgKiBVc2NpdGFcbiAgICovXG4gIHB1YmxpYyBsZWZ0TGVhdmU6IG51bWJlciB8IHN0cmluZztcbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZ2RhVGFic1NlcnZpY2U6IEdkYVRhYnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudGl0bGVUYWIgPSAnJztcbiAgICB0aGlzLmxlZnRFbnRlciA9IDA7XG4gICAgdGhpcy5sZWZ0TGVhdmUgPSAwO1xuICAgIHRoaXMuYnV0dG9uID0gbmV3IEJ1dHRvblRhYk1vZGVsKCk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdWIxID0gdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWQuc3Vic2NyaWJlKChidXR0b246IEJ1dHRvblRhYk1vZGVsKSA9PiB7XG4gICAgICB0aGlzLmJ1dHRvbi5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gKHRoaXMuYnV0dG9uLmlkID09PSBidXR0b24uaWQpO1xuICAgICAgaWYgKHRoaXMuYnV0dG9uLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IGJ1dHRvbjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0aGlzLnRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRoaXMuZ2RhVGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pZCA9PT0gYnV0dG9uLmlkKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgICAgICBpZiAodGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA+IHRoaXMuYnV0dG9uPy5pZCkge1xuICAgICAgICAgIHRoaXMubGVmdEVudGVyID0gJy0xMDAlJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYnNTZXJ2aWNlLnByZXZlbnRUYWJzIDwgdGhpcy5idXR0b24/LmlkKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0RW50ZXIgPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9PT0gdGhpcy5idXR0b24/LmlkKSB7XG4gICAgICAgIGlmIChidXR0b24uaWQgPiB0aGlzLmJ1dHRvbj8uaWQpIHtcbiAgICAgICAgICB0aGlzLmxlZnRMZWF2ZSA9ICctMTAwJSc7XG4gICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLmlkIDwgdGhpcy5idXR0b24/LmlkKSB7XG4gICAgICAgICAgdGhpcy5sZWZ0TGVhdmUgPSAnMTAwJSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gKHRoaXMuYnV0dG9uPy5hY3RpdmUpO1xuICAgICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy50YWJzU2VydmljZS5oZWlnaHRUYWJBY3RpdmUgPSB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdGhpcy50YWJzU2VydmljZS50YWJzUmVsb2FkZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaWQgPSArdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInKTtcbiAgICAgIGlmICghdGhpcy50YWJzU2VydmljZS5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5pZCA9PT0gdGhpcy5pZCkpIHtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zLnB1c2goXG4gICAgICAgICAgbmV3IEJ1dHRvblRhYk1vZGVsKHRoaXMuaWQsIHRoaXMudGl0bGVUYWIsIGZhbHNlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zLnNvcnQoKGE6IEJ1dHRvblRhYk1vZGVsLCBiOiBCdXR0b25UYWJNb2RlbCkgPT4ge1xuICAgICAgICBpZiAoYS5pZCA8IGIuaWQpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEuaWQgPiBiLmlkKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIHRoaXMuc3ViMyA9IHRoaXMudGFic1NlcnZpY2UuY2hlY2tBY3RpdmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaWQgPSArdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInKTtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5maW5kKChidXR0b24pID0+IGJ1dHRvbi5pZCA9PT0gdGhpcy5pZCk7XG4gICAgICB0aGlzLmVuYWJsZWQgPSBidXR0b24/LmFjdGl2ZSB8fCBmYWxzZTtcbiAgICAgIGlmIChidXR0b24/LmFjdGl2ZSkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IGJ1dHRvbjtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25BY3RpdmF0ZWQuZW1pdChidXR0b24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFic1NlcnZpY2UuYW5pbWF0aW9uc0FjdGl2YXRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0aGlzLnRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hbmltYXRpb25zID0gdGhpcy5nZGFUYWJzU2VydmljZS5hbmltYXRpb25zQWN0aXZhdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiJykuZm9yRWFjaCgoZTogSFRNTERpdkVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicsIFN0cmluZyhpKSk7XG4gICAgfSk7XG4gICAgdGhpcy5pZCA9ICt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2RhLXRhYicpO1xuICAgIGNvbnN0IGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwgPSBuZXcgQnV0dG9uVGFiTW9kZWwodGhpcy5pZCwgdGhpcy50aXRsZVRhYiwgdGhpcy50YWJzU2VydmljZS5idXR0b25zLnNvbWUoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5hY3RpdmUpID8gZmFsc2UgOiB0aGlzLmlzT3Blbik7XG4gICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zLnB1c2goXG4gICAgICBidXR0b25cbiAgICApO1xuICAgIGlmIChidXR0b24uYWN0aXZlKSB7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IGJ1dHRvbjtcbiAgICAgICAgdGhpcy50YWJzU2VydmljZS5wcmV2ZW50VGFicyA9IHRoaXMuaWQ7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmNvbnRlbnRFbD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICB0aGlzLnRhYnNTZXJ2aWNlLmhlaWdodFRhYkFjdGl2ZSA9IHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMuc29ydCgoYTogQnV0dG9uVGFiTW9kZWwsIGI6IEJ1dHRvblRhYk1vZGVsKSA9PiB7XG4gICAgICBpZiAoYS5pZCA8IGIuaWQpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKGEuaWQgPiBiLmlkKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMudGFic1NlcnZpY2UubG9hZENvbXBsZXRlKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmJ1dHRvbnMgPSBbXTtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UudGFic1JlbG9hZGVkLmVtaXQodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmdkYVRhYnNTZXJ2aWNlLmFuaW1hdGlvbnNBY3RpdmF0ZWQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdW5zdWJzY3JpYmVcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucyA9IHRoaXMudGFic1NlcnZpY2UuYnV0dG9ucy5maWx0ZXIoKGJ1dHRvbjogQnV0dG9uVGFiTW9kZWwpID0+IGJ1dHRvbi5pZCAhPT0gdGhpcy5pZCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIzLnVuc3Vic2NyaWJlKCk7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmUoKTtcbiAgICBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYicpLmZvckVhY2goKGU6IEhUTUxEaXZFbGVtZW50LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGUuc2V0QXR0cmlidXRlKCdkYXRhLWdkYS10YWInLCBTdHJpbmcoaSkpO1xuICAgICAgdGhpcy50YWJzU2VydmljZS5idXR0b25zW2ldLmlkID0gaVxuICAgIH0pO1xuICAgIHRoaXMudGFic1NlcnZpY2UudGFic1JlbG9hZGVkLmVtaXQoKTtcbiAgfVxufVxuIl19
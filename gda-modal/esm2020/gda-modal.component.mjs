import { Component, HostBinding, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
// RXJS
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./gda-modal.service";
import * as i2 from "@angular/common";
export class GdaModal {
    constructor(renderer, viewContainerRef, gdaModalService) {
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.gdaModalService = gdaModalService;
        /**
         * Display
         */
        this.setStyle = 'none';
        this.backdoor = true;
        this.backdoorNotTriggerClose = false;
        this.backdoorShow = false;
        this.openStatus = false;
        this.embeddedViewRef = null;
        this.modalId = '';
        this.modalClasses = '';
        this.escapeEnabled = true;
        this.subs = new Subscription();
    }
    ngOnInit() {
        this.gdaModalService.getCloseAllmodals().subscribe(() => this.close());
    }
    onKeydownHandler(event) {
        if (this.escapeEnabled)
            this.close();
    }
    open() {
        if (!this.openStatus) {
            this.openStatus = true;
            this.backdoorShow = true;
            this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate);
            this.embeddedViewRef.detectChanges();
            for (const node of this.embeddedViewRef.rootNodes) {
                if (node.classList?.contains('gda-modal-overlay')) {
                    const numberContainers = document.getElementsByClassName('gda-modal-overlay').length;
                    this.renderer.setStyle(node, 'z-index', 1060 + (numberContainers - 1));
                    // if (numberContainers <= 1) {
                    //   this.renderer.addClass(node, 'gda-modal-overlay-darked');
                    // }
                }
                if (node.classList?.contains('gda-modal-container')) {
                    if (this.modalId) {
                        this.renderer.setProperty(node, 'id', this.modalId);
                    }
                    if (this.modalClasses) {
                        this.modalClasses.split(' ').forEach((c) => this.renderer.addClass(node, c));
                    }
                    const numberContainers = document.getElementsByClassName('gda-modal-container').length;
                    this.renderer.setStyle(node, 'z-index', 1060 + (numberContainers));
                }
                this.renderer.appendChild(document.body, node);
            }
        }
    }
    close(e) {
        if (e)
            e.stopPropagation();
        if (this.openStatus) {
            this.openStatus = false;
            this.backdoorShow = false;
            setTimeout(() => {
                if (this.embeddedViewRef) {
                    this.embeddedViewRef.destroy();
                }
            }, 300);
        }
    }
    closeModal(e) {
        if (!this.backdoorNotTriggerClose)
            this.close(e);
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
GdaModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModal, deps: [{ token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i1.GdaModalService }], target: i0.ɵɵFactoryTarget.Component });
GdaModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModal, selector: "gda-modal", inputs: { backdoor: "backdoor", backdoorNotTriggerClose: "backdoorNotTriggerClose", modalId: "modalId", modalClasses: "modalClasses", escapeEnabled: "escapeEnabled" }, host: { listeners: { "document:keydown.escape": "onKeydownHandler($event)" }, properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <div class="gda-modal-overlay gda-modal-overlay-darked" *ngIf="backdoor && backdoorShow" (click)="closeModal($event)" @overlay></div>
      <div class="gda-modal-container" *ngIf="openStatus" @contentAnimated>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('overlay', [
            transition(':enter', [
                style({ background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)' }),
                animate('0.3s ease-in-out', keyframes([
                    style({
                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                    }),
                    style({
                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                    })
                ]))
            ]),
            transition(':leave', [
                style({ background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)' }),
                animate('0.3s ease-in-out', keyframes([
                    style({
                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                    }),
                    style({
                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                    })
                ]))
            ])
        ]),
        trigger('contentAnimated', [
            transition(':enter', [
                style({ transform: 'translateY(0)', opacity: 1 }),
                animate('0.3s ease-in-out', keyframes([
                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                    style({ transform: 'translateY(0)', opacity: 1 }),
                ]))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(-10px)', opacity: 0 }),
                animate('0.3s ease-in-out', keyframes([
                    style({ transform: 'translateY(0)', opacity: 1 }),
                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                ]))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-modal',
                    template: `
    <ng-template #content>
      <div class="gda-modal-overlay gda-modal-overlay-darked" *ngIf="backdoor && backdoorShow" (click)="closeModal($event)" @overlay></div>
      <div class="gda-modal-container" *ngIf="openStatus" @contentAnimated>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
                    animations: [
                        trigger('overlay', [
                            transition(':enter', [
                                style({ background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)' }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({
                                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                                    }),
                                    style({
                                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                                    })
                                ]))
                            ]),
                            transition(':leave', [
                                style({ background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)' }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({
                                        background: 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(3px)'
                                    }),
                                    style({
                                        background: 'rgba(0, 0, 0, 0)', 'backdrop-filter': 'blur(0px)'
                                    })
                                ]))
                            ])
                        ]),
                        trigger('contentAnimated', [
                            transition(':enter', [
                                style({ transform: 'translateY(0)', opacity: 1 }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                                    style({ transform: 'translateY(0)', opacity: 1 }),
                                ]))
                            ]),
                            transition(':leave', [
                                style({ transform: 'translateY(-10px)', opacity: 0 }),
                                animate('0.3s ease-in-out', keyframes([
                                    style({ transform: 'translateY(0)', opacity: 1 }),
                                    style({ transform: 'translateY(-10px)', opacity: 0 }),
                                ]))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i1.GdaModalService }]; }, propDecorators: { setStyle: [{
                type: HostBinding,
                args: ['style.display']
            }], contentTemplate: [{
                type: ViewChild,
                args: ['content', { read: TemplateRef, static: false }]
            }], backdoor: [{
                type: Input
            }], backdoorNotTriggerClose: [{
                type: Input
            }], modalId: [{
                type: Input
            }], modalClasses: [{
                type: Input
            }], escapeEnabled: [{
                type: Input
            }], onKeydownHandler: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtbW9kYWwvc3JjL2dkYS1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBbUIsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLFdBQVcsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3JLLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckYsT0FBTztBQUNQLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUErRHBDLE1BQU0sT0FBTyxRQUFRO0lBdUJuQixZQUNVLFFBQW1CLEVBQ25CLGdCQUFrQyxFQUNsQyxlQUFnQztRQUZoQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBekIxQzs7V0FFRztRQUNtQyxhQUFRLEdBQUcsTUFBTSxDQUFDO1FBd0J0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJ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Q0FDUixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQ0FDakQsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQ0FDdEQsQ0FBQyxDQUNIOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjs2SkFLdUMsUUFBUTtzQkFBN0MsV0FBVzt1QkFBQyxlQUFlO2dCQUV3QyxlQUFlO3NCQUFsRixTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFakQsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkE0QnVELGdCQUFnQjtzQkFBNUUsWUFBWTt1QkFBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwga2V5ZnJhbWVzLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuLy8gU0VSVklDRVxuaW1wb3J0IHsgR2RhTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtbW9kYWwuc2VydmljZSc7XG4vLyBSWEpTXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLW1vZGFsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2RhLW1vZGFsLW92ZXJsYXkgZ2RhLW1vZGFsLW92ZXJsYXktZGFya2VkXCIgKm5nSWY9XCJiYWNrZG9vciAmJiBiYWNrZG9vclNob3dcIiAoY2xpY2spPVwiY2xvc2VNb2RhbCgkZXZlbnQpXCIgQG92ZXJsYXk+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2RhLW1vZGFsLWNvbnRhaW5lclwiICpuZ0lmPVwib3BlblN0YXR1c1wiIEBjb250ZW50QW5pbWF0ZWQ+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdvdmVybGF5JywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLCAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoM3B4KScgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDApJywgJ2JhY2tkcm9wLWZpbHRlcic6ICdibHVyKDBweCknXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC41KScsICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigzcHgpJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwKScsICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigwcHgpJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4zcyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC41KScsICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigzcHgpJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDApJywgJ2JhY2tkcm9wLWZpbHRlcic6ICdibHVyKDBweCknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcignY29udGVudEFuaW1hdGVkJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMHB4KScsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAxIH0pLFxuICAgICAgICAgIF0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwcHgpJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4zcyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDEgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwcHgpJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBEaXNwbGF5XG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBwcml2YXRlIHNldFN0eWxlID0gJ25vbmUnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgY29udGVudFRlbXBsYXRlITogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBiYWNrZG9vcjogYm9vbGVhbjtcbiAgQElucHV0KCkgYmFja2Rvb3JOb3RUcmlnZ2VyQ2xvc2U6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbW9kYWxJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG1vZGFsQ2xhc3Nlczogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGVzY2FwZUVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJvdGVjdGVkIGJhY2tkb29yU2hvdzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIG9wZW5TdGF0dXM6IGJvb2xlYW47XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IG51bGw7XG5cbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGdkYU1vZGFsU2VydmljZTogR2RhTW9kYWxTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYmFja2Rvb3IgPSB0cnVlO1xuICAgIHRoaXMuYmFja2Rvb3JOb3RUcmlnZ2VyQ2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tkb29yU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMub3BlblN0YXR1cyA9IGZhbHNlO1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsSWQgPSAnJztcbiAgICB0aGlzLm1vZGFsQ2xhc3NlcyA9ICcnO1xuICAgIHRoaXMuZXNjYXBlRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5zdWJzID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZGFNb2RhbFNlcnZpY2UuZ2V0Q2xvc2VBbGxtb2RhbHMoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uZXNjYXBlJywgWyckZXZlbnQnXSkgcHJpdmF0ZSBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZXNjYXBlRW5hYmxlZCkgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW5TdGF0dXMpIHtcbiAgICAgIHRoaXMub3BlblN0YXR1cyA9IHRydWU7XG4gICAgICB0aGlzLmJhY2tkb29yU2hvdyA9IHRydWU7XG4gICAgICB0aGlzLmVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5jb250ZW50VGVtcGxhdGUpO1xuICAgICAgdGhpcy5lbWJlZGRlZFZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuZW1iZWRkZWRWaWV3UmVmLnJvb3ROb2Rlcykge1xuICAgICAgICBpZiAobm9kZS5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdnZGEtbW9kYWwtb3ZlcmxheScpKSB7XG4gICAgICAgICAgY29uc3QgbnVtYmVyQ29udGFpbmVyczogbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2RhLW1vZGFsLW92ZXJsYXknKS5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShub2RlLCAnei1pbmRleCcsIDEwNjAgKyAobnVtYmVyQ29udGFpbmVycyAtIDEpKTtcbiAgICAgICAgICAvLyBpZiAobnVtYmVyQ29udGFpbmVycyA8PSAxKSB7XG4gICAgICAgICAgLy8gICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5vZGUsICdnZGEtbW9kYWwtb3ZlcmxheS1kYXJrZWQnKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygnZ2RhLW1vZGFsLWNvbnRhaW5lcicpKSB7XG4gICAgICAgICAgaWYgKHRoaXMubW9kYWxJZCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShub2RlLCAnaWQnLCB0aGlzLm1vZGFsSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5tb2RhbENsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaCgoYzogc3RyaW5nKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5vZGUsIGMpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbnVtYmVyQ29udGFpbmVyczogbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2RhLW1vZGFsLWNvbnRhaW5lcicpLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5vZGUsICd6LWluZGV4JywgMTA2MCArIChudW1iZXJDb250YWluZXJzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoZT86IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUpIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMub3BlblN0YXR1cykge1xuICAgICAgdGhpcy5vcGVuU3RhdHVzID0gZmFsc2U7XG4gICAgICB0aGlzLmJhY2tkb29yU2hvdyA9IGZhbHNlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlld1JlZikge1xuICAgICAgICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xvc2VNb2RhbChlOiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5iYWNrZG9vck5vdFRyaWdnZXJDbG9zZSkgdGhpcy5jbG9zZShlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==
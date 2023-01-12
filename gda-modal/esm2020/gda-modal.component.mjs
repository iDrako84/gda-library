import { Component, HostBinding, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class GdaModal {
    constructor(renderer, viewContainerRef) {
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
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
}
GdaModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModal, deps: [{ token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
GdaModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaModal, selector: "gda-modal", inputs: { backdoor: "backdoor", backdoorNotTriggerClose: "backdoorNotTriggerClose", modalId: "modalId", modalClasses: "modalClasses", escapeEnabled: "escapeEnabled" }, host: { listeners: { "document:keydown.escape": "onKeydownHandler($event)" }, properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <div class="gda-modal-overlay gda-modal-overlay-darked" *ngIf="backdoor && backdoorShow" (click)="closeModal($event)" @overlay></div>
      <div class="gda-modal-container" *ngIf="openStatus" @contentAnimated>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
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
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { setStyle: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtbW9kYWwvc3JjL2dkYS1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBbUIsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsV0FBVyxFQUFFLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDbEosT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBK0RyRixNQUFNLE9BQU8sUUFBUTtJQXFCbkIsWUFDVSxRQUFtQixFQUNuQixnQkFBa0M7UUFEbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBdEI1Qzs7V0FFRztRQUNtQyxhQUFRLEdBQUcsTUFBTSxDQUFDO1FBcUJ0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFNEQsZ0JBQWdCLENBQUMsS0FBb0I7UUFDaEcsSUFBSSxJQUFJLENBQUMsYUFBYTtZQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sSUFBSTtR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QkFBaEIsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFvQnVELGdCQUFnQjtzQkFBNUUsWUFBWTt1QkFBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBrZXlmcmFtZXMsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dkYS1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImdkYS1tb2RhbC1vdmVybGF5IGdkYS1tb2RhbC1vdmVybGF5LWRhcmtlZFwiICpuZ0lmPVwiYmFja2Rvb3IgJiYgYmFja2Rvb3JTaG93XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoJGV2ZW50KVwiIEBvdmVybGF5PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdkYS1tb2RhbC1jb250YWluZXJcIiAqbmdJZj1cIm9wZW5TdGF0dXNcIiBAY29udGVudEFuaW1hdGVkPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignb3ZlcmxheScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjUpJywgJ2JhY2tkcm9wLWZpbHRlcic6ICdibHVyKDNweCknIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjNzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwKScsICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigwcHgpJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLCAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoM3B4KSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgYmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMCknLCAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoMHB4KScgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLCAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoM3B4KSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwKScsICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigwcHgpJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2NvbnRlbnRBbmltYXRlZCcsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJywgb3BhY2l0eTogMSB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC4zcyBlYXNlLWluLW91dCcsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTBweCknLCBvcGFjaXR5OiAwIH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJywgb3BhY2l0eTogMSB9KSxcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMHB4KScsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuM3MgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAxIH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMHB4KScsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdkYU1vZGFsIHtcbiAgLyoqXG4gICAqIERpc3BsYXlcbiAgICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpIHByaXZhdGUgc2V0U3R5bGUgPSAnbm9uZSc7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSBjb250ZW50VGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGJhY2tkb29yOiBib29sZWFuO1xuICBASW5wdXQoKSBiYWNrZG9vck5vdFRyaWdnZXJDbG9zZTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBtb2RhbElkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbW9kYWxDbGFzc2VzOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZXNjYXBlRW5hYmxlZDogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgYmFja2Rvb3JTaG93OiBib29sZWFuO1xuICBwcm90ZWN0ZWQgb3BlblN0YXR1czogYm9vbGVhbjtcbiAgcHJpdmF0ZSBlbWJlZGRlZFZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuYmFja2Rvb3IgPSB0cnVlO1xuICAgIHRoaXMuYmFja2Rvb3JOb3RUcmlnZ2VyQ2xvc2UgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tkb29yU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMub3BlblN0YXR1cyA9IGZhbHNlO1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsSWQgPSAnJztcbiAgICB0aGlzLm1vZGFsQ2xhc3NlcyA9ICcnO1xuICAgIHRoaXMuZXNjYXBlRW5hYmxlZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pIHByaXZhdGUgb25LZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmVzY2FwZUVuYWJsZWQpIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcGVuU3RhdHVzKSB7XG4gICAgICB0aGlzLm9wZW5TdGF0dXMgPSB0cnVlO1xuICAgICAgdGhpcy5iYWNrZG9vclNob3cgPSB0cnVlO1xuICAgICAgdGhpcy5lbWJlZGRlZFZpZXdSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuY29udGVudFRlbXBsYXRlKTtcbiAgICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygnZ2RhLW1vZGFsLW92ZXJsYXknKSkge1xuICAgICAgICAgIGNvbnN0IG51bWJlckNvbnRhaW5lcnM6IG51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dkYS1tb2RhbC1vdmVybGF5JykubGVuZ3RoO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobm9kZSwgJ3otaW5kZXgnLCAxMDYwICsgKG51bWJlckNvbnRhaW5lcnMgLSAxKSk7XG4gICAgICAgICAgLy8gaWYgKG51bWJlckNvbnRhaW5lcnMgPD0gMSkge1xuICAgICAgICAgIC8vICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhub2RlLCAnZ2RhLW1vZGFsLW92ZXJsYXktZGFya2VkJyk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ2dkYS1tb2RhbC1jb250YWluZXInKSkge1xuICAgICAgICAgIGlmICh0aGlzLm1vZGFsSWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobm9kZSwgJ2lkJywgdGhpcy5tb2RhbElkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMubW9kYWxDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goKGM6IHN0cmluZykgPT4gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhub2RlLCBjKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG51bWJlckNvbnRhaW5lcnM6IG51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dkYS1tb2RhbC1jb250YWluZXInKS5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShub2RlLCAnei1pbmRleCcsIDEwNjAgKyAobnVtYmVyQ29udGFpbmVycykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKGU/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChlKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLm9wZW5TdGF0dXMpIHtcbiAgICAgIHRoaXMub3BlblN0YXR1cyA9IGZhbHNlO1xuICAgICAgdGhpcy5iYWNrZG9vclNob3cgPSBmYWxzZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5lbWJlZGRlZFZpZXdSZWYpIHtcbiAgICAgICAgICB0aGlzLmVtYmVkZGVkVmlld1JlZi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNsb3NlTW9kYWwoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYmFja2Rvb3JOb3RUcmlnZ2VyQ2xvc2UpIHRoaXMuY2xvc2UoZSk7XG4gIH1cblxufVxuIl19
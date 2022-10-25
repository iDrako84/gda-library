import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class GdaToastConfig {
    constructor(direction = 'top-right', classToast = '', styleToast = {}, timing = 3000) {
        this.direction = direction;
        this.classToast = classToast;
        this.styleToast = styleToast;
        this.timing = timing;
    }
}
class GdaToastConfigForComponent extends GdaToastConfig {
    constructor(id = '') {
        super();
        this.id = id;
    }
}
export class GdaToastComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.toasts = [];
        this.closeToast = new EventEmitter();
        this.directionToast = 'top-right';
    }
    get addClass() {
        return {
            'gda-toast': true,
            'gda-toast-top-left': this.directionToast === 'top-left',
            'gda-toast-top-center': this.directionToast === 'top-center',
            'gda-toast-top-right': this.directionToast === 'top-right',
            'gda-toast-bottom-left': this.directionToast === 'bottom-left',
            'gda-toast-bottom-center': this.directionToast === 'bottom-center',
            'gda-toast-bottom-right': this.directionToast === 'bottom-right'
        };
    }
    ;
    ngOnInit() {
        this.directionToast = this.toasts[0].config.direction || 'top-right';
    }
    close(toast) {
        this.closeToast.emit(toast.config.id);
    }
}
GdaToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaToastComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.7", type: GdaToastComponent, selector: "gda-toast", inputs: { toasts: "toasts" }, outputs: { closeToast: "closeToast" }, host: { properties: { "class": "this.addClass" } }, ngImport: i0, template: `
    <div 
      *ngFor="let toast of toasts" 
      class="gda-toast-item" 
      [ngClass]="toast.config.classToast || ''" 
      [ngStyle]="toast.config.styleToast || {}" 
      @gdaToastAnimation 
      (click)="close(toast)">
      <div [innerHTML]="toast.text"></div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('gdaToastAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.4s ease-in-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('0.4s ease-in-out', style({
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0
                }))
            ])
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.7", ngImport: i0, type: GdaToastComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-toast',
                    template: `
    <div 
      *ngFor="let toast of toasts" 
      class="gda-toast-item" 
      [ngClass]="toast.config.classToast || ''" 
      [ngStyle]="toast.config.styleToast || {}" 
      @gdaToastAnimation 
      (click)="close(toast)">
      <div [innerHTML]="toast.text"></div>
    </div>
  `,
                    animations: [
                        trigger('gdaToastAnimation', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('0.4s ease-in-out', style({ opacity: 1 }))
                            ]),
                            transition(':leave', [
                                style({ opacity: 1 }),
                                animate('0.4s ease-in-out', style({
                                    opacity: 0,
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { addClass: [{
                type: HostBinding,
                args: ['class']
            }], toasts: [{
                type: Input
            }], closeToast: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtdG9hc3Qvc3JjL2dkYS10b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFFMUUsTUFBTSxjQUFjO0lBTWxCLFlBQ0UsWUFBd0csV0FBVyxFQUNuSCxhQUFxQixFQUFFLEVBQ3ZCLGFBQWlCLEVBQUUsRUFDbkIsU0FBbUMsSUFBSTtRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLDBCQUEyQixTQUFRLGNBQWM7SUFHckQsWUFBWSxLQUFhLEVBQUU7UUFDekIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNkLENBQUM7Q0FDRjtBQXNDRCxNQUFNLE9BQU8saUJBQWlCO0lBeUI1QixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBNUJELElBQTBCLFFBQVE7UUFDaEMsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtZQUN4RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLFlBQVk7WUFDNUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXO1lBQzFELHVCQUF1QixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssYUFBYTtZQUM5RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLGVBQWU7WUFDbEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxjQUFjO1NBQ2pFLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQW9CRixRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyxLQUFLLENBQUMsS0FBMkQ7UUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs4R0FyQ1UsaUJBQWlCO2tHQUFqQixpQkFBaUIsMEtBbENsQjs7Ozs7Ozs7OztHQVVULDhWQUNXO1FBQ1YsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDdEI7YUFDRixDQUFDO1lBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQztvQkFDSixPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLEVBQUUsQ0FBQztvQkFDVCxVQUFVLEVBQUUsQ0FBQztvQkFDYixhQUFhLEVBQUUsQ0FBQztvQkFDaEIsWUFBWSxFQUFFLENBQUM7aUJBQ2hCLENBQUMsQ0FDSDthQUNGLENBQUM7U0FDSCxDQUFDO0tBQ0g7MkZBRVUsaUJBQWlCO2tCQXBDN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTs0QkFDM0IsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN0Qjs2QkFDRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixLQUFLLENBQUM7b0NBQ0osT0FBTyxFQUFFLENBQUM7b0NBQ1YsTUFBTSxFQUFFLENBQUM7b0NBQ1QsVUFBVSxFQUFFLENBQUM7b0NBQ2IsYUFBYSxFQUFFLENBQUM7b0NBQ2hCLFlBQVksRUFBRSxDQUFDO2lDQUNoQixDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGO2lHQUUyQixRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBY1gsTUFBTTtzQkFBZCxLQUFLO2dCQUlJLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuY2xhc3MgR2RhVG9hc3RDb25maWcge1xuICBwdWJsaWMgZGlyZWN0aW9uOiAndG9wLXJpZ2h0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tbGVmdCc7XG4gIHB1YmxpYyBjbGFzc1RvYXN0Pzogc3RyaW5nO1xuICBwdWJsaWMgc3R5bGVUb2FzdD86IHt9O1xuICBwdWJsaWMgdGltaW5nPzogbnVtYmVyIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRpcmVjdGlvbjogJ3RvcC1yaWdodCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWxlZnQnID0gJ3RvcC1yaWdodCcsXG4gICAgY2xhc3NUb2FzdDogc3RyaW5nID0gJycsXG4gICAgc3R5bGVUb2FzdDoge30gPSB7fSxcbiAgICB0aW1pbmc6IG51bWJlciB8ICdpbmRldGVybWluYXRlJyA9IDMwMDBcbiAgKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgdGhpcy5jbGFzc1RvYXN0ID0gY2xhc3NUb2FzdDtcbiAgICB0aGlzLnN0eWxlVG9hc3QgPSBzdHlsZVRvYXN0O1xuICAgIHRoaXMudGltaW5nID0gdGltaW5nO1xuICB9XG59XG5cbmNsYXNzIEdkYVRvYXN0Q29uZmlnRm9yQ29tcG9uZW50IGV4dGVuZHMgR2RhVG9hc3RDb25maWcge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nID0gJycpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaWQgPSBpZFxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dkYS10b2FzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBcbiAgICAgICpuZ0Zvcj1cImxldCB0b2FzdCBvZiB0b2FzdHNcIiBcbiAgICAgIGNsYXNzPVwiZ2RhLXRvYXN0LWl0ZW1cIiBcbiAgICAgIFtuZ0NsYXNzXT1cInRvYXN0LmNvbmZpZy5jbGFzc1RvYXN0IHx8ICcnXCIgXG4gICAgICBbbmdTdHlsZV09XCJ0b2FzdC5jb25maWcuc3R5bGVUb2FzdCB8fCB7fVwiIFxuICAgICAgQGdkYVRvYXN0QW5pbWF0aW9uIFxuICAgICAgKGNsaWNrKT1cImNsb3NlKHRvYXN0KVwiPlxuICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cInRvYXN0LnRleHRcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2dkYVRvYXN0QW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuNHMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSB9KVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjRzIGVhc2UtaW4tb3V0JyxcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IDAsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgZ2V0IGFkZENsYXNzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZ2RhLXRvYXN0JzogdHJ1ZSxcbiAgICAgICdnZGEtdG9hc3QtdG9wLWxlZnQnOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAndG9wLWxlZnQnLFxuICAgICAgJ2dkYS10b2FzdC10b3AtY2VudGVyJzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ3RvcC1jZW50ZXInLFxuICAgICAgJ2dkYS10b2FzdC10b3AtcmlnaHQnOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAndG9wLXJpZ2h0JyxcbiAgICAgICdnZGEtdG9hc3QtYm90dG9tLWxlZnQnOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAnYm90dG9tLWxlZnQnLFxuICAgICAgJ2dkYS10b2FzdC1ib3R0b20tY2VudGVyJzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ2JvdHRvbS1jZW50ZXInLFxuICAgICAgJ2dkYS10b2FzdC1ib3R0b20tcmlnaHQnOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAnYm90dG9tLXJpZ2h0J1xuICAgIH07XG4gIH07XG4gIC8qKlxuICAgKiBUb2FzdHNcbiAgICovXG4gIEBJbnB1dCgpIHRvYXN0czogeyB0ZXh0OiBzdHJpbmcsIGNvbmZpZzogR2RhVG9hc3RDb25maWdGb3JDb21wb25lbnQgfVtdO1xuICAvKipcbiAgICogQ2xvc2UgZXZlbnRcbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZVRvYXN0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcbiAgLyoqXG4gICAqIERpcmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBkaXJlY3Rpb25Ub2FzdDogJ3RvcC1yaWdodCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWxlZnQnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy50b2FzdHMgPSBbXTtcbiAgICB0aGlzLmNsb3NlVG9hc3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5kaXJlY3Rpb25Ub2FzdCA9ICd0b3AtcmlnaHQnO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25Ub2FzdCA9IHRoaXMudG9hc3RzWzBdLmNvbmZpZy5kaXJlY3Rpb24gfHwgJ3RvcC1yaWdodCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xvc2UodG9hc3Q6IHsgdGV4dDogc3RyaW5nLCBjb25maWc6IEdkYVRvYXN0Q29uZmlnRm9yQ29tcG9uZW50IH0pOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlVG9hc3QuZW1pdCh0b2FzdC5jb25maWcuaWQpO1xuICB9XG5cbn1cbiJdfQ==
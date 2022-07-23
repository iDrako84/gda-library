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
GdaToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaToastComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.0", type: GdaToastComponent, selector: "gda-toast", inputs: { toasts: "toasts" }, outputs: { closeToast: "closeToast" }, host: { properties: { "class": "this.addClass" } }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaToastComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtdG9hc3Qvc3JjL2dkYS10b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFFMUUsTUFBTSxjQUFjO0lBTWxCLFlBQ0UsWUFBd0csV0FBVyxFQUNuSCxhQUFxQixFQUFFLEVBQ3ZCLGFBQWlCLEVBQUUsRUFDbkIsU0FBbUMsSUFBSTtRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLDBCQUEyQixTQUFRLGNBQWM7SUFHckQsWUFBWSxLQUFhLEVBQUU7UUFDekIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNkLENBQUM7Q0FDRjtBQXNDRCxNQUFNLE9BQU8saUJBQWlCO0lBeUI1QixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBNUJELElBQTBCLFFBQVE7UUFDaEMsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVTtZQUN4RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLFlBQVk7WUFDNUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXO1lBQzFELHVCQUF1QixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssYUFBYTtZQUM5RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLGVBQWU7WUFDbEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxjQUFjO1NBQ2pFLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQW9CRixRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyxLQUFLLENBQUMsS0FBMkQ7UUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs4R0FyQ1UsaUJBQWlCO2tHQUFqQixpQkFBaUIsMEtBbENsQjs7Ozs7Ozs7OztHQVVULDhWQUNXO1FBQ1YsT0FBTyxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDdEI7YUFDRixDQUFDO1lBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQztvQkFDSixPQUFPLEVBQUUsQ0FBQztvQkFDVixNQUFNLEVBQUUsQ0FBQztvQkFDVCxVQUFVLEVBQUUsQ0FBQztvQkFDYixhQUFhLEVBQUUsQ0FBQztvQkFDaEIsWUFBWSxFQUFFLENBQUM7aUJBQ2hCLENBQUMsQ0FDSDthQUNGLENBQUM7U0FDSCxDQUFDO0tBQ0g7MkZBRVUsaUJBQWlCO2tCQXBDN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTs0QkFDM0IsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN0Qjs2QkFDRixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ25CLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLGtCQUFrQixFQUN4QixLQUFLLENBQUM7b0NBQ0osT0FBTyxFQUFFLENBQUM7b0NBQ1YsTUFBTSxFQUFFLENBQUM7b0NBQ1QsVUFBVSxFQUFFLENBQUM7b0NBQ2IsYUFBYSxFQUFFLENBQUM7b0NBQ2hCLFlBQVksRUFBRSxDQUFDO2lDQUNoQixDQUFDLENBQ0g7NkJBQ0YsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGO2lHQUUyQixRQUFRO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU87Z0JBY1gsTUFBTTtzQkFBZCxLQUFLO2dCQUlJLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuY2xhc3MgR2RhVG9hc3RDb25maWcge1xyXG4gIHB1YmxpYyBkaXJlY3Rpb246ICd0b3AtcmlnaHQnIHwgJ3RvcC1jZW50ZXInIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1jZW50ZXInIHwgJ2JvdHRvbS1sZWZ0JztcclxuICBwdWJsaWMgY2xhc3NUb2FzdD86IHN0cmluZztcclxuICBwdWJsaWMgc3R5bGVUb2FzdD86IHt9O1xyXG4gIHB1YmxpYyB0aW1pbmc/OiBudW1iZXIgfCAnaW5kZXRlcm1pbmF0ZSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZGlyZWN0aW9uOiAndG9wLXJpZ2h0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tbGVmdCcgPSAndG9wLXJpZ2h0JyxcclxuICAgIGNsYXNzVG9hc3Q6IHN0cmluZyA9ICcnLFxyXG4gICAgc3R5bGVUb2FzdDoge30gPSB7fSxcclxuICAgIHRpbWluZzogbnVtYmVyIHwgJ2luZGV0ZXJtaW5hdGUnID0gMzAwMFxyXG4gICkge1xyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICB0aGlzLmNsYXNzVG9hc3QgPSBjbGFzc1RvYXN0O1xyXG4gICAgdGhpcy5zdHlsZVRvYXN0ID0gc3R5bGVUb2FzdDtcclxuICAgIHRoaXMudGltaW5nID0gdGltaW5nO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2RhVG9hc3RDb25maWdGb3JDb21wb25lbnQgZXh0ZW5kcyBHZGFUb2FzdENvbmZpZyB7XHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcgPSAnJykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuaWQgPSBpZFxyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnZGEtdG9hc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFxyXG4gICAgICAqbmdGb3I9XCJsZXQgdG9hc3Qgb2YgdG9hc3RzXCIgXHJcbiAgICAgIGNsYXNzPVwiZ2RhLXRvYXN0LWl0ZW1cIiBcclxuICAgICAgW25nQ2xhc3NdPVwidG9hc3QuY29uZmlnLmNsYXNzVG9hc3QgfHwgJydcIiBcclxuICAgICAgW25nU3R5bGVdPVwidG9hc3QuY29uZmlnLnN0eWxlVG9hc3QgfHwge31cIiBcclxuICAgICAgQGdkYVRvYXN0QW5pbWF0aW9uIFxyXG4gICAgICAoY2xpY2spPVwiY2xvc2UodG9hc3QpXCI+XHJcbiAgICAgIDxkaXYgW2lubmVySFRNTF09XCJ0b2FzdC50ZXh0XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2dkYVRvYXN0QW5pbWF0aW9uJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzAuNHMgZWFzZS1pbi1vdXQnLFxyXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSB9KSxcclxuICAgICAgICBhbmltYXRlKCcwLjRzIGVhc2UtaW4tb3V0JyxcclxuICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAwLFxyXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZGFUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGdldCBhZGRDbGFzcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICdnZGEtdG9hc3QnOiB0cnVlLFxyXG4gICAgICAnZ2RhLXRvYXN0LXRvcC1sZWZ0JzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ3RvcC1sZWZ0JyxcclxuICAgICAgJ2dkYS10b2FzdC10b3AtY2VudGVyJzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ3RvcC1jZW50ZXInLFxyXG4gICAgICAnZ2RhLXRvYXN0LXRvcC1yaWdodCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICd0b3AtcmlnaHQnLFxyXG4gICAgICAnZ2RhLXRvYXN0LWJvdHRvbS1sZWZ0JzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ2JvdHRvbS1sZWZ0JyxcclxuICAgICAgJ2dkYS10b2FzdC1ib3R0b20tY2VudGVyJzogdGhpcy5kaXJlY3Rpb25Ub2FzdCA9PT0gJ2JvdHRvbS1jZW50ZXInLFxyXG4gICAgICAnZ2RhLXRvYXN0LWJvdHRvbS1yaWdodCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICdib3R0b20tcmlnaHQnXHJcbiAgICB9O1xyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogVG9hc3RzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9hc3RzOiB7IHRleHQ6IHN0cmluZywgY29uZmlnOiBHZGFUb2FzdENvbmZpZ0ZvckNvbXBvbmVudCB9W107XHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgZXZlbnRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xvc2VUb2FzdDogRXZlbnRFbWl0dGVyPHN0cmluZz47XHJcbiAgLyoqXHJcbiAgICogRGlyZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkaXJlY3Rpb25Ub2FzdDogJ3RvcC1yaWdodCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWxlZnQnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy50b2FzdHMgPSBbXTtcclxuICAgIHRoaXMuY2xvc2VUb2FzdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuZGlyZWN0aW9uVG9hc3QgPSAndG9wLXJpZ2h0JztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXJlY3Rpb25Ub2FzdCA9IHRoaXMudG9hc3RzWzBdLmNvbmZpZy5kaXJlY3Rpb24gfHwgJ3RvcC1yaWdodCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2xvc2UodG9hc3Q6IHsgdGV4dDogc3RyaW5nLCBjb25maWc6IEdkYVRvYXN0Q29uZmlnRm9yQ29tcG9uZW50IH0pOiB2b2lkIHtcclxuICAgIHRoaXMuY2xvc2VUb2FzdC5lbWl0KHRvYXN0LmNvbmZpZy5pZCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
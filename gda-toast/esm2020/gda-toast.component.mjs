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
GdaToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaToastComponent, selector: "gda-toast", inputs: { toasts: "toasts" }, outputs: { closeToast: "closeToast" }, host: { properties: { "class": "this.addClass" } }, ngImport: i0, template: `
    <div 
      *ngFor="let toast of toasts" 
      class="gda-toast-item" 
      [ngClass]="toast.config.classToast || ''" 
      [ngStyle]="toast.config.styleToast || {}" 
      @gdaToastAnimation 
      (click)="close(toast)">
      <div [innerHTML]="toast.text"></div>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaToastComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2dkYS10b2FzdC9zcmMvZ2RhLXRvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUUxRSxNQUFNLGNBQWM7SUFNbEIsWUFDRSxZQUF3RyxXQUFXLEVBQ25ILGFBQXFCLEVBQUUsRUFDdkIsYUFBaUIsRUFBRSxFQUNuQixTQUFtQyxJQUFJO1FBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUVELE1BQU0sMEJBQTJCLFNBQVEsY0FBYztJQUdyRCxZQUFZLEtBQWEsRUFBRTtRQUN6QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2QsQ0FBQztDQUNGO0FBc0NELE1BQU0sT0FBTyxpQkFBaUI7SUF5QjVCLFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO0lBQ3BDLENBQUM7SUE1QkQsSUFBMEIsUUFBUTtRQUNoQyxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUk7WUFDakIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxVQUFVO1lBQ3hELHNCQUFzQixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssWUFBWTtZQUM1RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLFdBQVc7WUFDMUQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLGNBQWMsS0FBSyxhQUFhO1lBQzlELHlCQUF5QixFQUFFLElBQUksQ0FBQyxjQUFjLEtBQUssZUFBZTtZQUNsRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLGNBQWM7U0FDakUsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBb0JGLFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUM7SUFDdkUsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUEyRDtRQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OzhHQXJDVSxpQkFBaUI7a0dBQWpCLGlCQUFpQiwwS0FsQ2xCOzs7Ozs7Ozs7O0dBVVQsbVNBQ1c7UUFDVixPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUN0QjthQUNGLENBQUM7WUFDRixVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNuQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsS0FBSyxDQUFDO29CQUNKLE9BQU8sRUFBRSxDQUFDO29CQUNWLE1BQU0sRUFBRSxDQUFDO29CQUNULFVBQVUsRUFBRSxDQUFDO29CQUNiLGFBQWEsRUFBRSxDQUFDO29CQUNoQixZQUFZLEVBQUUsQ0FBQztpQkFDaEIsQ0FBQyxDQUNIO2FBQ0YsQ0FBQztTQUNILENBQUM7S0FDSDsyRkFFVSxpQkFBaUI7a0JBcEM3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLG1CQUFtQixFQUFFOzRCQUMzQixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JCLE9BQU8sQ0FBQyxrQkFBa0IsRUFDeEIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ3RCOzZCQUNGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsa0JBQWtCLEVBQ3hCLEtBQUssQ0FBQztvQ0FDSixPQUFPLEVBQUUsQ0FBQztvQ0FDVixNQUFNLEVBQUUsQ0FBQztvQ0FDVCxVQUFVLEVBQUUsQ0FBQztvQ0FDYixhQUFhLEVBQUUsQ0FBQztvQ0FDaEIsWUFBWSxFQUFFLENBQUM7aUNBQ2hCLENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7aUdBRTJCLFFBQVE7c0JBQWpDLFdBQVc7dUJBQUMsT0FBTztnQkFjWCxNQUFNO3NCQUFkLEtBQUs7Z0JBSUksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5jbGFzcyBHZGFUb2FzdENvbmZpZyB7XG4gIHB1YmxpYyBkaXJlY3Rpb246ICd0b3AtcmlnaHQnIHwgJ3RvcC1jZW50ZXInIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1jZW50ZXInIHwgJ2JvdHRvbS1sZWZ0JztcbiAgcHVibGljIGNsYXNzVG9hc3Q/OiBzdHJpbmc7XG4gIHB1YmxpYyBzdHlsZVRvYXN0Pzoge307XG4gIHB1YmxpYyB0aW1pbmc/OiBudW1iZXIgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZGlyZWN0aW9uOiAndG9wLXJpZ2h0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tbGVmdCcgPSAndG9wLXJpZ2h0JyxcbiAgICBjbGFzc1RvYXN0OiBzdHJpbmcgPSAnJyxcbiAgICBzdHlsZVRvYXN0OiB7fSA9IHt9LFxuICAgIHRpbWluZzogbnVtYmVyIHwgJ2luZGV0ZXJtaW5hdGUnID0gMzAwMFxuICApIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmNsYXNzVG9hc3QgPSBjbGFzc1RvYXN0O1xuICAgIHRoaXMuc3R5bGVUb2FzdCA9IHN0eWxlVG9hc3Q7XG4gICAgdGhpcy50aW1pbmcgPSB0aW1pbmc7XG4gIH1cbn1cblxuY2xhc3MgR2RhVG9hc3RDb25maWdGb3JDb21wb25lbnQgZXh0ZW5kcyBHZGFUb2FzdENvbmZpZyB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcgPSAnJykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pZCA9IGlkXG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLXRvYXN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFxuICAgICAgKm5nRm9yPVwibGV0IHRvYXN0IG9mIHRvYXN0c1wiIFxuICAgICAgY2xhc3M9XCJnZGEtdG9hc3QtaXRlbVwiIFxuICAgICAgW25nQ2xhc3NdPVwidG9hc3QuY29uZmlnLmNsYXNzVG9hc3QgfHwgJydcIiBcbiAgICAgIFtuZ1N0eWxlXT1cInRvYXN0LmNvbmZpZy5zdHlsZVRvYXN0IHx8IHt9XCIgXG4gICAgICBAZ2RhVG9hc3RBbmltYXRpb24gXG4gICAgICAoY2xpY2spPVwiY2xvc2UodG9hc3QpXCI+XG4gICAgICA8ZGl2IFtpbm5lckhUTUxdPVwidG9hc3QudGV4dFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZ2RhVG9hc3RBbmltYXRpb24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMC40cyBlYXNlLWluLW91dCcsXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuNHMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogMFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZGFUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgYWRkQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdnZGEtdG9hc3QnOiB0cnVlLFxuICAgICAgJ2dkYS10b2FzdC10b3AtbGVmdCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICd0b3AtbGVmdCcsXG4gICAgICAnZ2RhLXRvYXN0LXRvcC1jZW50ZXInOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAndG9wLWNlbnRlcicsXG4gICAgICAnZ2RhLXRvYXN0LXRvcC1yaWdodCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICd0b3AtcmlnaHQnLFxuICAgICAgJ2dkYS10b2FzdC1ib3R0b20tbGVmdCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICdib3R0b20tbGVmdCcsXG4gICAgICAnZ2RhLXRvYXN0LWJvdHRvbS1jZW50ZXInOiB0aGlzLmRpcmVjdGlvblRvYXN0ID09PSAnYm90dG9tLWNlbnRlcicsXG4gICAgICAnZ2RhLXRvYXN0LWJvdHRvbS1yaWdodCc6IHRoaXMuZGlyZWN0aW9uVG9hc3QgPT09ICdib3R0b20tcmlnaHQnXG4gICAgfTtcbiAgfTtcbiAgLyoqXG4gICAqIFRvYXN0c1xuICAgKi9cbiAgQElucHV0KCkgdG9hc3RzOiB7IHRleHQ6IHN0cmluZywgY29uZmlnOiBHZGFUb2FzdENvbmZpZ0ZvckNvbXBvbmVudCB9W107XG4gIC8qKlxuICAgKiBDbG9zZSBldmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGNsb3NlVG9hc3Q6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuICAvKipcbiAgICogRGlyZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIGRpcmVjdGlvblRvYXN0OiAndG9wLXJpZ2h0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tbGVmdCc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnRvYXN0cyA9IFtdO1xuICAgIHRoaXMuY2xvc2VUb2FzdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmRpcmVjdGlvblRvYXN0ID0gJ3RvcC1yaWdodCc7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvblRvYXN0ID0gdGhpcy50b2FzdHNbMF0uY29uZmlnLmRpcmVjdGlvbiB8fCAndG9wLXJpZ2h0JztcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSh0b2FzdDogeyB0ZXh0OiBzdHJpbmcsIGNvbmZpZzogR2RhVG9hc3RDb25maWdGb3JDb21wb25lbnQgfSk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VUb2FzdC5lbWl0KHRvYXN0LmNvbmZpZy5pZCk7XG4gIH1cblxufVxuIl19
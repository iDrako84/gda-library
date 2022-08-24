import { Injectable } from '@angular/core';
import { GdaToastComponent } from './gda-toast.component';
/* RXJS */
import { of, delay } from 'rxjs';
import * as i0 from "@angular/core";
export class GdaToastConfig {
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
export class GdaToast {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.toastConfigDefault = new GdaToastConfig();
    }
    selectedComponentRef(direction = 'top-right') {
        switch (direction) {
            case 'top-center':
                return 'componentRefTopCenter';
            case 'top-left':
                return 'componentRefTopLeft';
            case 'bottom-right':
                return 'componentRefBottomRight';
            case 'bottom-center':
                return 'componentRefBottomCenter';
            case 'bottom-left':
                return 'componentRefBottomLeft';
            case 'top-right':
            default:
                return 'componentRefTopRight';
        }
    }
    openToast(text, config) {
        if (!document.body.querySelector('.gda-toast-' + (config?.direction || this.toastConfigDefault.direction))) {
            this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))] = this.componentFactoryResolver
                .resolveComponentFactory(GdaToastComponent)
                .create(this.injector);
            this.appRef.attachView(this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].hostView);
            const domElem = this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].hostView
                .rootNodes[0];
            document.body.appendChild(domElem);
            this.createToast(text, config);
        }
        else {
            this.createToast(text, config);
        }
    }
    createToast(text, config) {
        const c = {
            id: 'gda-toast-' + (new Date().getTime()),
            direction: config?.direction || this.toastConfigDefault.direction,
            classToast: config?.classToast || this.toastConfigDefault.classToast,
            styleToast: config?.styleToast || this.toastConfigDefault.styleToast,
            timing: config?.timing || this.toastConfigDefault.timing,
        };
        this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts.push({ text: text, config: c });
        if (c.timing !== 'indeterminate') {
            of(true).pipe(delay(c.timing || 0)).subscribe(() => {
                this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts = this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts.filter((toast) => toast.config.id !== c.id);
                of(true).pipe(delay(500)).subscribe(() => {
                    if (!this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts.length) {
                        this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.closeToast.unsubscribe();
                        this.appRef.detachView(this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].hostView);
                        this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].destroy();
                    }
                });
            });
        }
        else {
            this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.closeToast.subscribe((id) => {
                this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts = this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts.filter((toast) => toast.config.id !== id);
                of(true).pipe(delay(500)).subscribe(() => {
                    if (!this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.toasts.length) {
                        this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].instance.closeToast.unsubscribe();
                        this.appRef.detachView(this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].hostView);
                        this[this.selectedComponentRef((config?.direction || this.toastConfigDefault.direction))].destroy();
                    }
                });
            });
        }
    }
}
GdaToast.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaToast, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
GdaToast.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaToast, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaToast, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvYXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLXRvYXN0L3NyYy9nZGEtdG9hc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTZELFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxVQUFVO0FBQ1YsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRWpDLE1BQU0sT0FBTyxjQUFjO0lBTXpCLFlBQ0UsWUFBd0csV0FBVyxFQUNuSCxhQUFxQixFQUFFLEVBQ3ZCLGFBQWlCLEVBQUUsRUFDbkIsU0FBbUMsSUFBSTtRQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLDBCQUEyQixTQUFRLGNBQWM7SUFHckQsWUFBWSxLQUFhLEVBQUU7UUFDekIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUNkLENBQUM7Q0FDRjtBQUtELE1BQU0sT0FBTyxRQUFRO0lBZW5CLFlBQ1Usd0JBQWtELEVBQ2xELE1BQXNCLEVBQ3RCLFFBQWtCO1FBRmxCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUUxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU8sb0JB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LE1BQU0sRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDckgsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUM1SCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMzSCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNyRztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztxR0E1RlUsUUFBUTt5R0FBUixRQUFRLGNBRlAsTUFBTTsyRkFFUCxRQUFRO2tCQUhwQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdkYVRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi9nZGEtdG9hc3QuY29tcG9uZW50Jztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IG9mLCBkZWxheSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgR2RhVG9hc3RDb25maWcge1xuICBwdWJsaWMgZGlyZWN0aW9uOiAndG9wLXJpZ2h0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tbGVmdCc7XG4gIHB1YmxpYyBjbGFzc1RvYXN0Pzogc3RyaW5nO1xuICBwdWJsaWMgc3R5bGVUb2FzdD86IHt9O1xuICBwdWJsaWMgdGltaW5nPzogbnVtYmVyIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRpcmVjdGlvbjogJ3RvcC1yaWdodCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWxlZnQnID0gJ3RvcC1yaWdodCcsXG4gICAgY2xhc3NUb2FzdDogc3RyaW5nID0gJycsXG4gICAgc3R5bGVUb2FzdDoge30gPSB7fSxcbiAgICB0aW1pbmc6IG51bWJlciB8ICdpbmRldGVybWluYXRlJyA9IDMwMDBcbiAgKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgdGhpcy5jbGFzc1RvYXN0ID0gY2xhc3NUb2FzdDtcbiAgICB0aGlzLnN0eWxlVG9hc3QgPSBzdHlsZVRvYXN0O1xuICAgIHRoaXMudGltaW5nID0gdGltaW5nO1xuICB9XG59XG5cbmNsYXNzIEdkYVRvYXN0Q29uZmlnRm9yQ29tcG9uZW50IGV4dGVuZHMgR2RhVG9hc3RDb25maWcge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nID0gJycpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaWQgPSBpZFxuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRvYXN0IHtcbiAgLyoqXG4gICAqIENvbmZpZyBkZWZhdWx0XG4gICAqL1xuICBwdWJsaWMgdG9hc3RDb25maWdEZWZhdWx0OiBHZGFUb2FzdENvbmZpZztcbiAgLyoqXG4gICAqIENvbXBvbmVudCBSRUZzXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudFJlZlRvcFJpZ2h0OiBhbnk7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmVG9wQ2VudGVyOiBhbnk7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmVG9wTGVmdDogYW55O1xuICBwcml2YXRlIGNvbXBvbmVudFJlZkJvdHRvbVJpZ2h0OiBhbnk7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmQm90dG9tQ2VudGVyOiBhbnk7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmQm90dG9tTGVmdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge1xuICAgIHRoaXMudG9hc3RDb25maWdEZWZhdWx0ID0gbmV3IEdkYVRvYXN0Q29uZmlnKCk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdGVkQ29tcG9uZW50UmVmKGRpcmVjdGlvbjogJ3RvcC1yaWdodCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWxlZnQnID0gJ3RvcC1yaWdodCcpIHtcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAndG9wLWNlbnRlcic6XG4gICAgICAgIHJldHVybiAnY29tcG9uZW50UmVmVG9wQ2VudGVyJztcbiAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgcmV0dXJuICdjb21wb25lbnRSZWZUb3BMZWZ0JztcbiAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgIHJldHVybiAnY29tcG9uZW50UmVmQm90dG9tUmlnaHQnO1xuICAgICAgY2FzZSAnYm90dG9tLWNlbnRlcic6XG4gICAgICAgIHJldHVybiAnY29tcG9uZW50UmVmQm90dG9tQ2VudGVyJztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgcmV0dXJuICdjb21wb25lbnRSZWZCb3R0b21MZWZ0JztcbiAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2NvbXBvbmVudFJlZlRvcFJpZ2h0JztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3BlblRvYXN0KHRleHQ6IHN0cmluZywgY29uZmlnPzogR2RhVG9hc3RDb25maWcpOiB2b2lkIHtcbiAgICBpZiAoIWRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignLmdkYS10b2FzdC0nICsgKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpKSB7XG4gICAgICB0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShHZGFUb2FzdENvbXBvbmVudClcbiAgICAgICAgLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXS5ob3N0Vmlldyk7XG5cbiAgICAgIGNvbnN0IGRvbUVsZW0gPSAodGhpc1t0aGlzLnNlbGVjdGVkQ29tcG9uZW50UmVmKChjb25maWc/LmRpcmVjdGlvbiB8fCB0aGlzLnRvYXN0Q29uZmlnRGVmYXVsdC5kaXJlY3Rpb24pKV0uaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG5cbiAgICAgIHRoaXMuY3JlYXRlVG9hc3QodGV4dCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVUb2FzdCh0ZXh0LCBjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVG9hc3QodGV4dDogc3RyaW5nLCBjb25maWc/OiBHZGFUb2FzdENvbmZpZyk6IHZvaWQge1xuICAgIGNvbnN0IGM6IEdkYVRvYXN0Q29uZmlnRm9yQ29tcG9uZW50ID0ge1xuICAgICAgaWQ6ICdnZGEtdG9hc3QtJyArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSksXG4gICAgICBkaXJlY3Rpb246IGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbixcbiAgICAgIGNsYXNzVG9hc3Q6IGNvbmZpZz8uY2xhc3NUb2FzdCB8fCB0aGlzLnRvYXN0Q29uZmlnRGVmYXVsdC5jbGFzc1RvYXN0LFxuICAgICAgc3R5bGVUb2FzdDogY29uZmlnPy5zdHlsZVRvYXN0IHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LnN0eWxlVG9hc3QsXG4gICAgICB0aW1pbmc6IGNvbmZpZz8udGltaW5nIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LnRpbWluZyxcbiAgICB9XG4gICAgdGhpc1t0aGlzLnNlbGVjdGVkQ29tcG9uZW50UmVmKChjb25maWc/LmRpcmVjdGlvbiB8fCB0aGlzLnRvYXN0Q29uZmlnRGVmYXVsdC5kaXJlY3Rpb24pKV0uaW5zdGFuY2UudG9hc3RzLnB1c2goeyB0ZXh0OiB0ZXh0LCBjb25maWc6IGMgfSk7XG4gICAgaWYgKGMudGltaW5nICE9PSAnaW5kZXRlcm1pbmF0ZScpIHtcbiAgICAgIG9mKHRydWUpLnBpcGUoZGVsYXkoYy50aW1pbmcgfHwgMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmluc3RhbmNlLnRvYXN0cyA9IHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmluc3RhbmNlLnRvYXN0cy5maWx0ZXIoKHRvYXN0OiB7IHRleHQ6IHN0cmluZywgY29uZmlnOiBHZGFUb2FzdENvbmZpZ0ZvckNvbXBvbmVudCB9KSA9PiB0b2FzdC5jb25maWcuaWQgIT09IGMuaWQpO1xuICAgICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDUwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXS5pbnN0YW5jZS50b2FzdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXS5pbnN0YW5jZS5jbG9zZVRvYXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmhvc3RWaWV3KTtcbiAgICAgICAgICAgIHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmluc3RhbmNlLmNsb3NlVG9hc3Quc3Vic2NyaWJlKChpZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmluc3RhbmNlLnRvYXN0cyA9IHRoaXNbdGhpcy5zZWxlY3RlZENvbXBvbmVudFJlZigoY29uZmlnPy5kaXJlY3Rpb24gfHwgdGhpcy50b2FzdENvbmZpZ0RlZmF1bHQuZGlyZWN0aW9uKSldLmluc3RhbmNlLnRvYXN0cy5maWx0ZXIoKHRvYXN0OiB7IHRleHQ6IHN0cmluZywgY29uZmlnOiBHZGFUb2FzdENvbmZpZ0ZvckNvbXBvbmVudCB9KSA9PiB0b2FzdC5jb25maWcuaWQgIT09IGlkKTtcbiAgICAgICAgb2YodHJ1ZSkucGlwZShkZWxheSg1MDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpc1t0aGlzLnNlbGVjdGVkQ29tcG9uZW50UmVmKChjb25maWc/LmRpcmVjdGlvbiB8fCB0aGlzLnRvYXN0Q29uZmlnRGVmYXVsdC5kaXJlY3Rpb24pKV0uaW5zdGFuY2UudG9hc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpc1t0aGlzLnNlbGVjdGVkQ29tcG9uZW50UmVmKChjb25maWc/LmRpcmVjdGlvbiB8fCB0aGlzLnRvYXN0Q29uZmlnRGVmYXVsdC5kaXJlY3Rpb24pKV0uaW5zdGFuY2UuY2xvc2VUb2FzdC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXS5ob3N0Vmlldyk7XG4gICAgICAgICAgICB0aGlzW3RoaXMuc2VsZWN0ZWRDb21wb25lbnRSZWYoKGNvbmZpZz8uZGlyZWN0aW9uIHx8IHRoaXMudG9hc3RDb25maWdEZWZhdWx0LmRpcmVjdGlvbikpXS5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19
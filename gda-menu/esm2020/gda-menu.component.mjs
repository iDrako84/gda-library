import { Component, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaMenu {
    constructor(el) {
        this.el = el;
        /**
         * Display
         */
        this.setStyle = 'none';
    }
}
GdaMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenu, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenu, selector: "gda-menu, .gda-menu, [gda-menu]", host: { properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-menu, .gda-menu, [gda-menu]',
                    template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { setStyle: [{
                type: HostBinding,
                args: ['style.display']
            }], contentTemplate: [{
                type: ViewChild,
                args: ['content', { read: TemplateRef, static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1tZW51L3NyYy9nZGEtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQzs7QUFVdkIsTUFBTSxPQUFPLE9BQU87SUFRbEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFQakM7O1dBRUc7UUFDbUMsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQUluQixDQUFDOztvR0FSM0IsT0FBTzt3RkFBUCxPQUFPLDBOQU1ZLFdBQVcsNkJBWi9COzs7O0dBSVQ7MkZBRVUsT0FBTztrQkFSbkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxRQUFRLEVBQUU7Ozs7R0FJVDtpQkFDRjtpR0FLdUMsUUFBUTtzQkFBN0MsV0FBVzt1QkFBQyxlQUFlO2dCQUV1QyxlQUFlO3NCQUFqRixTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dkYS1tZW51LCAuZ2RhLW1lbnUsIFtnZGEtbWVudV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdkYU1lbnUge1xuICAvKipcbiAgICogRGlzcGxheVxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JykgcHJpdmF0ZSBzZXRTdHlsZSA9ICdub25lJztcblxuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGVudFRlbXBsYXRlITogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHsgfVxufVxuIl19
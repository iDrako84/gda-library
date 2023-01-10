import { Component, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaMenuComponent {
    constructor(el) {
        this.el = el;
        /**
         * Display
         */
        this.setStyle = 'none';
    }
}
GdaMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
GdaMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: GdaMenuComponent, selector: "gda-menu", host: { properties: { "style.display": "this.setStyle" } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["content"], descendants: true, read: TemplateRef }], ngImport: i0, template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-menu',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS1tZW51L3NyYy9nZGEtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQzs7QUFVdkIsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVBqQzs7V0FFRztRQUNtQyxhQUFRLEdBQUcsTUFBTSxDQUFDO0lBSW5CLENBQUM7OzZHQVIzQixnQkFBZ0I7aUdBQWhCLGdCQUFnQixtTUFNRyxXQUFXLDZCQVovQjs7OztHQUlUOzJGQUVVLGdCQUFnQjtrQkFSNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFOzs7O0dBSVQ7aUJBQ0Y7aUdBS3VDLFFBQVE7c0JBQTdDLFdBQVc7dUJBQUMsZUFBZTtnQkFFdUMsZUFBZTtzQkFBakYsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnZGEtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2RhTWVudUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBEaXNwbGF5XG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBwcml2YXRlIHNldFN0eWxlID0gJ25vbmUnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBjb250ZW50VGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG59XG4iXX0=
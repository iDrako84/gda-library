import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaStyleTooltip {
    constructor(backgroundColor = '#999', color = '#fff', padding = '4px 12px', fontSize = '.8rem', borderRadius = '5px', zIndex = '10000') {
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.padding = padding;
        this.fontSize = fontSize;
        this.borderRadius = borderRadius;
        this.zIndex = zIndex;
    }
}
export class GdaTooltipService {
    constructor() {
        this.styleTooltip = new GdaStyleTooltip();
    }
}
GdaTooltipService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTooltipService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTooltipService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTooltipService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaTooltipService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtdG9vbHRpcC9zcmMvZ2RhLXRvb2x0aXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLE9BQU8sZUFBZTtJQVExQixZQUNFLGtCQUEwQixNQUFNLEVBQ2hDLFFBQWdCLE1BQU0sRUFDdEIsVUFBa0IsVUFBVSxFQUM1QixXQUFtQixPQUFPLEVBQzFCLGVBQXVCLEtBQUssRUFDNUIsU0FBaUIsT0FBTztRQUV4QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFLRCxNQUFNLE9BQU8saUJBQWlCO0lBTTVCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7OzhHQVJVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHZGFTdHlsZVRvb2x0aXAge1xyXG4gIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgY29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgcGFkZGluZzogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb250U2l6ZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBib3JkZXJSYWRpdXM6IHN0cmluZztcclxuICBwdWJsaWMgekluZGV4OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSAnIzk5OScsXHJcbiAgICBjb2xvcjogc3RyaW5nID0gJyNmZmYnLFxyXG4gICAgcGFkZGluZzogc3RyaW5nID0gJzRweCAxMnB4JyxcclxuICAgIGZvbnRTaXplOiBzdHJpbmcgPSAnLjhyZW0nLFxyXG4gICAgYm9yZGVyUmFkaXVzOiBzdHJpbmcgPSAnNXB4JyxcclxuICAgIHpJbmRleDogc3RyaW5nID0gJzEwMDAwJ1xyXG4gICkge1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnBhZGRpbmcgPSBwYWRkaW5nO1xyXG4gICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgdGhpcy5ib3JkZXJSYWRpdXMgPSBib3JkZXJSYWRpdXM7XHJcbiAgICB0aGlzLnpJbmRleCA9IHpJbmRleDtcclxuICB9XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEdkYVRvb2x0aXBTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBTdHlsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdHlsZVRvb2x0aXA6IEdkYVN0eWxlVG9vbHRpcDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnN0eWxlVG9vbHRpcCA9IG5ldyBHZGFTdHlsZVRvb2x0aXAoKTtcclxuICB9XHJcbn1cclxuIl19
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
GdaTooltipService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTooltipService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtdG9vbHRpcC9zcmMvZ2RhLXRvb2x0aXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLE9BQU8sZUFBZTtJQVExQixZQUNFLGtCQUEwQixNQUFNLEVBQ2hDLFFBQWdCLE1BQU0sRUFDdEIsVUFBa0IsVUFBVSxFQUM1QixXQUFtQixPQUFPLEVBQzFCLGVBQXVCLEtBQUssRUFDNUIsU0FBaUIsT0FBTztRQUV4QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFLRCxNQUFNLE9BQU8saUJBQWlCO0lBTTVCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7OzhHQVJVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEdkYVN0eWxlVG9vbHRpcCB7XG4gIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgcHVibGljIGNvbG9yOiBzdHJpbmc7XG4gIHB1YmxpYyBwYWRkaW5nOiBzdHJpbmc7XG4gIHB1YmxpYyBmb250U2l6ZTogc3RyaW5nO1xuICBwdWJsaWMgYm9yZGVyUmFkaXVzOiBzdHJpbmc7XG4gIHB1YmxpYyB6SW5kZXg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyA9ICcjOTk5JyxcbiAgICBjb2xvcjogc3RyaW5nID0gJyNmZmYnLFxuICAgIHBhZGRpbmc6IHN0cmluZyA9ICc0cHggMTJweCcsXG4gICAgZm9udFNpemU6IHN0cmluZyA9ICcuOHJlbScsXG4gICAgYm9yZGVyUmFkaXVzOiBzdHJpbmcgPSAnNXB4JyxcbiAgICB6SW5kZXg6IHN0cmluZyA9ICcxMDAwMCdcbiAgKSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gYm9yZGVyUmFkaXVzO1xuICAgIHRoaXMuekluZGV4ID0gekluZGV4O1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRvb2x0aXBTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFN0eWxlXG4gICAqL1xuICBwdWJsaWMgc3R5bGVUb29sdGlwOiBHZGFTdHlsZVRvb2x0aXA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdHlsZVRvb2x0aXAgPSBuZXcgR2RhU3R5bGVUb29sdGlwKCk7XG4gIH1cbn1cbiJdfQ==
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2dkYS10b29sdGlwL3NyYy9nZGEtdG9vbHRpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE1BQU0sT0FBTyxlQUFlO0lBUTFCLFlBQ0Usa0JBQTBCLE1BQU0sRUFDaEMsUUFBZ0IsTUFBTSxFQUN0QixVQUFrQixVQUFVLEVBQzVCLFdBQW1CLE9BQU8sRUFDMUIsZUFBdUIsS0FBSyxFQUM1QixTQUFpQixPQUFPO1FBRXhCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUtELE1BQU0sT0FBTyxpQkFBaUI7SUFNNUI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7OEdBUlUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgR2RhU3R5bGVUb29sdGlwIHtcbiAgcHVibGljIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgcHVibGljIHBhZGRpbmc6IHN0cmluZztcbiAgcHVibGljIGZvbnRTaXplOiBzdHJpbmc7XG4gIHB1YmxpYyBib3JkZXJSYWRpdXM6IHN0cmluZztcbiAgcHVibGljIHpJbmRleDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gJyM5OTknLFxuICAgIGNvbG9yOiBzdHJpbmcgPSAnI2ZmZicsXG4gICAgcGFkZGluZzogc3RyaW5nID0gJzRweCAxMnB4JyxcbiAgICBmb250U2l6ZTogc3RyaW5nID0gJy44cmVtJyxcbiAgICBib3JkZXJSYWRpdXM6IHN0cmluZyA9ICc1cHgnLFxuICAgIHpJbmRleDogc3RyaW5nID0gJzEwMDAwJ1xuICApIHtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5wYWRkaW5nID0gcGFkZGluZztcbiAgICB0aGlzLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgdGhpcy5ib3JkZXJSYWRpdXMgPSBib3JkZXJSYWRpdXM7XG4gICAgdGhpcy56SW5kZXggPSB6SW5kZXg7XG4gIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2RhVG9vbHRpcFNlcnZpY2Uge1xuICAvKipcbiAgICogU3R5bGVcbiAgICovXG4gIHB1YmxpYyBzdHlsZVRvb2x0aXA6IEdkYVN0eWxlVG9vbHRpcDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0eWxlVG9vbHRpcCA9IG5ldyBHZGFTdHlsZVRvb2x0aXAoKTtcbiAgfVxufVxuIl19
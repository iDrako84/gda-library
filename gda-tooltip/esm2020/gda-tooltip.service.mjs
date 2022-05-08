import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaStyleTooltip {
    constructor(backgroundColor, color, padding, fontSize, borderRadius, zIndex) {
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
        this.styleTooltip = {
            backgroundColor: '#999',
            color: '#fff',
            padding: '4px 12px',
            fontSize: '.8rem',
            borderRadius: '5px',
            zIndex: '10000',
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2dkYS10b29sdGlwL3NyYy9nZGEtdG9vbHRpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLE1BQU0sT0FBTyxlQUFlO0lBUTFCLFlBQ0UsZUFBdUIsRUFDdkIsS0FBYSxFQUNiLE9BQWUsRUFDZixRQUFnQixFQUNoQixZQUFvQixFQUNwQixNQUFjO1FBRWQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBS0QsTUFBTSxPQUFPLGlCQUFpQjtJQU01QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsZUFBZSxFQUFFLE1BQU07WUFDdkIsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUUsVUFBVTtZQUNuQixRQUFRLEVBQUUsT0FBTztZQUNqQixZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDO0lBQ0osQ0FBQzs7OEdBZlUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgR2RhU3R5bGVUb29sdGlwIHtcbiAgcHVibGljIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBwdWJsaWMgY29sb3I6IHN0cmluZztcbiAgcHVibGljIHBhZGRpbmc6IHN0cmluZztcbiAgcHVibGljIGZvbnRTaXplOiBzdHJpbmc7XG4gIHB1YmxpYyBib3JkZXJSYWRpdXM6IHN0cmluZztcbiAgcHVibGljIHpJbmRleDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJhY2tncm91bmRDb2xvcjogc3RyaW5nLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgcGFkZGluZzogc3RyaW5nLFxuICAgIGZvbnRTaXplOiBzdHJpbmcsXG4gICAgYm9yZGVyUmFkaXVzOiBzdHJpbmcsXG4gICAgekluZGV4OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gYm9yZGVyUmFkaXVzO1xuICAgIHRoaXMuekluZGV4ID0gekluZGV4O1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRvb2x0aXBTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFN0eWxlXG4gICAqL1xuICBwdWJsaWMgc3R5bGVUb29sdGlwOiBHZGFTdHlsZVRvb2x0aXA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdHlsZVRvb2x0aXAgPSB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjOTk5JyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBwYWRkaW5nOiAnNHB4IDEycHgnLFxuICAgICAgZm9udFNpemU6ICcuOHJlbScsXG4gICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxuICAgICAgekluZGV4OiAnMTAwMDAnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==
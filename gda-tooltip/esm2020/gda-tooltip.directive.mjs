import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./gda-tooltip.service";
export class GdaTooltipDirective {
    constructor(elementRef, renderer, gdaTooltipService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.gdaTooltipService = gdaTooltipService;
        this.gdaTooltip = '';
        this.dataHtml = false;
        this.isMobile = this.mobileAndTabletCheck();
    }
    /**
     * Cambio testo
     */
    ngOnChanges() {
        if (this.span && !this.isMobile) {
            this.renderer.removeChild(this.elementRef.nativeElement.ownerDocument.body, this.span);
            this.span = null;
            this.createTooltip();
        }
    }
    /**
     * Crea il tooltip
     */
    createTooltip() {
        this.span = this.renderer.createElement('span');
        const text = this.renderer.createText(this.gdaTooltip);
        if (this.dataHtml) {
            this.renderer.setProperty(this.span, 'innerHTML', this.gdaTooltip);
        }
        else {
            this.renderer.appendChild(this.span, text);
        }
        this.renderer.appendChild(this.elementRef.nativeElement.ownerDocument.body, this.span);
        // this.renderer.appendChild(this.elementRef.nativeElement.ownerDocument.body, this.span);
        this.renderer.setStyle(this.span, 'position', 'fixed');
        this.renderer.setStyle(this.span, 'display', 'none');
        this.renderer.setStyle(this.span, 'background-color', this.gdaTooltipService.styleTooltip.backgroundColor);
        this.renderer.setStyle(this.span, 'color', this.gdaTooltipService.styleTooltip.color);
        this.renderer.setStyle(this.span, 'padding', this.gdaTooltipService.styleTooltip.padding);
        this.renderer.setStyle(this.span, 'font-size', this.gdaTooltipService.styleTooltip.fontSize);
        this.renderer.setStyle(this.span, 'border-radius', this.gdaTooltipService.styleTooltip.borderRadius);
        this.renderer.setStyle(this.span, 'animation-duration', '0.2s');
        this.renderer.setStyle(this.span, 'z-index', this.gdaTooltipService.styleTooltip.zIndex);
    }
    /**
     * Mouse sopra
     */
    onClick(e) {
        if (!this.isMobile && this.gdaTooltip !== '') {
            if (!this.span) {
                this.createTooltip();
            }
            const position = this.elementRef.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.span, 'display', 'block');
            this.renderer.removeClass(this.span, 'gda-tooltip-animation-reverse');
            this.renderer.addClass(this.span, 'gda-tooltip-animation-scale');
            // posizione Y
            this.renderer.setStyle(this.span, 'top', position.bottom + (position.height / 3) + 'px');
            // posizione X
            const positionCenter = position.left + (this.elementRef.nativeElement.offsetWidth / 2);
            this.renderer.setStyle(this.span, 'left', positionCenter - (this.span.offsetWidth / 2) + 'px');
        }
    }
    /**
     * Mouse over
     */
    mouseleave(eventData) {
        if (this.span && !this.isMobile && this.gdaTooltip !== '') {
            this.renderer.removeClass(this.span, 'gda-tooltip-animation-scale');
            this.renderer.addClass(this.span, 'gda-tooltip-animation-reverse');
            setTimeout(() => {
                // this.renderer.setStyle(this.span, 'display', 'none');
                if (this.span) {
                    this.renderer.removeChild(this.elementRef.nativeElement.ownerDocument.body, this.span);
                    this.span = null;
                }
            }, 100);
        }
    }
    mobileAndTabletCheck() {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            check = true;
        } })(navigator.userAgent || navigator.vendor);
        return check;
    }
    /**
     * Distrugge i tooltip
     */
    ngOnDestroy() {
        if (this.span && !this.isMobile) {
            this.renderer.removeChild(this.elementRef.nativeElement.ownerDocument.body, this.span);
        }
    }
}
GdaTooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTooltipService }], target: i0.ɵɵFactoryTarget.Directive });
GdaTooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: GdaTooltipDirective, selector: "[gdaTooltip]", inputs: { gdaTooltip: "gdaTooltip", dataHtml: "dataHtml" }, host: { listeners: { "mouseenter": "onClick($event)", "mouseleave": "mouseleave()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaTooltip]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.GdaTooltipService }]; }, propDecorators: { gdaTooltip: [{
                type: Input
            }], dataHtml: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }], mouseleave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10b29sdGlwL3NyYy9nZGEtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFtQyxNQUFNLGVBQWUsQ0FBQzs7O0FBTzVHLE1BQU0sT0FBTyxtQkFBbUI7SUFzQjVCLFlBQ1csVUFBc0IsRUFDckIsUUFBbUIsRUFDbkIsaUJBQW9DO1FBRnJDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRTVDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sSUFB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QUNwQjtZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO0lBQ0wsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLHFWQUFxVixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSx5a0RBQXlrRCxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQUUsS0FBSyxHQUFHLElBQUksQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbmhFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQzs7Z0hBMUhRLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCO3lKQUtZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUcsUUFBUTtzQkFBaEIsS0FBSztnQkFpRTBDLE9BQU87c0JBQXRELFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXNCRixVQUFVO3NCQUE3QyxZQUFZO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qIFNFUlZJQ0UgKi9cbmltcG9ydCB7IEdkYVRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi9nZGEtdG9vbHRpcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZ2RhVG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIEdkYVRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGVzdG9cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZGFUb29sdGlwOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGVzdG9cbiAgICAgKi9cbiAgICBASW5wdXQoKSBkYXRhSHRtbDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZXZpY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNwYW5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNwYW46IGFueTtcbiAgICAvKipcbiAgICAgKiBJZFxuICAgICAqL1xuICAgIHByaXZhdGUgaWQhOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBnZGFUb29sdGlwU2VydmljZTogR2RhVG9vbHRpcFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5nZGFUb29sdGlwID0gJyc7XG4gICAgICAgIHRoaXMuZGF0YUh0bWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vYmlsZSA9IHRoaXMubW9iaWxlQW5kVGFibGV0Q2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYW1iaW8gdGVzdG9cbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3BhbiAmJiAhdGhpcy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHksIHRoaXMuc3Bhbik7XG4gICAgICAgICAgICB0aGlzLnNwYW4gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sdGlwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhIGlsIHRvb2x0aXBcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMuZ2RhVG9vbHRpcCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFIdG1sKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3BhbiwgJ2lubmVySFRNTCcsIHRoaXMuZ2RhVG9vbHRpcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuc3BhbiwgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAgIHRoaXMuc3BhblxuICAgICAgICApO1xuICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSwgdGhpcy5zcGFuKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdwb3NpdGlvbicsICdmaXhlZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2JhY2tncm91bmQtY29sb3InLCB0aGlzLmdkYVRvb2x0aXBTZXJ2aWNlLnN0eWxlVG9vbHRpcC5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2NvbG9yJywgdGhpcy5nZGFUb29sdGlwU2VydmljZS5zdHlsZVRvb2x0aXAuY29sb3IpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3BhZGRpbmcnLCB0aGlzLmdkYVRvb2x0aXBTZXJ2aWNlLnN0eWxlVG9vbHRpcC5wYWRkaW5nKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdmb250LXNpemUnLCB0aGlzLmdkYVRvb2x0aXBTZXJ2aWNlLnN0eWxlVG9vbHRpcC5mb250U2l6ZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnYm9yZGVyLXJhZGl1cycsIHRoaXMuZ2RhVG9vbHRpcFNlcnZpY2Uuc3R5bGVUb29sdGlwLmJvcmRlclJhZGl1cyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnYW5pbWF0aW9uLWR1cmF0aW9uJywgJzAuMnMnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICd6LWluZGV4JywgdGhpcy5nZGFUb29sdGlwU2VydmljZS5zdHlsZVRvb2x0aXAuekluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBzb3ByYVxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKSBwcml2YXRlIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGUgJiYgdGhpcy5nZGFUb29sdGlwICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNwYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXJldmVyc2UnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXNjYWxlJyk7XG5cbiAgICAgICAgICAgIC8vIHBvc2l6aW9uZSBZXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3RvcCcsIHBvc2l0aW9uLmJvdHRvbSArIChwb3NpdGlvbi5oZWlnaHQgLyAzKSArICdweCcpO1xuXG4gICAgICAgICAgICAvLyBwb3NpemlvbmUgWFxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25DZW50ZXIgPSBwb3NpdGlvbi5sZWZ0ICsgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2xlZnQnLCBwb3NpdGlvbkNlbnRlciAtICh0aGlzLnNwYW4ub2Zmc2V0V2lkdGggLyAyKSArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2Ugb3ZlclxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBwcml2YXRlIG1vdXNlbGVhdmUoZXZlbnREYXRhOiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zcGFuICYmICF0aGlzLmlzTW9iaWxlICYmIHRoaXMuZ2RhVG9vbHRpcCAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXNjYWxlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuc3BhbiwgJ2dkYS10b29sdGlwLWFuaW1hdGlvbi1yZXZlcnNlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHksIHRoaXMuc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BhbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW9iaWxlQW5kVGFibGV0Q2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjaGVjayA9IGZhbHNlO1xuICAgICAgICAoZnVuY3Rpb24gKGEpIHsgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKSB7IGNoZWNrID0gdHJ1ZTsgfSB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IpO1xuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzdHJ1Z2dlIGkgdG9vbHRpcFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zcGFuICYmICF0aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSwgdGhpcy5zcGFuKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
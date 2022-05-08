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
     * Controllo
     */
    ngOnInit() {
        if (!this.isMobile) {
            // this.createTooltip();
        }
    }
    /**
     * Crea il tooltip
     */
    createTooltip() {
        this.span = this.renderer.createElement('span');
        this.id = new Date().getTime();
        this.renderer.setProperty(this.span, 'id', 'gda-tooltip-' + this.id);
        const text = this.renderer.createText(this.gdaTooltip);
        if (this.dataHtml) {
            this.renderer.setProperty(this.span, 'innerHTML', this.gdaTooltip);
        }
        else {
            this.renderer.appendChild(this.span, text);
        }
        this.renderer.insertBefore(this.elementRef.nativeElement.ownerDocument.body, this.span, this.elementRef.nativeElement.ownerDocument.getElementsByTagName('app-root')[0]);
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
            this.renderer.addClass(this.span, 'gda-tooltip-animation-scale-reverse');
            setTimeout(() => {
                // this.renderer.setStyle(this.span, 'display', 'none');
                if (this.elementRef.nativeElement.ownerDocument.body.querySelector('#gda-tooltip-' + this.id)) {
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
GdaTooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.GdaTooltipService }], target: i0.ɵɵFactoryTarget.Directive });
GdaTooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.6", type: GdaTooltipDirective, selector: "[gdaTooltip]", inputs: { gdaTooltip: "gdaTooltip", dataHtml: "dataHtml" }, host: { listeners: { "mouseenter": "onClick($event)", "mouseleave": "mouseleave()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXRvb2x0aXAvc3JjL2dkYS10b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDOzs7QUFPcEgsTUFBTSxPQUFPLG1CQUFtQjtJQXNCNUIsWUFDVyxVQUFzQixFQUNyQixRQUFtQixFQUNuQixpQkFBb0M7UUFGckMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsd0JBQXdCO1NBQzNCO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYTtRQUNqQixJQUFJLENBQUMs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Q0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQzs7Z0hBdElRLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCO3lKQUtZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUcsUUFBUTtzQkFBaEIsS0FBSztnQkE2RWtDLE9BQU87c0JBQTlDLFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXNCVixVQUFVO3NCQUFyQyxZQUFZO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyogU0VSVklDRSAqL1xuaW1wb3J0IHsgR2RhVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuL2dkYS10b29sdGlwLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tnZGFUb29sdGlwXSdcbn0pXG5leHBvcnQgY2xhc3MgR2RhVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRlc3RvXG4gICAgICovXG4gICAgQElucHV0KCkgZ2RhVG9vbHRpcDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRlc3RvXG4gICAgICovXG4gICAgQElucHV0KCkgZGF0YUh0bWw6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRGV2aWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTcGFuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzcGFuOiBhbnk7XG4gICAgLyoqXG4gICAgICogSWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGlkITogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgZ2RhVG9vbHRpcFNlcnZpY2U6IEdkYVRvb2x0aXBTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZ2RhVG9vbHRpcCA9ICcnO1xuICAgICAgICB0aGlzLmRhdGFIdG1sID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0aGlzLm1vYmlsZUFuZFRhYmxldENoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FtYmlvIHRlc3RvXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNwYW4gJiYgIXRoaXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LCB0aGlzLnNwYW4pO1xuICAgICAgICAgICAgdGhpcy5zcGFuID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbGxvXG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc01vYmlsZSkge1xuICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVUb29sdGlwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhIGlsIHRvb2x0aXBcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zcGFuLCAnaWQnLCAnZ2RhLXRvb2x0aXAtJyArIHRoaXMuaWQpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMuZ2RhVG9vbHRpcCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFIdG1sKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3BhbiwgJ2lubmVySFRNTCcsIHRoaXMuZ2RhVG9vbHRpcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuc3BhbiwgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUoXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICB0aGlzLnNwYW4sXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhcHAtcm9vdCcpWzBdXG4gICAgICAgICk7XG4gICAgICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LCB0aGlzLnNwYW4pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnYmFja2dyb3VuZC1jb2xvcicsIHRoaXMuZ2RhVG9vbHRpcFNlcnZpY2Uuc3R5bGVUb29sdGlwLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnY29sb3InLCB0aGlzLmdkYVRvb2x0aXBTZXJ2aWNlLnN0eWxlVG9vbHRpcC5jb2xvcik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAncGFkZGluZycsIHRoaXMuZ2RhVG9vbHRpcFNlcnZpY2Uuc3R5bGVUb29sdGlwLnBhZGRpbmcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2ZvbnQtc2l6ZScsIHRoaXMuZ2RhVG9vbHRpcFNlcnZpY2Uuc3R5bGVUb29sdGlwLmZvbnRTaXplKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdib3JkZXItcmFkaXVzJywgdGhpcy5nZGFUb29sdGlwU2VydmljZS5zdHlsZVRvb2x0aXAuYm9yZGVyUmFkaXVzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdhbmltYXRpb24tZHVyYXRpb24nLCAnMC4ycycpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3otaW5kZXgnLCB0aGlzLmdkYVRvb2x0aXBTZXJ2aWNlLnN0eWxlVG9vbHRpcC56SW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHNvcHJhXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGUgJiYgdGhpcy5nZGFUb29sdGlwICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNwYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXJldmVyc2UnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXNjYWxlJyk7XG5cbiAgICAgICAgICAgIC8vIHBvc2l6aW9uZSBZXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3RvcCcsIHBvc2l0aW9uLmJvdHRvbSArIChwb3NpdGlvbi5oZWlnaHQgLyAzKSArICdweCcpO1xuXG4gICAgICAgICAgICAvLyBwb3NpemlvbmUgWFxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25DZW50ZXIgPSBwb3NpdGlvbi5sZWZ0ICsgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2xlZnQnLCBwb3NpdGlvbkNlbnRlciAtICh0aGlzLnNwYW4ub2Zmc2V0V2lkdGggLyAyKSArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2Ugb3ZlclxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBtb3VzZWxlYXZlKGV2ZW50RGF0YTogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3BhbiAmJiAhdGhpcy5pc01vYmlsZSAmJiB0aGlzLmdkYVRvb2x0aXAgIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuc3BhbiwgJ2dkYS10b29sdGlwLWFuaW1hdGlvbi1zY2FsZScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnNwYW4sICdnZGEtdG9vbHRpcC1hbmltYXRpb24tc2NhbGUtcmV2ZXJzZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNnZGEtdG9vbHRpcC0nICsgdGhpcy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHksIHRoaXMuc3Bhbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BhbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW9iaWxlQW5kVGFibGV0Q2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjaGVjayA9IGZhbHNlO1xuICAgICAgICAoZnVuY3Rpb24gKGEpIHsgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKSB7IGNoZWNrID0gdHJ1ZTsgfSB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IpO1xuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzdHJ1Z2dlIGkgdG9vbHRpcFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zcGFuICYmICF0aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSwgdGhpcy5zcGFuKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
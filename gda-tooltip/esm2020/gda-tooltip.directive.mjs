import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaTooltipDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
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
        this.renderer.setStyle(this.span, 'background-color', '#999');
        this.renderer.setStyle(this.span, 'color', '#fff');
        this.renderer.setStyle(this.span, 'padding', '4px 12px');
        this.renderer.setStyle(this.span, 'font-size', '0.8em');
        this.renderer.setStyle(this.span, 'border-radius', '5px');
        this.renderer.setStyle(this.span, 'animation-duration', '0.2s');
        this.renderer.setStyle(this.span, 'z-index', '10000');
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
GdaTooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GdaTooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.6", type: GdaTooltipDirective, selector: "[gdaTooltip]", inputs: { gdaTooltip: "gdaTooltip", dataHtml: "dataHtml" }, host: { listeners: { "mouseenter": "onClick($event)", "mouseleave": "mouseleave()" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gdaTooltip]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { gdaTooltip: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRvb2x0aXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXRvb2x0aXAvc3JjL2dkYS10b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQTJDLE1BQU0sZUFBZSxDQUFDOztBQUtwSCxNQUFNLE9BQU8sbUJBQW1CO0lBc0I1QixZQUNXLFVBQXNCLEVBQ3JCLFFBQW1CO1FBRHBCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUUzQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQix3QkFBd0I7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUNoRCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEYsQ0FBQztRQUNGLDBGQUEwRjtRQUMxRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ3FDLE9BQU8sQ0FBQyxDQUFhO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNaLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtZQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztZQUVqRSxjQUFjO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFekYsY0FBYztZQUNkLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDbEc7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDeUIsVUFBVSxDQUFDLFNBQWdCO1FBQ25ELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUN6RSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLHdEQUF3RDtnQkFDeEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7SUFDTCxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUkscVZBQXFWLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuaEUsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUY7SUFDTCxDQUFDOztnSEFySVEsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFIL0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztpQkFDM0I7eUhBS1ksVUFBVTtzQkFBbEIsS0FBSztnQkFJRyxRQUFRO3NCQUFoQixLQUFLO2dCQTRFa0MsT0FBTztzQkFBOUMsWUFBWTt1QkFBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBc0JWLFVBQVU7c0JBQXJDLFlBQVk7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2dkYVRvb2x0aXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZGFUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGVzdG9cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZGFUb29sdGlwOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGVzdG9cbiAgICAgKi9cbiAgICBASW5wdXQoKSBkYXRhSHRtbDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEZXZpY2VcbiAgICAgKi9cbiAgICBpc01vYmlsZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTcGFuXG4gICAgICovXG4gICAgc3BhbjogYW55O1xuICAgIC8qKlxuICAgICAqIElkXG4gICAgICovXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge1xuICAgICAgICB0aGlzLmdkYVRvb2x0aXAgPSAnJztcbiAgICAgICAgdGhpcy5kYXRhSHRtbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5tb2JpbGVBbmRUYWJsZXRDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbWJpbyB0ZXN0b1xuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zcGFuICYmICF0aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSwgdGhpcy5zcGFuKTtcbiAgICAgICAgICAgIHRoaXMuc3BhbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRvb2x0aXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2xsb1xuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYSBpbCB0b29sdGlwXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sdGlwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3BhbiwgJ2lkJywgJ2dkYS10b29sdGlwLScgKyB0aGlzLmlkKTtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCh0aGlzLmdkYVRvb2x0aXApO1xuICAgICAgICBpZiAodGhpcy5kYXRhSHRtbCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnNwYW4sICdpbm5lckhUTUwnLCB0aGlzLmdkYVRvb2x0aXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnNwYW4sIHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgdGhpcy5zcGFuLFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYXBwLXJvb3QnKVswXVxuICAgICAgICApO1xuICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keSwgdGhpcy5zcGFuKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdwb3NpdGlvbicsICdmaXhlZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2JhY2tncm91bmQtY29sb3InLCAnIzk5OScpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ2NvbG9yJywgJyNmZmYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdwYWRkaW5nJywgJzRweCAxMnB4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnZm9udC1zaXplJywgJzAuOGVtJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnYm9yZGVyLXJhZGl1cycsICc1cHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdhbmltYXRpb24tZHVyYXRpb24nLCAnMC4ycycpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbiwgJ3otaW5kZXgnLCAnMTAwMDAnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBzb3ByYVxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKSBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW9iaWxlICYmIHRoaXMuZ2RhVG9vbHRpcCAhPT0gJycpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zcGFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUb29sdGlwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuc3BhbiwgJ2dkYS10b29sdGlwLWFuaW1hdGlvbi1yZXZlcnNlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuc3BhbiwgJ2dkYS10b29sdGlwLWFuaW1hdGlvbi1zY2FsZScpO1xuXG4gICAgICAgICAgICAvLyBwb3NpemlvbmUgWVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICd0b3AnLCBwb3NpdGlvbi5ib3R0b20gKyAocG9zaXRpb24uaGVpZ2h0IC8gMykgKyAncHgnKTtcblxuICAgICAgICAgICAgLy8gcG9zaXppb25lIFhcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uQ2VudGVyID0gcG9zaXRpb24ubGVmdCArICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW4sICdsZWZ0JywgcG9zaXRpb25DZW50ZXIgLSAodGhpcy5zcGFuLm9mZnNldFdpZHRoIC8gMikgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIG92ZXJcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgbW91c2VsZWF2ZShldmVudERhdGE6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNwYW4gJiYgIXRoaXMuaXNNb2JpbGUgJiYgdGhpcy5nZGFUb29sdGlwICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnNwYW4sICdnZGEtdG9vbHRpcC1hbmltYXRpb24tc2NhbGUnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zcGFuLCAnZ2RhLXRvb2x0aXAtYW5pbWF0aW9uLXNjYWxlLXJldmVyc2UnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuLCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjZ2RhLXRvb2x0aXAtJyArIHRoaXMuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LCB0aGlzLnNwYW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwYW4gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vYmlsZUFuZFRhYmxldENoZWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgKGZ1bmN0aW9uIChhKSB7IGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSkgeyBjaGVjayA9IHRydWU7IH0gfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3RydWdnZSBpIHRvb2x0aXBcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3BhbiAmJiAhdGhpcy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHksIHRoaXMuc3Bhbik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
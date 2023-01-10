import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
class DataForPosition {
    constructor(positionButton, typeButton, positionContainer, viewW, viewH) {
        this.positionButton = positionButton;
        this.typeButton = typeButton;
        this.positionContainer = positionContainer;
        this.viewW = viewW;
        this.viewH = viewH;
    }
}
export class GdaMenuService {
    constructor(rendererFactory) {
        this.rendererFactory = rendererFactory;
        this.menuClose = new Subject();
        this.onEnter = new Subject();
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    resetContainerAndCreateData(container, el) {
        // RESET CONTAINER
        this.renderer.removeStyle(container, 'top');
        this.renderer.removeStyle(container, 'left');
        this.renderer.removeStyle(container, 'width');
        this.renderer.removeStyle(container, 'height');
        this.renderer.removeStyle(container, 'overflow');
        // DATA
        return {
            positionButton: el.nativeElement.getBoundingClientRect(),
            typeButton: el.nativeElement.classList.contains('gda-menu-item'),
            positionContainer: container.getBoundingClientRect(),
            viewW: window.innerWidth,
            viewH: window.innerHeight
        };
    }
    setDirection(direction, container, el) {
        if (direction === 'left')
            this.setDirectionLeft(container, el);
        if (direction === 'right')
            this.setDirectionRight(container, el);
        if (direction === 'bottom')
            this.setDirectionBottom(container, el);
        if (direction === 'top')
            this.setDirectionTop(container, el);
    }
    setDirectionLeft(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - 1}px`);
        if (data.viewW < (data.positionButton.right + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left - data.positionContainer.width}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${data.typeButton ? (data.positionButton.left - data.positionContainer.width) : (data.positionButton.right + 5)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionRight(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - 1}px`);
        if (data.viewW < (data.positionButton.right + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left - data.positionContainer.width}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${data.typeButton ? data.positionButton.right : (data.positionButton.right + 5)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionBottom(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top + data.positionButton.height + 1}px`);
        if (data.viewW > (data.positionButton.left + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${(data.positionButton.right - data.positionContainer.width)}px`);
        }
        if (data.viewH < (data.positionButton.top + data.positionButton.height + data.positionContainer.height)) {
            this.renderer.setStyle(container, 'height', `${data.viewH - data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'top', `${data.positionButton.top - (data.viewH - data.positionButton.top - 10)}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
    setDirectionTop(container, el) {
        const data = this.resetContainerAndCreateData(container, el);
        this.renderer.setStyle(container, 'top', `${data.positionButton.top - data.positionContainer.height - 1}px`);
        if (data.viewW > (data.positionButton.left + data.positionContainer.width)) {
            this.renderer.setStyle(container, 'left', `${data.positionButton.left}px`);
        }
        else {
            this.renderer.setStyle(container, 'left', `${(data.positionButton.right - data.positionContainer.width)}px`);
        }
        if (data.positionContainer.height > data.positionButton.top) {
            this.renderer.setStyle(container, 'height', `${data.positionButton.top - 10}px`);
            this.renderer.setStyle(container, 'top', `${data.positionButton.top + data.positionButton.height + 1}px`);
            this.renderer.setStyle(container, 'overflow', 'auto');
        }
    }
}
GdaMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
GdaMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1lbnUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtbWVudS9zcmMvZ2RhLW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUvQixNQUFNLGVBQWU7SUFDbkIsWUFDUyxjQUF1QixFQUN2QixVQUFtQixFQUNuQixpQkFBMEIsRUFDMUIsS0FBYSxFQUNiLEtBQWE7UUFKYixtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDO0NBQ047QUFLRCxNQUFNLE9BQU8sY0FBYztJQUt6QixZQUFvQixlQUFpQztRQUFqQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFKOUMsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLFlBQU8sR0FBcUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUkvSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sMkJBQTJCLENBQUMsU0FBYyxFQUFFLEVBQWM7UUFDL0Qsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxX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Q0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO1lBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDOzsyR0FqR1UsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5jbGFzcyBEYXRhRm9yUG9zaXRpb24ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcG9zaXRpb25CdXR0b246IERPTVJlY3QsXG4gICAgcHVibGljIHR5cGVCdXR0b246IGJvb2xlYW4sXG4gICAgcHVibGljIHBvc2l0aW9uQ29udGFpbmVyOiBET01SZWN0LFxuICAgIHB1YmxpYyB2aWV3VzogbnVtYmVyLFxuICAgIHB1YmxpYyB2aWV3SDogbnVtYmVyXG4gICkgeyB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdkYU1lbnVTZXJ2aWNlIHtcbiAgcHVibGljIG1lbnVDbG9zZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBvbkVudGVyOiBTdWJqZWN0PHsgcGFyZW50OiBFbGVtZW50LCBidXR0b246IEVsZW1lbnRSZWYsIGRpcmVjdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfT4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRDb250YWluZXJBbmRDcmVhdGVEYXRhKGNvbnRhaW5lcjogYW55LCBlbDogRWxlbWVudFJlZik6IERhdGFGb3JQb3NpdGlvbiB7XG4gICAgLy8gUkVTRVQgQ09OVEFJTkVSXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShjb250YWluZXIsICd0b3AnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKGNvbnRhaW5lciwgJ2xlZnQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKGNvbnRhaW5lciwgJ3dpZHRoJyk7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShjb250YWluZXIsICdoZWlnaHQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKGNvbnRhaW5lciwgJ292ZXJmbG93Jyk7XG5cbiAgICAvLyBEQVRBXG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uQnV0dG9uOiBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgdHlwZUJ1dHRvbjogZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2dkYS1tZW51LWl0ZW0nKSxcbiAgICAgIHBvc2l0aW9uQ29udGFpbmVyOiBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB2aWV3Vzogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICB2aWV3SDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXJlY3Rpb24oZGlyZWN0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYm90dG9tJywgY29udGFpbmVyOiBhbnksIGVsOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB0aGlzLnNldERpcmVjdGlvbkxlZnQoY29udGFpbmVyLCBlbCk7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JykgdGhpcy5zZXREaXJlY3Rpb25SaWdodChjb250YWluZXIsIGVsKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykgdGhpcy5zZXREaXJlY3Rpb25Cb3R0b20oY29udGFpbmVyLCBlbCk7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHRoaXMuc2V0RGlyZWN0aW9uVG9wKGNvbnRhaW5lciwgZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaXJlY3Rpb25MZWZ0KGNvbnRhaW5lcjogYW55LCBlbDogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGE6IERhdGFGb3JQb3NpdGlvbiA9IHRoaXMucmVzZXRDb250YWluZXJBbmRDcmVhdGVEYXRhKGNvbnRhaW5lciwgZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAndG9wJywgYCR7ZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSAxfXB4YCk7XG5cbiAgICBpZiAoZGF0YS52aWV3VyA8IChkYXRhLnBvc2l0aW9uQnV0dG9uLnJpZ2h0ICsgZGF0YS5wb3NpdGlvbkNvbnRhaW5lci53aWR0aCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIGAke2RhdGEucG9zaXRpb25CdXR0b24ubGVmdCAtIGRhdGEucG9zaXRpb25Db250YWluZXIud2lkdGh9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdsZWZ0JywgYCR7ZGF0YS50eXBlQnV0dG9uID8gKGRhdGEucG9zaXRpb25CdXR0b24ubGVmdCAtIGRhdGEucG9zaXRpb25Db250YWluZXIud2lkdGgpIDogKGRhdGEucG9zaXRpb25CdXR0b24ucmlnaHQgKyA1KX1weGApO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnZpZXdIIDwgKGRhdGEucG9zaXRpb25CdXR0b24udG9wICsgZGF0YS5wb3NpdGlvbkNvbnRhaW5lci5oZWlnaHQpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ2hlaWdodCcsIGAke2RhdGEudmlld0ggLSBkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCAtIDEwfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldERpcmVjdGlvblJpZ2h0KGNvbnRhaW5lcjogYW55LCBlbDogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGE6IERhdGFGb3JQb3NpdGlvbiA9IHRoaXMucmVzZXRDb250YWluZXJBbmRDcmVhdGVEYXRhKGNvbnRhaW5lciwgZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAndG9wJywgYCR7ZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSAxfXB4YCk7XG5cbiAgICBpZiAoZGF0YS52aWV3VyA8IChkYXRhLnBvc2l0aW9uQnV0dG9uLnJpZ2h0ICsgZGF0YS5wb3NpdGlvbkNvbnRhaW5lci53aWR0aCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIGAke2RhdGEucG9zaXRpb25CdXR0b24ubGVmdCAtIGRhdGEucG9zaXRpb25Db250YWluZXIud2lkdGh9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdsZWZ0JywgYCR7ZGF0YS50eXBlQnV0dG9uID8gZGF0YS5wb3NpdGlvbkJ1dHRvbi5yaWdodCA6IChkYXRhLnBvc2l0aW9uQnV0dG9uLnJpZ2h0ICsgNSl9cHhgKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS52aWV3SCA8IChkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCArIGRhdGEucG9zaXRpb25Db250YWluZXIuaGVpZ2h0KSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdoZWlnaHQnLCBgJHtkYXRhLnZpZXdIIC0gZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSAxMH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXREaXJlY3Rpb25Cb3R0b20oY29udGFpbmVyOiBhbnksIGVsOiBFbGVtZW50UmVmKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YTogRGF0YUZvclBvc2l0aW9uID0gdGhpcy5yZXNldENvbnRhaW5lckFuZENyZWF0ZURhdGEoY29udGFpbmVyLCBlbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICd0b3AnLCBgJHtkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCArIGRhdGEucG9zaXRpb25CdXR0b24uaGVpZ2h0ICsgMX1weGApO1xuXG4gICAgaWYgKGRhdGEudmlld1cgPiAoZGF0YS5wb3NpdGlvbkJ1dHRvbi5sZWZ0ICsgZGF0YS5wb3NpdGlvbkNvbnRhaW5lci53aWR0aCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIGAke2RhdGEucG9zaXRpb25CdXR0b24ubGVmdH1weGApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ2xlZnQnLCBgJHsoZGF0YS5wb3NpdGlvbkJ1dHRvbi5yaWdodCAtIGRhdGEucG9zaXRpb25Db250YWluZXIud2lkdGgpfXB4YCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEudmlld0ggPCAoZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgKyBkYXRhLnBvc2l0aW9uQnV0dG9uLmhlaWdodCArIGRhdGEucG9zaXRpb25Db250YWluZXIuaGVpZ2h0KSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdoZWlnaHQnLCBgJHtkYXRhLnZpZXdIIC0gZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSAxMH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICd0b3AnLCBgJHtkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCAtIChkYXRhLnZpZXdIIC0gZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSAxMCl9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnb3ZlcmZsb3cnLCAnYXV0bycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RGlyZWN0aW9uVG9wKGNvbnRhaW5lcjogYW55LCBlbDogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGE6IERhdGFGb3JQb3NpdGlvbiA9IHRoaXMucmVzZXRDb250YWluZXJBbmRDcmVhdGVEYXRhKGNvbnRhaW5lciwgZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAndG9wJywgYCR7ZGF0YS5wb3NpdGlvbkJ1dHRvbi50b3AgLSBkYXRhLnBvc2l0aW9uQ29udGFpbmVyLmhlaWdodCAtIDF9cHhgKTtcblxuICAgIGlmIChkYXRhLnZpZXdXID4gKGRhdGEucG9zaXRpb25CdXR0b24ubGVmdCArIGRhdGEucG9zaXRpb25Db250YWluZXIud2lkdGgpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ2xlZnQnLCBgJHtkYXRhLnBvc2l0aW9uQnV0dG9uLmxlZnR9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdsZWZ0JywgYCR7KGRhdGEucG9zaXRpb25CdXR0b24ucmlnaHQgLSBkYXRhLnBvc2l0aW9uQ29udGFpbmVyLndpZHRoKX1weGApO1xuICAgIH1cbiAgICBpZiAoZGF0YS5wb3NpdGlvbkNvbnRhaW5lci5oZWlnaHQgPiBkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdoZWlnaHQnLCBgJHtkYXRhLnBvc2l0aW9uQnV0dG9uLnRvcCAtIDEwfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ3RvcCcsIGAke2RhdGEucG9zaXRpb25CdXR0b24udG9wICsgZGF0YS5wb3NpdGlvbkJ1dHRvbi5oZWlnaHQgKyAxfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
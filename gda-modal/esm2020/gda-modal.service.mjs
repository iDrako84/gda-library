import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class GdaModalService {
    constructor() {
        this.closeAllModalTrigger = new Subject();
    }
    getCloseAllmodals() {
        return this.closeAllModalTrigger;
    }
    closeAllModal() {
        this.closeAllModalTrigger.next();
    }
}
GdaModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1vZGFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9nZGEtbGlicmFyeS1kZXYvcHJvamVjdHMvZ2RhLW1vZGFsL3NyYy9nZGEtbW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSy9CLE1BQU0sT0FBTyxlQUFlO0lBRzFCO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBRU0sYUFBYTtRQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NEdBYlUsZUFBZTtnSEFBZixlQUFlLGNBRmQsTUFBTTsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2RhTW9kYWxTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjbG9zZUFsbE1vZGFsVHJpZ2dlcjogU3ViamVjdDx2b2lkPjtcblxuICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgdGhpcy5jbG9zZUFsbE1vZGFsVHJpZ2dlciA9IG5ldyBTdWJqZWN0KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2xvc2VBbGxtb2RhbHMoKTogU3ViamVjdDx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuY2xvc2VBbGxNb2RhbFRyaWdnZXI7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VBbGxNb2RhbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQWxsTW9kYWxUcmlnZ2VyLm5leHQoKTtcbiAgfVxufVxuIl19
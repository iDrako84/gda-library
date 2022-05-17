import { Injectable } from '@angular/core';
/**
 * MODEL
 */
import { GdaTabsStyleModel } from './gda-tabs-style.model';
import * as i0 from "@angular/core";
export class GdaTabsService {
    constructor() {
        this.tabsStyle = new GdaTabsStyleModel();
    }
}
GdaTabsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaTabsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtdGFicy9zcmMvZ2RhLXRhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDOztHQUVHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBSzNELE1BQU0sT0FBTyxjQUFjO0lBVXpCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFDM0MsQ0FBQzs7MkdBWlUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogTU9ERUxcbiAqL1xuaW1wb3J0IHsgR2RhVGFic1N0eWxlTW9kZWwgfSBmcm9tICcuL2dkYS10YWJzLXN0eWxlLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR2RhVGFic1NlcnZpY2Uge1xuICAvKipcbiAgICogU3R5bGVcbiAgICovXG4gIHB1YmxpYyB0YWJzU3R5bGU6IEdkYVRhYnNTdHlsZU1vZGVsO1xuICAvKipcbiAgICogQW5pbWF0aW9ucyBBdnRpdmF0ZWRcbiAgICovXG4gIHB1YmxpYyBhbmltYXRpb25zQWN0aXZhdGVkITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgdGhpcy50YWJzU3R5bGUgPSBuZXcgR2RhVGFic1N0eWxlTW9kZWwoKTtcbiAgfVxufVxuIl19
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class GdaSidenavService {
    constructor() {
        this.toggle = new EventEmitter();
        this.widthContainer = new EventEmitter();
        this.opened = false;
        this.directionsEmit = new EventEmitter();
        this.directions = 'left';
    }
}
GdaSidenavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaSidenavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2dkYS1zaWRlbmF2L3NyYy9nZGEtc2lkZW5hdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUd6RCxNQUFNLE9BQU8saUJBQWlCO0lBTzVCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQzs7OEdBYlMsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2RhU2lkZW5hdlNlcnZpY2Uge1xuICB0b2dnbGU6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICB3aWR0aENvbnRhaW5lcjogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIG9wZW5lZDogYm9vbGVhbjtcbiAgZGlyZWN0aW9uc0VtaXQ6IEV2ZW50RW1pdHRlcjwnbGVmdCcgfCAncmlnaHQnPjtcbiAgZGlyZWN0aW9uczogJ2xlZnQnIHwgJ3JpZ2h0JztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZ2dsZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXJlY3Rpb25zRW1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSAnbGVmdCc7XG4gICB9XG59XG4iXX0=
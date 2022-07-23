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
GdaSidenavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaSidenavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.0", ngImport: i0, type: GdaSidenavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtc2lkZW5hdi9zcmMvZ2RhLXNpZGVuYXYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHekQsTUFBTSxPQUFPLGlCQUFpQjtJQU81QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7OzhHQWJTLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdkYVNpZGVuYXZTZXJ2aWNlIHtcclxuICB0b2dnbGU6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xyXG4gIHdpZHRoQ29udGFpbmVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPjtcclxuICBvcGVuZWQ6IGJvb2xlYW47XHJcbiAgZGlyZWN0aW9uc0VtaXQ6IEV2ZW50RW1pdHRlcjwnbGVmdCcgfCAncmlnaHQnPjtcclxuICBkaXJlY3Rpb25zOiAnbGVmdCcgfCAncmlnaHQnO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpcmVjdGlvbnNFbWl0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5kaXJlY3Rpb25zID0gJ2xlZnQnO1xyXG4gICB9XHJcbn1cclxuIl19
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class ButtonTabModel {
    constructor(id = 0, title = '', active = false) {
        this.id = id;
        this.title = title;
        this.active = active;
    }
}
export class TabsService {
    constructor() {
        this.buttons = [];
        this.buttonActivated = new EventEmitter();
        this.buttonActivatedVal = new ButtonTabModel();
        this.preventTabs = 0;
        this.tabsReloaded = new EventEmitter();
        this.checkActive = new EventEmitter();
        this.loadComplete = false;
        this.heightTabActive = 0;
        this.heightTabActive = 0;
    }
}
TabsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TabsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: TabsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy90YWJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRXRFLE1BQU0sY0FBYztJQUlsQixZQUNFLEtBQWEsQ0FBQyxFQUFFLFFBQXlDLEVBQUUsRUFBRSxTQUFrQixLQUFLO1FBRXBGLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLFdBQVc7SUFzQ3RCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7d0dBaERVLFdBQVc7NEdBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBCdXR0b25UYWJNb2RlbCB7XG4gIHB1YmxpYyBpZDogbnVtYmVyO1xuICBwdWJsaWMgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG4gIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBudW1iZXIgPSAwLCB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueSA9ICcnLCBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJzU2VydmljZSB7XG4gIC8qKlxuICAgKiBidXR0b25cbiAgICovXG4gIGJ1dHRvbnM6IEJ1dHRvblRhYk1vZGVsW107XG4gIC8qKlxuICAgKiBidXR0b24gYWN0aXZhdGVkXG4gICAqL1xuICBidXR0b25BY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxCdXR0b25UYWJNb2RlbD47XG4gIC8qKlxuICAgKiBidXR0b24gYWN0aXZhdGVkIHZhbFxuICAgKi9cbiAgYnV0dG9uQWN0aXZhdGVkVmFsOiBCdXR0b25UYWJNb2RlbDtcbiAgLyoqXG4gICAqIFByZXZlbnQgdGFiXG4gICAqL1xuICBwcmV2ZW50VGFiczogbnVtYmVyO1xuICAvKipcbiAgICogVGFicyByZWxvYWRlZFxuICAgKi9cbiAgdGFic1JlbG9hZGVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG4gIC8qKlxuICAgKiBDaGVjayBhY3RpdmVcbiAgICovXG4gIGNoZWNrQWN0aXZlOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIC8qKlxuICAgKiBMb2FkaW5nIGNvbXBsZXRlXG4gICAqL1xuICBsb2FkQ29tcGxldGU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBIZWlnaHQgdGFiIGFjdGl2ZVxuICAgKi9cbiAgaGVpZ2h0VGFiQWN0aXZlOiBudW1iZXI7XG4gIC8qKlxuICAgKiBib29sZWFuXG4gICAqL1xuICBhbmltYXRpb25zQWN0aXZhdGVkITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICB0aGlzLmJ1dHRvbkFjdGl2YXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmJ1dHRvbkFjdGl2YXRlZFZhbCA9IG5ldyBCdXR0b25UYWJNb2RlbCgpO1xuICAgIHRoaXMucHJldmVudFRhYnMgPSAwO1xuICAgIHRoaXMudGFic1JlbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuY2hlY2tBY3RpdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5sb2FkQ29tcGxldGUgPSBmYWxzZTtcbiAgICB0aGlzLmhlaWdodFRhYkFjdGl2ZSA9IDA7XG4gICAgdGhpcy5oZWlnaHRUYWJBY3RpdmUgPSAwO1xuICB9XG59XG4iXX0=
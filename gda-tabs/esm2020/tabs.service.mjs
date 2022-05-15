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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXRhYnMvc3JjL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBZSxNQUFNLGVBQWUsQ0FBQzs7QUFFdEUsTUFBTSxjQUFjO0lBSWxCLFlBQ0UsS0FBYSxDQUFDLEVBQUUsUUFBeUMsRUFBRSxFQUFFLFNBQWtCLEtBQUs7UUFFcEYsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFHRCxNQUFNLE9BQU8sV0FBVztJQXNDdEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzt3R0FoRFUsV0FBVzs0R0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBRHZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNsYXNzIEJ1dHRvblRhYk1vZGVsIHtcbiAgcHVibGljIGlkOiBudW1iZXI7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueTtcbiAgcHVibGljIGFjdGl2ZTogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IG51bWJlciA9IDAsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55ID0gJycsIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYnNTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIGJ1dHRvblxuICAgKi9cbiAgYnV0dG9uczogQnV0dG9uVGFiTW9kZWxbXTtcbiAgLyoqXG4gICAqIGJ1dHRvbiBhY3RpdmF0ZWRcbiAgICovXG4gIGJ1dHRvbkFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPEJ1dHRvblRhYk1vZGVsPjtcbiAgLyoqXG4gICAqIGJ1dHRvbiBhY3RpdmF0ZWQgdmFsXG4gICAqL1xuICBidXR0b25BY3RpdmF0ZWRWYWw6IEJ1dHRvblRhYk1vZGVsO1xuICAvKipcbiAgICogUHJldmVudCB0YWJcbiAgICovXG4gIHByZXZlbnRUYWJzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUYWJzIHJlbG9hZGVkXG4gICAqL1xuICB0YWJzUmVsb2FkZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgLyoqXG4gICAqIENoZWNrIGFjdGl2ZVxuICAgKi9cbiAgY2hlY2tBY3RpdmU6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgLyoqXG4gICAqIExvYWRpbmcgY29tcGxldGVcbiAgICovXG4gIGxvYWRDb21wbGV0ZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEhlaWdodCB0YWIgYWN0aXZlXG4gICAqL1xuICBoZWlnaHRUYWJBY3RpdmU6IG51bWJlcjtcbiAgLyoqXG4gICAqIGJvb2xlYW5cbiAgICovXG4gIGFuaW1hdGlvbnNBY3RpdmF0ZWQhOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuICAgIHRoaXMuYnV0dG9uQWN0aXZhdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuYnV0dG9uQWN0aXZhdGVkVmFsID0gbmV3IEJ1dHRvblRhYk1vZGVsKCk7XG4gICAgdGhpcy5wcmV2ZW50VGFicyA9IDA7XG4gICAgdGhpcy50YWJzUmVsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jaGVja0FjdGl2ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmxvYWRDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGVpZ2h0VGFiQWN0aXZlID0gMDtcbiAgICB0aGlzLmhlaWdodFRhYkFjdGl2ZSA9IDA7XG4gIH1cbn1cbiJdfQ==
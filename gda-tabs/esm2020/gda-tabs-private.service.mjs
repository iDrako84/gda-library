import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class ListTabsModel {
    constructor(position, title) {
        this.position = position;
        this.title = title;
    }
}
export class GdaTabsPrivateService {
    constructor() {
        this.callForId = new EventEmitter();
        this.listTabs = [];
        this.buttonLoaded = new EventEmitter();
        this.indexTabVal = 0;
        this.indexTabChanges = new EventEmitter();
        this.indexTabChangesEmit = new EventEmitter();
    }
    tabLoaded(el, i) {
        if (!this.gdaTabsEl)
            this.gdaTabsEl = el;
        if (i === undefined) {
            setTimeout(() => this.createTabs());
        }
        else {
            const tabsElN = this.gdaTabsEl.querySelectorAll('gda-tab, .gda-tab, [gda-tab]')?.length || 0;
            if (tabsElN === (i + 1))
                this.createTabs();
        }
    }
    createTabs() {
        this.listTabs = [];
        const tabs = this.gdaTabsEl.querySelectorAll('gda-tab, .gda-tab, [gda-tab');
        tabs.forEach((tab, index) => this.callForId.emit(index));
        this.buttonLoaded.emit(this.listTabs);
    }
    addTab(tab) {
        this.listTabs.push(tab);
    }
    getIndexTab() {
        return this.indexTabVal;
    }
    setIndexTab(indexTab) {
        this.indexTabChanges.emit({ new: indexTab, old: this.indexTabVal });
        this.indexTabVal = indexTab;
    }
    setTitle(position, title) {
        if (this.listTabs.some((tab) => tab.position = position)) {
            this.listTabs[position].title = title;
            this.buttonLoaded.emit(this.listTabs);
        }
    }
    getAnimation() {
        return this.animation;
    }
    setAnimation(animation) {
        this.animation = animation;
    }
}
GdaTabsPrivateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabsPrivateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsPrivateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabsPrivateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaTabsPrivateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMtcHJpdmF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy1wcml2YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRXRFLE1BQU0sYUFBYTtJQUlqQixZQUFZLFFBQWdCLEVBQUUsS0FBZ0M7UUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLHFCQUFxQjtJQVVoQztRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFTSxTQUFTLENBQUMsRUFBZSxFQUFFLENBQVU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDN0YsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxHQUFrQjtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxRQUFnQjtRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFFTSxRQUFRLENBQUMsUUFBZ0IsRUFBRSxLQUFhO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFrQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVNLFlBQVksQ0FBQyxTQUFrQjtRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOztrSEE5RFUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgTGlzdFRhYnNNb2RlbCB7XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55O1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZGFUYWJzUHJpdmF0ZVNlcnZpY2Uge1xuICBwcml2YXRlIGdkYVRhYnNFbCE6IEhUTUxFbGVtZW50O1xuICBjYWxsRm9ySWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICBwcml2YXRlIGxpc3RUYWJzOiBMaXN0VGFic01vZGVsW107XG4gIGJ1dHRvbkxvYWRlZDogRXZlbnRFbWl0dGVyPExpc3RUYWJzTW9kZWxbXT47XG4gIHByaXZhdGUgaW5kZXhUYWJWYWw6IG51bWJlcjtcbiAgaW5kZXhUYWJDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8e25ldzogbnVtYmVyLCBvbGQ6IG51bWJlcn0+O1xuICBpbmRleFRhYkNoYW5nZXNFbWl0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPjtcbiAgcHJpdmF0ZSBhbmltYXRpb24hOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FsbEZvcklkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubGlzdFRhYnMgPSBbXTtcbiAgICB0aGlzLmJ1dHRvbkxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmluZGV4VGFiVmFsID0gMDtcbiAgICB0aGlzLmluZGV4VGFiQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmluZGV4VGFiQ2hhbmdlc0VtaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdGFiTG9hZGVkKGVsOiBIVE1MRWxlbWVudCwgaT86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5nZGFUYWJzRWwpIHRoaXMuZ2RhVGFic0VsID0gZWw7XG4gICAgaWYgKGkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNyZWF0ZVRhYnMoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRhYnNFbE4gPSB0aGlzLmdkYVRhYnNFbC5xdWVyeVNlbGVjdG9yQWxsKCdnZGEtdGFiLCAuZ2RhLXRhYiwgW2dkYS10YWJdJyk/Lmxlbmd0aCB8fCAwO1xuICAgICAgaWYgKHRhYnNFbE4gPT09IChpICsgMSkpIHRoaXMuY3JlYXRlVGFicygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGFicygpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RUYWJzID0gW107XG4gICAgY29uc3QgdGFicyA9IHRoaXMuZ2RhVGFic0VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2dkYS10YWIsIC5nZGEtdGFiLCBbZ2RhLXRhYicpO1xuICAgIHRhYnMuZm9yRWFjaCgodGFiLCBpbmRleDogbnVtYmVyKSA9PiB0aGlzLmNhbGxGb3JJZC5lbWl0KGluZGV4KSk7XG4gICAgdGhpcy5idXR0b25Mb2FkZWQuZW1pdCh0aGlzLmxpc3RUYWJzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUYWIodGFiOiBMaXN0VGFic01vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5saXN0VGFicy5wdXNoKHRhYik7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5kZXhUYWIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleFRhYlZhbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJbmRleFRhYihpbmRleFRhYjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleFRhYkNoYW5nZXMuZW1pdCh7bmV3OiBpbmRleFRhYiwgb2xkOiB0aGlzLmluZGV4VGFiVmFsfSk7XG4gICAgdGhpcy5pbmRleFRhYlZhbCA9IGluZGV4VGFiO1xuICB9XG5cbiAgcHVibGljIHNldFRpdGxlKHBvc2l0aW9uOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0VGFicy5zb21lKCh0YWI6IExpc3RUYWJzTW9kZWwpID0+IHRhYi5wb3NpdGlvbiA9IHBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5saXN0VGFic1twb3NpdGlvbl0udGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuYnV0dG9uTG9hZGVkLmVtaXQodGhpcy5saXN0VGFicyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEFuaW1hdGlvbigpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb247XG4gIH1cblxuICBwdWJsaWMgc2V0QW5pbWF0aW9uKGFuaW1hdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuICB9XG59XG4iXX0=
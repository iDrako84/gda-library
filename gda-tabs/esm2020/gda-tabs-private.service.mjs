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
GdaTabsPrivateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaTabsPrivateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GdaTabsPrivateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaTabsPrivateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: GdaTabsPrivateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXRhYnMtcHJpdmF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZ2RhLWxpYnJhcnktZGV2L3Byb2plY3RzL2dkYS10YWJzL3NyYy9nZGEtdGFicy1wcml2YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDOztBQUk3RixNQUFNLGFBQWE7SUFJakIsWUFBWSxRQUFnQixFQUFFLEtBQWdDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyxxQkFBcUI7SUFVaEM7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRU0sU0FBUyxDQUFDLEVBQWUsRUFBRSxDQUFVO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsRUFBRSxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQzdGLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBa0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFTSxXQUFXLENBQUMsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRU0sUUFBUSxDQUFDLFFBQWdCLEVBQUUsS0FBYTtRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBa0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsRUFBRTtZQUN2RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxZQUFZLENBQUMsU0FBa0I7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7a0hBOURVLHFCQUFxQjtzSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qIFJYSlMgKi9cbmltcG9ydCB7IGRlbGF5LCBvZiB9IGZyb20gJ3J4anMnO1xuXG5jbGFzcyBMaXN0VGFic01vZGVsIHtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnk7XG5cbiAgY29uc3RydWN0b3IocG9zaXRpb246IG51bWJlciwgdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdkYVRhYnNQcml2YXRlU2VydmljZSB7XG4gIHByaXZhdGUgZ2RhVGFic0VsITogSFRNTEVsZW1lbnQ7XG4gIGNhbGxGb3JJZDogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIHByaXZhdGUgbGlzdFRhYnM6IExpc3RUYWJzTW9kZWxbXTtcbiAgYnV0dG9uTG9hZGVkOiBFdmVudEVtaXR0ZXI8TGlzdFRhYnNNb2RlbFtdPjtcbiAgcHJpdmF0ZSBpbmRleFRhYlZhbDogbnVtYmVyO1xuICBpbmRleFRhYkNoYW5nZXM6IEV2ZW50RW1pdHRlcjx7bmV3OiBudW1iZXIsIG9sZDogbnVtYmVyfT47XG4gIGluZGV4VGFiQ2hhbmdlc0VtaXQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICBwcml2YXRlIGFuaW1hdGlvbiE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYWxsRm9ySWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5saXN0VGFicyA9IFtdO1xuICAgIHRoaXMuYnV0dG9uTG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuaW5kZXhUYWJWYWwgPSAwO1xuICAgIHRoaXMuaW5kZXhUYWJDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuaW5kZXhUYWJDaGFuZ2VzRW1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyB0YWJMb2FkZWQoZWw6IEhUTUxFbGVtZW50LCBpPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdkYVRhYnNFbCkgdGhpcy5nZGFUYWJzRWwgPSBlbDtcbiAgICBpZiAoaSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY3JlYXRlVGFicygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGFic0VsTiA9IHRoaXMuZ2RhVGFic0VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2dkYS10YWIsIC5nZGEtdGFiLCBbZ2RhLXRhYl0nKT8ubGVuZ3RoIHx8IDA7XG4gICAgICBpZiAodGFic0VsTiA9PT0gKGkgKyAxKSkgdGhpcy5jcmVhdGVUYWJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUYWJzKCk6IHZvaWQge1xuICAgIHRoaXMubGlzdFRhYnMgPSBbXTtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5nZGFUYWJzRWwucXVlcnlTZWxlY3RvckFsbCgnZ2RhLXRhYiwgLmdkYS10YWIsIFtnZGEtdGFiJyk7XG4gICAgdGFicy5mb3JFYWNoKCh0YWIsIGluZGV4OiBudW1iZXIpID0+IHRoaXMuY2FsbEZvcklkLmVtaXQoaW5kZXgpKTtcbiAgICB0aGlzLmJ1dHRvbkxvYWRlZC5lbWl0KHRoaXMubGlzdFRhYnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFRhYih0YWI6IExpc3RUYWJzTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RUYWJzLnB1c2godGFiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmRleFRhYigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmluZGV4VGFiVmFsO1xuICB9XG5cbiAgcHVibGljIHNldEluZGV4VGFiKGluZGV4VGFiOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmluZGV4VGFiQ2hhbmdlcy5lbWl0KHtuZXc6IGluZGV4VGFiLCBvbGQ6IHRoaXMuaW5kZXhUYWJWYWx9KTtcbiAgICB0aGlzLmluZGV4VGFiVmFsID0gaW5kZXhUYWI7XG4gIH1cblxuICBwdWJsaWMgc2V0VGl0bGUocG9zaXRpb246IG51bWJlciwgdGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RUYWJzLnNvbWUoKHRhYjogTGlzdFRhYnNNb2RlbCkgPT4gdGFiLnBvc2l0aW9uID0gcG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmxpc3RUYWJzW3Bvc2l0aW9uXS50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5idXR0b25Mb2FkZWQuZW1pdCh0aGlzLmxpc3RUYWJzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0QW5pbWF0aW9uKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XG4gIH1cbn1cbiJdfQ==
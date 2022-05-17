import { Component, HostBinding, ViewChild } from '@angular/core';
/* SERVICE */
import { GdaSidenavService } from './gda-sidenav.service';
/* RXJS */
import { delay, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./gda-sidenav.service";
export class GdaSidenavComponent {
    constructor(gdaSidenavService, elementRef, renderer) {
        this.gdaSidenavService = gdaSidenavService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.setClass = true;
        this.opened = false;
        this.gdaSidenavService.toggle.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            this.opened = !this.opened;
            if (this.opened) {
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', (this.widthContainer + 'px'));
                this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
                this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
            }
            else {
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', 0);
                this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
                this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', 0);
            }
        });
        this.gdaSidenavService.widthContainer.subscribe((widthContainer) => {
            this.widthContainer = widthContainer;
            of(true).pipe(delay(0)).subscribe(() => {
                if (this.opened) {
                    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', (this.widthContainer + 'px'));
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', ('calc(100% - ' + this.widthContainer + 'px)'));
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', (this.widthContainer + 'px'));
                }
                else {
                    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('gda-sidenav-header'), 'width', 0);
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, 'width', '100%');
                    this.renderer.setStyle(this.containerBodyEl.nativeElement, this.directions === 'left' ? 'margin-left' : 'margin-right', 0);
                }
            });
        });
        this.directions = 'left';
        this.widthContainer = 0;
    }
    ngAfterViewInit() {
        this.opened = this.gdaSidenavService.opened;
        this.directions = this.gdaSidenavService.directions;
        this.gdaSidenavService.directionsEmit.subscribe((val) => this.directions = val);
        of(true).pipe(delay(300)).subscribe(() => {
            this.renderer.setStyle(this.containerBodyEl.nativeElement, 'transition', '.2s ease-in-out');
        });
    }
}
GdaSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavComponent, deps: [{ token: i1.GdaSidenavService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
GdaSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.6", type: GdaSidenavComponent, selector: "gda-sidenav", host: { properties: { "class.gda-sidenav": "this.setClass" } }, providers: [
        GdaSidenavService
    ], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "containerBodyEl", first: true, predicate: ["containerBody"], descendants: true }], ngImport: i0, template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.6", ngImport: i0, type: GdaSidenavComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'gda-sidenav',
                    template: `
    <div class="gda-sidenav-container" #container>
      <ng-content select="gda-sidenav-header"></ng-content>
      <div class="gda-sidenav-container" #containerBody>
        <ng-content></ng-content>
      </div>
      <!-- <ng-content></ng-content> -->
    </div>
  `,
                    providers: [
                        GdaSidenavService
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.GdaSidenavService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { setClass: [{
                type: HostBinding,
                args: ['class.gda-sidenav']
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], containerBodyEl: [{
                type: ViewChild,
                args: ['containerBody']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLXNpZGVuYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2RhLXNpZGVuYXYvc3JjL2dkYS1zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxXQUFXLEVBQW9CLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsVUFBVTtBQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFpQmpDLE1BQU0sT0FBTyxtQkFBbUI7SUF1QjlCLFlBQ1UsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLFFBQW1CO1FBRm5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekJLLGFBQVEsR0FBRyxJQUFJLENBQUM7UUEyQmhELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBc0IsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pJLElBQUks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bGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKiBTRVJWSUNFICovXG5pbXBvcnQgeyBHZGFTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vZ2RhLXNpZGVuYXYuc2VydmljZSc7XG4vKiBSWEpTICovXG5pbXBvcnQgeyBkZWxheSwgb2YgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2RhLXNpZGVuYXYnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJnZGEtc2lkZW5hdi1jb250YWluZXJcIiAjY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZ2RhLXNpZGVuYXYtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImdkYS1zaWRlbmF2LWNvbnRhaW5lclwiICNjb250YWluZXJCb2R5PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiAtLT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR2RhU2lkZW5hdlNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZGFTaWRlbmF2Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZ2RhLXNpZGVuYXYnKSBzZXRDbGFzcyA9IHRydWU7XG4gIC8qKlxuICAgKiBDb250YWluZXJcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lckVsITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIC8qKlxuICAgKiBDb250YWluZXIgYm9keVxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyQm9keScpIGNvbnRhaW5lckJvZHlFbCE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICAvKipcbiAgICogRGlyZWN0aW9uXG4gICAqL1xuICBkaXJlY3Rpb25zOiAnbGVmdCcgfCAncmlnaHQnO1xuICAvKipcbiAgICogT3BlbmVkXG4gICAqL1xuICBwcml2YXRlIG9wZW5lZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdpZHRoIGNvbnRhaW5lclxuICAgKi9cbiAgcHJpdmF0ZSB3aWR0aENvbnRhaW5lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2RhU2lkZW5hdlNlcnZpY2U6IEdkYVNpZGVuYXZTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLnRvZ2dsZS5zdWJzY3JpYmUoKHdpZHRoQ29udGFpbmVyOiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMud2lkdGhDb250YWluZXIgPSB3aWR0aENvbnRhaW5lcjtcbiAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyJyksICd3aWR0aCcsICh0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4JykpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICgnY2FsYygxMDAlIC0gJyArIHRoaXMud2lkdGhDb250YWluZXIgKyAncHgpJykpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlyZWN0aW9ucyA9PT0gJ2xlZnQnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnLCAodGhpcy53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyJyksICd3aWR0aCcsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kaXJlY3Rpb25zID09PSAnbGVmdCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCcsIDApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2RhU2lkZW5hdlNlcnZpY2Uud2lkdGhDb250YWluZXIuc3Vic2NyaWJlKCh3aWR0aENvbnRhaW5lcjogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLndpZHRoQ29udGFpbmVyID0gd2lkdGhDb250YWluZXI7XG4gICAgICBvZih0cnVlKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dkYS1zaWRlbmF2LWhlYWRlcicpLCAnd2lkdGgnLCAodGhpcy53aWR0aENvbnRhaW5lciArICdweCcpKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICgnY2FsYygxMDAlIC0gJyArIHRoaXMud2lkdGhDb250YWluZXIgKyAncHgpJykpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kaXJlY3Rpb25zID09PSAnbGVmdCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1yaWdodCcsICh0aGlzLndpZHRoQ29udGFpbmVyICsgJ3B4JykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZ2RhLXNpZGVuYXYtaGVhZGVyJyksICd3aWR0aCcsIDApO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJCb2R5RWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGlyZWN0aW9ucyA9PT0gJ2xlZnQnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSAnbGVmdCc7XG4gICAgdGhpcy53aWR0aENvbnRhaW5lciA9IDA7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuZWQgPSB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLm9wZW5lZDtcbiAgICB0aGlzLmRpcmVjdGlvbnMgPSB0aGlzLmdkYVNpZGVuYXZTZXJ2aWNlLmRpcmVjdGlvbnM7XG4gICAgdGhpcy5nZGFTaWRlbmF2U2VydmljZS5kaXJlY3Rpb25zRW1pdC5zdWJzY3JpYmUoKHZhbDogJ2xlZnQnIHwgJ3JpZ2h0JykgPT4gdGhpcy5kaXJlY3Rpb25zID0gdmFsKTtcbiAgICBvZih0cnVlKS5waXBlKGRlbGF5KDMwMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyQm9keUVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJy4ycyBlYXNlLWluLW91dCcpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
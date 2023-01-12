import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// COMPONENT
import { GdaModal } from './gda-modal.component';
import { GdaModalHeader } from './gda-modal-header.component';
import { GdaModalContent } from './gda-modal-content.component';
import { GdaModalFooter } from './gda-modal-footer.component';
import * as i0 from "@angular/core";
export class GdaModalModule {
}
GdaModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GdaModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, declarations: [GdaModal,
        GdaModalHeader,
        GdaModalContent,
        GdaModalFooter], imports: [CommonModule], exports: [GdaModal,
        GdaModalHeader,
        GdaModalContent,
        GdaModalFooter] });
GdaModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GdaModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GdaModal,
                        GdaModalHeader,
                        GdaModalContent,
                        GdaModalFooter
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        GdaModal,
                        GdaModalHeader,
                        GdaModalContent,
                        GdaModalFooter
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RhLW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dkYS1saWJyYXJ5LWRldi9wcm9qZWN0cy9nZGEtbW9kYWwvc3JjL2dkYS1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsWUFBWTtBQUNaLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFxQjlELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBZnZCLFFBQVE7UUFDUixjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWMsYUFHZCxZQUFZLGFBR1osUUFBUTtRQUNSLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYzs0R0FHTCxjQUFjLFlBVHZCLFlBQVk7MkZBU0gsY0FBYztrQkFqQjFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGNBQWM7cUJBQ2Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIENPTVBPTkVOVFxuaW1wb3J0IHsgR2RhTW9kYWwgfSBmcm9tICcuL2dkYS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2RhTW9kYWxIZWFkZXIgfSBmcm9tICcuL2dkYS1tb2RhbC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdkYU1vZGFsQ29udGVudCB9IGZyb20gJy4vZ2RhLW1vZGFsLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEdkYU1vZGFsRm9vdGVyIH0gZnJvbSAnLi9nZGEtbW9kYWwtZm9vdGVyLmNvbXBvbmVudCc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBHZGFNb2RhbCxcbiAgICBHZGFNb2RhbEhlYWRlcixcbiAgICBHZGFNb2RhbENvbnRlbnQsXG4gICAgR2RhTW9kYWxGb290ZXJcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgR2RhTW9kYWwsXG4gICAgR2RhTW9kYWxIZWFkZXIsXG4gICAgR2RhTW9kYWxDb250ZW50LFxuICAgIEdkYU1vZGFsRm9vdGVyXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgR2RhTW9kYWxNb2R1bGUgeyB9XG4iXX0=
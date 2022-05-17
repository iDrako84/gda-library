import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GdaSidenavService {
    toggle: EventEmitter<number>;
    widthContainer: EventEmitter<number>;
    opened: boolean;
    directionsEmit: EventEmitter<'left' | 'right'>;
    directions: 'left' | 'right';
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaSidenavService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GdaSidenavService>;
}

import * as i0 from "@angular/core";
export declare class GdaStyleTooltip {
    backgroundColor: string;
    color: string;
    padding: string;
    fontSize: string;
    borderRadius: string;
    zIndex: string;
    constructor(backgroundColor?: string, color?: string, padding?: string, fontSize?: string, borderRadius?: string, zIndex?: string);
}
export declare class GdaTooltipService {
    /**
     * Style
     */
    styleTooltip: GdaStyleTooltip;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaTooltipService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GdaTooltipService>;
}

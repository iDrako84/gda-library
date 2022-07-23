import { ElementRef, Renderer2 } from "@angular/core";
import { GdaButtonService } from "./gda-button.service";
import * as i0 from "@angular/core";
export declare class GdaButtonDirective {
    elementRef: ElementRef;
    private renderer;
    private gdaButtonService;
    /**
     * add class
     */
    get setClass(): {
        'gda-button': boolean;
        'gda-button-primary': boolean;
        'gda-button-success': boolean;
        'gda-button-warning': boolean;
        'gda-button-danger': boolean;
    };
    private setClassPrimary;
    private setClassSuccess;
    private setClassWarning;
    private setClassDanger;
    /**
     * Color
     */
    set color(c: 'primary' | 'success' | 'warning' | 'danger' | null);
    private c;
    /**
     * Enable animation
     */
    animationEnabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2, gdaButtonService: GdaButtonService);
    private setClassControl;
    /**
     * Animazione ripple
     */
    onClick(e: MouseEvent): void;
    private animateRipple;
    static ɵfac: i0.ɵɵFactoryDeclaration<GdaButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GdaButtonDirective, "[gdaButton]", never, { "color": "color"; "animationEnabled": "animationEnabled"; }, {}, never, never, false>;
}

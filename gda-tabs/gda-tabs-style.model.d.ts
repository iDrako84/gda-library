export declare class GdaTabsStyleStatusModel {
    backgroundColor: string;
    color: string;
    constructor(backgroundColor: string, color: string);
}
export declare class GdaTabsStyleModel {
    normal: GdaTabsStyleStatusModel;
    selected: GdaTabsStyleStatusModel;
    barBackgroundColor: string;
    constructor(normal?: GdaTabsStyleStatusModel, selected?: GdaTabsStyleStatusModel, barBackgroundColor?: string);
}

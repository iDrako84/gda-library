# gda-library

=========

This is an Angular library created by writecodeforfun

## Installation 

`npm install gda-library`

In order to use the animations you need to import `BrowserAnimationsModule` into your project.

#### Example

```
imports: [
  ...
  BrowserAnimationsModule,
  ...
],
```

It is also necessary to import the css file globally, it is possible to import the complete css gda.css or gda.min.css, or the individual css files of the sub-projects.

#### Example ALL
```
"styles": [
  ...
  "node_modules/gda-library/css/gda.min.css",
  ...
],
```

#### Example individual sub-projects
```
"styles": [
  ...
  "node_modules/gda-library/gda-tooltip/css/gda-tooltip.min.css",
  ...
],
```

===========================================

## GDA BUTTON

Import the `GdaButtonModule` module into your project.

```
imports: [
    ...
    GdaButtonModule,
    ...
]
```

===========

You can use the gdaButton directive on button and a.

```
<button type="button" gdaButton>Click</button>
```

The directive has 4 default styles:

- primary
- success
- warning
- danger

you can pass the style to the `color` property:

```
<button type="button" gdaButton [color]="primary">Click</button>
```

The directive enables a click animation by default, it can be disabled using the `animationEnabled` property:

```
<button type="button" gdaButton [animationEnabled]="false">Click</button>
```

Animations can be blocked globally by the `GdaButtonService` service (the property value that is passed to the directive will always have priority):

```
import { GdaButtonService } from 'gda-button';
...
constructor(private gdaButtonService: GdaButtonService) {
    this.gdaButtonService.animationEnabled = false;
}
```

# GdaSidenav

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Code scaffolding

Run `ng generate component component-name --project gda-sidenav` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project gda-sidenav`.
> Note: Don't forget to add `--project gda-sidenav` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build gda-sidenav` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build gda-sidenav`, go to the dist folder `cd dist/gda-sidenav` and run `npm publish`.

## Running unit tests

Run `ng test gda-sidenav` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
## GDA TABS

Import the `GdaTabsModule` module into your project.

```
imports: [
    ...
    GdaTabsModule,
    ...
]
```

===========

To use the tabs you need to create a container (`<gda-tabs> </gda-tabs>`) and insert the individual tabs including the title (`<gda-tab titleTab="Tab 1"> ... content ... </gda-tab>`).

```
<gda-tabs>
    <gda-tab titleTab="Tab 1">
        ... content ...
    </gda-tab>
</gda-tabs>
```

The colors of the tabs are set by default,
You can modify them through `GdaTabsService` by importing a new class inside it (`GdaTabsStyleModel`), you can change the style of a single tab by passing GdaTabsStyleModel to the tab in question.

DEFAULT:

```
{
    normal: {backgroundColor: '#ddd', color: '#000'},
    selected: {backgroundColor: '#ddd', color: '#000'},
    barBackgroundColor: '#000'
}
```

CUSTOM GLOBAL:

```
import { GdaTabsService, GdaTabsStyleModel } from 'gda-tabs';
...
constructor(private gdaTabsService: GdaTabsService) { 
    const tabsStyle = new GdaTabsStyleModel();
    tabsStyle.selected.backgroundColor = 'rgb(99 102 241 / 1)';
    tabsStyle.barBackgroundColor = 'rgb(99 102 241 / 1)';
    this.gdaTabsService.tabsStyle = tabsStyle;
}
```

CUSTOM SINGLE:

```
import { GdaTabsService, GdaTabsStyleModel } from 'gda-tabs';
...
constructor(private gdaTabsService: GdaTabsService) { 
    const tabsStyle = new GdaTabsStyleModel();
    tabsStyle.selected.backgroundColor = 'rgb(99 102 241 / 1)';
    tabsStyle.barBackgroundColor = 'rgb(99 102 241 / 1)';
}
===============================================================
<gda-tabs [tabStyle]="tabsStyle">
    <gda-tab titleTab="Tab 1">
        ... content ...
    </gda-tab>
    <gda-tab titleTab="Tab 2">
        ... content ...
    </gda-tab>
</gda-tabs>
```

it is possible to set an opening tab via `indexTab`.

```
<gda-tabs [indexTab]="1">
    <gda-tab titleTab="Tab 1">
        ... content ...
    </gda-tab>
    <gda-tab titleTab="Tab 2"> <-- Tab loaded on start
        ... content ...
    </gda-tab>
</gda-tabs>
```

you can see the `indexTab` change via `indexTabActivated`.

```
<gda-tabs (indexTabActivated)="getNewIndexTab($event)"> <-- Tab event return new indexTab
    <gda-tab titleTab="Tab 1">
        ... content ...
    </gda-tab>
    <gda-tab titleTab="Tab 2">
        ... content ...
    </gda-tab>
</gda-tabs>
```

An animation occurs when passing from one tab to another, it is possible to deactivate the animation individually via `<gda-tabs [animation]="false">...</gda-tabs>` or globally via the `GdaTabsService` service.

GLOBAL:

```
import { GdaTabsService, GdaTabsStyleModel } from 'gda-tabs';
...
constructor(private gdaTabsService: GdaTabsService) { 
    this.gdaTabsService.animationsActivated = false;
}
```

SINGLE:

```
<gda-tabs [animation]="false">
    <gda-tab titleTab="Tab 1">
        ... content ...
    </gda-tab>
    <gda-tab titleTab="Tab 2">
        ... content ...
    </gda-tab>
</gda-tabs>
```

The `SINGLE` method always has priority over the `GLOBAL` method.

it is possible to set the selected tab through `indexTab` and, through `indexTabActivated`, receive the selected tab.

EXAMPLE:

```
indexTab: number = 0;
...
public setTabActivated(): void {
    this.indexTab = 1; // 2?? TAB SELECTED
}

public getTabActivated(index: number): void {
    this.indexTab = index;
}
...
<gda-tabs [indexTab]="indexTab" (indexTabActivated)="getTabActivated($event)">
    <gda-tab [titleTab]="'Tab 1'">
        Tab 1
    </gda-tab>
    <gda-tab [titleTab]="'Tab 2'">
        Tab 2
    </gda-tab>
</gda-tabs>
```

You can pass a template in the `titleTab`.

```
text = [
    'Text 1',
    'Text 2'
];
...
public removeTab(e: Event, i: number): void {
    this.text.splice(i, 1);
}
...
<gda-tabs>
    <gda-tab [titleTab]="label" *ngFor="let item of text; let i = index">
        <ng-template #label>
            Tab {{ i + 1 }} <i (click)="removeTab($event, i)"></i>
        </ng-template>
        {{ item }}
    </gda-tab>
</gda-tabs>
```

## GDA TOAST

Import the `GdaToastModule` module into your project.

```
imports: [
    ...
    GdaToastModule,
    ...
]
```

===========

To use Toast you need to import the GdaToast service.

```
constructor(private gdaToast: GdaToast) { 
    ...
}
```

and use the openToast method by passing it a string (also HTML).

```
this.gdaToast.openToast('Toast opened');
```

===========

it is possible to add an additional configuration to the method, the model can be imported directly from the file where the service resides: `GdaToastConfig`.

- direction: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' (default: `top-right`)
- classToast (default: `''`)
- styleToast (default: `{}`)
- timing: number | 'indeterminate' (default: `3000`)

`direction` determines the direction of where the toast appears.

`classToast` determines the additional global classes.

`styleToast` determines the additional styles.

```
config.styleToast = {backgroundColor: 'red', color: 'white'};
```

`timing` determines the duration time of the toast, if you pass `indeterminate` the toast will ask once you click on it.


```
const config: GdaToastConfig = new GdaToastConfig();
config.direction = 'top-center';
config.classToast = 'custom-class';
config.styleToast = {backgroundColor: 'red', color: 'white'};
config.timing = 'indeterminate';
this.gdaToast.openToast('<p>Open custom toast</p>', config);
```

All these properties can be passed to the default service for all toasts, the configuration you pass each time through openToast will always take precedence.

```
constructor(private gdaToast: GdaToast) { 
    const config: GdaToastConfig = new GdaToastConfig();
    config.direction = 'top-center';
    config.classToast = 'custom-class';
    config.styleToast = { backgroundColor: 'red', color: 'white' };
    config.timing = 'indeterminate';
    this.gdaToast.toastConfigDefault = config;
}
```

## GDA TOOLTIP

Import the `GdaTooltipModule` module into your project.

```
imports: [
    ...
    GdaTooltipModule,
    ...
]
```

===========

You can use the gdaTooltip directive on any HTML tag.

```
<button type="button" [gdaTooltip]="'Test tooltip'">Click</button>
```

===========

If you want to use HTML tags it is possible to do so once you set the dataHtml (boolean) property to true (default: false).

```
<button type="button" [gdaTooltip]="'<p>Test tooltip</p>'" [dataHtml]="true">Click</button>
```

===========

The GdaTooltipService service provides the GdaTooltipDirective directive with some global style properties that can be modified, The GdaStyleTooltip model (which can be imported) defines the property within the service and can be modified individually, here is the list of style properties that can be modify.

- backgroundColor (default: `#999`)
- color (default: `#fff`)
- padding (default: `4px 12px`)
- fontSize (default: `.8rem`)
- borderRadius (default: `5px`)
- zIndex (default: `10000`)

To modify the styles, import the service into the main module.

```
import { GdaStyleTooltip, GdaTooltipService } from 'gda-tooltip';
...
export class AppModule { 

  constructor(private gdaTooltipService: GdaTooltipService) {
    this.gdaTooltipService.styleTooltip.backgroundColor = 'red';
  }
}
```


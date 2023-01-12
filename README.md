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
import { GdaButtonService } from 'gda-library/gda-button';
...
constructor(private gdaButtonService: GdaButtonService) {
    this.gdaButtonService.animationEnabled = false;
}
```

## GDA MENU

Import the `GdaMenuModule` module into your project.

```
imports: [
    ...
    GdaMenuModule,
    ...
]
```

===========

Use the `gdaMenuTrigger` directive on the trigger element and use the menu component using the `gda-menu`, `.gda-menu` or `[gda-menu]` selectors, in `gdaMenuTrigger` you need to pass the reference of the `gda-menu` container:

```
<button type="button" [gdaMenuTrigger]="fruits">Open menu</button>

<gda-menu #fruits>
    <button gdaMenuItem>Apple</button>
    <button gdaMenuItem>Melon</button>
</gda-menu>
```

Multiple menus can be used within other menus:

```
<button type="button" [gdaMenuTrigger]="fruits">Open menu</button>

<gda-menu #fruits>
    <button gdaMenuItem [gdaMenuTrigger]="AppleType">Apple</button>
    <button gdaMenuItem>Melon</button>
</gda-menu>

<gda-menu #AppleType>
    <button gdaMenuItem>Red</button>
    <button gdaMenuItem>Green</button>
</gda-menu>
```

If you click on an element, all the menus close except for the elements that call up other menus.

It is possible to insert the direction that the opening menu must have through the `direction` property: `top`, `left`, `right`, `bottom`.
By default it is set to `right`.

```
<button type="button" [gdaMenuTrigger]="fruits" direction="left">Open menu</button>

<gda-menu #fruits>
    <button gdaMenuItem [gdaMenuTrigger]="AppleType" direction="bottom">Apple</button>
    <button gdaMenuItem>Melon</button>
</gda-menu>

<gda-menu #AppleType>
    <button gdaMenuItem>Red</button>
    <button gdaMenuItem>Green</button>
</gda-menu>
```

In the event that there is not enough space, the `direction` of the container will be reversed.
## GDA MODAL

Import the `GdaModalModule` module into your project.

```
imports: [
    ...
    GdaModalModule,
    ...
]
```

===========

Use the `gda-modal`, `.gda-modal` or `[gda-modal]` selector by giving it a reference, inside the selector insert the content of the modal.

```
<gda-modal #myModal>
    ... content ...
</gda-modal>
```


Three components can be used inside the `gda-modal` selector:

- 1 Header (`gda-modal-header`, `.gda-modal-header` and `[gda-modal-header]`).
- 2 Content (`gda-modal-content`, `.gda-modal-content` and `[gda-modal-content]`).
- 3 Footer (`gda-modal-footer`, `.gda-modal-footer` and `[gda-modal-footer]`).

```
<gda-modal #myModal>

    <!-- Header -->
    <div class="gda-modal-header">Modal header</div>

    <!-- Content -->
    <div gda-modal-content>Modal Content</div>

    <!-- Footer -->
    <gda-modal-footer>
        <button type="button" (click)="myModal.open()">Save</button>
    </gda-modal-footer>

</gda-modal>
```

In the reference it is possible to interact with two methods, `open` and `close`.

```
<button type="button" (click)="myModal.open()">Open Modal</button>

<gda-modal #myModal>
    <button type="button" (click)="myModal.close()">Close Modal</button>
</gda-modal>
```

The modal has a default backdoor that locks the page in favor of the modal, you can disable the backdoor with the `backdoor` boolean property (default: true).

```
<gda-modal #myModal [backdoor]="false">
    ... content ...
</gda-modal>
```

On the `backdoor` there is a trigger that closes the modal, to disable it use the boolean property `backdoorNotTriggerClose` (Default: true).

```
<gda-modal #myModal [backdoorNotTriggerClose]="false">
    ... content ...
</gda-modal>
```

Nella modale è possibile inserire un id e delle classi tramite le proprietà stringa `modalId` e `modalClasses` (Default: '').

```
<gda-modal #myModal [modalId]="'MyModal'" [modalClasses]="'Class_1 Class_2'">
    ... content ...
</gda-modal>
```

You can use the `open()` and `close()` methods of the modal via `@ViewChild`.

```
HTML
<gda-modal #myModal>
    ... content ...
</gda-modal>

TS
import { GdaModal } from "gda-library/gda-modal";
...
@ViewChild('myModal') myModalEl!: GdaModal;
...
openModal(): void {
    this.myModalEl?.open();
}

closeModal(): void {
    this.myModalEl?.close();
}
```

You can close all modals with `closeAllModal` method via `GdaModalService`.

```
import { GdaModalService } from "gda-library/gda-modal";
...
constructor(private gdaModalService: GdaModalService) {}

closeAllModal(): void {
    this.gdaModalService.closeAllModal();
}
```

## GDA SIDENAV

Import the `GdaTabsModule` module into your project.

```
imports: [
    ...
    GdaSidenavModule,
    ...
]
```

===========

To use the sidenav you need to create a container (`<gda-sidenav> </gda-sidenav>`) and insert header (`<gda-sidenav-header> ... content ... </gda-sidenav-header>`) and subsequently the content.

```
<gda-sidenav>
    <gda-sidenav-header>
        ... header content ...
    </gda-sidenav-header>
    ... content...
</gda-sidenav>

// OR

<div class="gda-sidenav">
    <div class="gda-sidenav-header">
        ... header content ...
    </div>
    ... content...
</div>

// OR

<div gda-sidenav>
    <div gda-sidenav-header>
        ... header content ...
    </div>
    ... content...
</div>

```

gda-sidenav has three modes: `push`, `over` and `responsive`;
`push` moves the content so that it is not covered by the header, in `over` the header covers the content and in `responsive` the sidenav changes between `push` and `over` according to the size of the page.

By default the mode is set to `responsive`.

```
EXAMPLE

<gda-sidenav mode="responsive">
    <gda-sidenav-header>
        ... header content ...
    </gda-sidenav-header>
    ... content...
</gda-sidenav>

```

In `gda-sidenav-header` it is possible to set the opening at the start via `opened` (boolean).

By default the opened is set to `true`.

```
EXAMPLE

<gda-sidenav mode="responsive">
    <gda-sidenav-header [opened]="true">
        ... header content ...
    </gda-sidenav-header>
    ... content...
</gda-sidenav>

```

In `gda-sidenav-header` it is possible to set the header direction through `directions`: `left` and `right`.

By default directions is set to `left`.

```
EXAMPLE

<gda-sidenav mode="responsive">
    <gda-sidenav-header [opened]="true" directions="left">
        ... header content ...
    </gda-sidenav-header>
    ... content...
</gda-sidenav>

```

In `gda-sidenav-header` you can set the `resize` of the sidenav, very useful when you have a dynamic header.

By default it is set to `false`.

```
EXAMPLE

<gda-sidenav mode="responsive">
    <gda-sidenav-header [opened]="true" directions="left" [resize]="false">
        ... header content ...
    </gda-sidenav-header>
    ... content...
</gda-sidenav>

```

To open the header you need to insert a reference in `gda-sidenav-header` and use the `toggle` method.

```
EXAMPLE

<gda-sidenav mode="responsive">
    <gda-sidenav-header [opened]="true" directions="left" [resize]="false" #header>
        <button type="button" gdaButton color="danger" (click)="header.toggle()">{{ text }}</button>
    </gda-sidenav-header>
    <button type="button" gdaButton color="danger" (click)="header.toggle()">{{ text }}</button>
</gda-sidenav>

```
It is possible to take opening and closing event via `statusSidenav` (`boolean`).

```
EXAMPLE

HTML:
<gda-sidenav mode="responsive">
    <gda-sidenav-header [opened]="true" directions="left" [resize]="false" (statusSidenav)="getStatusSidenav($event)" #header>
        <button type="button" gdaButton color="danger" (click)="header.toggle()">{{ text }}</button>
    </gda-sidenav-header>
    <button type="button" gdaButton color="danger" (click)="header.toggle()">{{ text }}</button>
</gda-sidenav>

TS:
getStatusSidenav(status: boolean): void {
    ...
}

```
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

// OR

<div class="gda-tabs">
    <div class="gda-tab" titleTab="Tab 1">
        ... content ...
    </div>
</div>

// OR

<div gda-tabs>
    <div gda-tab titleTab="Tab 1">
        ... content ...
    </div>
</div>
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
import { GdaTabsService, GdaTabsStyleModel } from 'gda-library/gda-tabs';
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
import { GdaTabsService, GdaTabsStyleModel } from 'gda-library/gda-tabs';
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
import { GdaTabsService, GdaTabsStyleModel } from 'gda-library/gda-tabs';
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
    this.indexTab = 1; // 2° TAB SELECTED
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
import { GdaToast } from 'gda-library/gda-toast';
...
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
import { GdaStyleTooltip, GdaTooltipService } from 'gda-library/gda-tooltip';
...
export class AppModule { 

  constructor(private gdaTooltipService: GdaTooltipService) {
    this.gdaTooltipService.styleTooltip.backgroundColor = 'red';
  }
}
```


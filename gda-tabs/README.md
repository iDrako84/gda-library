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


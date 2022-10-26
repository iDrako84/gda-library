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

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

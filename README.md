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
constructor(private gdaButtonService: GdaButtonService) {
    this.gdaButtonService.animationEnabled = false;
}
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
export class AppModule { 

  constructor(private gdaTooltipService: GdaTooltipService) {
    this.gdaTooltipService.styleTooltip.backgroundColor = 'red';
  }
}
```


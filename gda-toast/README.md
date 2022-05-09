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


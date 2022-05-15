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


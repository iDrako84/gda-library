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


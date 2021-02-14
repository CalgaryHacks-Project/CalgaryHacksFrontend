## Usage

- import `LoaderModule` in your module

```typescript
import { LoaderModule } from './directives/loader/loader.module';

@NgModule({
  imports: [CommonModule, LoaderModule],
})
export class YourModule {}
```

- Use the directive

```html
<button #submitLoader="loader" loader="button" (click)="submitMethod()">submit</button>
```

- Control the loader in your component

```typescript
@ViewChild('submitLoader', { static: false }) submitLoader?: LoaderDirective;

submitMethod() {
  this.submitLoader.is = true;
  this.sendRequest()
    .pipe(finalize(() => this.submitLoader.is = false))
    .subscribe(response => {});
}
```

## Options

You can use different settings for `loader`:

```html
<div loader="button">submit</div>
```

#### Avaliable options

- invert
- big
- small
- bg
- bgDark
- accent
- third
- inline
- inlineLeft
- button

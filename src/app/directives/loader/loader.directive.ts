import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[loader]',
  exportAs: 'loader',
})
export class LoaderDirective implements OnChanges {
  private readonly PREDEFINED_CLASSES: Readonly<{ [key: string]: string[] }> = {
    invert: ['loader-white'],
    big: ['loader-big'],
    small: ['loader-small'],
    bg: ['loader-bg'],
    bgDark: ['loader-bg-dark'],
    accent: ['loader-accent'],
    third: ['loader-third'],
    inline: ['loader-inline-right'],
    inlineLeft: ['loader-inline-left'],
    button: ['loader-inline-right', 'loader-white'],
  };
  private readonly ALL_CLASSES: Readonly<string[]> = [
    'loader-white',
    'loader-big',
    'loader-small',
    'loader-bg',
    'loader-bg-dark',
    'loader-accent',
    'loader-third',
    'loader-inline-right',
    'loader-inline-left',
    'loader-inline-right',
  ];

  @Input('loader') loader!: LoaderConfig | string;

  private _is = false;
  get is() {
    return this._is;
  }
  set is(value) {
    this._is = value;
    this.isLoaded = !value;
    this.setLoaderActiveClass();
  }

  /**
   * This is useful to know if any data is loaded
   * It's like `!is` but at first it's false
   */
  private _isLoaded = false;
  get isLoaded() {
    return this._isLoaded;
  }
  set isLoaded(value) {
    this._isLoaded = value;
    if (value) this.isLoadedOnce = true;
  }

  /**
   * Deprecated
   */
  isLoadedOnce = false;

  private setLoaderActiveClass() {
    if (this.is === true) this.elm.classList.add('loader-active');
    else if (this.is === false) this.elm.classList.remove('loader-active');
  }

  private elm: HTMLElement;
  constructor(elm: ElementRef<HTMLElement>) {
    this.elm = elm.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.loader) {
      this.config();
      this.setupExternalLoader();
    }
  }
  private setupExternalLoader() {
    if (typeof this.loader === 'object' && this.loader.externalLoader != null) {
      this.is = !!this.loader.externalLoader;
    }
  }

  private config() {
    if (typeof this.loader === 'string') {
      if (this.PREDEFINED_CLASSES[this.loader]) this.loader = { [this.loader]: true };
      else this.loader = {};
    }

    this.elm.classList.remove(...this.ALL_CLASSES);
    this.elm.classList.add(...this.getClasses(this.loader));
  }

  private getClasses(loaderConfig: _LoaderConfig): string[] {
    return Object.keys(loaderConfig)
      .reduce<string[]>((classes, curr) => {
        return [...classes, ...this.PREDEFINED_CLASSES[curr]];
      }, [])
      .filter(x => x != null)
      .concat('loader');
  }
}

export type LoaderConfig = _LoaderConfig & { externalLoader?: boolean };
interface _LoaderConfig {
  invert?: boolean;
  big?: boolean;
  small?: boolean;
  bg?: boolean;
  bgDark?: boolean;
  accent?: boolean;
  third?: boolean;
  inline?: boolean;
  inlineLeft?: boolean;
  button?: boolean;
}

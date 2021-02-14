import { startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

export function ObservedBy(obs: string) {
  return function (target: any, propertyName: string) {
    let store: Subject<any> = target[propertyName];
    const setter = (newVal: any) => {
      store = newVal;
      (target[`_${obs}`] as Subject<any>).next(newVal);
    };

    delete target[propertyName];
    // if (delete target[propertyName]) {
    // Create new property with getter and setter
    Object.defineProperty(target, propertyName, {
      get: () => store,
      set: setter,
      enumerable: true,
      configurable: true,
    });
    // }
  };
}

export function Observing(store: string) {
  return function (target: any, propertyName: string) {
    let subject: Subject<any> = target[propertyName] || new Subject<any>();

    if (delete target[propertyName]) {
      // observable (getter)
      Object.defineProperty(target, propertyName, {
        get: () => subject.pipe(startWith(target[store])),
        set: () => {},
        enumerable: true,
        configurable: true,
      });
      // Subject
      Object.defineProperty(target, `_${propertyName}`, {
        get: () => subject,
        set: _subject => {
          subject = _subject;
        },
        enumerable: true,
        configurable: true,
      });
    }
  };
}

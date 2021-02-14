export class LocalStorageService {
  copyLocalStorageToDataObject() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) break;
      if (key.startsWith(LocalStorageService.prefix(this.name))) {
        const index = key.indexOf('_.._') + 4;
        const field = key.substring(index);
        this.sessionStorage[field] = parseLsData(localStorage.getItem(key) || undefined);
      }
    }
  }

  sessionStorage: any = {};
  constructor(private name: string) {
    this.copyLocalStorageToDataObject();
  }

  private static prefix(name: string): string {
    return `STF_${name}_.._`;
  }
  private getKey(name: string) {
    return `${LocalStorageService.prefix(this.name)}${name}`;
  }

  set<T>(localStorageName: string, value: T | undefined) {
    const localStorageKey = this.getKey(localStorageName);

    this.sessionStorage[localStorageName] = value;
    if (value != null) localStorage.setItem(localStorageKey, JSON.stringify(value));
    else localStorage.removeItem(localStorageKey);
  }
  get<T>(localStorageName: string): T | undefined {
    if (this.sessionStorage[localStorageName]) return this.sessionStorage[localStorageName];
    const localStorageKey = this.getKey(localStorageName);
    return parseLsData(localStorage.getItem(localStorageKey) || undefined);
  }

  static getGlobalItem(baseName: string, localStorageName: any) {
    const localStorageKey = `${LocalStorageService.prefix(baseName)}${localStorageName}`;
    return parseLsData(localStorage.getItem(localStorageKey) || undefined);
  }

  clear() {
    this.sessionStorage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) return;

      if (key.startsWith(LocalStorageService.prefix(this.name))) {
        localStorage.removeItem(key);
        i -= 1;
      }
    }
  }
}

function parseLsData(data: string | undefined) {
  if (!data) return undefined;
  let parsed: any;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    return data;
  }
  return parsed;
}

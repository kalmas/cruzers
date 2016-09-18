import { Injectable } from '@angular/core';
import { IStorageService } from './storage.service';

@Injectable()
export class LocalStorageService implements IStorageService
{
    private storageNamespace: string = '_STORAGE_SERVICE';

    set(key: string, value: any): void
    {
        window.localStorage.setItem(`${this.storageNamespace}.${key}`, JSON.stringify(value));
    }

    get(key: string): any
    {
        let v: any = window.localStorage.getItem(`${this.storageNamespace}.${key}`);

        if (v == null) {
            return null;
        }

        return JSON.parse(v);
    }
}

import { Injectable } from '@angular/core';

@Injectable()
export class StorageService
{
    private storage: Object;
    private storageNamespace: string = '_STORAGE_SERVICE';

    constructor () {
        if (window[this.storageNamespace] == undefined) {
            window[this.storageNamespace] = new Object();
        }

        this.storage = window[this.storageNamespace];
    }

    set(key: string, value: any): void
    {
        this.storage[key] = JSON.stringify(value);
    }

    get(key: string): any
    {
        let v: any = this.storage[key];

        if (v == null) {
            return null;
        }

        return JSON.parse(v);
    }
}

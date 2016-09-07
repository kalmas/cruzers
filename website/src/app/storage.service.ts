import { Injectable } from '@angular/core';

@Injectable()
export class StorageService
{
    set(key: string, value: any): void
    {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): any
    {
        let v: any = window.sessionStorage.getItem(key);

        if (v == null) {
            return null;
        }

        return JSON.parse(v);
    }
}

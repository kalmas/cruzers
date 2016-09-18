export interface IStorageService
{
    set(key: string, value: any): void;
    get(key: string): any;
}

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MemoryStorageService } from './memoryStorage.service';
import { LocalStorageService } from './localStorage.service';
import { Song } from './song';

@Injectable()
export class SongService
{
    private suggestUrl = '/songs/suggest';
    // 'http://cruzersforever.com/songs/suggest';
    private cache: Song[] = new Array<Song>();

    constructor (private http: Http, private memoryStorage: MemoryStorageService,
            private localStorage: LocalStorageService) {}

    suggestSongs(query:string, count:number): Observable<Song[]>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('query', query);
        params.set('count', count.toString());
        return this.http.get(this.suggestUrl, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    getById(id: string): Song
    {
        // Check local storage first
        let s: Song = this.getFromLocal(id);
        if (s != null) {
            return s;
        }

        // Search songs in memory
        s = this.getFromRecentSuggestions(id);
        if (s == null) {
            return s;
        }

        this.saveToLocal(id, s);

        return s;
    }

    private getFromLocal(id: string): Song
    {
        return this.localStorage.get(`song.${id}`);
    }

    private saveToLocal(id: string, song: Song): void
    {
        this.localStorage.set(`song.${id}`, song);
    }

    private getFromRecentSuggestions(id: string): Song
    {
        let songs: Song[] = this.memoryStorage.get('songs');
        if (! songs) {
            return null;
        }

        return songs.find((song) => { return song.id == id });
    }

    private extractData(res: Response): Song[]
    {
        let body = res.json();
        let result = body.content || [];

        this.cache = result;
        return result;
    }

    private handleError (error: any)
    {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

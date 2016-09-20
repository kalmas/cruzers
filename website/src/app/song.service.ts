import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MemoryStorageService } from './memoryStorage.service';
import { LocalStorageService } from './localStorage.service';
import { Song } from './song';

@Injectable()
export class SongService
{
    private host = 'http://cruzersforever.com/api';
    // 'http://cruzersforever.com';
    private cache: Song[] = new Array<Song>();

    constructor (private http: Http, private memoryStorage: MemoryStorageService,
            private localStorage: LocalStorageService) {}

    suggestSongs(query:string, count:number): Observable<Song[]>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('query', query);
        params.set('count', count.toString());
        return this.http.get( `${this.host}/songs/suggest` , { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    private getFromServer(id: string): Observable<Song>
    {
        return this.http.get( `${this.host}/songs/${id}`)
                    .map((res: Response) => { return res.json() })
                    .catch(this.handleError);
    }

    getById(id: string): Observable<Song>
    {
        // Check local storage first
        let s: Song = this.getFromLocal(id);
        if (s) {
            return Observable.of(s);
        }

        // Search though songs in memory
        s = this.getFromRecentSuggestions(id);

        let result: Observable<Song>;
        if (s) {
            result = Observable.of(s);
        } else {
            // If all else fails, fetch from server.
            result = this.getFromServer(id);
        }

        result.subscribe(
            (song) => this.saveToLocal(id, song)
        );

        return result;
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

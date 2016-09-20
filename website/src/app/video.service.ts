import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Song } from './song';

@Injectable()
export class VideoService
{
    private url: string = 'https://www.googleapis.com/youtube/v3/search';
    private key: string = 'AIzaSyATQzV1sWmT1VSiuZ0J_Fp3jh7_PwAfDHw';

    constructor (private http: Http) {}

    searchVideos(query:string, count:number): Observable<Object[]>
    {
        window.console.log( `Query: ${query}` );

        let params: URLSearchParams = new URLSearchParams();
        params.set('part', 'snippet');
        params.set('maxResults', count.toString());
        params.set('q', query);
        params.set('type', 'video');
        params.set('videoEmbeddable', 'true');
        params.set('key', this.key);

        return this.http.get(this.url, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    private extractData(res: Response): Object[]
    {
        let body = res.json();
        let result = body.items || [];

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

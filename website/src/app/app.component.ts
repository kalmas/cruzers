import { Component } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import { ROUTER_DIRECTIVES } from '@angular/router';

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ SongService ],
    directives: [ ROUTER_DIRECTIVES ]
})
export class AppComponent
{
    public query: string = '';
    private queryStream: Subject<string> = new Subject<string>();
    private songService: SongService;
    private songs: Observable<Song[]>;

    constructor (songService: SongService)
    {
        this.songService = songService;
        this.songs = this.queryStream
            .debounceTime(50)
            .distinctUntilChanged()
            .switchMap((query: string) => this.songService.suggestSongs(query, 10));
    }

    public search(query: string)
    {
        this.queryStream.next(query);
    }

    public onSubmit(event:any)
    {
        event.preventDefault();
    }

    public focus(element:any)
    {
        element.focus();
    }
}

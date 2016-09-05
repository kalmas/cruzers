import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { SongService } from '../song.service';
import { Song } from '../song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ SongService ],
  directives: [ ROUTER_DIRECTIVES ]
})
export class HomeComponent 
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

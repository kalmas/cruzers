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
    public spinnerOn: boolean = false;
    public songs: Song[];

    private queryStream: Subject<string> = new Subject<string>();
    private songService: SongService;


    constructor (songService: SongService)
    {
        this.songService = songService;
        this.queryStream
            .debounceTime(50)
            .distinctUntilChanged()
            .switchMap((query: string) => this.songService.suggestSongs(query, 10))
            .subscribe((songs: Song[]) => { this.songs = songs; this.spinnerOn = false; })

    }

    public search(query: string)
    {
        this.spinnerOn = true;
        this.queryStream.next(query);
        this.queryStream
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

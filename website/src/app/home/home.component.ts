import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { StorageService } from '../storage.service';
import { Song } from '../song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ SongService, StorageService ]
})
export class HomeComponent implements OnInit
{
    public lastQuery: string = '';
    public spinnerOn: boolean = false;
    public songs: Song[];

    private queryStream: Subject<string> = new Subject<string>();

    constructor (private songService: SongService, private storageService: StorageService)
    {
        this.songService = songService;
        this.queryStream
            .debounceTime(50)
            .distinctUntilChanged()
            .switchMap((query: string) => {
                this.spinnerOn = true;
                this.lastQuery = query;
                return this.songService.suggestSongs(query, 10);
            })
            .subscribe((songs: Song[]) => {
                this.songs = songs;
                this.spinnerOn = false;
            });

    }

    ngOnInit()
    {
        this.lastQuery = this.storageService.get('query');
        this.songs = this.storageService.get('songs');
    }

    ngOnDestroy()
    {
        this.storageService.set('query', this.lastQuery);
        this.storageService.set('songs', this.songs);
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

import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { IStorageService } from '../storage.service';
import { MemoryStorageService } from '../memoryStorage.service';
import { LocalStorageService } from '../localStorage.service';
import { Song } from '../song';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ SongService, MemoryStorageService, LocalStorageService ]
})
export class HomeComponent implements OnInit
{
    public lastQuery: string = '';
    public spinnerOn: boolean = false;
    public songs: Song[];

    private queryStream: Subject<string> = new Subject<string>();

    constructor (private songService: SongService, private storageService: MemoryStorageService)
    {
        this.songService = songService;
        this.queryStream
            .distinctUntilChanged()
            .debounceTime(500)
            .switchMap((query: string) => {
                this.spinnerOn = true;
                this.lastQuery = query;

                if (query == '') {
                    return Observable.of([])
                }

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

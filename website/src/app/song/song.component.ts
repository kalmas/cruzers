import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SongService } from '../song.service';
import { StorageService } from '../storage.service';
import { Song } from '../song';

@Component({
  templateUrl: './song.component.html',
  styleUrls: [ './song.component.css' ],
  providers: [ SongService, StorageService ],
  directives: [ ROUTER_DIRECTIVES ]
})
export class SongComponent implements OnInit
{
    public id: string;
    public song: Song;
    private sub: Subscription;

    constructor(private route: ActivatedRoute, private songService: SongService) {}

    ngOnInit()
    {
        // Subscribe to route params
        this.sub = this.route.params.subscribe((params: Object) => {
            this.song = this.songService.getById(params['id'])
        });
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }
}

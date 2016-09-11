import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { SongService } from '../song.service';
import { StorageService } from '../storage.service';
import { VideoService } from '../video.service';
import { Song } from '../song';

@Component({
  templateUrl: './song.component.html',
  styleUrls: [ './song.component.css' ],
  providers: [ SongService, StorageService, VideoService ],
})
export class SongComponent implements OnInit
{
    public id: string;
    public song: Song;
    public video: any;
    public videoUrl: SafeResourceUrl;

    private sub: Subscription;

    constructor(private route: ActivatedRoute, private songService: SongService,
            private videoService: VideoService, private sanitizer: DomSanitizer) {}

    ngOnInit()
    {
        // Subscribe to route params
        this.sub = this.route.params.switchMap(
            (params: Object) => {
                this.song = this.songService.getById(params['id']);

                let q: string = `${this.song.title} ${this.song.artist} karaoke`;
                return this.videoService.searchVideos(q, 1);
            }).subscribe(
                (videos: any[]) => {
                    this.video = videos[0];
                    let url = `https://www.youtube.com/embed/${this.video.id.videoId}?origin=http://example.com`;
                    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                }
            );
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }
}
